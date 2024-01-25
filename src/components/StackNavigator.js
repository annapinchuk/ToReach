import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../pages/HomeScreen';
import LoginScreen from '../pages/LoginScreen';
import RegisterBusinessScreen from '../pages/RegisterBusinessScreen';
import RegisterClientScreen from '../pages/RegisterClientScreen';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterBusinessScreen" component={RegisterBusinessScreen} />
                <Stack.Screen name="RegisterClientScreen" component={RegisterClientScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;