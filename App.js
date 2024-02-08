import * as React from 'react';
import Navbar from './src/components/Navbar';
import { I18nManager } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/pages/LoginScreen';
import RegisterBusinessScreen from './src/pages/RegisterBusinessScreen';
import RegisterClientScreen from './src/pages/RegisterClientScreen';
import SearchScreen from './src/pages/SearchScreen';
import ResultScreen from './src/pages/ResultScreen';
import { NavigationContainer } from '@react-navigation/native';
import BusinessPage from "./src/pages/BusinessPage";
import BookAppointmentScreen from "./src/pages/BookAppointmentScreen";

// always RTL
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="Navbar" component={Navbar} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'התחברות' }} />
        <Stack.Screen name="RegisterBusinessScreen" component={RegisterBusinessScreen} options={{ title: 'הרשמה לעסק' }} />
        <Stack.Screen name="RegisterClientScreen" component={RegisterClientScreen} options={{ title: 'הרשמה' }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'חיפוש' }} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{ title: 'תוצאות' }} />
        <Stack.Screen name="BusinessPage" component={BusinessPage} options={{ title: 'מסך עסק' }} />
        <Stack.Screen name="BookAppointmentScreen" component={BookAppointmentScreen} options={{ title: 'קביעת תור' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


