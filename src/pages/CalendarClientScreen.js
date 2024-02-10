import React from 'react';
import { View, ScrollView } from 'react-native';
import AppointmentCard from '../components/AppointmentCard';
import { styles } from '../styles/CalendarClientStyles';

const CalendarClientScreen = () => {

    const data = [
        {
            id: 124,
            appointmentName: 'תספורת',
            businessName: "Daniel's hair",
            startTime: '13:00',
            endTime: '13:30',
            date: new Date(2023, 1, 14),
            price: 60,
        },
        {
            id: 125,
            appointmentName: 'תזונאית',
            businessName: "Shlomo's gym",
            startTime: '9:00',
            endTime: '10:00',
            date: new Date(2023, 1, 15),
            price: 120,
        },
        {
            id: 126,
            appointmentName: 'תספורת',
            businessName: "Daniel's hair",
            startTime: '11:00',
            endTime: '11:30',
            date: new Date(2023, 1, 15),
            price: 60,
        },
        {
            id: 127,
            appointmentName: 'תספורת',
            businessName: "Daniel's hair",
            startTime: '11:00',
            endTime: '11:30',
            date: new Date(2023, 1, 15),
            price: 60,
        },
        {
            id: 128,
            appointmentName: 'תספורת',
            businessName: "Daniel's hair",
            startTime: '11:00',
            endTime: '11:30',
            date: new Date(2023, 1, 15),
            price: 60,
        },
    ];

    return (
        <ScrollView>
            <View style={styles.container}>
                {data.map(appointment => <AppointmentCard key={appointment.id} appointment={appointment} />)}
            </View>
        </ScrollView>
    );
}

export default CalendarClientScreen;