import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Pressable, TextInput } from 'react-native';
import { businessPageStyles } from '../styles/BusinessPageStyles';
import { styles as ResultScreenStyles } from '../styles/ResultScreenStyles.js';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TorType from '../components/TorType';
import firebase from 'firebase/app';
import 'firebase/firestore'; 
import { app, auth, db } from '../firebaseConfig';

const ProfileBusinessScreen = ({ navigation }) => {
  const [businessData, setBusinessData] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPictures, setEditedPictures] = useState([]);
  const [editedLogo, setEditedLogo] = useState('');
  const [editedTorTypes, setEditedTorTypes] = useState([]);
  const getDocRef = async () => {
    try {
      const user = auth.currentUser;
      const clientsCollection = collection(db, "Businesses");
      const clientsQuery = query(clientsCollection, where('uid', '==', user.uid));
      const clientQuerySnapshot = await getDocs(clientsQuery);
      const docID = clientQuerySnapshot.docs[0].id;
      const docRef = doc(clientsCollection, docID);
      return docRef;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    // Fetch business data from Firebase
    const fetchBusinessData = async () => {
      const businessRef = await getDocRef();

      if (businessRef) {
        try {
          const businessSnapshot = await getDoc(businessRef);

          if (businessSnapshot.exists()) {
            const businessDoc = businessSnapshot.data();
            setBusinessData(businessDoc);

            // Set initial state for editing
            setEditedDescription(businessDoc.description);
            setEditedPictures([...businessDoc.pictures]);
            setEditedLogo(businessDoc.logo);
            setEditedTorTypes([...businessDoc.torTypes]);
          } else {
            console.error('Business document does not exist.');
          }
        } catch (error) {
          console.error('Error fetching business data:', error);
        }
      }
    };// Empty dependency array means this effect runs once after the initial render
    fetchBusinessData();
  }, []);

  if (!businessData) {
    return <Text>Loading...</Text>;
  }
  const handleEditDescription = () => {
    // Implement your logic to edit the description
    console.log("Edit Description");
  };

  const handleAddPicture = () => {
    // Implement your logic to add more pictures
    const newPicture = { url: "https://picsum.photos/204" }; // Replace with actual logic
    setEditedPictures([...editedPictures, newPicture]);
  };

  const handleEditLogo = () => {
    // Implement your logic to edit the logo
    console.log("Edit Logo");
  };

  const handleAddTorType = () => {
    // Implement your logic to add more torTypes
    const newTorType = {
      duration: 60,
      name: "מסכת פנים",
      price: 120,
    }; // Replace with actual logic
    setEditedTorTypes([...editedTorTypes, newTorType]);
  };

  if (!businessData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#5B8BDF' }}>
      <ScrollView style={businessPageStyles.container}>
        {/* Logo and Business Name */}
        <View style={businessPageStyles.logoContainer}>
          <Image source={{ uri: editedLogo }} style={businessPageStyles.logo} />
          {/* Button to edit logo */}
          <Pressable style={businessPageStyles.editLogoButton} onPress={handleEditLogo}>
            <Text style={businessPageStyles.buttonText}>ערוך לוגו</Text>
          </Pressable>
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
          {editedPictures.map((picture, index) => (
            <Image key={index} source={{ uri: picture.url }} style={businessPageStyles.photo} />
          ))}
          {/* Button to add more pictures */}
          <Pressable style={businessPageStyles.addPictureButton} onPress={handleAddPicture}>
            <Text style={businessPageStyles.buttonText}>הוסף תמונה</Text>
          </Pressable>
        </ScrollView>

        {/* Business Description */}
        <Text style={businessPageStyles.label}>תיאור העסק: </Text>
        <View style={businessPageStyles.editDescriptionContainer}>
          <TextInput
            style={businessPageStyles.editDescriptionInput}
            value={editedDescription}
            onChangeText={setEditedDescription}
            multiline
          />
          {/* Button to edit description */}
          <Pressable style={businessPageStyles.editDescriptionButton} onPress={handleEditDescription}>
            <Text style={businessPageStyles.buttonText}>ערוך תיאור</Text>
          </Pressable>
        </View>


        {/* Tor Types */}
        <ScrollView contentOffset={{ x: 0, y: 10 }}>
          <View style={ResultScreenStyles.container}>
            {editedTorTypes && editedTorTypes.length > 0 ? (
              editedTorTypes.map(appointment => (
                <TorType key={appointment.name} appointment={appointment} />
              ))
            ) : (
              <Text>No tor types available</Text>
            )}
          </View>
          {/* Button to add more torTypes */}
          <Pressable style={businessPageStyles.addTorTypeButton} onPress={handleAddTorType}>
            <Text style={businessPageStyles.buttonText}>הוסף סוג טיפול</Text>
          </Pressable>
        </ScrollView>

        {/* ... (unchanged) */}
      </ScrollView>
    </View>
  );
};

export default ProfileBusinessScreen;
