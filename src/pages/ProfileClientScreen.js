// Import necessary React and React Native components
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { styles } from '../styles/ProfileClientScreenStyles';
import { auth, db } from '../firebaseConfig';
import { collection, getDoc, setDoc, doc } from '@firebase/firestore';


const ProfilePage = ({ navigation }) => {
    // States to manage user information
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // State to track whether the fields are in edit mode
    const [editMode, setEditMode] = useState(false);

    const [docRef, setDocRef] = useState(undefined);

    // useEffect to fetch user data from Firestore on component mount
    useEffect(() => {
        // Get the current user and Firestore collection reference
        const user = auth.currentUser;
        const clientsCollection = collection(db, "Clients");

        // Create a document reference using the user's UID
        const docRef = doc(clientsCollection, user.uid)
        setDocRef(docRef)

        // Fetch data from Firestore and update state
        const getData = async () => {
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const { name, phoneNumber, email } = docSnap.data();
                    setUsername(name);
                    setPhoneNumber(phoneNumber);
                    setEmail(email);
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            catch (error) {
                console.log(error);
            }

        }
        // Call the getData function
        getData();
    }, []);

    // Function to handle save button press
    const handleSave = () => {
        // Update user information in Firestore
        const data = {
            name: username,
            phoneNumber: phoneNumber,
            email: email,
        };

        setDoc(docRef, data).then(() => {
            console.log("Document has been changed successfully");
        })
            .catch(error => {
                console.log(error);
            })

        // Set edit mode to false after saving
        setEditMode(false);
    };

    // Function to handle logout button press
    const handleLogout = () => {
        auth.signOut();
        navigation.navigate('LoginScreen')
    };

    // JSX for rendering the component
    return (
        <View style={styles.container}>
            {/* Display user information */}
            {/* user name - editable */}
            <Text style={styles.label}>שם:</Text>
            {editMode ? (
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
            ) : (
                <Text style={styles.text}>{username}</Text>
            )}

            {/* email */}
            <Text style={styles.label}>אימייל:</Text>
            <Text style={styles.text}> {email} </Text>

            {/* phone number - editable */}
            <Text style={styles.label}>מספר טלפון:</Text>
            {editMode ? (
                <TextInput
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    keyboardType="numeric"

                />
            ) : (
                <Text style={styles.text}>{phoneNumber}</Text>
            )}

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
                {/* Logout button */}
                <Pressable onPress={handleLogout} style={styles.logoutButton}>
                    {/* <Text style={styles.buttonText}> */}
                    <Text style={styles.buttonText}>
                        התנתקות
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

export default ProfilePage;
