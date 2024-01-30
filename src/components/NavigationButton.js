import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, Platform, ActionSheetIOS, Modal } from 'react-native';
import { NavigationButtonStyles } from '../styles/NavigationButtonStyles';
// Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NavigationButton = ({ destination }) => {

    // State to control the visibility of the modal on Android
    const [modalVisible, setModalVisible] = useState(false);

    const NameToIcon = {
        'Waze': <FontAwesome5 name="waze" size={24} color="black" />,
        'Google Maps': <MaterialCommunityIcons name="google-maps" size={24} color="black" />,
        'Moovit': <MaterialCommunityIcons name="map-marker-account" size={24} color="black" />
    }

    const NameToURL = {
        'Waze': `https://www.waze.com/ul?q=${encodeURIComponent(destination)}`,
        'Google Maps': Platform.OS === 'ios'
            ? `http://maps.apple.com/?q=${encodeURIComponent(destination)}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`,
        'Moovit': `moovit://directions?dest_lat=0&dest_lon=0&dest_name=${encodeURIComponent(destination)}`
    }

    // Function to open the selected navigation app
    const openNavigationApp = (app) => {
        const url = NameToURL[app]

        // Open the URL using the Linking module
        Linking.openURL(url)
            .catch(err => console.error('Error opening Waze:', err));
    };

    // Function to open the app chooser (ActionSheetIOS on iOS, Modal on Android)
    const openAppChooser = () => {
        if (Platform.OS === 'ios') {
            // On iOS, show the native ActionSheetIOS for app selection
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancel', 'Waze', 'Google Maps', 'Moovit'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    // Handle the selected app based on the button index
                    if (buttonIndex === 1) {
                        openNavigationApp('waze');
                    } else if (buttonIndex === 2) {
                        openNavigationApp('google-maps');
                    } else if (buttonIndex === 3) {
                        openNavigationApp('moovit');
                    }
                }
            );
        } else {
            // On Android, set the modal to visible for app selection
            setModalVisible(true);
        }
    };

    // Function to close the app chooser modal on Android
    const closeAppChooser = () => setModalVisible(false);

    // Function to render the app chooser modal on Android
    const renderAndroidModal = () => (
        <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={closeAppChooser}
        >
            <View style={NavigationButtonStyles.container}>
                <View style={NavigationButtonStyles.modal}>
                    {Object.keys(NameToIcon).map(key =>
                        <TouchableOpacity key={key} onPress={() => { closeAppChooser(); openNavigationApp(key); }}>
                            <View style={NavigationButtonStyles.appRow}>
                                {NameToIcon[key]}
                                <Text style={NavigationButtonStyles.appName}>{key}</Text>
                            </View>
                        </TouchableOpacity>)}
                </View>
            </View>
        </Modal>
    );

    // Render the main component
    return (
        <TouchableOpacity onPress={openAppChooser}>
            {/* Button to open the app chooser */}
            <View style={NavigationButtonStyles.button}>
                <Text style={NavigationButton.buttonText}>ניווט</Text>
                <MaterialCommunityIcons name="map-marker-outline" size={24} color="white" />
            </View>
            {/* Render the app chooser modal for Android */}
            {Platform.OS === 'android' && renderAndroidModal()}
        </TouchableOpacity>
    );
}

export default NavigationButton;