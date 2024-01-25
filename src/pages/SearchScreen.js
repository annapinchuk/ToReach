import React, { useState, useEffect } from 'react';
import { View, TextInput, Text,Modal,FlatList, Image, Pressable, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from '../styles/HomeUserScreenStyles';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import { app } from '../firebaseConfig';


const SearchScreen = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
  const [selectedDate1, setSelectedDate1] = useState('');
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [selectedDate2, setSelectedDate2] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchCategories = async () => {
    const categoriesRef = app.firestore().collection('categories');

    try {
      const snapshot = await categoriesRef.get();
      const categoriesData = snapshot.docs.map((doc) => doc.data().name);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showDatePicker1 = () => setDatePickerVisibility1(true);
  const hideDatePicker1 = () => setDatePickerVisibility1(false);
  const showDatePicker2 = () => setDatePickerVisibility2(true);
  const hideDatePicker2 = () => setDatePickerVisibility2(false);

  const handleDateConfirm1 = (date) => {
    hideDatePicker1();
    const formattedDate = date.toLocaleDateString('he-IL');
    setSelectedDate1(formattedDate);
  };
  
  const handleDateConfirm2 = (date) => {
    hideDatePicker2();
    const formattedDate = date.toLocaleDateString('he-IL');
    setSelectedDate2(formattedDate);
  };
 

  const handleCategoryPress = (selectedCategory) => {
    if (!categories.includes(selectedCategory) && categories.length < 5) {
      setCategories([...categories, selectedCategory]);
      setModalVisible(false);
    }
  };

  const handleRemoveCategory = (removedCategory) => {
    const updatedCategories = categories.filter((category) => category !== removedCategory);
    setCategories(updatedCategories);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../Images/logo.jpg')} />

      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.input}>
          <Text style={styles.inputPlaceholder}>
            {categories.length > 0 ? '' : ' תחום עסק *'}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {categories.map((category, index) => (
              <View key={index} style={styles.selectedCategoryContainer}>
                <Text style={styles.selectedCategoryText}>{category}</Text>
                <Text
                  style={styles.removeCategoryButton}
                  onPress={() => handleRemoveCategory(category)}
                >
                  X
                </Text>
              </View>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => handleCategoryPress(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Text style={{ color: 'white' }}>Close</Text>
            </Pressable>
          </View>
        </Modal>

      <TextInput
        style={styles.input}
        placeholder=" עיר "
        value={city}
        onChangeText={(text) => setCity(text)}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible1}
        mode="date"
        locale="he" 
        onConfirm={handleDateConfirm1}
        onCancel={hideDatePicker1}
      />
  
      <DateTimePickerModal
        isVisible={isDatePickerVisible2}
        mode="date"
        locale="he" 
        onConfirm={handleDateConfirm2}
        onCancel={hideDatePicker2}
      />

      <View style={styles.rowContainer}>
        <View style={styles.pressableContainer}>
          <Pressable onPress={showDatePicker2} style={styles.pressableContainer}>
            <Text style={styles.serchText}>
              {selectedDate2 ? selectedDate2 : 'ועד לתאריך:'}
            </Text>
            <EvilIcons
              name="calendar"
              size={80}
              color="white"
              style={styles.calendarIcon}
            />
          </Pressable>
        </View>

        <View style={styles.pressableContainer}>
          <Pressable onPress={showDatePicker1} style={styles.pressableContainer}>
            <Text style={styles.serchText}>
              {selectedDate1 ? selectedDate1 : ' מתאריך: '}
            </Text>
            <EvilIcons
              name="calendar"
              size={80}
              color="white"
              style={styles.calendarIcon}
            />
          </Pressable>
        </View>
      </View>
      

      <Pressable
        style={[styles.button, styles.pressableWithMargin]}
        onPress={() => navigation.navigate('SearchScreen')}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>
            <FontAwesome name="search" size={24} color="white" /> חיפוש תור
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default SearchScreen;
