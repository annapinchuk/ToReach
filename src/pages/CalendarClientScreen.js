import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import AppointmentCard from '../components/AppointmentCard';
import { styles } from '../styles/CalendarClientStyles';
import { collection, getDocs, orderBy, query, where } from '@firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useIsFocused } from '@react-navigation/native';

const CalendarClientScreen = ({ navigation }) => {

    const isFocused = useIsFocused();

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const docIdToBusiness = {};
                const businessesCollection = collection(db, 'Businesses');
                const businessesSnapshot = await getDocs(businessesCollection);
                businessesSnapshot.docs.forEach(doc => docIdToBusiness[doc.id] = doc.data());

                const { uid } = auth.currentUser;
                const appointmentsCollection = collection(db, 'Appointments');
                const appointmentsQuery = query(appointmentsCollection, where('clientID', '==', uid), orderBy('startTime'));
                const appointmentsSnapshot = await getDocs(appointmentsQuery);
                const appointmentsData = appointmentsSnapshot.docs.map(
                    (doc) => ({
                        ...doc.data(),
                        id: doc.id,
                        startTime: doc.data().startTime.toDate(),
                        endTime: doc.data().endTime.toDate(),
                        businessName: docIdToBusiness[doc.data().businessID].businessName,
                        address: docIdToBusiness[doc.data().businessID].address,
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
    }, [isFocused]);

    return (
        <ScrollView>
            <View style={styles.container}>
                {appointments.map(appointment =>
                    <AppointmentCard key={appointment.id}
                        appointment={appointment}
                        navigation={navigation}
                    />)}
            </View>
        </ScrollView>
    );
}

export default CalendarClientScreen;