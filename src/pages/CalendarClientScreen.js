import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import AppointmentCard from '../components/AppointmentCard';
import { styles } from '../styles/CalendarClientStyles';
import { collection, getDocs, onSnapshot, orderBy, query, where } from '@firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Spinner from '../components/Spinner';

const CalendarClientScreen = ({ navigation }) => {

    const [prevAppointments, setPrevAppointments] = useState([]);
    const [futureAppointments, setFutureAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {
        const getAppointments = (docIdToBusiness, sign) => {
            const todady = new Date();
            const { uid } = auth.currentUser;
            const appointmentsCollection = collection(db, 'Appointments');
            const appointmentsQuery = query(appointmentsCollection,
                where('clientID', '==', uid),
                where("startTime", sign, todady),
                orderBy('startTime'));
            // console.log(appointmentsQuery);
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
                if (sign === '>')
                    setFutureAppointments(appointmentsData);
                else
                    setPrevAppointments(appointmentsData);

                setIsLoading(false);
            });
        }
        const getData = async () => {
            try {
                setIsLoading(true);

                const docIdToBusiness = {};
                const businessesCollection = collection(db, 'Businesses');
                onSnapshot(businessesCollection, (businessesSnapshot) => {
                    businessesSnapshot.docs.forEach(doc => docIdToBusiness[doc.id] = doc.data());
                });

                // Get future appointments
                getAppointments(docIdToBusiness, '>')
                // Get previous appointments
                getAppointments(docIdToBusiness, '<')

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
                {isLoading ? <Spinner /> :
                    <View style={styles.container}>
                        <Text style={styles.header}>תורים עתידיים:</Text>
                        {futureAppointments.map(appointment =>
                            <AppointmentCard key={appointment.id}
                                appointment={appointment}
                                isEditable={true}
                                navigation={navigation}
                            />)}
                        <Text style={styles.header}>תורים קודמים:</Text>
                        {prevAppointments.map(appointment =>
                            <AppointmentCard key={appointment.id}
                                appointment={appointment}
                                isEditable={false}
                                navigation={navigation}
                            />)}
                    </View>
                }
            </View>
        </ScrollView >
    );
}

export default CalendarClientScreen;