import React, { useState } from 'react';
import { View, TextInput, Button ,Text, Image, Pressable} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from '../styles/HomeUserScreenStyles';
import { MaterialCommunityIcons, FontAwesome, EvilIcons   } from '@expo/vector-icons';


const SearchScreen = ({ navigation }) => {
  const [city, setCity] = useState(''); // איזה עיר
  const [category, setcategory] = useState(''); // איזה עיר
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [selectedDate1, setSelectedDate1] = useState(''); // תאריך ראשון

  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [selectedDate2, setSelectedDate2] = useState(''); // תאריך אחרון

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

 
  const handleDateConfirm1 = (date) => {
    hideDatePicker1();
    const formattedDate = date.toLocaleDateString('en-GB'); // Adjust the locale based on your preference
    setSelectedDate1(formattedDate);
  };
  
  const handleDateConfirm2 = (date) => {
    hideDatePicker2();
    const formattedDate = date.toLocaleDateString('en-GB'); // Adjust the locale based on your preference
    setSelectedDate2(formattedDate);
  };


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
        value={category}
        onChangeText={(text) => setcategory(text)}
      />

      <TextInput
        style={styles.input}
        placeholder=" עיר "
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      
      
        <EvilIcons name="calendar" size={40} color="black" />
        <TextInput
          style={styles.input}
          placeholder=" מתאריך: "
          value={selectedDate1}
          onTouchStart={showDatePicker1}
        />
      
       
      
        <EvilIcons name="calendar" size={40} color="black" />


      <DateTimePickerModal
        isVisible={isDatePickerVisible1}
        mode="date"
        onConfirm={handleDateConfirm1}
        onCancel={hideDatePicker1}
      />

      <TextInput
        style={styles.input}
        placeholder="ועד תאריך:"
        value={selectedDate2}
        onTouchStart={showDatePicker2}
        
      />
      

      <DateTimePickerModal
        isVisible={isDatePickerVisible2}
        mode="date"
        onConfirm={handleDateConfirm2}
        onCancel={hideDatePicker2}
      />

     
    </View>
  );
};

export default SearchScreen;
