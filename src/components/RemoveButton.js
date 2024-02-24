import { FontAwesome } from '@expo/vector-icons';
import { Alert, Pressable } from 'react-native';

const RemoveButton = ({ action, message }) => {

    const handlePress = () => {
        Alert.alert('', message, [
            {
                text: 'ביטול',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'אישור', onPress: action },
        ],{cancelable: true});
    }

    return (
        <Pressable onPress={handlePress} style={{ position: 'absolute', top: 4, right: 4, backgroundColor: 'rgba(255,255,255,0.5)', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 15 }}>
            <FontAwesome name="trash-o" size={20} color="red" />
        </Pressable>
    );
}

export default RemoveButton;