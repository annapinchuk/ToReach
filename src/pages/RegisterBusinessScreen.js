import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  LogBox,
  Platform
} from 'react-native';
import { registerStyles } from '../styles/RegisterBusinessScreenStyles';
import { styles } from '../styles/HomeScreenStyles';

import {
  getDocs,
  collection,
  query,
  getFirestore,
  addDoc,
} from 'firebase/firestore';
import { app, auth, db } from '../firebaseConfig';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterBusinessScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [currentValueCategories, setCurrentValueCategories] = useState([]);

  const [selectedCities, setSelectedCities] = useState([]);
  const [Cities, setCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isOpenCities, setIsOpenCities] = useState(false);
  const [currentValueCities, setCurrentValueCities] = useState([]);

  const areRequiredFieldsMissing = () => {
    return (
      email.trim() === '' ||
      password.trim() === '' ||
      businessName.trim() === '' ||
      businessNumber.trim() === '' ||
      selectedCities.length === 0 ||
      selectedCategories.length === 0

    );
  };

  const handleRegister = async () => {
    setFormSubmitted(true);

    if (areRequiredFieldsMissing()) {
      console.log('Please fill in all required fields');
      return;
    };
    console.log('Registration Details:', {
      email,
      password,
      businessName,
      businessNumber,
      Cities,
      businessDescription,
      selectedCategories,
    });

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const businessesRef = collection(db, 'Businesses');
      await addDoc(businessesRef, {
        uid: user.uid,
        email,
        businessName,
        businessNumber,
        selectedCities,
        businessDescription,
        Categories: selectedCategories,
      });
      Toast.show({
        type: 'success',
        text1: 'ההרשמה בוצעה בהצלחה'
      });
      navigation.navigate('LoginScreen');
    }
    catch (error) {
      Toast.show({
        type: 'error',
        text1: 'חלה שגיאה במהלך ההרשמה'
      })
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error, error.message);
    };
  };

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

  const handleCategoryPress = (item) => {
    setSelectedCategories(item);
  };
  const handleCityPress = (item) => {
    setSelectedCities(item);
  };

  return (
    <ScrollView contentContainerStyle={registerStyles.scrollContainer}
      keyboardShouldPersistTaps="always">
      <View style={registerStyles.container}>
        <Image style={styles.logo} source={require('../../Images/logo.jpg')} />
        <Text style={registerStyles.title}>יצירת עסק חדש</Text>

        <TextInput
          style={registerStyles.input}
          placeholder=" אימייל *"
          placeholderTextColor={registerStyles.placeHolderStyle.color}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={registerStyles.input}
          placeholder=" סיסמה *"
          placeholderTextColor={registerStyles.placeHolderStyle.color}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TextInput
          style={registerStyles.input}
          placeholder=" שם עסק *"
          placeholderTextColor={registerStyles.placeHolderStyle.color}
          value={businessName}
          onChangeText={(text) => setBusinessName(text)}
        />

        <TextInput
          style={registerStyles.input}
          placeholder=" מספר אישור עסק *"
          placeholderTextColor={registerStyles.placeHolderStyle.color}
          value={businessNumber}
          onChangeText={(text) => setBusinessNumber(text)}
          keyboardType="numeric"
        />

        <DropDownPicker
            items= {categories.map((category) => ({ label: category, value: category }))}
            open= {isOpenCategories}
            setOpen={()=> setIsOpenCategories(!isOpenCategories)}
            value={currentValueCategories}
            setValue={(val)=>setCurrentValueCategories(val)}
            dropDownDirection='DOWN'
            multiple= {true}
            min={1}
            max ={4}
            showArrowIcon ={false}
            mode= 'BADGE'
            badgeColors={'#2C64C6'}
            badgeDotColors = {['white']}
            badgeTextStyle = {{color : "white"}}
            placeholder="תחום עסק *"
            listMode={Platform.OS === 'ios' ? 'DEFAULT' : 'MODAL'}
            placeholderStyle = {registerStyles.placeHolderStyle}
            containerStyle={[registerStyles.dropdownContainer,{zIndex:3}]}
            style={registerStyles.dropdownStyle}
            itemStyle={registerStyles.dropdownItemStyle}
            dropDownStyle={registerStyles.dropdownListStyle}
            searchable={true} // Add this line for searchable
            searchPlaceholder="חיפוש..."
            onSelectItem={(item) => handleCategoryPress(item)}
          />
        
        <DropDownPicker
            items= {Cities.map((city) => ({ label: city, value: city }))}
            open= {isOpenCities}
            setOpen={()=> setIsOpenCities(!isOpenCities)}
            value={currentValueCities}
            setValue={(val)=>setCurrentValueCities(val)}
            dropDownDirection='DOWN'
            multiple= {true}
            min={1}
            max ={4} //how mant do we allow?
            showArrowIcon ={false}
            mode= 'BADGE'
            badgeColors={'#2C64C6'}
            badgeDotColors = {['white']}
            badgeTextStyle = {{color : "white"}}
            listMode={Platform.OS === 'ios' ? 'DEFAULT' : 'MODAL'}
            placeholder=" עיר *"
            placeholderStyle = {registerStyles.placeHolderStyle}
            containerStyle={registerStyles.dropdownContainer}
            style={registerStyles.dropdownStyle}
            itemStyle={registerStyles.dropdownItemStyle}
            dropDownStyle={registerStyles.dropdownListStyle}
            searchable={true} // Add this line for searchable
            searchPlaceholder="חיפוש..."
            onSelectItem={(item) => handleCityPress(item)}
          />
        

        <TextInput
          style={registerStyles.input}
          placeholder=" תיאור עסק"
          placeholderTextColor={registerStyles.placeHolderStyle.color}
          multiline={true}
          numberOfLines={4}
          value={businessDescription}
          onChangeText={(text) => setBusinessDescription(text)}
        />

        <Pressable
          style={[
            registerStyles.button,
            formSubmitted && areRequiredFieldsMissing() && { backgroundColor: 'gray' },
          ]}
          onPress={handleRegister}
          disabled={formSubmitted && areRequiredFieldsMissing()}
        >
          <Text style={registerStyles.buttonText}>הרשמה</Text>
        </Pressable>

        {formSubmitted && areRequiredFieldsMissing() && (
          <Text style={{ color: 'red', marginTop: 8 }}>
            אנא מלא את כל שדות החובה *
          </Text>
        )}

        <View style={registerStyles.loginContainer}>
          <Pressable
            style={registerStyles.loginButton}
            onPress={() => navigation.navigate('BusinessPage')}
          >
            <Text style={registerStyles.loginText}>התחברות</Text>
          </Pressable>
          <Text style={registerStyles.loginText}>יש לך משתמש? </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterBusinessScreen;
