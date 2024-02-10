import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert} from 'react-native';
import { styles } from '../styles/CalendarBusinessStyles';
import {Agenda} from 'react-native-calendars';
import { app, auth, db } from '../firebaseConfig';
import { collection, getDocs, query, where } from '@firebase/firestore';


const temptry = async () => {
    const { uid } = auth.currentUser;
    console.log(uid)
    const appointmentsCollection = collection(db, 'Appointments');
    const appointmentsQuery = query(appointmentsCollection, where('businessID', '==', uid));
    const appointmentsSnapshot = await getDocs(appointmentsQuery);
    // const appointmentsData = appointmentsSnapshot.docs.map(
    //     (doc) => ({
    //         ...doc.data(),
    //         id: doc.id,
    //         startTime: doc.data().startTime.toDate(),
    //         endTime: doc.data().endTime.toDate(),
    //         businessName: businessIdToName[doc.data().businessID],
    //     })
    // );

    console.log(appointmentsSnapshot);

    // console.log(appointmentsData[0]);
    // setAppointments(appointmentsData);
}


const CalendarBusinessScreen =  () => {


    // temptry();

    const [selectedDay, setSelectedDay] = useState(null);
    const [appointments, setAppointments] = useState({
        '2023-08-01': [
            { title: 'Meeting 1', time: '2023-08-01T10:00:00' },
            { title: 'Meeting 2', time: '2023-08-01T14:00:00' },
        ],
        '2023-08-02': [
            { title: 'Lunch', time: '2023-08-02T12:30:00' },
            { title: 'Conference Call', time: '2023-08-02T15:00:00' },
        ],
        '2023-08-03': [
            { title: 'Client Meeting', time: '2023-08-03T14:30:00' },
        ],
        // Add more appointments for future dates
    });



    const renderItem = (item) => {
        const startTime = new Date(item.time);
        const formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => showAppointmentDetails(item)}
            >
                <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemTime}>{formattedStartTime}</Text>
                </View>
                <View style={styles.separator} />
            </TouchableOpacity>
        );
    };

    const renderEmptyDate = () => {
        return <View style={styles.emptyDate} />;
    };

    const showAppointmentDetails = (appointment) => {
        Alert.alert('Appointment Details', `Title: ${appointment.title}\nTime: ${appointment.time}`);
    };

    // Transform appointments into the expected format for the Agenda component
    const agendaItems = {};
    Object.keys(appointments).forEach((date) => {
        agendaItems[date] = appointments[date].map((meeting) => ({
            ...meeting,
            dateString: date,
        }));
    });


    const onDayPress = (day) => {
        console.log(appointments)
        // console.log(day.dateString)
        setSelectedDay(day.dateString);


    };

    const getEventsForDay = (date) => {
        return appointments.filter((event) => event.date === date);
    };

    return (
        <View style={styles.container}>
            <Agenda
                // items={agendaItems}
                items={agendaItems}
                // selected={selectedDay}
                renderItem={renderItem}
                renderEmptyDate={renderEmptyDate}
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
