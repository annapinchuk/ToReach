import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles/HomeUserScreenStyles';

const DatePicker = ({ date, setDate }) => {

    const isIphone = Platform.OS === 'ios';

    const [show, setShow] = useState(false);

    const handleChange = (event, selectedDate) => {
        setShow(false);
        setDate(selectedDate);
    }

    const renderAndroid = () => <View>
        <Pressable onPress={() => setShow(true)}>
            <View style={{ borderWidth: 4, borderColor: '#2C64C6', paddingHorizontal: 20, borderRadius: 15, paddingVertical: 5, }}>
                <Text style={styles.searchtext}>{date.toLocaleDateString()}</Text>
            </View>
        </Pressable>
        {show && <DateTimePicker
            value={date}
            mode="date"
            display='calendar'
            onChange={handleChange}
        />}
    </View>

    const renderIOS = () =>
        <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => setDate(selectedDate)}
        />

    return isIphone ? renderIOS() : renderAndroid();
}

export default DatePicker;