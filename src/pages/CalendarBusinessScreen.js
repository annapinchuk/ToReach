import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { styles } from '../styles/CalendarBusinessStyles';
import { app, auth, db } from '../firebaseConfig';
import { collection, getDocs, query, where } from '@firebase/firestore';

const CalendarBusinessScreen = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [appointments, setAppointments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { uid } = auth.currentUser;
      const appointmentsCollection = collection(db, 'Appointments');
      const appointmentsQuery = query(appointmentsCollection, where('businessID', '==', uid));
      const appointmentsSnapshot = await getDocs(appointmentsQuery);
      const appointmentsData = appointmentsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        startTime: doc.data().startTime.toDate(),
        endTime: doc.data().endTime.toDate(),
      }));

      const formattedAppointments = {};
      appointmentsData.forEach((appointment) => {
        const dateString = appointment.startTime.toISOString().split('T')[0];
        if (!formattedAppointments[dateString]) {
          formattedAppointments[dateString] = [];
        }
        formattedAppointments[dateString].push(appointment);
      });

      setAppointments(formattedAppointments);
    };

    fetchData();
  }, []);

  const renderItem = (item) => {
  const startTime = new Date(item.startTime);
  const endTime = new Date(item.endTime);

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
    return <View style={styles.emptyDate} />;
  };

  const showAppointmentDetails = (appointment) => {
    Alert.alert('תיאור תור', `כותרת: ${appointment.title}\nזמן: ${appointment.startTime}`);
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
