import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { styles } from '../styles/HomeScreenStyles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../Images/logo.jpg')}
      />
      <Pressable style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonText}>התחברות למערכת</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('RegisterBusinessScreen')}>
        <Text style={styles.buttonText}>הרשמה לבעל עסק</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('RegisterClientScreen')}>
        <Text style={styles.buttonText}>הרשמה ללקוח</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
