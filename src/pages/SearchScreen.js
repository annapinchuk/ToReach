import React, { useState } from 'react';
import { View, Text, Pressable, Image, ScrollView ,TextInput } from 'react-native';
import { styles } from '../styles/HomeUserScreenStyles';
import { MaterialCommunityIcons, FontAwesome, FontAwesome5  } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
const [city, setCity] = useState('');
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../Images/logo.jpg')} />

      <Pressable style={[styles.button, styles.pressableWithMargin]} >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}><FontAwesome name="search" size={24} color="white" />                                      חיפוש תור</Text>
        </View>
      </Pressable>

      
      <TextInput
        style={[styles.input, styles.inputWithMargin]}
        placeholder=" קטגוריה "
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <TextInput
        style={styles.input}
        placeholder=" עיר "
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <TextInput
        style={styles.input}
        placeholder=" תאריכים "
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      

      
    </View>
  );
};


export default SearchScreen;
