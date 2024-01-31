import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/ResultScreenStyles";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AppointmentCard = ({ appointment }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardTopRow}>
                <View style={styles.businessLogo} />
                <View>
                    <Text style={styles.title}>{appointment.businessName}</Text>
                    <Text style={styles.subTitle}>{appointment.appointmentName}</Text>
                </View>
            </View>
            <View style={styles.cardMiddleRow}>
                {/* onPress={() => navigation.navigate('')} */}
                <Pressable style={styles.button} > 
                    <Text style={styles.buttonText}>לקביעת תור</Text>
                </Pressable>
               
            </View>
        </View>
    );
}

export default AppointmentCard;