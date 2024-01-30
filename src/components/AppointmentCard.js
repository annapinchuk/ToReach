import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/CalendarClientStyles";
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
                <View style={styles.iconAndTextContainer}>
                    <FontAwesome name="calendar" size={22} color="black" />
                    <Text>{appointment.date.toLocaleDateString('he-IL')}</Text>
                </View>
                <View style={styles.iconAndTextContainer}>
                    <MaterialCommunityIcons name="currency-ils" size={22} color="black" />
                    <Text>{appointment.price}</Text>
                </View>
                <View style={styles.iconAndTextContainer}>
                    <AntDesign name="clockcircleo" size={22} color="black" />
                    <Text>{`${appointment.startTime} - ${appointment.endTime}`}</Text>
                </View>
            </View>
            <View style={styles.cardMiddleRow}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>עריכה</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>ניווט</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default AppointmentCard;