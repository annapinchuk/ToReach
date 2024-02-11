// Import necessary components and libraries
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal, Alert } from 'react-native';
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

   const messageToUser = (messageType, message) => {
      // Display success message and navigate to Navbar
      Toast.show({
        type: messageType || 'success',
        text1: message || ''
      });
   }

  // Handle registration logic
  const navToNextScreen = (isClient, type='') => {
    if (type === 'register'){
      if (isClient === true) {
        navigation.navigate('RegisterClientScreen');
      } else if (isClient === false) {
        navigation.navigate('RegisterBusinessScreen');
      }
      setShowModal(false);
    }
    else {
      if (isClient === true){
        messageToUser('success', 'משתמש יקר התחברת בהצלחה');
      }
      else {
        messageToUser('success', 'בעל עסק יקר התחברת בהצלחה');
      }
      navigation.navigate('Navbar', { isClient });
    }
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
        Alert.alert('משהו השתבש באיפוס סיסמא נסה שוב בעוד כמה רגעים');
      });
  };

  // Check user permissions after login
  const handleUserType = async (uid) => {

    // Retrieve snapshots for client and business
    const clientSnapshotPromise = getDoc(doc(collection(db, 'Clients'), uid));
    const businessSnapshotPromise = getDoc(doc(collection(db, 'Businesses'), uid));

    try {
      // Wait till we get all querys responds
      const [clientSnapshot, businessSnapshot] = await Promise.all([clientSnapshotPromise, businessSnapshotPromise]);
  
      // Determine user type based on snapshot existence & navigate to the corresponding page
      if (businessSnapshot.exists()) {
          navToNextScreen(isClient=false,)
      } else if (clientSnapshot.exists()) {
          navToNextScreen(isClient=true)
      } else {
          // User not found
          console.log('User not found');
          messageToUser(messageType='error', message='משתמש לא נמצא')
      }
    } 
    catch (err) {
      console.log(err);
      // Display error message
      messageToUser(messageType='error', message='שם משתמש או סיסמה שגויים')
    }
    finally {
      setIsLoading(false);
    }
  };


  // Handle login via firebase auth
  const handleLogin = () => {
    if (isFormValid()) {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            handleUserType(userCredential.user.uid);
        })
        .catch((error) => {
          console.log("handleLogin - " + error);
          messageToUser(messageType='error', message='שם משתמש או סיסמא לא נכונים');
          setIsLoading(false);
        });
    } else {
      messageToUser(messageType='error', message='יש למלא את כל השדות')
    }
  };

  // JSX rendering
  return (
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
          <Pressable style={styles.modalButton} onPress={() => navToNextScreen(isClient=true, type='register')}>
            <Text style={styles.modalButtonText}>הרשמה</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={() => navToNextScreen(isClient=false, type='register')}>
            <Text style={styles.modalButtonText}>הרשמה לעסקים</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={() => setShowModal(false)}>
            <Text style={styles.modalButtonText}>חזור</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
