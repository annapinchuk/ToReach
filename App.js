import * as React from 'react';
import Navbar from './src/components/Navbar';
import StackNavigator from './src/components/StackNavigator';
import { I18nManager } from "react-native";

// always RTL
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const App = () => {

  const isLoggedIn = true;
  const isClient = true;

  return (
      isLoggedIn ? <Navbar isClient={isClient} /> :  <StackNavigator />
  );
};

export default App;


