import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, LogBox } from 'react-native';
import { styles } from '../styles/ResultScreenStyles.js';
import ResultCard from '../components/ResultCard';
import { collection, limit, getDocs, query, where, map } from '@firebase/firestore';
import { db } from '../firebaseConfig';
import Spinner from '../components/Spinner.js';
import { useFocusEffect } from '@react-navigation/native';
import torType from '../components/TorType.js';
import { getHour } from '../shared/dateMethods.js';

const ResultScreen = ({ route, navigation }) => {
    const selectedCategories = route.params.selectedCategories;
    const selectedCities = route.params.selectedCities;
    const selectedBusiness = route.params.selectedBusiness;
    const [businesses, setBusinesses] = useState([]);
    const [isloaded, setIsLoading] = useState(false);

    // Check free time according date + torType   
    const checkFreeTimes = async (selectedDate, business, duration) => {

        const userStartTime = new Date(selectedDate);
        const userEndTime = new Date(selectedDate);
        userStartTime.setHours(new Date(route.params.selectedDate1).getHours(), new Date(route.params.selectedDate1).getMinutes() - new Date(route.params.selectedDate1).getMinutes() % 5);
        userEndTime.setHours(new Date(route.params.selectedDate2).getHours(), new Date(route.params.selectedDate2).getMinutes());
        const businessStartTime = new Date(selectedDate);
        const businessEndTime = new Date(selectedDate);
        if (business.startTime) businessStartTime.setHours(business.startTime.toDate().getHours(), business.startTime.toDate().getMinutes());
        else businessStartTime.setHours(9, 0, 0, 0);
        if (business.endTime) businessEndTime.setHours(business.endTime.toDate().getHours(), business.endTime.toDate().getMinutes());
        else businessEndTime.setHours(18, 0, 0, 0);

        const startTime = businessStartTime < userStartTime ? userStartTime : businessStartTime;
        const endTime = businessEndTime > userEndTime ? userEndTime : businessEndTime;
        console.log('start: ', startTime.toLocaleDateString(), startTime.toLocaleTimeString());
        console.log('end: ', endTime.toLocaleDateString(), endTime.toLocaleTimeString());

        let currentTime = new Date(startTime);

        const times = {};

        while (currentTime <= endTime) {
            times[getHour(currentTime)] = currentTime >= new Date();
            currentTime.setMinutes(currentTime.getMinutes() + 5);
        }

        let foundTrue = false;
        Object.keys(times).forEach(time => {
            if (times[time]) foundTrue = true;
        });
        if (!foundTrue) return false;

        try {
            const findTakenTimes = query(
                collection(db, "Appointments"),
                where("businessID", "==", business.id),
                where("startTime", ">=", new Date(startTime)),
                where("startTime", "<=", new Date(endTime))
            );

            const querySnapshot = await getDocs(findTakenTimes);
            querySnapshot.forEach((doc) => {
                const appointment = doc.data();
                const start = appointment.startTime.toDate();
                start.setMinutes(start.getMinutes() - duration);

                const end = appointment.endTime.toDate();

                let currentTime = new Date(start);
                while (currentTime <= end) {
                    times[getHour(new Date(currentTime))] = false;
                    currentTime.setMinutes(currentTime.getMinutes() + 5);
                }
            });

            console.log(times);
            foundTrue = false;
            Object.keys(times).forEach(time => {
                if (times[time]) foundTrue = true;
            });
            return foundTrue;
        }
        catch (error) {
            console.log(error);
        }

    };

    async function fetchBusinesses() {
        // Define your collection reference
        const businessesCollectionRef = collection(db, 'Businesses');
        let first = true;
        // Construct the query based on selected categories, cities, and business
        let businessesQueryCity = businessesCollectionRef;
        let businessesQueryCategory = businessesCollectionRef;
        let businessesQueryName = businessesCollectionRef;
        let businessesQuery = businessesCollectionRef;

        const mergedResults = {};

        try {
            setIsLoading(true);
            // Filter by selected categories
            if (selectedCategories && selectedCategories.length > 0 && businessesQuery) {
                businessesQueryCategory = query(businessesQuery, where('Categories', 'array-contains-any', selectedCategories));
                const querySnapshotCategory = await getDocs(businessesQueryCategory);
                querySnapshotCategory.forEach(doc => mergedResults[doc.id] = doc.data());
                first = false;
            }

            // Filter by selected cities
            if (selectedCities && selectedCities.length > 0 && businessesQuery) {
                businessesQueryCity = query(businessesQuery, where('Cities', 'array-contains-any', selectedCities));
                const querySnapshotCity = await getDocs(businessesQueryCity);
                if (first)
                    querySnapshotCity.forEach(doc => mergedResults[doc.id] = doc.data());
                else {
                    const cityIds = querySnapshotCity.docs.map(doc => doc.id);
                    Object.keys(mergedResults).forEach(id => {
                        if (!cityIds.includes(id)) delete mergedResults[id];
                    })
                }
                first = false;
            }

            // Filter by selected business (if not null)
            if (selectedBusiness && businessesQuery && selectedBusiness.length > 0) {

                businessesQueryName = query(businessesQuery, where('businessName', 'in', selectedBusiness));
                const querySnapshotName = await getDocs(businessesQueryName);
                if (first)
                    querySnapshotName.forEach(doc => mergedResults[doc.id] = doc.data());
                else {
                    const nameIds = querySnapshotName.docs.map(doc => doc.id);
                    Object.keys(mergedResults).forEach(id => {
                        if (!nameIds.includes(id)) delete mergedResults[id];
                    })
                }
                first = false;
            }

            if (first) {
                const businessesQuery = query(businessesCollectionRef, limit(20));
                const businessesSnapshot = await getDocs(businessesQuery);
                businessesSnapshot.forEach(doc => mergedResults[doc.id] = doc.data());
            }

            if (route.params.selectedDate1 === route.params.selectedDate2) {
                return Object.keys(mergedResults).map(id => ({ id, ...mergedResults[id] }));
            }

            const startDate = new Date(route.params.selectedDate1);
            const endDate = new Date(route.params.selectedDate2);
            const dates = [];
            while (startDate <= endDate) {
                dates.push(new Date(startDate));
                startDate.setDate(startDate.getDate() + 1);
            }

            const results = await checkAppointments(dates, mergedResults);
            console.log('results', results);
            return Object.keys(results).map(id => ({ id, ...results[id] }));


        } catch (error) {
            console.error('Error fetching businesses:', error);
            throw error; // Rethrow the error to handle it where the function is called
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        // Call the function to fetch businesses
        fetchBusinesses().then(res => setBusinesses(res))
        //   const businesses = fetchBusinesses();
    }, []);

    const checkAppointments = async (dates, mergedResults) => {
        const results = {};

        await Promise.all(dates.map(async date => {
            await Object.keys(mergedResults).map(async id => {
                if (id in results) return null;
                const businessHasTorTypes = mergedResults[id].torTypes && mergedResults[id].torTypes.length > 0;
                if (!businessHasTorTypes) {
                    delete mergedResults[id];
                    return;
                }
                const durations = mergedResults[id].torTypes.map(torType => parseInt(torType.duration));
                const smallestDuration = Math.min(...durations);
                const res = await checkFreeTimes(date, { id, ...mergedResults[id] }, smallestDuration);
                console.log(res);
                if (res) results[id] = mergedResults[id];
                console.log(results);
            });
        }));

        return results;
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../Images/logo.jpg')}
            />
            {
                isloaded ? (<Spinner></Spinner>) : (
                    <View style={styles.container}>
                        <Text style={styles.iconText}>הנה מה שמצאנו בשבילך</Text>
                        <ScrollView>
                            <View style={styles.container}>
                                {businesses.map(business => (
                                    <ResultCard key={business.id} navigation={navigation} business={business} />
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                )
            }
        </View>
    );
};

export default ResultScreen;
