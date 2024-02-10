import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, LogBox } from 'react-native';
import { styles } from '../styles/ResultScreenStyles.js';
import ResultCard from '../components/ResultCard';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from '../firebaseConfig';

const ResultScreen = ({ route, navigation }) => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        console.log(route.params.selectedCatagories);
        const businessesCollection = collection(db, "Businesses");
        const businessesQuery = query(businessesCollection, where('Categories', 'array-contains-any', [route.params.selectedCatagories]));
        const businessesSnapshot = await getDocs(businessesQuery);
        const docb = businessesSnapshot.docs.map(doc=>({...doc.data(), id: doc.id}));
        console.log(docb);
        
        setBusinesses(docb ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    getBusinesses();
  }, [route.params.selectedCategories]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../Images/logo.jpg')}
      />
      <Text style={styles.iconText}>הנה מה שמצאנו בשבילך</Text>
      <ScrollView>
        <View style={styles.container}>
          {businesses.map(business => (
            <ResultCard key={business.id} navigation={navigation} business={business} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ResultScreen;
