import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles/HomeUserScreenStyles';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const DatePickerWithTime = ({ date, setDate, time, setTime }) => {

    const isIphone = Platform.OS === 'ios';

    const [show, setShow] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const handleChange = (event, selectedDate) => {
        setShow(false);
        setDate(selectedDate);
    }

    const handleTimeChange = (event, selectedTime) => {
        setShowTime(false);
        const newDate = new Date(selectedTime);
        newDate.setDate(date.getDate());
        newDate.setSeconds(0);
        setTime(newDate);
        setDate(newDate); // also set the new time in 'date' variable
    }

    const renderAndroid = () => <View style={{ flexDirection: 'row-reverse', gap: 10 }}>
        <Pressable onPress={() => setShow(true)}>
            <View style={{ borderWidth: 3, borderColor: '#2C64C6', paddingHorizontal: 20, borderRadius: 15, paddingVertical: 5, }}>
                <Text style={styles.searchtext}>{date.toLocaleDateString()}</Text>
            </View>
        </Pressable>
        {show && <DateTimePicker
            mode="date"
            value={date}
            display='default'
            onChange={handleChange}
        />}
        <Pressable onPress={() => setShowTime(true)}>
            <View style={{ borderWidth: 3, borderColor: '#2C64C6', paddingHorizontal: 20, borderRadius: 15, paddingVertical: 5, }}>
                <Text style={styles.searchtext}>{time.toLocaleTimeString('he-IL', { minute: '2-digit', hour: '2-digit' })}</Text>
            </View>
        </Pressable>
        {showTime && <RNDateTimePicker mode="time" value={time} onChange={handleTimeChange} is24Hour={true} />}
    </View>

    const renderIOS = () =>
        <DateTimePicker
            value={selectedDate1}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={(event, date) => {
                if (date) setSelectedDate1(date);
            }}
        />

    return isIphone ? renderIOS() : renderAndroid();
}

export default DatePickerWithTime;