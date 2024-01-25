import React, { useState } from 'react';
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import { registerStyles } from '../styles/RegisterBusinessScreenStyles'; // Adjust the import path based on your project structure
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const RegisterBusinessScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [domain, setDomain] = useState('');
  const [city, setCity] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');

  const isFormValid = () => {
    // Add your validation logic here
    // For example, check if all required fields are filled
    return (
      email !== '' &&
      password !== '' &&
      businessName !== '' &&
      businessNumber !== '' &&
      domain !== '' &&
      city !== ''
    );
  };

  const handleRegister = () => {
    if (isFormValid()) {
      console.log('Registration Details:', {
        email,
        password,
        businessName,
        businessNumber,
        domain,
        city,
        businessDescription,
      });

      const auth = getAuth();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error, error.message);
        });


      navigation.navigate('LoginScreen');
    } else {
      // Handle the case where the form is not valid (show an error message, etc.)
      console.log('Please fill in all required fields');
    }
  };
  

  return (
    <View style={registerStyles.container}>
      <Text style={registerStyles.title}>יצירת עסק חדש</Text>


      <TextInput
        style={registerStyles.input}
        placeholder=" אימייל *"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />


      <TextInput
        style={registerStyles.input}
        placeholder=" סיסמה *"
        secureTextEntry={true} // Mask the text for password
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        style={registerStyles.input}
        placeholder=" שם עסק *"
        value={businessName}
        onChangeText={(text) => setBusinessName(text)}
      />

      <TextInput
        style={registerStyles.input}
        placeholder=" מספר אישור עסק *"
        value={businessNumber}
        onChangeText={(text) => setBusinessNumber(text)}
        keyboardType="numeric"
      />

      <TextInput
        style={registerStyles.input}
        placeholder=" תחום עיסוק *"
        value={domain}
        onChangeText={(text) => setDomain(text)}
      />

      <TextInput
        style={registerStyles.input}
        placeholder=" עיר *"
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <TextInput
        style={registerStyles.input}
        placeholder=" תיאור עסק"
        multiline={true} // Allow multiline input for business description
        numberOfLines={4} // Number of lines to display initially
        value={businessDescription}
        onChangeText={(text) => setBusinessDescription(text)}
      />
      
      <Pressable
        style={[registerStyles.button, isFormValid() ? registerStyles.enabledButton : registerStyles.disabledButton]}
        onPress={handleRegister}
        disabled={!isFormValid()}>
        <Text style={registerStyles.buttonText}>הרשמה</Text>
      </Pressable>

      {!isFormValid() && (
        <Text style={{ color: 'red' }}>אנא מלא את כל שדות החובה *</Text>
      )}

      <View style={registerStyles.loginContainer}>
        <Pressable style={registerStyles.loginButton} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={registerStyles.loginText}>התחברות</Text>
        </Pressable>
        <Text style={registerStyles.loginText}>יש לך משתמש? </Text>
      </View>
    </View>
  );
};

export default RegisterBusinessScreen;
