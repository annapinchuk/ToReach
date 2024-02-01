import { Pressable, Text, View, TouchableOpacity  } from "react-native";
import { styles } from "../styles/ResultScreenStyles";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import BusinessPage from '../pages/BusinessPage';

import { MaterialCommunityIcons } from '@expo/vector-icons';


const AppointmentCard = ({ appointment ,navigation}) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardTopRow}>
                <View style={styles.businessLogo} />
                <View>
                <TouchableOpacity onPress={() => navigation.navigate('BusinessPage')}>
                    <Text style={styles.title}>{appointment.businessName}</Text>
                    </TouchableOpacity>
                    <Text style={styles.subTitle}>{appointment.appointmentName}</Text>
                </View>
            </View>
            <View style={styles.cardMiddleRow}>
                
                <Pressable style={styles.button} onPress={() => navigation.navigate('BusinessPage')}> 
                    <Text style={styles.buttonText}>עוד על העסק</Text>
                </Pressable>
               
            </View>
        </View>
    );
}

export default AppointmentCard;