
import * as React from 'react';
import Navbar from './src/components/Navbar';
import StackNavigator from './src/components/StackNavigator';


const App = () => {

  const isLoggedIn = true;
  const isClient = true;

  return (
      isLoggedIn ? <Navbar isClient={isClient} /> :  <StackNavigator />
  );
};

export default App;


