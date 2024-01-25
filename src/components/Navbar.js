import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

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
import SearchScreen from '../pages/SearchScreen'
import React from 'react';

const pageToIconName = {
    'profile': <MaterialCommunityIcons name="account" size={30} color="white" />,
    'calendar': <FontAwesome name="calendar" size={24} color="white" />,
    'SearchScreen': <AntDesign name="search1" size={24} color="white" />,
    'statistics': <Ionicons name="stats-chart" size={24} color="white" />,
};

const businessPages = {
    'profile': ProfileBusinessScreen,
    'calendar': CalendarBusinessScreen,
    'statistics': StatisticsBusinessScreen,
};

const clientPages = {
    'profile': ProfileClientScreen,
    'calendar': CalendarClientScreen,
    // 'חיפוש': SearchScreen,
    'statistics': StatisticsClientScreen,
    'SearchScreen': SearchScreen,
};


const Navbar = ({ isClient }) => {

    const Tab = createBottomTabNavigator();

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {

            // return iconName = `${pageToIconName[route.name]}${focused ? '-out' : ''}`;
            // return <Ionicons name={iconName} size={size} color={color} />;
            // return pageToIconName[route.name];

            const iconElement = pageToIconName[route.name];

            // Set the color based on the 'focused' state
            const iconColor = focused ? '#2C64C6' : 'white';

            // Clone the icon element and set the color
            return React.cloneElement(iconElement, { color: iconColor});
        },
        tabBarStyle: {
            backgroundColor: '#81A5E7',
            padding: 10,
            height: 70
        },
        tabBarActiveTintColor: '#2C64C6',
        tabBarInactiveTintColor: 'white',
        labelStyle: { paddingBottom: 10, fontSize: 10 },

    });

    const renderPages = () => {
        const pages = isClient ? clientPages : businessPages;
        return Object.keys(pages).map(page => {
            // return <Tab.Screen key={page} name={page} component={pages[page]} options={{ tabBarIcon: ({ }) => pageToIconName[page] }} />
            return <Tab.Screen key={page} name={page} component={pages[page]} />
        }
        )
    };

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='a' screenOptions={screenOptions}>
                {renderPages()}
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Navbar;