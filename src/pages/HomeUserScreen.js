import React from 'react';
import { View, Text, Pressable, Image, ScrollView ,TextInput } from 'react-native';
import { styles as styles } from '../styles/HomeUserScreenStyles';
import { styles as ResultScreenStyles } from '../styles/ResultScreenStyles.js';
import ResultCard from '../components/ResultCard';
import { MaterialCommunityIcons, FontAwesome, FontAwesome5,Feather  } from '@expo/vector-icons';
const data = [
  {
      id: 124,
      appointmentName: 'תספורת',
      businessName: "Daniel's hair",

  },
  {
      id: 125,
      appointmentName: 'תזונאית',
      businessName: "Shlomo's gym",

  },
  {
      id: 126,
      appointmentName: 'תספורת',
      businessName: "Daniel's hair",
  
  },
  {
      id: 127,
      appointmentName: 'תספורת',
      businessName: "Daniel's hair",

  },
  {
      id: 128,
      appointmentName: 'תספורת',
      businessName: "Daniel's hair",
  },
];
const HomeUserScreen = ({ navigation }) => {
  return (

    <View style={styles.container}>

      <Pressable style={[styles.button, styles.pressableWithMargin]} onPress={() => navigation.navigate('SearchScreen')}>
        <View style={styles.buttonContent}>

          <Text style={styles.buttonText}><FontAwesome name="search" size={24} color="white" />                                      חיפוש תור</Text>
        </View>
      </Pressable>

      
  <View style={{ height: 150 }}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true}
      contentContainerStyle={styles.iconScrollView}
      contentOffset={{ x: 5, y: -15 }} // Adjust the value based on your needs
    >

      <Pressable onPress={() => navigation.navigate('ResultScreen' , { selectedCatagories: "טיפול" })} style={styles.container_icon}>
        <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
          <FontAwesome name="circle-thin" size={100} color="white" />
          <FontAwesome5 name="hands" size={40} color="white" style={styles.icon_icon} />
        </View>
        <Text style={[styles.iconText, { textAlign: 'center' }]}>טיפול</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCatagories: "חיות" })} style={styles.container_icon}>
        <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
          <FontAwesome name="circle-thin" size={100} color="white" />
          <FontAwesome5 name="dog" size={40} color="white" style={styles.icon_icon} />
        </View>
        <Text style={[styles.iconText, { textAlign: 'center' }]}>חיות</Text>
      </Pressable>

        
      <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCatagories: "טכנאים" })} style={styles.container_icon}>
        <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
          <FontAwesome name="circle-thin" size={100} color="white" />
          <MaterialCommunityIcons name="hammer-wrench" size={50} color="white" style={styles.icon_icon} />
        </View>
        <Text style={[styles.iconText, { textAlign: 'center' }]}>טכנאים</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCatagories: "מספרה" })} style={styles.container_icon}>
        <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
          <FontAwesome name="circle-thin" size={100} color="white" />
          <MaterialCommunityIcons name="hair-dryer-outline" size={50} color="white" style={styles.icon_icon} />
        </View>
        <Text style={[styles.iconText, { textAlign: 'center' }]}>מספרה</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCatagories: "ניקיון" })} style={styles.container_icon}>
        <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
          <FontAwesome name="circle-thin" size={100} color="white" />
          <MaterialCommunityIcons name="broom" size={50} color="white" style={styles.icon_icon} />
        </View>
        <Text style={[styles.iconText, { textAlign: 'center' }]}>ניקיון</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCatagories: "ימי הולדת" })} style={styles.container_icon}>
        <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
          <FontAwesome name="circle-thin" size={100} color="white" />
          <FontAwesome name="birthday-cake" size={40} color="white" style={styles.icon_icon}/>
        </View>
        <Text style={[styles.iconText, { textAlign: 'center' }]}>ימי הולדת</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCatagories:"כושר"})} style={styles.container_icon}>
        <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
          <FontAwesome name="circle-thin" size={100} color="white" />
          <MaterialCommunityIcons name="weight-lifter" size={50} color="white" style={styles.icon_icon}/>
        </View>
        <Text style={[styles.iconText, { textAlign: 'center' }]}>כושר</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCatagories:"אוכל"})} style={styles.container_icon}>
        <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
          <FontAwesome name="circle-thin" size={100} color="white" />
          <MaterialCommunityIcons name="silverware-fork-knife" size={50} color="white" style={styles.icon_icon}/>
        </View>
        <Text style={[styles.iconText, { textAlign: 'center' }]}>אוכל</Text>
      </Pressable>

    
      <Pressable onPress={() => navigation.navigate('ResultScreen', { selectedCatagories: "קוסמטיקה" })} style={styles.container_icon}>
        <View style={[styles.iconContainer_icon, { alignItems: 'center' }]}>
          <FontAwesome name="circle-thin" size={100} color="white" />
          <MaterialCommunityIcons name="face-woman-shimmer" size={50} color="white" style={styles.icon_icon}/>
        </View>
        <Text style={[styles.iconText, { textAlign: 'center' }]}>קוסמטיקה</Text>
      </Pressable>

        
      </ScrollView>

      </View>
      <Text style={[styles.iconText, {color:'black'}]}>אולי זה יכול לעניין אותך</Text>
     {/* <ScrollView contentOffset={{ x: 0, y: 10 }} >
            <View style={ResultScreenStyles.container}>
                {data.map(appointment => <ResultCard key={business.id} navigation={navigation} business={business} />)}
            </View>
        </ScrollView> */}
    </View>
  );
};

export default HomeUserScreen;
