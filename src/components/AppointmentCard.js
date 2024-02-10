import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../styles/CalendarClientStyles";
import NavigationButton from "./NavigationButton";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getHour } from "../shared/dateMethods";

const AppointmentCard = ({ appointment }) => {

    return (
        <View style={styles.card}>
            <View style={styles.cardTopRow}>
                <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.businessLogo} />
                <View>
                    <Text style={styles.title}>{appointment.businessName}</Text>
                    <Text style={styles.subTitle}>{appointment.name}</Text>
                </View>
            </View>
            <View style={styles.cardMiddleRow}>
                <View style={styles.iconAndTextContainer}>
                    <FontAwesome name="calendar" size={22} color="black" />
                    <Text>{new Date(appointment.startTime).toLocaleDateString('he-IL')}</Text>
                </View>
                <View style={styles.iconAndTextContainer}>
                    <MaterialCommunityIcons name="currency-ils" size={22} color="black" />
                    <Text>{appointment.price}</Text>
                </View>
                <View style={styles.iconAndTextContainer}>
                    <AntDesign name="clockcircleo" size={22} color="black" />
                    <Text>{`${getHour(appointment.startTime)} - ${getHour(appointment.endTime)}`}</Text>
                </View>
            </View>
            <View style={styles.cardMiddleRow}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>עריכה</Text>
                </Pressable>
                <NavigationButton destination='הבושם 63 תל אביב יפו' />
            </View>
        </View>
    );
}

export default AppointmentCard;