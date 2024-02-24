import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../styles/ResultScreenStyles';
import { getDownloadURL, ref } from '@firebase/storage';
import { storage } from '../firebaseConfig';

const ResultCard = ({ business, navigation }) => {

  const [logo, setLogo] = useState('');

  useEffect(() => {
    const fetchLogo = async () => {
      const logoUrl = business.logo;
      if (!logoUrl || logoUrl.includes('picsum')) {
        setLogo(logoUrl);
        return;
      }
      try {
        const storageRef = ref(storage, logoUrl);
        const logoUrlToShow = await getDownloadURL(storageRef);
        setLogo(logoUrlToShow);
      } catch (err) {
        console.log(err);
      }
    }

    fetchLogo();
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.cardTopRow}>
        <View style={styles.businessLogo} >
          {logo && <Image source={{ uri: logo }} style={styles.businessLogo} />}
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('BusinessPage', { business })}>
            <Text style={styles.title}>{business.businessName}</Text>
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.cardMiddleRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BusinessPage', { business })}>
          <Text style={styles.buttonText}>עוד על העסק</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ResultCard;
