// BusinessPage.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Pressable,Button ,TouchableOpacity} from 'react-native';
import { businessPageStyles } from '../styles/BusinessPageStyles';
import PhoneButton from '../components/PhoneButton';
import TorType from '../components/TorType';
import Toast from 'react-native-toast-message';
import NavigationButton from '../components/NavigationButton';
import { Feather } from '@expo/vector-icons';
import { getHour } from '../shared/dateMethods';
import { getDownloadURL, ref } from '@firebase/storage';
import { storage } from '../firebaseConfig';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, getDoc, setDoc, doc, getDocs, query, limit, updateDoc } from 'firebase/firestore';
import { db,auth  } from '../firebaseConfig'; 


const BusinessPage = ({ route, navigation }) => {

  const [pictures, setPictures] = useState([]);
  const [logo, setLogo] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingMode, setRatingMode] = useState(false);

  useEffect(() => {
    const fetchPictures = async () => {
      const pics = [];
      if (!route.params.business || !route.params.business.pictures) return;
      await Promise.all(route.params.business.pictures.map(async picture => {
        if (picture.url) result.push(picture.url);
        else if (typeof picture === 'string') {
          try {
            const storageRef = ref(storage, picture);
            const url = await getDownloadURL(storageRef)
            pics.push(url);
          } catch (err) {
            console.log(err);
          }
        }
      }));
      setPictures(pics);
      const logoUrl = route.params.business.logo
      if (!logoUrl || logoUrl.includes('picsum')) {
        setLogo(logoUrl);
        return;
      }
      try {
        const storageRef = ref(storage, logoUrl);
        const logoUrlToShow = await getDownloadURL(storageRef);
        setLogo(logoUrlToShow);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPictures();
    fetchAndSetAverageRating();
  }, []);
  const fetchAndSetAverageRating = async () => {
    const ratingsRef = collection(db, `Businesses/${businessId}/ratings`);
    const snapshot = await getDocs(ratingsRef);
    let totalRating = 0;
    snapshot.forEach((doc) => {
      totalRating += doc.data().rating;
    });
    const averageRating = snapshot.size > 0 ? totalRating / snapshot.size : 0;
    setRating(averageRating);
  };

  const onRatingCompleted = async (newRating) => {
    if (!auth.currentUser) {
      console.log("User not logged in");
      return;
    }
    const clientId = auth.currentUser.uid;
    const ratingDocRef = doc(db, `Businesses/${businessId}/ratings`, clientId);

    await setDoc(ratingDocRef, { rating: newRating, timestamp: new Date() }, { merge: true });
    fetchAndSetAverageRating(); // Recalculate the average rating after updating
    setRatingMode(false); // Exit rating mode
  };

  const business = route.params.business;
  const businessId =business.id;
  const startTime = business.startTime ? getHour(new Date(business.startTime.seconds * 1000)) : "09:00"
  const endTime = business.startTime ? getHour(new Date(business.endTime.seconds * 1000)) : "18:00"
  const renderStarsForRating = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity
      style={businessPageStyles.category}
        key={index}
        onPress={() => ratingMode && setRating(index + 1)}
      >
        <Text style={businessPageStyles.star}>{index < rating ? '★' : '☆'}</Text>
      </TouchableOpacity>
    ));
  };
  return (
    

    <View style={{ flex: 1, backgroundColor: '#5B8BDF'}}>

      <ScrollView style={businessPageStyles.container}>
        <View style={businessPageStyles.logoContainer}>
          {/* logo + name */}
          {logo && <Image source={{ uri: logo }} style={businessPageStyles.logo} />}
        </View>
        <Text style={businessPageStyles.businessName}>{business.businessName}</Text>

        {/* phone number + call option */}
        <View style={businessPageStyles.categoryContainer}>
          <Text style={businessPageStyles.label}>טלפון: </Text>
          <PhoneButton phoneNumber={business.businessPhoneNumber} />
          <Feather name="phone-call" size={24} color="white" />
        </View>

        <View style={businessPageStyles.categoryContainer}>
        <Text style={businessPageStyles.label}>דירוג: </Text>
 
      
      {ratingMode ? (
        <>       
          <View style={businessPageStyles.starsContainer}>
            {renderStarsForRating()}
          
          <Button title="אישור" onPress={() => {
            setRatingMode(false);
            onRatingCompleted(rating);
            
          }} />
          <TouchableOpacity style= {businessPageStyles.button}   
 
 onPress={() => {
  setRatingMode(false);
  onRatingCompleted(rating);
  
}}  >
          <Text style={businessPageStyles.text}>אישור</Text>
          </TouchableOpacity>
          </View>
          
        </>       
      ) : (
        <View style={{flexDirection: 'row'}}>
        <Text style={businessPageStyles.category}>
           <Text style={businessPageStyles.star}>★</Text> {rating.toFixed(1)}
        </Text>
        <TouchableOpacity style= {businessPageStyles.button}   
 
         onPress={() => setRatingMode(true)} >
          <Text style={businessPageStyles.text}>דרג</Text>
         </TouchableOpacity>
        </View>
      )}
    </View>

        {/* address */}
        <View style={businessPageStyles.categoryContainer}>
          <Text style={businessPageStyles.label}>כתובת: </Text>
          <Text style={businessPageStyles.category}> {business.address} </Text>
          {/* <NavigationButton destination={business.address} /> */}
        </View>

        {/* categories */}
        <View style={businessPageStyles.categoryContainer}>
          <Text style={businessPageStyles.label}>תחום: </Text>
          <Text style={businessPageStyles.category}>
            {business.Categories.join(', ')}
          </Text>
        </View>
        {/* cities */}
        <View style={businessPageStyles.categoryContainer}>
          <Text style={businessPageStyles.label}>עיר: </Text>
          <Text style={businessPageStyles.category}>
            {business.Cities.join(', ')}
          </Text>
        </View>

        {/* pictures */}
        <Text style={businessPageStyles.label}>תמונות של העסק: </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={businessPageStyles.photosContainer}>
          {pictures.map((picture, index) => (
            <Image key={index} source={{ uri: picture }} style={businessPageStyles.photo} />
          ))}
        </ScrollView>

        {/* description */}
        {
          business.businessDescription ?
            <View>
              <Text style={businessPageStyles.label}>תיאור העסק: </Text>
              <Text style={businessPageStyles.description}>{business.businessDescription}</Text>
            </View> :
            <View></View>
        }

        {/* Activity time */}
        <Text style={businessPageStyles.label}>שעות פעילות העסק:</Text>
        <View style={businessPageStyles.categoryContainer}>
          <Text style={businessPageStyles.subLabel}>שעת פתיחה:</Text>
          <Text style={businessPageStyles.category}>{startTime}</Text>
        </View>
        <View>
          <View style={businessPageStyles.categoryContainer}>
            <Text style={businessPageStyles.subLabel}>שעת סיום:</Text>
            <Text style={businessPageStyles.category}>{endTime}</Text>
          </View>
        </View>

        {/* tor types */}
        <Text style={businessPageStyles.label}>סוגי תורים</Text>
        <ScrollView contentOffset={{ x: 0, y: 50 }} >
          <View style={businessPageStyles.container}>
            {business.torTypes && business.torTypes.length > 0 ? (
              business.torTypes.map(appointment => (
                <TorType key={appointment.name} appointment={appointment} />
              ))
            ) : (
              <Text>אין סוגי תורים</Text>
            )}
          </View>
        </ScrollView>

        {/* book appointment */}
        <View style={businessPageStyles.torButtonContainer}>
          {business.torTypes && business.torTypes.length > 0 ?
            <Pressable
              style={businessPageStyles.torButton}
              onPress={() => navigation.navigate('BookAppointmentScreen', { businessID: business.id })}
            >
              <Text style={businessPageStyles.buttonText}>תאם תור</Text>
            </Pressable> :
            <Pressable
              style={businessPageStyles.torButtonDisabled}
              onPress={() => {
                Toast.show({
                  type: 'error',
                  text1: 'לא ניתן לקבוע תור לעסק זה'
                });
              }}>
              <Text style={businessPageStyles.buttonText}>תאם תור</Text>
            </Pressable>

          }
        </View>
      </ScrollView>
    </View>
    
  );
};

export default BusinessPage;




