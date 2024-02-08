import { View, Text, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { TextInput, Pressable, ScrollView, Image } from 'react-native';
import { registerStyles } from '../styles/RegisterBusinessScreenStyles';
import { styles } from '../styles/HomeScreenStyles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { addDoc, collection } from '@firebase/firestore';
import Toast from 'react-native-toast-message';


const RegisterClientScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const areRequiredFieldsMissing = () => {
    return (
      email.trim() === '' ||
      password.trim() === '' ||
      name.trim() === '' ||
      phoneNumber.trim() === ''
    );
  };

  const handleRegister = async () => {
    setFormSubmitted(true);

    if (areRequiredFieldsMissing()) {
      console.log('Please fill in all required fields');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const clientsRef = collection(db, 'Clients');
      await addDoc(clientsRef, { uid: user.uid, name, phoneNumber, email });
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

  return (
    <ScrollView contentContainerStyle={registerStyles.scrollContainer}
      keyboardShouldPersistTaps="always">
      <View style={registerStyles.container}>
        <Image style={styles.logo} source={require('../../Images/logo.jpg')} />
        <Text style={registerStyles.title}>יצירת משתמש חדש</Text>

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
          placeholder=" שם מלא *"
          placeholderTextColor={registerStyles.placeHolderStyle.color}
          value={name}
          onChangeText={(text) => setName(text)}
          />

        <TextInput
          style={registerStyles.input}
          placeholder=" מספר טלפון *"
          placeholderTextColor={registerStyles.placeHolderStyle.color}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="numeric"
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
          <Text style={registerStyles.loginText}>יש לך משתמש? </Text>
          <Pressable
            style={registerStyles.loginButton}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={registerStyles.linkText}>התחברות</Text>
          </Pressable>
        </View>

      </View>
    </ScrollView>


  );
};



export default RegisterClientScreen;
