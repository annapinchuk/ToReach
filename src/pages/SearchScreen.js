import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Modal, FlatList, Image, LogBox, Pressable, TouchableWithoutFeedback, Platform } from 'react-native';
import { styles } from '../styles/HomeUserScreenStyles';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from '../components/DatePicker';
import {getDocs, collection, query, getFirestore, addDoc,} from 'firebase/firestore';
import { app, auth, db } from '../firebaseConfig';


const SearchScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [isOpenCategories, setIsOpenCategories] = useState(false);
    const [currentValueCategories, setCurrentValueCategories] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [Cities, setCities] = useState([]);
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [isOpenCities, setIsOpenCities] = useState(false);
    const [currentValueCities, setCurrentValueCities] = useState([]);
    const [selectedDate1, setSelectedDate1] = useState(new Date());
    const [selectedDate2, setSelectedDate2] = useState(new Date());

const fetchCategories = async () => {
    try {
      const db = getFirestore(app);
      const categoriesCollection = collection(db, 'Categories');
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesData = categoriesSnapshot.docs.map(
        (doc) => doc.data().name
      );
      setCategories(categoriesData);
      setIsLoadingCategories(false);
    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const db = getFirestore(app);
      const citiessCollection = collection(db, 'Cities');
      const citiesSnapshot = await getDocs(citiessCollection);
      const citiesData = citiesSnapshot.docs.map(
        (doc) => doc.data().name
      );
      setCities(citiesData);
      setIsLoadingCities(false);
    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCities();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);


  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  
  const handleCategoryPress = (item) => {
    setIsOpenCities(false);
    setSelectedCities(item);
    setIsOpenCategories(true);
  };

  const handleCityPress = (item) => {
    setIsOpenCategories(false);
    setSelectedCities(item);
    setIsOpenCities(true);
  };

 

  return (
    <TouchableWithoutFeedback onPress={() => { setIsOpenCities(false); setIsOpenCategories(false) }}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../Images/logo.jpg')} />

        <Text style={[styles.searchtext, { textAlign: 'right' }]}>תחום עסק:</Text>

        <DropDownPicker
          items= {categories.map((category) => ({ label: category, value: category }))}
          open={isOpenCategories}
          setOpen={setIsOpenCategories}
          value={currentValueCategories}
          setValue={setCurrentValueCategories}
          dropDownDirection='DOWN'
          multiple={true}
          min={1}
          max={5}
          showArrowIcon={false}
          mode='BADGE'
          badgeColors={'#2C64C6'}
          badgeDotColors={['white']}
          badgeTextStyle={{ color: "white" }}
          placeholder="בחר"
          placeholderStyle={styles.placeHolderStyle}
          containerStyle={styles.dropdownContainer}
          style={[styles.dropdownStyle, { zIndex: isOpenCategories ? 2 : 0 }]}
          itemStyle={styles.dropdownItemStyle}
          dropDownStyle={styles.dropdownListStyle}
          searchable={true}
          searchPlaceholder="חיפוש..."
          onSelectItem={handleCategoryPress}
        />
        <Text style={styles.searchtext}>עיר:</Text>

        <DropDownPicker
           items= {Cities.map((city) => ({ label: city, value: city }))}
          open={isOpenCities}
          setOpen={setIsOpenCities}
          value={currentValueCities}
          setValue={setCurrentValueCities}
          dropDownDirection='DOWN'
          multiple={true}
          min={1}
          max={5}
          showArrowIcon={false}
          mode='BADGE'
          badgeColors={'#2C64C6'}
          badgeDotColors={['white']}
          badgeTextStyle={{ color: "white" }}
          placeholder="בחר"
          placeholderStyle={styles.placeHolderStyle}
          containerStyle={[styles.dropdownContainer, { zIndex: isOpenCities ? 1 : 0 }]}
          style={[styles.dropdownStyle, { zIndex: isOpenCities ? 1 : 0 }]}
          itemStyle={styles.dropdownItemStyle}
          dropDownStyle={styles.dropdownListStyle}
          searchable={true}
          searchPlaceholder="חיפוש..."
          onSelectItem={handleCityPress}
        />

        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.searchtext}>מתאריך:</Text>
            <DatePicker date={selectedDate1} setDate={setSelectedDate1} />
          </View>

          <View>
            <Text style={styles.searchtext}>ועד תאריך:</Text>
            <DatePicker date={selectedDate2} setDate={setSelectedDate2} />
          </View>
        </View>

        <Pressable

          style={[styles.button, styles.pressableWithMargin]}
          onPress={() => navigation.navigate('ResultScreen')}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>
              <FontAwesome name="search" size={24} color="white" /> חיפוש תור
            </Text>
          </View>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchScreen;