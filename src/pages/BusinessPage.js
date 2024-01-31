import React from 'react';
import { View, Text, Image, ScrollView,Pressable } from 'react-native';
import { businessPageStyles } from '../styles/BusinessPageStyles';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
  torTypes: [
    {
      duration: 90,
      name: "לק",
      price: 150,
    },
  ],
};

const BusinessPage = ({navigation}) => {
  return (
    <ScrollView style={businessPageStyles.container}>
        {/* Logo and Business Name */}
        
        <View style={businessPageStyles.logoContainer}>
            <Image source={{ uri: businessData.logo }} style={businessPageStyles.logo} />
            <Text style={businessPageStyles.businessName}>{businessData.name}</Text>
        </View>


        {/* Categories */}
        <View style={businessPageStyles.categoryContainer}>
        <Text style={businessPageStyles.category}>
            {businessData.categories.map((category, index) => (
            <Text key={index}>{category.category}{index !== businessData.categories.length - 1 ? ', ' : ''}</Text>
            ))}
        </Text>
        <Text style={businessPageStyles.label}>תחום: </Text>
        </View>

        {/* Category and Rating */}
        <View style={businessPageStyles.categoryContainer}>
        {/* Assuming there's a function to render stars based on the rating */}
        <Text style={businessPageStyles.rating}>{renderStars(businessData.ratings[0].rating)}</Text>
        <Text style={businessPageStyles.label}>דירוג העסק: </Text>
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
        <Text style={businessPageStyles.description}>{businessData.description}</Text>
        
        <View style={businessPageStyles.torButtonContainer}>  
            <Pressable
            style={businessPageStyles.torButton}
            onPress={() => navigation.navigate('BusinessPage')}
            >
            <Text style={businessPageStyles.buttonText}>תאם תור</Text>
            </Pressable>
        </View>
    </ScrollView>
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