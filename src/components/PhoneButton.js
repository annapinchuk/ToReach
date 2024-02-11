// PhoneButton.js
import React from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';
import { businessPageStyles } from '../styles/BusinessPageStyles';
const PhoneButton = ({ phoneNumber }) => {
  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <TouchableOpacity onPress={handleCallPress}>
      <Text style={businessPageStyles.category}> {phoneNumber}</Text>
    </TouchableOpacity>
  );
};

export default PhoneButton;
