import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// import pages
import ProfileBusinessScreen from '../pages/ProfileBusinessScreen';
import CalendarBusinessScreen from '../pages/CalendarBusinessScreen';
import StatisticsBusinessScreen from '../pages/StatisticsBusinessScreen';
import ProfileClientScreen from '../pages/ProfileClientScreen';
import CalendarClientScreen from '../pages/CalendarClientScreen';
import StatisticsClientScreen from '../pages/StatisticsClientScreen';
import HomeUserScreen from '../pages/HomeUserScreen';
import React from 'react';
import { Image } from 'react-native';

const pageToIconName = {
    'פרופיל': <MaterialCommunityIcons name="account" size={30} color="white" />,
    'יומן': <FontAwesome name="calendar" size={24} color="white" />,
    'חיפוש': <AntDesign name="search1" size={24} color="white" />,
    'סטטיסטיקות': <Ionicons name="stats-chart" size={24} color="white" />,
};

const businessPages = {
    'יומן': CalendarBusinessScreen,
    'סטטיסטיקות': StatisticsBusinessScreen,
    'פרופיל': ProfileBusinessScreen,
};

const clientPages = {
    'חיפוש': HomeUserScreen,
    'יומן': CalendarClientScreen,
    // 'סטטיסטיקות': StatisticsClientScreen,
    'פרופיל': ProfileClientScreen,
    
};


const Navbar = ({ route, navigation }) => {

    const isClient = route.params.isClient;
    const Tab = createBottomTabNavigator();

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {

            const iconElement = pageToIconName[route.name];

            // Set the color based on the 'focused' state
            const iconColor = focused ? '#2C64C6' : 'white';

            // Clone the icon element and set the color
            return React.cloneElement(iconElement, { color: iconColor });
        },
        headerStyle: {
            backgroundColor: '#5B8BDF',
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
            height: 125 ,
        },
        headerTitleStyle: {
            color: 'white'
        },
        tabBarStyle: {
            backgroundColor: '#81A5E7',
            padding: 10,
            height: 70
        },
        tabBarActiveTintColor: '#2C64C6',
        tabBarInactiveTintColor: 'white',
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        headerRight: () => <Image
            style={{
                width: 75, // Adjust the width as needed
                height: 75, // Adjust the height as needed
                resizeMode: 'contain', // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
            }}
            source={require('../../Images/logo.jpg')}
        />

    });

    const renderPages = () => {
        const pages = isClient ? clientPages : businessPages;
        return Object.keys(pages).map(page => {
            return <Tab.Screen key={page} name={page} component={pages[page]} />
        })
    };

    return (
        <Tab.Navigator initialRouteName='חיפוש' screenOptions={screenOptions}>
            {renderPages()}
        </Tab.Navigator>
    );
}

export default Navbar;