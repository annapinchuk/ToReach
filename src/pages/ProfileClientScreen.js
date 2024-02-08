// Import necessary React and React Native components
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { styles } from '../styles/ProfileClientScreenStyles';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, getDoc, query, where, setDoc, doc } from '@firebase/firestore';


const ProfilePage = ({ navigation }) => {
    // State to manage user information
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // State to track whether the fields are in edit mode
    const [editMode, setEditMode] = useState(false);

    const [docRef, setDocRef] = useState(undefined);
    const user = auth.currentUser;

    const getDocRef = async () => {
        try {
            const clientsCollection = collection(db, "Clients");
            const clientsQuery = query(clientsCollection, where('uid', '==', user.uid));
            const clientQuerySnapshot = await getDocs(clientsQuery);
            const docID = clientQuerySnapshot.docs[0].id
            const docRef = doc(clientsCollection, docID)
            setDocRef(docRef)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDocRef();
    }, []);

    useEffect(() => {
        if (docRef === undefined)
            return;
        // Load user information from Firestore
        const getData = async () => {
            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    const {name,phoneNumber,email} = docSnap.data();
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
        getData()

    }, [docRef]);


    // Function to handle save button press
    const handleSave = () => {
        // Update user information in Firestore
        const data = {
            name: username,
            phoneNumber: phoneNumber,
            email: email,
            uid: user.uid
        };

        setDoc(docRef, data).then(() => {
            console.log("Document has been changed successfully");
        })
            .catch(error => {
                console.log(error);
            })

        setEditMode(false);
    };

    const handleLogout = () => {
        auth.signOut();
        navigation.navigate('LoginScreen')
    };

    return (
        <View style={styles.container}>
            {/* Display user information */}
            <Text style={styles.label}>שם משתמש:</Text>
            {editMode ? (
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
            ) : (
                <Text style={styles.text}>{username}</Text>
            )}

            <Text style={styles.label}>אימייל:</Text>
            <Text style={styles.text}> {email} </Text>
            {/* {editMode ? (
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                />
            ) : (
                <Text style={styles.text}>{email}</Text>
            )} */}

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
