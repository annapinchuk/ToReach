import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  LogBox 
} from 'react-native';
import { registerStyles } from '../styles/RegisterBusinessScreenStyles';
import { styles } from '../styles/HomeScreenStyles';
// import {
//   createUserWithEmailAndPassword,
//   getAuth,
// } from 'firebase/auth';
import {
  getDocs,
  collection,
  query,
  getFirestore,
} from 'firebase/firestore';
import { app } from '../firebaseConfig';
import DropDownPicker from 'react-native-dropdown-picker';

const RegisterBusinessScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [city, setCity] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen,setIsOpen] = useState(false);
  const [currentValue,setCurrentValue] = useState([]);

  const areRequiredFieldsMissing = () => {
    return (
      email.trim() === '' ||
      password.trim() === '' ||
      businessName.trim() === '' ||
      businessNumber.trim() === '' ||
      city.trim() === '' ||
      selectedCategories.length === 0
      
    );
  };

  const handleRegister = () => {
    setFormSubmitted(true);

    if (!areRequiredFieldsMissing()) {
      console.log('Registration Details:', {
        email,
        password,
        businessName,
        businessNumber,
        city,
        businessDescription,
        selectedCategories
        ,
      });

      // const auth = getAuth();

      // createUserWithEmailAndPassword(auth, email, password)
      //   .then((userCredential) => {
      //     const user = userCredential.user;
      //     console.log(user);
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     console.log(error, error.message);
      //   });

      navigation.navigate('LoginScreen');
    } else {
      console.log('Please fill in all required fields');
    }
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
      setIsLoading(false);
    } catch (error) {
      console.error('Firebase initialization error:', error);
    }
  };

  useEffect(() => {
    //fetchCategories();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const handleCategoryPress = (item) => {
    setSelectedCategories(item);
  };

  const items = [ 
    {label: "שיער",value:"שיער"},
    {label: "טיפול",value:"טיפול"}
  ]
  

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
            items= {items}//{categories.map((category) => ({ label: category, value: category }))}
            open= {isOpen}
            setOpen={()=> setIsOpen(!isOpen)}
            value={currentValue}
            setValue={(val)=>setCurrentValue(val)}
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
            placeholderStyle = {registerStyles.placeHolderStyle}
            containerStyle={registerStyles.dropdownContainer}
            style={registerStyles.dropdownStyle}
            itemStyle={registerStyles.dropdownItemStyle}
            dropDownStyle={registerStyles.dropdownListStyle}
            searchable={true} // Add this line for searchable
            searchPlaceholder="חיפוש..."
            onSelectItem={(item) => handleCategoryPress(item)}
          />
        
        <TextInput
          style={registerStyles.input}
          placeholder=" עיר *"
          placeholderTextColor={registerStyles.placeHolderStyle.color}
          value={city}
          onChangeText={(text) => setCity(text)}
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
            onPress={() => navigation.navigate('LoginScreen')}
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
