import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/ResultScreenStyles';

const ResultCard = ({ business, navigation }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.businessLogo} />
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('BusinessPage', { business})}>
            <Text style={styles.title}>{business.businessName}</Text>
          </TouchableOpacity>
          
        </View>
      </View>
      <View style={styles.cardMiddleRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BusinessPage', { business})}>
          <Text style={styles.buttonText}>עוד על העסק</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ResultCard;
