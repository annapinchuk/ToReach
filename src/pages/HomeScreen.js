import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { styles } from '../styles/HomeScreenStyles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../Images/logo.jpg')}
      />
      <Button
        style={styles.buttonStyle}
        title="התחברות למערכת"
        onPress={() => navigation.navigate('LoginScreen')}
      />
      <Button
        style={styles.buttonStyle}
        title="הרשמה לבעל עסק"
        onPress={() => navigation.navigate('RegisterBusinessScreen')}
      />
      <Button
        style={styles.buttonStyle}
        title="הרשמה ללקוח"
        onPress={() => navigation.navigate('RegisterClientScreen')}
      />  
    </View>
  );
};

export default HomeScreen;
