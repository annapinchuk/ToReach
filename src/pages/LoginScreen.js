// Import necessary components and libraries
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal, Alert,  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, } from 'react-native';
import { Loginstyles as styles } from '../styles/LoginScreenStyles';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Image } from 'react-native';
import { auth, db } from '../firebaseConfig';
import Toast from 'react-native-toast-message';
import { collection, doc, getDoc } from '@firebase/firestore';
import Spinner from '../components/Spinner';

// LoginScreen component
const LoginScreen = ({ navigation }) => {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle registration logic
  const handleRegister = (type) => {
    if (type === 'client') {
      navigation.navigate('RegisterClientScreen');
    } else if (type === 'business') {
      navigation.navigate('RegisterBusinessScreen');
    }
    setShowModal(false);
  };

  // Validate if the form is valid
  const isFormValid = () => {
    return email !== '' && password !== '';
  };

  // Handle forgot password functionality
  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('אימייל איפוס סיסמא נשלח לאימייל שלך');
      })
      .catch((error) => {
        console.log('Error sending password reset email:', error);
      });
  };

  // Check user permissions after login
  const checkUserPermission = async (uid) => {
    let isClient = undefined;

    // Firestore references
    const clientsCollection = collection(db, 'Clients');
    const businessCollection = collection(db, 'Businesses');
    const clientDocRef = doc(clientsCollection, uid);
    const businessDocRef = doc(businessCollection, uid);

    try {
      const clientSnapshot = await getDoc(clientDocRef);
      const businessSnapshot = await getDoc(businessDocRef);

      if (clientSnapshot.exists()) isClient = true;
      if (businessSnapshot.exists()) isClient = false;

      if (isClient === undefined) throw new Error('user not found');
      Toast.show({
        type: 'success',
        text1: 'התחברת בהצלחה',
      });
      setIsLoading(false);
      navigation.navigate('Navbar', { isClient });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'שם משתמש או סיסמה שגויים',
      });
      setIsLoading(false);
    }
  };

  // Handle login functionality
  const handleLogin = () => {
    if (isFormValid()) {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          checkUserPermission(user.uid);
        })
        .catch((error) => {
          Toast.show({
            type: 'error',
            text1: 'שם משתמש או סיסמא לא נכונים',
          });
          setIsLoading(false);
        });
    } else {
      Toast.show({
        type: 'error',
        text1: 'יש למלא את כל השדות',
      });
    }
  };

  // JSX rendering
  return (
    // close keyboard when clicking outside of input
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../Images/logo.jpg')} />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder=" אימייל *"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="סיסמא *"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      {/* Forgot Password Link */}
      <View style={styles.inputContainer}>
        <Pressable onPress={() => handleForgotPassword()}>
          <Text style={styles.ForgotPassword}>שכחתי סיסמא</Text>
        </Pressable>
      </View>

      {/* Login Button */}
      {isLoading ? (
        <Spinner />
      ) : (
        <Pressable style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>התחבר</Text>
        </Pressable>
      )}

      {/* New User Link */}
      <View style={styles.View}>
        <Text style={styles.Text}>חדש ב - toreach? </Text>
        <Pressable onPress={() => setShowModal(true)}>
          <Text style={styles.LinkText}>הירשם עכשיו</Text>
        </Pressable>
      </View>

      {/* Modal for registration type selection */}
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Image style={styles.logo} source={require('../../Images/logow.jpeg')} />
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
