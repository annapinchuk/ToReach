import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import HomeScreen from '../pages/HomeScreen';
import LoginScreen from '../pages/LoginScreen';
import RegisterBusinessScreen from '../pages/RegisterBusinessScreen';
import RegisterClientScreen from '../pages/RegisterClientScreen';
// import BusinessPage from '../pages/BusinessPage';
// import HomeUserScreen from '../pages/HomeUserScreen';
// import SearchScreen from '../pages/SearchScreen';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'מסך בית' }} /> */}
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'התחברות' }} />
                <Stack.Screen name="RegisterBusinessScreen" component={RegisterBusinessScreen} options={{ title: 'הרשמה לעסק' }} />
                <Stack.Screen name="RegisterClientScreen" component={RegisterClientScreen} options={{ title: 'הרשמה' }} />
                
                {/* <Stack.Screen name="HomeUserScreen" component={HomeUserScreen} options={{ title: 'מסך בית משתמש' }} /> */}
                {/* <Stack.Screen name="SearchScreen" component={SearchScreen} options={{title: 'חיפוש' }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator;