import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/CalendarClientStyles";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const torType = ({ appointment }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardTopRow}>
                <Text style={styles.title}>{` ${appointment.name}`}</Text>
            </View>
            <View style={styles.cardMiddleRow}>
                <View style={styles.iconAndTextContainer}>
                    <MaterialCommunityIcons name="currency-ils" size={22} color="black" />
                    <Text>{appointment.price}</Text>
                </View>
                <View style={styles.iconAndTextContainer}>
                    <AntDesign name="clockcircleo" size={22} color="black" />
                    <Text>{`${appointment.duration}`}</Text>
                </View>
            </View>
        </View>
    );
}

export default torType;