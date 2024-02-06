import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Modal, FlatList, Image, LogBox, Pressable, TouchableWithoutFeedback, Platform } from 'react-native';
import { styles } from '../styles/HomeUserScreenStyles';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from '../components/DatePicker';

const categories_data = [
  { label: "שיער", value: "שיער" },
  { label: "טיפול", value: "טיפול" },
  { label: "אוכל", value: "אוכל" },
  { label: "קוסמטיקה", value: "קוסמטיקה" },
];
const city_data = [
  { label: "אלקנה", value: "אלקנה" },
  { label: "תל אביב", value: "תל אביב" },
  { label: "רמת גן", value: "רמת גן" },
  { label: "ירושלים", value: "ירושלים" }
];

const SearchScreen = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [isOpenCity, setIsOpenCity] = useState(false);
  const [currentValueCity, setCurrentValueCity] = useState([]);
  const [isOpenCategories, setIsOpenCategories] = useState(false);
  const [currentValueCategories, setCurrentValueCategories] = useState([]);

  const [selectedDate1, setSelectedDate1] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());

  const handleCategoryPress = (item) => {
    setIsOpenCity(false);
    setCategory(item);
    setIsOpenCategories(true);
  };

  const handleCityPress = (item) => {
    setIsOpenCategories(false);
    setCity(item);
    setIsOpenCity(true);
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => { setIsOpenCity(false); setIsOpenCategories(false) }}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../Images/logo.jpg')} />

        <Text style={[styles.searchtext, { textAlign: 'right' }]}>תחום עסק:</Text>

        <DropDownPicker
          items={categories_data}
          open={isOpenCategories}
          setOpen={setIsOpenCategories}
          value={currentValueCategories}
          setValue={setCurrentValueCategories}
          dropDownDirection='DOWN'
          multiple={true}
          min={1}
          max={5}
          showArrowIcon={false}
          mode='BADGE'
          badgeColors={'#2C64C6'}
          badgeDotColors={['white']}
          badgeTextStyle={{ color: "white" }}
          placeholder="בחר"
          placeholderStyle={styles.placeHolderStyle}
          containerStyle={styles.dropdownContainer}
          style={[styles.dropdownStyle, { zIndex: isOpenCategories ? 2 : 0 }]}
          itemStyle={styles.dropdownItemStyle}
          dropDownStyle={styles.dropdownListStyle}
          searchable={true}
          searchPlaceholder="חיפוש..."
          onSelectItem={handleCategoryPress}
        />
        <Text style={styles.searchtext}>עיר:</Text>

        <DropDownPicker
          items={city_data}
          open={isOpenCity}
          setOpen={setIsOpenCity}
          value={currentValueCity}
          setValue={setCurrentValueCity}
          dropDownDirection='DOWN'
          multiple={true}
          min={1}
          max={5}
          showArrowIcon={false}
          mode='BADGE'
          badgeColors={'#2C64C6'}
          badgeDotColors={['white']}
          badgeTextStyle={{ color: "white" }}
          placeholder="בחר"
          placeholderStyle={styles.placeHolderStyle}
          containerStyle={[styles.dropdownContainer, { zIndex: isOpenCity ? 1 : 0 }]}
          style={[styles.dropdownStyle, { zIndex: isOpenCity ? 1 : 0 }]}
          itemStyle={styles.dropdownItemStyle}
          dropDownStyle={styles.dropdownListStyle}
          searchable={true}
          searchPlaceholder="חיפוש..."
          onSelectItem={handleCityPress}
        />

        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.searchtext}>מתאריך:</Text>
            <DatePicker date={selectedDate1} setDate={setSelectedDate1} />
          </View>

          <View>
            <Text style={styles.searchtext}>ועד תאריך:</Text>
            <DatePicker date={selectedDate2} setDate={setSelectedDate2} />
          </View>
        </View>

        <Pressable

          style={[styles.button, styles.pressableWithMargin]}
          onPress={() => navigation.navigate('ResultScreen')}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>
              <FontAwesome name="search" size={24} color="white" /> חיפוש תור
            </Text>
          </View>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchScreen;