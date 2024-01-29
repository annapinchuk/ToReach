// Import necessary React and React Native components
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { styles } from '../styles/ProfileClientScreenStyles';

const ProfilePage = ({navigation}) => {
    // State to manage user information
    const [username, setUsername] = useState('JohnDoe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [phoneNumber, setPhoneNumber] = useState('123-456-7890');

    // State to track whether the fields are in edit mode
    const [editMode, setEditMode] = useState(false);

    // Function to handle save button press
    const handleSave = () => {
        // FIREBASE CONNECTION
        setEditMode(false);
    };

    const handleLogout = () => {
        // FIREBASE CONNECTION
        // navigation.navigate('LoginScreen')
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
            {editMode ? (
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            ) : (
                <Text style={styles.text}>{email}</Text>
            )}

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
