import React, { useState, useEffect } from 'react';
import { View, Text, Image, LogBox, Pressable, TouchableWithoutFeedback, Platform, ScrollView } from 'react-native';
import { styles } from '../styles/HomeUserScreenStyles';
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { getDocs, collection, getFirestore, limit, } from 'firebase/firestore';
import { app } from '../firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePickerWithTime from '../components/DatePickerWithTime';



const SearchScreen = ({ navigation }) => {
  const [business, setBusiness] = useState([]);// all Business
  const [isOpenBusiness, setIsOpenBusiness] = useState(false);
  const [currentValueBusiness, setCurrentValueBusiness] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState([]); //choosen Business

  const [categories, setCategories] = useState([]);
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [currentValueCategories, setCurrentValueCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [Cities, setCities] = useState([]); // all Cities
  const [selectedCities, setSelectedCities] = useState([]);
  const [isOpenCities, setIsOpenCities] = useState(false);
  const [currentValueCities, setCurrentValueCities] = useState([]);

  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [selectedTime1, setSelectedTime1] = useState(new Date());
  const [selectedTime2, setSelectedTime2] = useState(new Date());

  const fetchCategories = async () => {
    try {
      const db = getFirestore(app);
      const categoriesCollection = collection(db, 'Categories');
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesData = categoriesSnapshot.docs.map(
        (doc) => doc.data().name
      );
      setCategories(categoriesData);

    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const db = getFirestore(app);
      const citiessCollection = collection(db, 'Cities');
      const citiesSnapshot = await getDocs(citiessCollection, limit(10));
      const citiesData = citiesSnapshot.docs.map(
        (doc) => doc.data().name
      );
      setCities(citiesData);

    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  };

  const fetchBusinesses = async () => {
    try {
      const db = getFirestore(app);
      const businessesCollection = collection(db, 'Businesses');
      const businessesSnapshot = await getDocs(businessesCollection, limit(10));
      const businessesData = businessesSnapshot.docs.map(
        (doc) => doc.data().businessName
      );
      setBusiness(businessesData);

    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  };




  useEffect(() => {
    fetchCategories();
    fetchCities();
    fetchBusinesses();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);


  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);


  const handleCategoryPress = (item) => {
    setIsOpenCities(false);
    setIsOpenBusiness(false);
    setSelectedCategories(item);
    setIsOpenCategories(true);
  };

  const handleBuisnessPress = (item) => {
    setIsOpenCities(false);
    setIsOpenCategories(false);
    setIsOpenBusiness(true);
    setSelectedBusiness(item);

  };

  const handleCityPress = (item) => {
    setIsOpenCategories(false);
    setIsOpenBusiness(false);
    setSelectedCities(item);
    setIsOpenCities(true);
  };



  return (
    <ScrollView>
    <TouchableWithoutFeedback onPress={() => { setIsOpenCities(false); setIsOpenCategories(false); setIsOpenBusiness(false) }}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../Images/logo.jpg')} />


        <Text style={[styles.searchtext, { textAlign: 'right' }]}>שם עסק:</Text>

        <DropDownPicker
          items={business.map((busines) => ({ label: busines, value: busines }))}
          open={isOpenBusiness}
          setOpen={setIsOpenBusiness}
          value={currentValueBusiness}
          setValue={setCurrentValueBusiness}
          dropDownDirection='DOWN'
          multiple={true}
          min={1}
          max={5}
          showArrowIcon={false}
          mode='BADGE'
          badgeColors={'#2C64C6'}
          badgeDotColors={['white']}
          badgeTextStyle={{ color: "white" }}
          listMode={Platform.OS === 'ios' ? 'FLATLIST' : 'MODAL'}
          placeholder="בחר"
          placeholderStyle={styles.placeHolderStyle}
          containerStyle={styles.dropdownContainer}
          style={[styles.dropdownStyle, { zIndex: isOpenBusiness ? 3 : 0 }]}
          itemStyle={styles.dropdownItemStyle}
          dropDownStyle={styles.dropdownListStyle}
          searchable={true}
          searchPlaceholder="חיפוש..."
          onSelectItem={handleBuisnessPress}
        />





        <Text style={[styles.searchtext, { textAlign: 'right' }]}>תחום עסק:</Text>

        <DropDownPicker
          items={categories.map((category) => ({ label: category, value: category }))}
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
          listMode={Platform.OS === 'ios' ? 'FLATLIST' : 'MODAL'}
          placeholder="בחר"
          placeholderStyle={styles.placeHolderStyle}
          containerStyle={[styles.dropdownContainer, { zIndex: isOpenCategories ? 2 : 0 }]}
          style={[styles.dropdownStyle, { zIndex: isOpenCategories ? 2 : 0 }]}

          itemStyle={styles.dropdownItemStyle}
          dropDownStyle={styles.dropdownListStyle}
          searchable={true}
          searchPlaceholder="חיפוש..."
          onSelectItem={handleCategoryPress}
        />
        <Text style={styles.searchtext}>עיר:</Text>

        <DropDownPicker
          items={Cities.map((city) => ({ label: city, value: city }))}
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
          listMode={Platform.OS === 'ios' ? 'FLATLIST' : 'MODAL'}
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
            <DatePickerWithTime date={selectedDate1} setDate={setSelectedDate1} time={selectedTime1} setTime={setSelectedTime1} />
          </View>
          <View>
            <Text style={styles.searchtext}>ועד תאריך:</Text>
            <DatePickerWithTime date={selectedDate2} setDate={setSelectedDate2} time={selectedTime2} setTime={setSelectedTime2} />
          </View>

        </View> 
        <Pressable
  
          style={[styles.button, styles.pressableWithMargin]}
          onPress={() => navigation.navigate('ResultScreen',
            ({
              selectedCities: currentValueCities,
              selectedCategories: currentValueCategories,
              selectedBusiness: currentValueBusiness,
              selectedDate1: selectedDate1.toString(),
              selectedDate2: selectedDate2.toString()
              
            }))}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>
              <FontAwesome name="search" size={24} color="white" /> חיפוש תור
            </Text>
          </View>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default SearchScreen;