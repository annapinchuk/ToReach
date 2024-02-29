import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { styles } from '../styles/CalendarBusinessStyles';
import { auth, db } from '../firebaseConfig';
import { collection, doc, getDocs, getDoc, query, where, orderBy, deleteDoc, onSnapshot } from '@firebase/firestore';
import Toast from 'react-native-toast-message';
import { getHour } from '../shared/dateMethods';

const CalendarBusinessScreen = () => {
    // State variables
    const [selectedDay, setSelectedDay] = useState(null);
    const [appointments, setAppointments] = useState({});

    // Fetch appointments from Firestore
    useEffect(() => {
        // Function to fetch appointments
        const fetchData = async () => {
            // try to get appointments from Firestore
            try {
                const { uid } = auth.currentUser;
                const appointmentsCollection = collection(db, 'Appointments');
                const appointmentsQuery = query(
                    appointmentsCollection,
                    where('businessID', '==', uid),
                    orderBy('startTime', 'asc')
                );

                // Get appointments from Firestore
                const unsubscribe = onSnapshot(appointmentsQuery, (appointmentsSnapshot) => {
                    // Map appointments data
                    const appointmentsData = appointmentsSnapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                        clientID: doc.data().clientID,
                        name: doc.data().name,
                        startTime: doc.data().startTime.toDate(),
                        endTime: doc.data().endTime.toDate(),
                    }));

                    // Format appointments by date
                    const formattedAppointments = {};
                    appointmentsData.forEach((appointment) => {
                        const dateString = appointment.startTime.toISOString().split('T')[0];
                        if (!formattedAppointments[dateString]) {
                            formattedAppointments[dateString] = [];
                        }
                        // Add appointment to the corresponding date
                        formattedAppointments[dateString].push(appointment);
                    });
                    // Set appointments state
                    setAppointments(formattedAppointments);
                });
                return unsubscribe;
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        const unsubscribe = fetchData(); // Fetch appointments from Firestore

        return () => unsubscribe;
    }, []);

    // Render appointment item 
    const renderItem = (item) => {
        const startTime = new Date(item.startTime);
        const endTime = new Date(item.endTime);

        const formattedStartTime = getHour(startTime);
        const formattedEndTime = getHour(endTime);
        const durationInMinutes = (endTime - startTime) / (1000 * 60);

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => showAppointmentDetails(item)}
            >
                <View style={styles.appointmentRectangle}>
                    <Text style={styles.itemTime}>{formattedStartTime}</Text>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemTime}>{`${formattedStartTime} - ${formattedEndTime}`}</Text>
                </View>
                <View style={[styles.separator, { marginTop: durationInMinutes > 60 ? 20 : 0 }]} />
            </TouchableOpacity>
        );
    };

    // TODO - fix bug that the massage is not shown when the user press on empty date
    const renderEmptyDate = () => {
        console.log('renderEmptyDate');
        return (
            <View style={styles.emptyDate}>
                <Text style={styles.itemTitle}>{"אין תורים להצגה"}</Text>
            </View>
        );
    };

    // Show appointment details
    const showAppointmentDetails = async (appointment) => {
        try {
            const clientsCollection = doc(collection(db, 'Clients'), appointment.clientID);
            const clientsSnapshot = await getDoc(clientsCollection);

            if (clientsSnapshot.exists()) {
                if (clientsSnapshot.data()) {
                    const clientName = clientsSnapshot.data().name || 'Not given';
                    const clientPhone = clientsSnapshot.data().phoneNumber || 'Not given'
                    const appointmentName = appointment.name || 'Not defined'

                    // Define the buttons array
                    let buttons = [
                        { text: 'אישור', onPress: () => { } },
                    ];

                    const dateEdit = new Date();
                    dateEdit.setMinutes(dateEdit.getMinutes() + 30);

                    // Check if the condition is met
                    if (appointment.startTime >= dateEdit) {
                        // Add the "מחק  תור" button if the condition is met
                        buttons.unshift({
                            text: 'מחק  תור',
                            onPress: () => deleteAppointment(appointment.id),
                            style: 'cancel',
                        });
                    }

                    Alert.alert(
                        'תיאור תור',
                        `סוג תור: ${appointmentName}\nשם לקוח: ${clientName}\nמספר טלפון: ${clientPhone}`,
                        buttons,
                        { cancelable: true }
                    );
                } else {
                    Alert.alert('תיאור תור', `סוג תור: ${appointmentName}\nלא נמצאו נתונים ללקוח`);
                }
            } else {
                console.log('Client not found');
            }

        } catch (error) {
            console.error('Error fetching client data:', error);
            Alert.alert('Error', 'An error occurred while fetching client data. Please try again.');
        }
    };

    // the function will return the appointments in the format that the Agenda component expects
    const agendaItems = {};
    Object.keys(appointments).forEach((date) => {
        agendaItems[date] = appointments[date].map((appointment) => ({
            ...appointment,
            dateString: date,
        }));
    });

    // Handle day press
    const onDayPress = (day) => {
        setSelectedDay(day.dateString);
    };

    const deleteAppointment = async (appointmentID) => {
        try {
            await deleteDoc(doc(db, "Appointments", appointmentID));
            console.log("delete appointment: ", appointmentID);
            Toast.show({
                type: 'success',
                text1: 'התור נמחק בהצלחה'
            });

        }
        catch (err) {
            console.log("delete appointment: ", err);
            Toast.show({
                type: 'error',
                text1: 'התרחשה שגיאה במחיקת התור'
            });
        }
    }

    // Return the calendar screen
    return (
        <View style={styles.container}>
            <Agenda
                items={agendaItems}
                renderItem={renderItem}
                renderEmptyData={renderEmptyDate}
                onDayPress={onDayPress}
                theme={{
                    selectedDayBackgroundColor: '#3498db',
                    dotColor: '#3498db',
                    todayTextColor: '#3498db',
                    agendaDayTextColor: '#3498db',
                }}
            />
        </View>
    );
};

export default CalendarBusinessScreen;
