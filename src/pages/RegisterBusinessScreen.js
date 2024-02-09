import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  LogBox
} from 'react-native';
import { registerStyles } from '../styles/RegisterBusinessScreenStyles';
import { styles } from '../styles/HomeScreenStyles';

import {
  getDocs,
  collection,
  query,
  getFirestore,
  setDoc,
  doc,
} from 'firebase/firestore';
import { app, auth, db } from '../firebaseConfig';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-toast-message';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Spinner from '../components/Spinner';

const RegisterBusinessScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
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
  const [isLoading, setIsLoading] = useState(false);

  const areRequiredFieldsMissing = () => {
    return (
      email.trim() === '' ||
      password.trim() === '' ||
      businessName.trim() === '' ||
      businessPhoneNumber.trim() === '' ||
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
      businessPhoneNumber,
      businessNumber,
      selectedCities,
      businessDescription,
      selectedCategories,
    });

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const businessesRef = collection(db, 'Businesses');
      const docRef = doc(businessesRef, user.uid)
      await setDoc(docRef, {
        // uid: user.uid,
        email,
        businessName,
        businessPhoneNumber,
        businessNumber,
        Cities: selectedCities,
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
      setIsLoading(false);
    };
  };

  const fetchCategories = async () => {
    try {
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

  const handleCategoryPress = (items) => {
    setIsOpenCities(false);
    setSelectedCategories(items.map(item => item.value));
    console.log(items.map(item => item.value))
    setIsOpenCategories(true);
  };
  const handleCityPress = (items) => {
    setIsOpenCategories(false);
    setSelectedCities(items.map(item => item.value));
    console.log(items.map(item => item.value))
    setIsOpenCities(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={registerStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={registerStyles.container}>
            <Image style={styles.logo} source={require('../../Images/logo.jpg')} />
            <Text style={registerStyles.title}>יצירת עסק חדש</Text>

            <TextInput
              style={registerStyles.input}
              placeholder=" אימייל *"
              placeholderTextColor={registerStyles.placeHolderStyle.color}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
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
              placeholder=" מספר טלפון *"
              placeholderTextColor={registerStyles.placeHolderStyle.color}
              value={businessPhoneNumber}
              onChangeText={(text) => setBusinessPhoneNumber(text)}
              keyboardType="numeric"
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
              items={categories.map((category) => ({ label: category, value: category }))}
              open={isOpenCategories}
              setOpen={() => setIsOpenCategories(!isOpenCategories)}
              value={currentValueCategories}
              setValue={(val) => setCurrentValueCategories(val)}
              dropDownDirection='DOWN'
              multiple={true}
              min={1}
              max={4}
              showArrowIcon={false}
              mode='BADGE'
              badgeColors={'#2C64C6'}
              badgeDotColors={['white']}
              listMode={Platform.OS === 'ios' ? 'FLATLIST' : 'MODAL'}
              badgeTextStyle={{ color: "white" }}
              placeholder="תחום עסק *"
              placeholderStyle={registerStyles.placeHolderStyle}
              containerStyle={[registerStyles.dropdownContainer, { zIndex: 3 }]}
              style={registerStyles.dropdownStyle}
              itemStyle={registerStyles.dropdownItemStyle}
              dropDownStyle={registerStyles.dropdownListStyle}
              searchable={true}
              searchPlaceholder="חיפוש..."
              onSelectItem={(item) => handleCategoryPress(item)}
            />

            <DropDownPicker
              items={Cities.map((city) => ({ label: city, value: city }))}
              open={isOpenCities}
              setOpen={() => setIsOpenCities(!isOpenCities)}
              value={currentValueCities}
              setValue={(val) => setCurrentValueCities(val)}
              dropDownDirection='DOWN'
              multiple={true}
              min={1}
              max={4}
              showArrowIcon={false}
              mode='BADGE'
              badgeColors={'#2C64C6'}
              badgeDotColors={['white']}
              listMode={Platform.OS === 'ios' ? 'FLATLIST' : 'MODAL'}
              badgeTextStyle={{ color: "white" }}
              placeholder=" עיר *"
              placeholderStyle={registerStyles.placeHolderStyle}
              containerStyle={registerStyles.dropdownContainer}
              style={registerStyles.dropdownStyle}
              itemStyle={registerStyles.dropdownItemStyle}
              dropDownStyle={registerStyles.dropdownListStyle}
              searchable={true}
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

            {isLoading ? <Spinner /> : <Pressable
              style={[
                registerStyles.button,
                formSubmitted && areRequiredFieldsMissing() && { backgroundColor: 'gray' },
              ]}
              onPress={handleRegister}
              disabled={formSubmitted && areRequiredFieldsMissing()}
            >
              <Text style={registerStyles.buttonText}>הרשמה</Text>
            </Pressable>}

            {formSubmitted && areRequiredFieldsMissing() && (
              <Text style={{ color: 'red', marginTop: 8 }}>
                אנא מלא את כל שדות החובה *
              </Text>
            )}

            <View style={registerStyles.loginContainer}>
              <Text style={registerStyles.loginText}>יש לך משתמש? </Text>
              <Pressable
                style={registerStyles.loginButton}
                onPress={() => navigation.navigate('BusinessPage')}
              >
                <Text style={registerStyles.linkText}>התחברות</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterBusinessScreen;
