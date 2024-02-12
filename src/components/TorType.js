import { Pressable, Text, View,TouchableOpacity } from "react-native";
import { styles } from "../styles/CalendarClientStyles";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';




const torType = ({ appointment,onDelete }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardMiddleRow}>
                
                <Text style={styles.title}>{` ${appointment.name}`}</Text>
                {onDelete && (
                <TouchableOpacity onPress={() => onDelete(appointment)}>
                <FontAwesome name="trash-o" size={20} color="red" style={{ marginLeft: 10}} />
                </TouchableOpacity>
            )}
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