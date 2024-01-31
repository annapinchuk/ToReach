import React from 'react';
import { View, Text, Button, Image, Pressable,StyleSheet,ScrollView } from 'react-native';
import AppointmentCard from '../components/AppointmentCard';
import { styles } from '../styles/ResultScreenStyles.js';

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
const ResultScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../Images/logo.jpg')}
      />
      <Text style={styles.iconText}>הנה מה שמצאנו בשבילך</Text>
     <ScrollView>
            <View style={styles.container}>
                {data.map(appointment => <AppointmentCard key={appointment.id} appointment={appointment} />)}
            </View>
        </ScrollView>
    </View>
    
  );
};



export default ResultScreen;
