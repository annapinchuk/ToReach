// Import necessary React Native components
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import DatePicker from '../components/DatePicker';
import { styles } from '../styles/BookAppointmentScreenStyles';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from '@firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Toast from 'react-native-toast-message';
import { getHour } from '../shared/dateMethods';
import { businessPageStyles } from '../styles/BusinessPageStyles';
import Spinner from '../components/Spinner';

const BookAppointmentScreen = ({ route, navigation }) => {

    const businessID = route.params.businessID;
    const appointment = route.params?.appointment;
    const [isLoading, setIsLoading] = useState(false);

    // State variables to store user selections
    const [selectedDate, setSelectedDate] = useState(appointment ? new Date(appointment.date) : new Date());
    const [selectedTime, setSelectedTime] = useState(appointment ? appointment.startTime : '');
    const [selectedTorType, setSelectedTorType] = useState(appointment ? appointment.torType : undefined);

    // State variables to store business data
    const [torTypes, setTorTypes] = useState([]);
    const [businessName, setBusinessName] = useState('');
    const [businessStartTime, setBusinessStartTime] = useState(new Date());
    const [businessEndTime, setBusinessEndTime] = useState(new Date());

    // State variables to store free time according date + torType
    const [freeTimes, setFreeTimes] = useState([]);

    // Get business data
    useEffect(() => {
        const businessCollection = collection(db, "Businesses");
        const businessDocRef = doc(businessCollection, businessID)
        // Load user information from Firestore
        const getData = async () => {
            try {
                const docSnap = await getDoc(businessDocRef);
                if (docSnap.exists()) {
                    const { torTypes, businessName, startTime, endTime } = docSnap.data();
                    setTorTypes(torTypes);
                    setBusinessName(businessName);
                    setBusinessStartTime(startTime);
                    setBusinessEndTime(endTime);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        getData()

    }, []);

    // Check free time according date + torType
    const checkFreeTimes = async () => {

        const times = {};

        // fetch the start time from the business or dufault time if not exist
        let startTime = new Date(selectedDate);
        if (businessStartTime === undefined) {
            startTime.setHours(9, 0, 0, 0); // Set start time to default (09:00)
        }
        else {
            const hourStartTime = getHour(new Date(businessStartTime.seconds * 1000)).split(":");
            startTime.setHours(hourStartTime[0]);
            startTime.setMinutes(hourStartTime[1]);
        }

        // fetch the end time from the business or dufault time if not exist
        let endTime = new Date(selectedDate);
        if (businessStartTime === undefined) {
            endTime.setHours(18, 0, 0, 0); // Set start time to default (18:00)
        }
        else {
            const hourEndTime = getHour(new Date(businessEndTime.seconds * 1000)).split(":");
            endTime.setHours(hourEndTime[0]);
            endTime.setMinutes(hourEndTime[1]);
        }
        
        //  Considering the torType duration
        endTime.setMinutes(endTime.getMinutes() - selectedTorType.duration);

        // Go over all the hours from startTime to endTime with a difference of 5 minutes
        let currentTime = new Date(startTime);
        while (currentTime <= endTime) {
            // set true if the currentTime hasn't passed, end else otherwise
            times[getHour(new Date(currentTime))] = currentTime >= new Date();
            currentTime.setMinutes(currentTime.getMinutes() + 5);
        }

        try {
            const startDay = selectedDate.setHours(0, 0, 0);
            const endDay = selectedDate.setHours(23, 59, 59);

            // fetch all the bussines appointments in the selectedDate
            const findTakenTimes = query(
                collection(db, "Appointments"),
                where("businessID", "==", businessID),
                where("startTime", ">=", new Date(startDay)),
                where("startTime", "<=", new Date(endDay))
            );
            const querySnapshot = await getDocs(findTakenTimes);
            const appointmentID = appointment?.id;
            // Pass every appointment
            querySnapshot.forEach((doc) => {
                // Skip the sent appointment (in edit mode)
                if (appointmentID === doc.id) return;
                const appointment = doc.data();
                const start = appointment.startTime.toDate();
                start.setMinutes(start.getMinutes() - selectedTorType.duration);

                const end = appointment.endTime.toDate();

                // Go over all the hours from start to end appointment time and set as not free
                let currentTime = new Date(start);
                while (currentTime <= end) {
                    times[getHour(new Date(currentTime))] = false;
                    currentTime.setMinutes(currentTime.getMinutes() + 5);
                }
            });
        }
        catch (error) {
            console.log(error);
        }

        setFreeTimes(Object.keys(times).filter(time => times[time]));
    };

    // Update the freeTimes after selecting date + torType
    useEffect(() => {
        if (!selectedTorType || !selectedDate) return;
        checkFreeTimes();
    }, [selectedDate, selectedTorType]);

    // Convert startTime and date to a Date object
    const calculateStartTime = (date, time) => {
        // Combine date and time strings
        const [hour, minutes] = time.split(':');
        startTime = date.setHours(hour, minutes, 0);

        // Create a new Date object from the combined date and time string
        dateObject = new Date(startTime);

        return dateObject;
    };

    // Calculate endTime according to startTime + torTypeDuration
    const calculateEndTime = (startTime) => {

        // Create a new Date object for the end time
        endTime = new Date(startTime)

        // Calculate end time
        endTime.setMinutes(endTime.getMinutes() + selectedTorType.duration);

        return endTime;
    };

    // Function to open the selected navigation app
    const saveHandler = async () => {
        try {
            // Check the user select both time and torType
            if (selectedTime === '' || selectedTorType === undefined) {
                Toast.show({
                    type: 'error',
                    text1: 'יש לבחור את כל השדות'
                });
                return;
            }

            // Save new appointment
            const startTime = calculateStartTime(selectedDate, selectedTime)
            // const endTime = calculateEndTime(startTime, selectedTorType.duration)
            const endTime = calculateEndTime(startTime)
            const data = {
                businessID: businessID,
                clientID: auth.currentUser.uid,
                name: selectedTorType.name,
                price: selectedTorType.price,
                startTime: startTime,
                endTime: endTime,
            };

            // Check if update or new 
            setIsLoading(true);
            if (appointment)
                await setDoc(doc(db, 'Appointments', appointment.id), data)
            else
                await addDoc(collection(db, "Appointments"), data);
            setIsLoading(false);

            // Print Appointment saved
            console.log('Appointment saved');
            Toast.show({
                type: 'success',
                text1: 'ההרשמה בוצעה בהצלחה'
            })
            navigation.navigate('יומן');
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={businessPageStyles.container}>
                {/* Top section with business image and name */}
                <View style={styles.header}>
                    <Image
                        source={{ uri: "https://picsum.photos/202" }}
                        style={styles.businessImage}
                    />
                    <Text style={styles.businessName}>{businessName}</Text>
                </View>

                {/* Choose a selectedType section */}
                <View style={styles.section}>
                    <Text style={styles.sectionText}>בחר סוג תור:</Text>
                    <View style={styles.options}>
                        {torTypes.map((torType) => (
                            <Pressable key={torType.name} onPress={() => setSelectedTorType(torType)}
                                style={selectedTorType?.name === torType.name ? styles.selectedOption : styles.option}>
                                <Text style={{ color: selectedTorType === torType.name ? 'white' : 'black' }} >
                                    {torType.name}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* Choose a date section */}
                <View style={styles.dateSection}>
                    <Text style={styles.sectionText}>בחר תאריך:</Text>
                    <DatePicker date={selectedDate} setDate={setSelectedDate} />
                </View>

                {/* Choose a time section */}
                <View style={styles.section}>
                    <Text style={styles.sectionText}>בחר שעה:</Text>
                    <View style={styles.options}>
                        {freeTimes && freeTimes.length > 0 ? freeTimes.map((time) => (
                            <Pressable key={time} onPress={() => setSelectedTime(time)}
                                style={selectedTime === time ? styles.selectedOption : styles.option}>
                                <Text style={{ color: selectedTime === time ? 'white' : 'black' }} >
                                    {time}
                                </Text>
                            </Pressable>
                        )) : <Text style={styles.warningText}>אין תורים פנויים ביום זה</Text>}
                    </View>
                </View>

                {/* Save button */}
                {isLoading ? <Spinner /> : <View style={{ alignItems: 'center' }}>
                    <Pressable style={styles.saveButton} onPress={() => saveHandler()}>
                        <Text style={styles.saveButtonText}>שמירה</Text>
                    </Pressable>
                </View>}
            </ScrollView>
        </View >
    );
};

export default BookAppointmentScreen;
