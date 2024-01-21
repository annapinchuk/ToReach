import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/pages/HomeScreen';
import LoginScreen from './src/pages/LoginScreen';
import RegisterBusinessScreen from './src/pages/RegisterBusinessScreen';
import RegisterClientScreen from './src/pages/RegisterClientScreen';

const Stack = createNativeStackNavigator();

const App = () => {



  return (
          <NavigationContainer>
        <Stack.Navigator screenOptions={{
          header: () => <></>,
        }} initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterBusinessScreen" component={RegisterBusinessScreen} />
          <Stack.Screen name="RegisterClientScreen" component={RegisterClientScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      );
};

export default App;