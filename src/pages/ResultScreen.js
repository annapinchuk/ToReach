import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, LogBox } from 'react-native';
import { styles } from '../styles/ResultScreenStyles.js';
import ResultCard from '../components/ResultCard';
import { collection,limit, getDocs, query, where, map } from '@firebase/firestore';
import { db } from '../firebaseConfig';
import Spinner from '../components/Spinner.js';
import { useFocusEffect } from '@react-navigation/native';

const ResultScreen = ({ route, navigation }) => {
    const selectedCategories = route.params.selectedCategories;
    const selectedCities = route.params.selectedCities;
    const selectedBusiness = route.params.selectedBusiness;
    const [businesses, setBusinesses] = useState([]);
    const [isloaded, setIsLoading] = useState(false);
    const startdate = new Date(route.params.selectedDate1);
    const enddate = new Date(route.params.selectedDate2);
    
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

            


            
            if (first){
                const businessesQuery = query(businessesCollectionRef, limit(20));
                const businessesSnapshot = await getDocs(businessesQuery);
                businessesSnapshot.forEach(doc => mergedResults[doc.id] = doc.data());
            }
            
            const result = Object.keys(mergedResults).map(id => ({ id, ...mergedResults[id] }));
           
            return result;
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

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../Images/logo.jpg')}
            />
            {
                isloaded ? (<Spinner></Spinner>):(
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
