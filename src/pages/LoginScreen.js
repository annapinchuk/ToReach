// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal } from 'react-native';
import { Loginstyles as styles } from '../styles/LoginScreenStyles';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Image } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import Toast from 'react-native-toast-message';
import { collection, getDocs, query, where } from '@firebase/firestore';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [registrationType, setRegistrationType] = useState('');

  const handleRegister = (type) => {
    // Handle registration logic based on the selected type (client or business)
    if (type === 'client') {
      // Handle client registration
      navigation.navigate('RegisterClientScreen')
    } else if (type === 'business') {
      // Handle business registration
      navigation.navigate('RegisterBusinessScreen')
    }
    console.log('Register as:', type);
    setShowModal(false);
    setRegistrationType(type);
  };

  const isFormValid = () => {
    return email !== '' && password !== '';
  };

  const handleForgotPassword = () => {
      console.log('Forgot Password');
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log('Password reset email sent');
        })
        .catch((error) => {
          console.log('Error sending password reset email:', error);
        });
  };

  const checkUserPermission = async (uid) => {

    let isClient = undefined;

    const clientsCollection = collection(db, "Clients");
    const businessCollection = collection(db, "Businesses");

    const clientsQuery = query(clientsCollection, where('uid', '==', uid));
    const businessQuery = query(businessCollection, where('uid', '==', uid));

    try {
      const clientQuerySnapshot = await getDocs(clientsQuery);
      const businessQuerySnapshot = await getDocs(businessQuery);
      if (!clientQuerySnapshot.empty) isClient = true;
      if (!businessQuerySnapshot.empty) isClient = false;
      console.log(isClient);
      if (isClient === undefined) throw new Error('user not found');
      Toast.show({
        type: 'success',
        text1: 'התחברת בהצלחה'
      })
      navigation.navigate('Navbar', ({ isClient }));
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'שם משתמש או סיסמה שגויים'
      })
    }
  }

  const handleLogin = () => {
    if (isFormValid()) {
      console.log('Login Details:', {
        email,
        password,
      });


      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          checkUserPermission(user.uid);
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'שם משתמש או סיסמה שגויים'
          })
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error, errorMessage);
        });

      navigation.navigate('Navbar', ({ isClient: true }));
    } else {
      console.log('Please fill in all required fields');
    }
  };

  // forgot password clickable link in one line and look like link under line and blue color
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../Images/logo.jpg')}
      />
      <TextInput
        style={styles.input}
        placeholder=" אימייל *"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="סיסמא *"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <View style={styles.inputContainer}>
        <Pressable onPress={handleForgotPassword}>
          <Text style={styles.ForgotPassword}>שכחתי סיסמא</Text>
        </Pressable>
      </View>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>התחבר</Text>
      </Pressable>

      <View style={styles.View}>
        <Text style={styles.Text}>חדש ב - toreach? </Text>
        <Pressable onPress={() => setShowModal(true)}>
          <Text style={styles.LinkText}>הירשם עכשיו</Text>
        </Pressable>
      </View>

      {/* Model for registration type selection */}
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Image
            style={styles.logo}
            source={require('../../Images/logow.jpeg')}
          />
          <Pressable style={styles.modalButton} onPress={() => handleRegister('client')}>
            <Text style={styles.modalButtonText}>הרשמה</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={() => handleRegister('business')}>
            <Text style={styles.modalButtonText}>הרשמה לעסקים</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={() => setShowModal(false)}>
            <Text style={styles.modalButtonText}>חזור</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

export default LoginScreen;