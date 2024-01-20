// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal } from 'react-native';
import { styles } from '../styles/LoginScreenStyles';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [registrationType, setRegistrationType] = useState('');

  const handleRegister = (type) => {
    // Handle registration logic based on the selected type (client or business)
    console.log('Register as:', type);
    setShowModal(false);
    setRegistrationType(type);
  };

  const isFormValid = () => {
    return email !== '' && password !== '';
  };

  const handleLogin = () => {
    if (isFormValid()) {
      console.log('Login Details:', {
        email,
        password,
      });

      const authInstance = getAuth();

      signInWithEmailAndPassword(authInstance, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error, errorMessage);
        });

      navigation.navigate('Home');
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
      />
        <TextInput
          style={styles.input}
          placeholder="סיסמא"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
      <View style={styles.inputContainer}>
        <Pressable onPress={() => setShowModal(true)}>
          <Text style={styles.ForgotPassword}>שכחתי סיסמא</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>התחבר</Text>
      </Pressable>

      <View style={styles.View}>
        <Text style={styles.Text}>חדש ב - toreach? </Text>
        <Pressable onPress={() => setShowModal(true)}>
          <Text style={styles.loginText}>הירשם עכשיו</Text>
        </Pressable>
      </View>

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Register as:</Text>
          <Pressable style={styles.modalButton} onPress={() => handleRegister('client')}>
            <Text style={styles.modalButtonText}>Client</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={() => handleRegister('business')}>
            <Text style={styles.modalButtonText}>Business</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={() => setShowModal(false)}>
            <Text style={styles.modalButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </Modal>

      {registrationType === 'client' && (
        <View>
          {/* Render client registration form here */}
        </View>
      )}

      {registrationType === 'business' && (
        <View>
          {/* Render business registration form here */}
        </View>
      )}
    </View>
  );
}

export default LoginScreen;