import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { styles } from '../styles/ResultScreenStyles';
import { getDownloadURL, ref } from '@firebase/storage';
import { storage } from '../firebaseConfig';



const ResultCard = ({ business, navigation }) => {
const [pictures, setPictures] = useState([]);
const [logo, setLogo] = useState('');
useEffect(() => {
  const fetchPictures = async () => {
    const pics = [];
    if (!business || !business.pictures) return;
    await Promise.all(business.pictures.map(async picture => {
      if (picture.url) result.push(picture.url);
      else if (typeof picture === 'string') {
        try {
          const storageRef = ref(storage, picture);
          const url = await getDownloadURL(storageRef)
          pics.push(url);
        } catch (err) {
          console.log(err);
        }
      }
    }));
    setPictures(pics);
    const logoUrl = business.logo
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
  };

  fetchPictures();
}, []);

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

        

        <View>
        <TouchableOpacity onPress={() => navigation.navigate('BusinessPage', { business })}>
        <View style={styles.container2}>
          {logo && <Image source={{ uri: logo }} style={styles.businessLogo} />}
          <View style={styles.textContainer2}>
            <Text style={styles.title}>{business.businessName}</Text>
          </View>
        </View>
      </TouchableOpacity>


          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ ...styles.photosContainer, width: 250 }} // Adjust the width as needed
          >
            {pictures.map((picture, index) => (
              <Image key={index} source={{ uri: picture }} style={styles.photo} />
            ))}
          </ScrollView>


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
