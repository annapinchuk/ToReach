import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/HomeScreenStyles';
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
    const authInstance = getAuth();
    sendPasswordResetEmail(authInstance, email)
      .then(() => {
        console.log('Password reset email sent');
      })
      .catch((error) => {
        console.log('Error sending password reset email:', error);
      });
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
      <Text>Login Screen</Text>
      <Button
        style={styles.buttonStyle}
        title="שחכת סיסמה?"
        onPress={() => navigation.navigate('RegisterClientScreen')}
      />  
  </View>
    
  );
}

export default LoginScreen;