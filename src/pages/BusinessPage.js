// BusinessPage.js
import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { businessPageStyles } from '../styles/BusinessPageStyles';
import PhoneButton from '../components/PhoneButton';
import TorType from '../components/TorType';

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
  console.log(route.params.business.id);
  return (

    <View style={{ flex: 1, backgroundColor: '#5B8BDF', }}>

      <ScrollView style={businessPageStyles.container}>
        <View style={businessPageStyles.logoContainer}>
          <Image source={{ uri: businessData.logo }} style={businessPageStyles.logo} />
        </View>
        <Text style={businessPageStyles.businessName}>{route.params.business.businessName}</Text>



        <View style={businessPageStyles.categoryContainer}>
          <Text style={businessPageStyles.label}>טלפון: </Text>
          <PhoneButton phoneNumber={route.params.business.businessPhoneNumber} />
        </View>

        <View style={businessPageStyles.categoryContainer}>
          <Text style={businessPageStyles.label}>תחום: </Text>
          <Text style={businessPageStyles.category}>

            {route.params.business.Categories.join(', ')}
          </Text>
        </View>

        {/* <View style={businessPageStyles.categoryContainer}>
          <Text style={businessPageStyles.label}>דירוג העסק: </Text>
          <Text style={businessPageStyles.rating}>{renderStars(business.ratings[0].rating)}</Text>
        </View> */}

        <Text style={businessPageStyles.label}>תמונות של העסק: </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={businessPageStyles.photosContainer}>
          {businessData.pictures.map((picture, index) => (
            <Image key={index} source={{ uri: picture.url }} style={businessPageStyles.photo} />
          ))}
        </ScrollView>

        <Text style={businessPageStyles.label}>תיאור העסק: </Text>
        <Text style={businessPageStyles.description}>{route.params.business.businessDescription}</Text>

        <ScrollView contentOffset={{ x: 0, y: 50 }} >
          <View style={businessPageStyles.container}>
            {route.params.business.torTypes && route.params.business.torTypes.length > 0 ? (
              route.params.business.torTypes.map(appointment => (
                <TorType key={appointment.name} appointment={appointment} />
              ))
            ) : (
              <Text>אין סוגי תורים</Text>
            )}
          </View>
        </ScrollView>
        <View style={businessPageStyles.torButtonContainer}>
          <Pressable
            style={businessPageStyles.torButton}
            onPress={() => navigation.navigate('BookAppointmentScreen', { businessID: route.params.business.id })}
          >
            <Text style={businessPageStyles.buttonText}>תאם תור</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

// const renderStars = (rating) => {
//   const stars = Array.from({ length: 5 }, (_, index) => (
//     <Text key={index} style={businessPageStyles.star}>{index < rating ? '★' : '☆'}</Text>
//   ));
//   return <>{stars}</>;
// };

export default BusinessPage;
