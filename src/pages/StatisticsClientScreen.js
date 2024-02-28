import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const StatisticsClientScreen = () => {
    
    return ( 
        <LinearGradient colors={['#4169e1','#2f80ed','#6495ed','#87ceeb']} style={{flex: 1}}>
        <View>
            <Text>Statistics Client Page</Text>
        </View>

        </LinearGradient>
     );
}

export default StatisticsClientScreen;