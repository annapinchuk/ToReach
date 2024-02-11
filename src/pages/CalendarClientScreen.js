import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import AppointmentCard from '../components/AppointmentCard';
import { styles } from '../styles/CalendarClientStyles';
import { collection, onSnapshot, orderBy, query, where } from '@firebase/firestore';
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
            onSnapshot(appointmentsQuery, (appointmentsSnapshot) => {
                const appointmentsData = appointmentsSnapshot.docs.map(
                    (doc) => ({
                        ...doc.data(),
                        id: doc.id,
                        startTime: doc.data().startTime.toDate(),
                        endTime: doc.data().endTime.toDate(),
                        business: docIdToBusiness[doc.data().businessID],
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
                                isEditable={true}
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
                                isEditable={false}
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