import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { styles } from '../styles/CalendarBusinessStyles';
import { app, auth, db } from '../firebaseConfig';
import { collection, doc, getDocs,getDoc, query, where, orderBy } from '@firebase/firestore';

// CalendarBusinessScreen component
const CalendarBusinessScreen = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [appointments, setAppointments] = useState({});

    // Fetch appointments from Firestore
    useEffect(() => {
        const fetchData = async () => {
            const { uid } = auth.currentUser;
            const appointmentsCollection = collection(db, 'Appointments');
            const appointmentsQuery = query(
                appointmentsCollection,
                where('businessID', '==', uid),
                orderBy('startTime', 'asc') // Order by start time in ascending order
            );
            console.log(appointmentsQuery); // Debugging
            // Get appointments from Firestore
            const appointmentsSnapshot = await getDocs(appointmentsQuery);
            const appointmentsData = appointmentsSnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                clientID: doc.data().clientID,
                name : doc.data().name,
                startTime: doc.data().startTime.toDate(), // Convert Firestore Timestamp to Date
                endTime: doc.data().endTime.toDate(), // Convert Firestore Timestamp to Date
            }));
            // Format appointments by date
            const formattedAppointments = {};
            appointmentsData.forEach((appointment) => {
                const dateString = appointment.startTime.toISOString().split('T')[0];
                if (!formattedAppointments[dateString]) {
                    formattedAppointments[dateString] = [];
                }
                formattedAppointments[dateString].push(appointment); // Add appointment to the corresponding date
            });

            setAppointments(formattedAppointments); // Set appointments state
        };

        fetchData(); // Fetch appointments
    }, []); // Run only once

    // Render appointment item
    const renderItem = (item) => {
        const startTime = new Date(item.startTime);
        const endTime = new Date(item.endTime);

        // Format start and end time
        const formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

    const renderEmptyDate = () => {
        return <View style={styles.emptyDate}> 
        <Text style={styles.itemTitle}>{"אין תורים להצגה"}</Text>
        </View>; 
    };

    // Show appointment details
    const showAppointmentDetails = async (appointment) => {
        try {
            console.log('Selected Appointment:', appointment);
            console.log('appointment.clientID:', appointment.clientID);

            const clientsCollection = doc(collection(db, 'Clients'), appointment.clientID);
            
            const clientsSnapshot = await getDoc(clientsCollection);

            if (clientsSnapshot.exists()) {
                if (clientsSnapshot.data()) {
                  const clientName = clientsSnapshot.data().name || 'Not given';
                  const  clientPhone = clientsSnapshot.data().phoneNumber || 'Not given'
                  const appointmentName = appointment.name || 'Not defined'

                  Alert.alert(
                    'תיאור תור',
                    `כותרת: ${appointmentName}\nשם: ${clientName}\nמספר טלפון: ${clientPhone}`
                  );
                } else {
                  Alert.alert('תיאור תור', `כותרת: ${appointmentName}\nלא נמצאו נתונים ללקוח`);
                }
            } else {
                console.log('Client not found');
            }
            
        } catch (error) {
            console.error('Error fetching client data:', error);
            Alert.alert('Error', 'An error occurred while fetching client data. Please try again.');
        }
    };
    
    
    const agendaItems = {};
    Object.keys(appointments).forEach((date) => {
        agendaItems[date] = appointments[date].map((appointment) => ({
            ...appointment,
            dateString: date,
        }));
    });

    const onDayPress = (day) => {
        setSelectedDay(day.dateString);
    };

    return (
        <View style={styles.container}>
            <Agenda
                items={agendaItems}
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