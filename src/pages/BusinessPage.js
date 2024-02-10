import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { businessPageStyles } from '../styles/BusinessPageStyles';
import { styles as ResultScreenStyles } from '../styles/ResultScreenStyles.js';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TorType from '../components/TorType';
const businessData = {
  name: "Mispara",
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
    // Additional ratings can be added
  ],
  torTypes: 
    [{
      duration: 90,
      name: " לק ידיים",
      price: 150,
    },
    {
        duration: 90,
        name: "לק",
        price: 150,
      },]
  
};

const BusinessPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#5B8BDF', }}>
      <ScrollView style={businessPageStyles.container}>
        {/* Logo and Business Name */}

        <View style={businessPageStyles.logoContainer}>
          <Image source={{ uri: businessData.logo }} style={businessPageStyles.logo} />
          <Text style={businessPageStyles.businessName}>{businessData.name}</Text>
        </View>


        {/* Categories */}
        <View style={businessPageStyles.categoryContainer}>
          <Text style={businessPageStyles.label}>תחום: </Text>
          <Text style={businessPageStyles.category}>
            {businessData.categories.map((category, index) => (
              <Text key={index}>{category.category}{index !== businessData.categories.length - 1 ? ', ' : ''}</Text>
            ))}
          </Text>
        </View>

        {/* Category and Rating */}
        <View style={businessPageStyles.categoryContainer}>
          {/* Assuming there's a function to render stars based on the rating */}
          <Text style={businessPageStyles.label}>דירוג העסק: </Text>
          <Text style={businessPageStyles.rating}>{renderStars(businessData.ratings[0].rating)}</Text>
        </View>

        <Text style={businessPageStyles.label}>תמונות של העסק: </Text>
        {/* Business Photos */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={businessPageStyles.photosContainer}>
          {businessData.pictures.map((picture, index) => (
            <Image key={index} source={{ uri: picture.url }} style={businessPageStyles.photo} />
          ))}
        </ScrollView>

        {/* Business Description */}

        <Text style={businessPageStyles.label}>תיאור העסק: </Text>
        <Text style={businessPageStyles.description}>{businessData.businessDescription}</Text>
        
        <ScrollView contentOffset={{ x: 0, y: 10 }} >
            <View style={ResultScreenStyles.container}>
                {businessData.torTypes && businessData.torTypes.length > 0 ? (
                    businessData.torTypes.map(appointment => (
                    <TorType key={appointment.name} appointment={appointment} />
                    ))
                ) : (
                    <Text>No tor types available</Text>
                )}
            </View>
        </ScrollView>
        <View style={businessPageStyles.torButtonContainer}>  
            <Pressable
            style={businessPageStyles.torButton}
            onPress={() => navigation.navigate('BookAppointmentScreen')}
          >
            <Text style={businessPageStyles.buttonText}>תאם תור</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

// A function to render stars based on the rating (Assuming a 5-star scale)
const renderStars = (rating) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Text key={index} style={businessPageStyles.star}>{index < rating ? '★' : '☆'}</Text>
  ));
  return <>{stars}</>;
};

export default BusinessPage;
