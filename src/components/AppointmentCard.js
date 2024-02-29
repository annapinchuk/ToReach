import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/CalendarClientStyles";
import NavigationButton from "./NavigationButton";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getHour } from "../shared/dateMethods";
import Toast from "react-native-toast-message";
import { db } from "../firebaseConfig";
import { deleteDoc, doc } from "@firebase/firestore";
import RemoveButton from "./RemoveButton";

const AppointmentCard = ({ navigation, appointment }) => {

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
    const dateEdit = new Date();
    dateEdit.setMinutes(dateEdit.getMinutes() + 30);

    const deleteAppointment = async () => {
        try {
            await deleteDoc(doc(db, "Appointments", appointment.id));
            Toast.show({
                type: 'success',
                text1: 'התור נמחק בהצלחה'
            });

        }
        catch (err) {
            console.log("delete appointment: ", err);
            Toast.show({
                type: 'error',
                text1: 'התרחשה שגיאה במחיקת התור'
            });
        }
    }

    return (
        <View style={styles.card}>
            {
                appointment.startTime >= dateEdit &&
                <RemoveButton action={deleteAppointment} message=' האם למחוק את התור?' />
            }
            <Pressable onPress={() => navigation.navigate('BusinessPage', { business: { ...appointment.business, id: appointment.businessID } })}>
                <View style={styles.cardTopRow}>
                    <Image source={{ uri: 'https://picsum.photos/200' }} style={styles.businessLogo} />
                    <View>
                        <Text style={styles.title}>{appointment.business.businessName}</Text>
                        <Text style={styles.subTitle}>{appointment.name}</Text>
                    </View>
                </View>
            </Pressable>
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
                    appointment.startTime >= dateEdit ?
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

                <NavigationButton destination={appointment.business.address} />
            </View>
        </View>
    );
}

export default AppointmentCard;