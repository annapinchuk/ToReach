import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles/HomeUserScreenStyles';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const TimePicker = ({ time, setTime }) => {

    const isIphone = Platform.OS === 'ios';

    const [showTime, setShowTime] = useState(false);

    const handleTimeChange = (event, selectedTime) => {
        setShowTime(false);
        const newDate = new Date(selectedTime);
        newDate.setSeconds(0);
        setTime(newDate);
    }

    const renderAndroid = () => <View>
        <Pressable onPress={() => setShowTime(true)}>
            <View style={{ borderWidth: 3, borderColor: '#2C64C6', paddingHorizontal: 20, borderRadius: 15, paddingVertical: 5, }}>
                <Text style={styles.searchtext}>{time.toLocaleTimeString('he-IL', { minute: '2-digit', hour: '2-digit' })}</Text>
            </View>
        </Pressable>
        {showTime && <RNDateTimePicker mode="time" value={time} onChange={handleTimeChange} is24Hour={true} />}
    </View>

    const renderIOS = () =>
        <View style={{ borderWidth: 3, borderColor: '#2C64C6', borderRadius: 15, paddingLeft: 0, backgroundColor: "#2C64C6", }} >
            <RNDateTimePicker mode="time" value={time} onChange={handleTimeChange} is24Hour={true} textColor='white' />
        </View>

    return isIphone ? renderIOS() : renderAndroid();
}

export default TimePicker;