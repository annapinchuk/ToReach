import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

import { styles } from "./styles";

export default function App() {
  return (
    <View style={styles.logInScreen.container}>
      <Image
        style={styles.logInScreen.logo}
        source={require('./Images/logo.jpg')}
      />
      {/* <Text style={styles.logInScreen.header}>ToReach</Text> */}
      <StatusBar style="auto" />
      <View style={styles.logInScreen.middleBox}>
        <Text style={styles.logInScreen.inputBox}> Email </Text>
        <Text style={styles.logInScreen.inputBox}> Password </Text>
        <Text> Login </Text>
        <Text> Forgot password? </Text>
      </View>
    </View>
  );
}
{/* styles = StyleSheet.create(); */ }

