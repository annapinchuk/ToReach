import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Pressable, TextInput,LogBox } from 'react-native';
import { businessPageStyles } from '../styles/BusinessPageStyles';
import { styles as ResultScreenStyles } from '../styles/ResultScreenStyles.js';
import TorType from '../components/TorType';
import { app, auth, db } from '../firebaseConfig';
import { collection,getDoc, setDoc, doc ,getDocs,query,limit} from 'firebase/firestore';
import { styles } from '../styles/ProfileClientScreenStyles';
import { registerStyles} from '../styles/RegisterBusinessScreenStyles.js';
import TorTypeInput from '../components/TorTypeInput';
import DropDownPicker from 'react-native-dropdown-picker';
import PhoneButton from '../components/PhoneButton';
import { Feather } from '@expo/vector-icons';


const ProfileBusinessScreen = ({ navigation }) => {
    const [businessData, setBusinessData] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedPictures, setEditedPictures] = useState([]);
    const [editedLogo, setEditedLogo] = useState('');
    const [editedName, setEditedName] = useState('');
    const [editedPhone, setEditedPhone] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedTorTypes, setEditedTorTypes] = useState([]);
    const [editedCategories, setEditedCategories] = useState([]);
    const [editedCities, setEditedCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isOpenCategories, setIsOpenCategories] = useState(false);
    const [currentValueCategories, setCurrentValueCategories] = useState([]);
    const [Cities, setCities] = useState([]);
    const [isOpenCities, setIsOpenCities] = useState(false);
    const [currentValueCities, setCurrentValueCities] = useState([]);
    // State to track whether the fields are in edit mode
    const [editMode, setEditMode] = useState(false);
    const [docRef, setDocRef] = useState(undefined);

    const fetchCategories = async () => {
        try {
          const categoriesCollection = collection(db, 'Categories');
          const categoriesSnapshot = await getDocs(categoriesCollection);
          const categoriesData = categoriesSnapshot.docs.map(
            (doc) => doc.data().name
          );
          setCategories(categoriesData);
        } catch (error) {
          console.error('Firebase initialization error:', error);
        }
      };
      const fetchCities = async () => {
        try {
          const citiessCollection = collection(db, 'Cities');
          const citiesQuery = query(citiessCollection, limit(10));
          const citiesSnapshot = await getDocs(citiesQuery);
          const citiesData = citiesSnapshot.docs.map(
            (doc) => doc.data().name
          );
          setCities(citiesData);
        } catch (error) {
          console.error('Firebase initialization error:', error);
        }
      };
    useEffect(() => {
        fetchCategories();
        fetchCities();
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        const user = auth.currentUser;
        const clientsCollection = collection(db, "Businesses");
        const docRef = doc(clientsCollection, user.uid)
        setDocRef(docRef)

        const getData = async () => {
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    const data = docSnap.data();
                    setBusinessData(data);
                    setEditedName(data.businessName);
                    setEditedPhone(data.businessPhoneNumber);
                    setEditedDescription(data.businessDescription);
                    setEditedPictures(data.pictures ?? []);
                    setEditedTorTypes(data.torTypes ?? []);
                    setEditedLogo(data.logo ?? '');
                    setEditedCategories(data.Categories);
                    setCurrentValueCategories(data.Categories);
                    setEditedCities(data.Cities);
                    setCurrentValueCities(data.Cities);
                    setEditedAddress(data.address);
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            catch (error) {
                console.log(error);
            }

        }
        getData();
    }, []);

    const handleSave = async () => {
        setEditedCategories(currentValueCategories);
        setEditedCities(currentValueCities);
        const newData = {...businessData, 
            businessName: editedName,
            businessDescription: editedDescription,
            pictures: editedPictures,
            torTypes: editedTorTypes,
            logo: editedLogo,
            Categories: currentValueCategories,
            Cities: currentValueCities,
            businessPhoneNumber: editedPhone,
            address: editedAddress,
        }
        await setDoc(docRef, newData).then(() => {
            console.log("Document has been changed successfully");
        })
            .catch(error => {
                console.log(error);
            })

        setEditMode(false);
    };
    const handleAddPicture = () => {
        // Implement your logic to add more pictures
        const newPicture = { url: "https://picsum.photos/204" }; // Replace with actual logic
        setEditedPictures([...editedPictures, newPicture]);
    };

    const handleEditLogo = async ()  => {
    }; 

    const handleAddTorType = newTorType => {
        setEditedTorTypes([...editedTorTypes, newTorType]);
    };

    if (!businessData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#5B8BDF' }}>
            <ScrollView style={businessPageStyles.container}>
                <View style={styles.buttonsRow}>
                    {/* Display edit or save button based on edit mode */}
                    {editMode ? (
                        <Pressable style={styles.button} onPress={handleSave}>
                            <Text style={styles.buttonText}>
                                שמירה
                            </Text>
                        </Pressable>

                    ) : (
                        <Pressable style={styles.button} onPress={() => setEditMode(true)}>
                            <Text style={styles.buttonText}>
                                עריכה
                            </Text>
                        </Pressable>
                    )}
                </View>
                {/* Logo and Business Name */}
                <View style={businessPageStyles.logoContainer}>
                    {editedLogo && <Image source={{ uri: editedLogo }} style={businessPageStyles.logo} />}
                    {/* Button to edit logo */}
                    {editMode ? (
                        <View>
                        <Pressable style={businessPageStyles.editLogoButton} onPress={handleEditLogo}>
                            <Text style={businessPageStyles.buttonText}>ערוך לוגו</Text>
                        </Pressable>
                        <TextInput
                            style={businessPageStyles.businessName}
                            value={editedName}
                            onChangeText={(text) => setEditedName(text)}
                        />
                        </View>
                       

                    ) : (
                        <Text style={businessPageStyles.businessName}>{businessData.businessName}</Text>
                    )}
                </View>
                {/* Phone */}
                                
                
                {editMode ? (
                    <View style={businessPageStyles.editDescriptionContainer}>
                        <Text style={businessPageStyles.label}>טלפון: </Text>
                        <TextInput
                            style={{...businessPageStyles.editDescriptionInput, textAlign: 'right'}}
                            value={editedPhone}
                            onChangeText={(text) => setEditedPhone(text)}
                        />
                    </View>
                ) : (
                    <View style={businessPageStyles.categoryContainer}>
                    <Text style={businessPageStyles.label}>טלפון: </Text>
                    <PhoneButton phoneNumber={editedPhone} />
                    <PhoneButton phoneNumber={<Feather name="phone-call" size={24} color="white" />} />
                  </View>
                )}
                {/* Adress*/}
                {editMode ? (
                    <View style={businessPageStyles.editDescriptionContainer}>
                        <Text style={businessPageStyles.label}>כתובת: </Text>
                        <TextInput
                            style={{...businessPageStyles.editDescriptionInput, textAlign: 'right'}}
                            value={editedAddress}
                            onChangeText={(text) => setEditedAddress(text)}
                        />
                    </View>
                ) : (
                    <View style={businessPageStyles.categoryContainer}>
                    <Text style={businessPageStyles.label}>כתובת: </Text>
                    <Text style={businessPageStyles.category}> {editedAddress} </Text>
                    {/* <NavigationButton destination={business.address} /> */}
                  </View>
                )}



                {editMode? (<Text style={businessPageStyles.label}>תחום: </Text>):(<View></View>)}
                {/* Categories */}
                <View style={[businessPageStyles.categoryContainer,{ zIndex: 4 }]}>
                    {editMode? (
                        
                                <DropDownPicker
                                items={categories.map((category) => ({ label: category, value: category }))}
                                open={isOpenCategories}
                                setOpen={() => setIsOpenCategories(!isOpenCategories)}
                                value={currentValueCategories}
                                setValue={(val) => setCurrentValueCategories(val)}
                                dropDownDirection='DOWN'
                                multiple={true}
                                min={1}
                                max={4}
                                showArrowIcon={false}
                                mode='BADGE'
                                badgeColors={'#2C64C6'}
                                badgeDotColors={['white']}
                                listMode={Platform.OS === 'ios' ? 'FLATLIST' : 'MODAL'}
                                badgeTextStyle={{ color: "white" }}
                                placeholder="תחום עסק "
                                placeholderStyle={registerStyles.placeHolderStyle}
                                style={registerStyles.dropdownStyle}
                                itemStyle={registerStyles.dropdownItemStyle}
                                dropDownStyle={registerStyles.dropdownListStyle}
                                searchable={true}
                                searchPlaceholder="חיפוש..."
                                />
                    ):(
                    <View style={{flexDirection: 'row'}}>
                        <Text style={businessPageStyles.label}>תחום: </Text>
                        <Text style={businessPageStyles.category}>
                            {editedCategories.map((category, index) => (
                                <Text key={index}>{category}{index !== editedCategories.length - 1 ? ', ' : ''}</Text>
                            ))}
                        </Text>
                    </View>

                    )}
                </View>

                {/* Cities */}
                {editMode? (<Text style={businessPageStyles.label}>ערים: </Text>):(<View></View>)}
                <View style={[businessPageStyles.categoryContainer,{ zIndex: 3 }]}>
                    {editMode? (
                                    <DropDownPicker
                                    items={Cities.map((city) => ({ label: city, value: city }))}
                                    open={isOpenCities}
                                    setOpen={() => setIsOpenCities(!isOpenCities)}
                                    value={currentValueCities}
                                    setValue={(val) => setCurrentValueCities(val)}
                                    dropDownDirection='DOWN'
                                    multiple={true}
                                    min={1}
                                    max={5}
                                    showArrowIcon={false}
                                    mode='BADGE'
                                    badgeColors={'#2C64C6'}
                                    badgeDotColors={['white']}
                                    listMode={Platform.OS === 'ios' ? 'FLATLIST' : 'MODAL'}
                                    badgeTextStyle={{ color: "white" }}
                                    placeholder="ערים"
                                    placeholderStyle={registerStyles.placeHolderStyle}
                                    style={registerStyles.dropdownStyle}
                                    itemStyle={registerStyles.dropdownItemStyle}
                                    dropDownStyle={registerStyles.dropdownListStyle}
                                    searchable={true}
                                    searchPlaceholder="חיפוש..."
                                  />
                    ):(
                    <View style={{flexDirection: 'row'}}>
                        <Text style={businessPageStyles.label}>ערים: </Text>
                        <Text style={businessPageStyles.category}>
                            {editedCities.map((category, index) => (
                                <Text key={index}>{category}{index !== editedCities.length - 1 ? ', ' : ''}</Text>
                            ))}
                        </Text>
                    </View>

                    )}
                </View>

                {/* Category and Rating */}
                <View style={[businessPageStyles.categoryContainer, { zIndex: 1 }]}>
                    {/* Assuming there's a function to render stars based on the rating */}
                    <Text style={businessPageStyles.label}>דירוג העסק: </Text>
                    {businessData.ratings && businessData.ratings.length > 0 && (
                        <Text style={businessPageStyles.rating}>{renderStars(businessData.ratings[0].rating)}</Text>)}
                </View>

                <Text style={businessPageStyles.label}>תמונות של העסק: </Text>
                {/* Business Photos */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={businessPageStyles.photosContainer}>
                    {(editedPictures.map((picture, index) => (
                        <Image key={index} source={{ uri: picture.url }} style={businessPageStyles.photo} />
                    )))}
                    {/* Button to add more pictures */}
                    {editMode? (
                        <Pressable style={businessPageStyles.addPictureButton} onPress={handleAddPicture}>
                            <Text style={businessPageStyles.buttonText}>הוסף תמונה</Text>
                        </Pressable>
                    ):(
                        <View></View>
                    )}
                </ScrollView>

                {/* Business Description */}
                <Text style={businessPageStyles.label}>תיאור העסק: </Text>
                {editMode ? (
                    <View style={businessPageStyles.editDescriptionContainer}>
                        <TextInput
                            style={{...businessPageStyles.editDescriptionInput, textAlign: 'right'}}
                            value={editedDescription}
                            onChangeText={(text) => setEditedDescription(text)}
                            multiline
                        />
                    </View>
                ) : (
                    <Text style={businessPageStyles.description}>{editedDescription}</Text>
                )}


                {/* Tor Types */}
                <ScrollView contentOffset={{ x: 0, y: 10 }}>
                    <View style={ResultScreenStyles.container}>
                        {editedTorTypes && editedTorTypes.length > 0 ? (
                            editedTorTypes.map(appointment => (
                                <TorType key={appointment.name} appointment={appointment} />
                            ))
                        ) : (
                            <View>
                            <Text>שים לב! אין סוג תור.</Text>
                            <Text> כדי שלקוחות יכלו לקבוע תור עם העסק יש להוסיף לפחות סוג תור אחד</Text>
                            </View>
                        )}
                    </View>
                    {/* Button to add more torTypes */}
                    {editMode && <TorTypeInput onAddTorType={handleAddTorType} />}

                </ScrollView>

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

export default ProfileBusinessScreen;
