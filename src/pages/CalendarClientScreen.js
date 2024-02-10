import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import AppointmentCard from '../components/AppointmentCard';
import { styles } from '../styles/CalendarClientStyles';
import { collection, getDocs, onSnapshot, orderBy, query, where } from '@firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Spinner from '../components/Spinner';

const CalendarClientScreen = ({ navigation }) => {

    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const docIdToBusiness = {};
                const businessesCollection = collection(db, 'Businesses');
                const businessesSnapshot = await getDocs(businessesCollection);
                businessesSnapshot.docs.forEach(doc => docIdToBusiness[doc.id] = doc.data());

                const { uid } = auth.currentUser;
                const appointmentsCollection = collection(db, 'Appointments');
                const appointmentsQuery = query(appointmentsCollection, where('clientID', '==', uid), orderBy('startTime'));
                onSnapshot(appointmentsQuery, (appointmentsSnapshot) => {
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
                    setAppointments(appointmentsData);
                    setIsLoading(false);
                });
            } catch (err) {
                console.log(err);
                console.log(err.message);
            }
        }
        getData();
    }, []);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                {isLoading ? <Spinner /> : appointments.map(appointment =>
                    <AppointmentCard key={appointment.id}
                        appointment={appointment}
                        navigation={navigation}
                    />)}
            </View>
        </ScrollView>
    );
}

export default CalendarClientScreen;