import React from 'react';
import { View, Text, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { TextInput, Pressable, ScrollView, Image} from 'react-native';
import { registerStyles } from '../styles/RegisterBusinessScreenStyles';
import { styles } from '../styles/HomeScreenStyles';
import { createUserWithEmailAndPassword, getAuth} from 'firebase/auth';


const RegisterClientScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);


  const areRequiredFieldsMissing = () => {
    return (
      email.trim() === '' ||
      password.trim() === '' ||
      name.trim() === '' 
    );
  };

  const handleRegister = () => {
    setFormSubmitted(true);

    if (!areRequiredFieldsMissing()) {
      console.log('Registration Details:', {
        email,
        password,
        Name,
        businessNumber,
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
      console.log('Please fill in all required fields');
    }
  };

  return (
    
      <View style={registerStyles.container}>
        <Image style={styles.logo} source={require('../../Images/logo.jpg')} />
        <Text style={registerStyles.title}>יצירת משתמש חדש</Text>

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
          placeholder=" שם מלא *"
          placeholderTextColor={registerStyles.placeHolderStyle.color}
          value={name}
          onChangeText={(text) => setName(text)}
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
     
    
  );
};



export default RegisterClientScreen;
