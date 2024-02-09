// TorTypeInput.js

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { businessPageStyles } from '../styles/BusinessPageStyles';

const TorTypeInput = ({ onAddTorType }) => {
  const [newTorType, setNewTorType] = useState({
    name: '',
    duration: '',
    price: '',
  });

  const handleInputChange = (key, value) => {
    setNewTorType(prevState => ({ ...prevState, [key]: value }));
  };

  const addTorType = () => {
    if (newTorType.name && newTorType.duration && newTorType.price) {
      onAddTorType(newTorType);
      setNewTorType({ name: '', duration: '', price: '' });
    } else {
      console.log('Please fill in all fields.');
    }
  };

  return (
    <View style={businessPageStyles.scrollViewContentContainer}>
      <TextInput
        style={businessPageStyles.editDescriptionInput} 
        placeholder="שם הטיפול"
        value={newTorType.name}
        onChangeText={value => handleInputChange('name', value)}
      />
      <TextInput
        style={businessPageStyles.editDescriptionInput}
        placeholder="משך הטיפול (דקות)"
        value={newTorType.duration}
        onChangeText={value => handleInputChange('duration', value)}
        keyboardType="numeric"
      />
      <TextInput
        style={businessPageStyles.editDescriptionInput}
        placeholder="מחיר הטיפול"
        value={newTorType.price}
        onChangeText={value => handleInputChange('price', value)}
        keyboardType="numeric"
      />
      <Pressable
        style={businessPageStyles.torButton} 
        onPress={addTorType}
      >
        <Text style={businessPageStyles.buttonText}>הוסף טיפול</Text>
      </Pressable>
    </View>
  );
};

export default TorTypeInput;
