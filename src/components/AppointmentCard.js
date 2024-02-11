import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../styles/CalendarClientStyles";
import NavigationButton from "./NavigationButton";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getHour } from "../shared/dateMethods";
import Toast from "react-native-toast-message";

const AppointmentCard = ({ navigation, appointment, isEditable }) => {

    const handleEdit = () => {
        const diff = appointment.endTime.getTime() - appointment.startTime.getTime();
        const duration = Math.round(diff / 60000);
        const torType = {
            price: appointment.price,
            name: appointment.name,
            duration: duration,
        };
        const appointmentToSend = {
            ...appointment,
            torType: torType,
            date: appointment.startTime.toString(),
            startTime: getHour(appointment.startTime),
            endTime: undefined,
        };
        navigation.navigate("BookAppointmentScreen", { appointment: appointmentToSend, businessID: appointment.businessID })
    }

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
                {
                    isEditable ?
                        <Pressable style={styles.button} onPress={handleEdit}>
                            <Text style={styles.buttonText}>עריכה</Text>
                        </Pressable> :
                        <Pressable style={styles.buttonDisabled} onPress={() => {
                            Toast.show({
                                type: 'error',
                                text1: 'לא ניתן לערוך תור זה'
                            });
                        }}>
                            <Text style={styles.buttonText}>עריכה</Text>
                        </Pressable>
                }

                <NavigationButton destination={appointment.address} />
            </View>
        </View>
    );
}

export default AppointmentCard;