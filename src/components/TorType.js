import { Pressable, Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles/CalendarClientStyles";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RemoveButton from "./RemoveButton";




const torType = ({ appointment, onDelete }) => {
    return (
        <View style={styles.card}>
            {
                onDelete && <RemoveButton action={onDelete} message=' האם למחוק את סוג תור זה?' />
            }
            <View style={styles.cardMiddleRow}>

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