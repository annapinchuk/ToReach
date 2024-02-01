import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/CalendarBusinessStyles';
import { Agenda } from 'react-native-calendars';
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CalendarBusinessScreen = () => {
    const [selectedDay, setSelectedDay] = useState(null);

    const onDayPress = (day) => {
        setSelectedDay(day.dateString);
    };


    const renderItem = (item) => {
        const startTime = new Date(item.time);
        const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

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

    const appointments = {
        '2022-08-01': [
            { title: 'Meeting 1', time: '2022-08-01T10:00:00' },
            { title: 'Meeting 2', time: '2022-08-01T14:00:00' },
        ],
        '2022-08-02': [
            { title: 'Lunch', time: '2022-08-02T12:30:00' },
            { title: 'Conference Call', time: '2022-08-02T15:00:00' },
        ],
        '2022-08-03': [
            { title: 'Client Meeting', time: '2022-08-03T14:30:00' },
        ],
        // Add more appointments for future dates
    };

    const dailyMeetings = selectedDay ? appointments[selectedDay] || [] : [];

    return (
        <View style={styles.container}>
            <Agenda
                items={{ [selectedDay]: dailyMeetings }}
                selected={selectedDay}
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