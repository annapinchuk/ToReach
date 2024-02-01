// Import necessary React Native components
import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import DatePicker from '../components/DatePicker';
import { styles } from '../styles/BookAppointmentScreenStyles';

const BookAppointmentScreen = ({ navigation }) => {
    // State variables to store user selections
    const [speciality, setSpeciality] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    // Mock data for specialities, dates, and times
    const specialities = ['בלט', 'גאז', 'טיסו', 'לירי', 'מודרני', 'היפהופ', 'בר', 'מתיחות'];
    const times = ['10:00', '11:30', '12:00', '14:00', '16:30', '19:00', '19:30'];

    // Function to open the selected navigation app
    const saveHandler = () => {
        console.log('Appointment saved')
    };

    return (
        <View style={styles.container}>
            {/* Top section with business image and name */}
            <View style={styles.header}>
                <Image
                    source={{ uri: "https://picsum.photos/202" }}
                    style={styles.businessImage}
                />
                <Text style={styles.businessName}>Dance Bar</Text>
            </View>

            {/* Choose a speciality section */}
            <View style={styles.section}>
                <Text style={styles.sectionText}>בחר סוג תור:</Text>
                <View style={styles.options}>
                    {specialities.map((spec) => (
                        <Pressable key={spec} onPress={() => setSpeciality(spec)}
                            style={speciality === spec ? styles.selectedOption : styles.option}>
                            <Text style={{ color: speciality === spec ? 'white' : 'black' }} >
                                {spec}
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
                    {times.map((time) => (
                        <Pressable key={time} onPress={() => setSelectedTime(time)}
                            style={selectedTime === time ? styles.selectedOption : styles.option}>
                            <Text style={{ color: selectedTime === time ? 'white' : 'black' }} >
                                {time}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            {/* Save button */}
            <View style={{ alignItems: 'center' }}>
                <Pressable style={styles.saveButton} onPress={() => saveHandler()}>
                    <Text style={styles.saveButtonText}>שמירה</Text>
                </Pressable>
            </View>
        </View >
    );
};

export default BookAppointmentScreen;
