import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import AppointmentCard from '../components/AppointmentCard';
import { styles } from '../styles/CalendarClientStyles';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { auth, db } from '../firebaseConfig';

const CalendarClientScreen = () => {

    const [appointments, setAppointments] = useState([]);

    const data = [
        {
            id: 124,
            name: 'תספורת',
            businessName: "Daniel's hair",
            startTime: '13:00',
            endTime: '13:30',
            date: new Date(2023, 1, 14),
            price: 60,
        },
        {
            id: 125,
            name: 'תזונאית',
            businessName: "Shlomo's gym",
            startTime: '9:00',
            endTime: '10:00',
            date: new Date(2023, 1, 15),
            price: 120,
        },
        {
            id: 126,
            name: 'תספורת',
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

    useEffect(() => {
        const getData = async () => {
            try {
                const businessIdToName = {};
                const businessesCollection = collection(db, 'Businesses');
                const businessesSnapshot = await getDocs(businessesCollection);
                businessesSnapshot.docs.forEach(doc => businessIdToName[doc.id] = doc.data().businessName);
                
                const { uid } = auth.currentUser;
                const appointmentsCollection = collection(db, 'Appointments');
                const appointmentsQuery = query(appointmentsCollection, where('clientID', '==', uid));
                const appointmentsSnapshot = await getDocs(appointmentsQuery);
                const appointmentsData = appointmentsSnapshot.docs.map(
                    (doc) => ({
                        ...doc.data(),
                        id: doc.id,
                        startTime: doc.data().startTime.toDate(),
                        endTime: doc.data().endTime.toDate(),
                        businessName: businessIdToName[doc.data().businessID],
                    })
                );
                console.log(appointmentsData[0]);
                setAppointments(appointmentsData);
            } catch (err) {
                console.log(err);
                console.log(err.message);
            }
        }
        getData();
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                {appointments.map(appointment => <AppointmentCard key={appointment.id} appointment={appointment} />)}
            </View>
        </ScrollView>
    );
}

export default CalendarClientScreen;