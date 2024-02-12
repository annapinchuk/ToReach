// BusinessPage.js
import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { businessPageStyles } from '../styles/BusinessPageStyles';
import PhoneButton from '../components/PhoneButton';
import TorType from '../components/TorType';
import Toast from 'react-native-toast-message';
import NavigationButton from '../components/NavigationButton';
import { Feather } from '@expo/vector-icons';
import { getHour } from '../shared/dateMethods';

const businessData = {
  name: "Mispara",
  phone: "0526715067",
  description: "המספרה של דניאל היא מספרת גברים הממוקמת בשדרות יצחק רבין 8, באר שבע. ניתן למצוא במספרה של דניאל מגוון שירותי גילוח וספריית מוצרים לטיפוח השיער.",
  logo: "https://picsum.photos/200",
  categories: [{ category: "שיער" }, { category: "טיפוח" }],
  pictures: [
    { url: "https://picsum.photos/201" },
    { url: "https://picsum.photos/202" },
    { url: "https://picsum.photos/203" },
  ],
  ratings: [
    {
      client_id: "/Clients/asnofnasio",
      rating: 4,
    },
  ],
  torTypes: [
    {
      duration: 90,
      name: " לק ידיים",
      price: 150,
    },
    {
      duration: 90,
      name: "לק",
      price: 150,
    },
  ]
};

const BusinessPage = ({ route, navigation }) => {

  const business = route.params.business;
  const startTime = business.startTime ? getHour(new Date(business.startTime.seconds * 1000)) : "09:00"
  const endTime = business.startTime ? getHour(new Date(business.endTime.seconds * 1000)) : "18:00"

  return (

    <View style={{ flex: 1, backgroundColor: '#5B8BDF', }}>

      <ScrollView style={businessPageStyles.container}>
        <View style={businessPageStyles.logoContainer}>
          {/* logo + name */}
          <Image source={{ uri: businessData.logo }} style={businessPageStyles.logo} />
        </View>
        <Text style={businessPageStyles.businessName}>{business.businessName}</Text>

        {/* phone number + call option */}
        <View style={businessPageStyles.categoryContainer}>
          <Text style={businessPageStyles.label}>טלפון: </Text>
          <PhoneButton phoneNumber={business.businessPhoneNumber} />
          <PhoneButton phoneNumber={<Feather name="phone-call" size={24} color="white" />} />
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
          {businessData.pictures.map((picture, index) => (
            <Image key={index} source={{ uri: picture.url }} style={businessPageStyles.photo} />
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


// const renderStars = (rating) => {
//   const stars = Array.from({ length: 5 }, (_, index) => (
//     <Text key={index} style={businessPageStyles.star}>{index < rating ? '★' : '☆'}</Text>
//   ));
//   return <>{stars}</>;
// };

{/* <View style={businessPageStyles.categoryContainer}>
        <Text style={businessPageStyles.label}>דירוג העסק: </Text>
        <Text style={businessPageStyles.rating}>{renderStars(business.ratings[0].rating)}</Text>
    </View> */}

