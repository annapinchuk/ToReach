import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/HomeScreenStyles';
const LoginScreen = ({ navigation }) => {
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
};

export default LoginScreen;
