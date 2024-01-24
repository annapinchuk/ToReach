import React from 'react';
import { View, Text, Pressable, Image, ScrollView ,TextInput } from 'react-native';
import { styles } from '../styles/HomeUserScreenStyles';
import { MaterialCommunityIcons, FontAwesome, FontAwesome5  } from '@expo/vector-icons';

const HomeUserScreen = ({ navigation }) => {
  return (

    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../Images/logo.jpg')} />

      <Pressable style={[styles.button, styles.pressableWithMargin]} onPress={() => navigation.navigate('SearchScreen')}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}><FontAwesome name="search" size={24} color="white" />                                      חיפוש תור</Text>
        </View>
      </Pressable>

      

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={styles.iconScrollView}
        contentOffset={{ x: 600, y: -33 }} // Adjust the value based on your needs
      >

        <Pressable style={[styles.iconTextContainer, styles.pressableWithMargin]} onPress={() => navigation.navigate('LoginScreen')}>
          <FontAwesome5 name="hands" size={60} color="white" />
          <Text style={styles.iconText}>טיפול</Text>
        </Pressable>

        
        <Pressable style={[styles.iconTextContainer, styles.pressableWithMargin]} onPress={() => navigation.navigate('LoginScreen')}>
        <FontAwesome5 name="dog" size={60} color="white" />
          <Text style={styles.iconText}>חיות</Text>
        </Pressable>

        

        <Pressable style={[styles.iconTextContainer, styles.pressableWithMargin]} onPress={() => navigation.navigate('LoginScreen')}>
        <MaterialCommunityIcons name="hammer-wrench" size={60} color="white" />
          <Text style={styles.iconText}>טכנאים</Text>
        </Pressable>

        <Pressable style={[styles.iconTextContainer, styles.pressableWithMargin]} onPress={() => navigation.navigate('LoginScreen')}>
          <MaterialCommunityIcons name="hair-dryer-outline" size={60} color="white" />
          <Text style={styles.iconText}>מספרה</Text>
        </Pressable>

        <Pressable style={[styles.iconTextContainer, styles.pressableWithMargin]} onPress={() => navigation.navigate('LoginScreen')}>
        <FontAwesome name="magic" size={60} color="white" />
          <Text style={styles.iconText}>הפעלות</Text>
        </Pressable>

        <Pressable style={[styles.iconTextContainer, styles.pressableWithMargin]} onPress={() => navigation.navigate('LoginScreen')}>
        <MaterialCommunityIcons name="broom" size={60} color="white" />
          <Text style={styles.iconText}>נקיון</Text>
        </Pressable>

        <Pressable style={[styles.iconTextContainer, styles.pressableWithMargin]} onPress={() => navigation.navigate('LoginScreen')}>
          <FontAwesome name="birthday-cake" size={60} color="white" />
          <Text style={styles.iconText}>ימי הולדת</Text>
        </Pressable>

        <Pressable style={[styles.iconTextContainer, styles.pressableWithMargin]} onPress={() => navigation.navigate('LoginScreen')}>
          <MaterialCommunityIcons name="weight-lifter" size={60} color="white" />
          <Text style={styles.iconText}>כושר</Text>
        </Pressable>

        <Pressable style={[styles.iconTextContainer, styles.pressableWithMargin]} onPress={() => navigation.navigate('LoginScreen')}>
          <MaterialCommunityIcons name="silverware-fork-knife" size={60} color="white" />
          <Text style={styles.iconText}>אוכל</Text>
        </Pressable>

        <Pressable style={[styles.iconTextContainer, styles.pressableWithMargin]} onPress={() => navigation.navigate('LoginScreen')}>
          <MaterialCommunityIcons name="face-woman-shimmer" size={60} color="white" />
          <Text style={styles.iconText}>קוסמטיקה</Text>
        </Pressable>
        
        
      </ScrollView>
    </View>
  );
};

export default HomeUserScreen;
