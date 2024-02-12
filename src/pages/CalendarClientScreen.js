/**
 * This screen represents the client's calendar screen, displaying future and previous appointments.
 */

import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import AppointmentCard from '../components/AppointmentCard';
import { styles } from '../styles/CalendarClientStyles';
import { collection, onSnapshot, orderBy, query, where } from '@firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Spinner from '../components/Spinner';

const CalendarClientScreen = ({ navigation }) => {

    // State to store future and previous appointments and loading status
    const [prevAppointments, setPrevAppointments] = useState([]);
    const [futureAppointments, setFutureAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Function to retrieve appointments based on the sign parameter (future or previous)
    useEffect(() => {
        const getAppointments = (docIdToBusiness, sign) => {
            const todady = new Date();
            const { uid } = auth.currentUser;
            const appointmentsCollection = collection(db, 'Appointments');
            const order = sign == '>' ? 'asc' : 'desc'
            const appointmentsQuery = query(appointmentsCollection,
                where('clientID', '==', uid),
                where("startTime", sign, todady),
                orderBy('startTime', order));

            // Subscribe to snapshot changes in the appointments collection
            const unsubscribe = onSnapshot(appointmentsQuery, (appointmentsSnapshot) => {
                const appointmentsData = appointmentsSnapshot.docs.map(
                    (doc) => ({
                        ...doc.data(),
                        id: doc.id,
                        startTime: doc.data().startTime.toDate(),
                        endTime: doc.data().endTime.toDate(),
                        business: docIdToBusiness[doc.data().businessID],
                    })
                );
                // Set state based on the sign parameter
                if (sign === '>')
                    setFutureAppointments(appointmentsData);
                else
                    setPrevAppointments(appointmentsData);

                // Update loading status
                setIsLoading(false);
            });
            return unsubscribe; // Cleanup subscription on component unmount
        }

        // Function to retrieve data including businesses and future/previous appointments
        const getData = () => {
            setIsLoading(true);

            const docIdToBusiness = {};
            const businessesCollection = collection(db, 'Businesses');

            // Subscribe to snapshot changes in the businesses collection
            const unsubscribeBusinesses = onSnapshot(businessesCollection, (businessesSnapshot) => {
                businessesSnapshot.docs.forEach(doc => docIdToBusiness[doc.id] = doc.data());
            });

            // Get future appointments
            const unsubscribeFutureAppointments = getAppointments(docIdToBusiness, '>');
            // Get previous appointments
            const unsubscribePreviousAppointments = getAppointments(docIdToBusiness, '<');

            return [unsubscribeBusinesses, unsubscribeFutureAppointments, unsubscribePreviousAppointments]
        }

        // Get data on component mount and return cleanup function for subscriptions
        const [unsubscribeBusinesses, unsubscribeFutureAppointments, unsubscribePreviousAppointments] = getData();
        return () => {
            // Unsubscribe from snapshot changes on component unmount
            unsubscribeBusinesses();
            unsubscribeFutureAppointments();
            unsubscribePreviousAppointments();
        }
    }, []); // Empty dependency array ensures the effect runs once on component mount

    // Render the component with future and previous appointments
    return (
        <View style={styles.scrollView}>
            {isLoading ? <Spinner /> :
                <ScrollView stickyHeaderIndices={[0, 2]}>
                    <View>
                        <Text style={styles.header}>תורים עתידיים:</Text>
                    </View>
                    <View style={styles.container}>
                        {futureAppointments.length > 0 ? futureAppointments.map(appointment =>
                            <AppointmentCard key={appointment.id}
                                appointment={appointment}
                                navigation={navigation}
                            />) :
                            <Text style={styles.text}>לא קיימים תורים עתידיים</Text>
                        }
                    </View>
                    <View>
                        <Text style={styles.header}>תורים קודמים:</Text>
                    </View>
                    <View style={styles.container}>
                        {prevAppointments.length > 0 ? prevAppointments.map(appointment =>
                            <AppointmentCard key={appointment.id}
                                appointment={appointment}
                                navigation={navigation}
                            />) :
                            <Text style={styles.text}>לא קיימים תורים קודמים</Text>
                        }
                    </View>
                </ScrollView >
            }
        </View>

    );
}

export default CalendarClientScreen;