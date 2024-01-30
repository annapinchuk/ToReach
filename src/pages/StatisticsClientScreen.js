// import React from 'react';
// import { View, Text } from 'react-native';

// const StatisticsClientScreen = () => {
//     return ( 
//         <View>
//             <Text>Statistics Client Page</Text>
//         </View>
//      );
// }
 
// export default StatisticsClientScreen;

// Import necessary React Native components
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Button, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const StatisticsClientScreen = () => {
  // State variables to store user selections
  const [speciality, setSpeciality] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Mock data for specialities, dates, and times
  const specialities = ['Dentist', 'Orthopedic', 'Dermatologist'];
  const dates = ['2024-02-01', '2024-02-02', '2024-02-03'];
  const times = ['10:00 AM', '02:00 PM', '04:30 PM'];

  return (
    <View style={styles.container}>
      {/* Top section with business image and name */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'business_image_url' }}
          style={styles.businessImage}
        />
        <Text style={styles.businessName}>Business Name</Text>
      </View>

      {/* Choose a speciality section */}
      <View style={styles.section}>
        <Text style={styles.sectionText}>Choose a Speciality</Text>
        <Picker
          selectedValue={speciality}
          onValueChange={(itemValue) => setSpeciality(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Speciality" value="" />
          {specialities.map((spec, index) => (
            <Picker.Item key={index} label={spec} value={spec} />
          ))}
        </Picker>
      </View>

      {/* Choose a date section */}
      <View style={styles.section}>
        <Text style={styles.sectionText}>Choose a Date</Text>
        <Picker
          selectedValue={selectedDate}
          onValueChange={(itemValue) => setSelectedDate(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Date" value="" />
          {dates.map((date, index) => (
            <Picker.Item key={index} label={date} value={date} />
          ))}
        </Picker>
      </View>

      {/* Choose a time section */}
      <View style={styles.section}>
        <Text style={styles.sectionText}>Choose a Time</Text>
        <Picker
          selectedValue={selectedTime}
          onValueChange={(itemValue) => setSelectedTime(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Time" value="" />
          {times.map((time, index) => (
            <Picker.Item key={index} label={time} value={time} />
          ))}
        </Picker>
      </View>

      {/* Save button */}
      <TouchableOpacity style={styles.saveButton}>
        <Button title="Save" onPress={() => console.log('Appointment saved')} />
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  businessImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default StatisticsClientScreen;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import CalendarPicker from 'react-native-calendars';
// import RNPickerSelect from 'react-native-picker-select';
// import RadioButtonsGroup from 'react-native-radio-buttons-group';

// const StatisticsClientScreen = () => {
//   const [selectedDay, setSelectedDay] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [selectedSpecialty, setSelectedSpecialty] = useState('');
//   const [selectedType, setSelectedType] = useState('');

//   const days = {
//     [selectedDay]: { selected: true, marked: true },
//   };

//   const times = [
//     { label: '08:30', value: '08:30' },
//     { label: '09:00', value: '09:00' },
//     { label: '09:30', value: '09:30' },
//     { label: '10:00', value: '10:00' },
//     { label: '10:30', value: '10:30' },
//     { label: '11:00', value: '11:00' },
//     { label: '11:30', value: '11:30' },
//     { label: '12:00', value: '12:00' },
//     { label: '12:30', value: '12:30' },
//     { label: '14:00', value: '14:00' },
//     { label: '14:30', value: '14:30' },
//     { label: '15:00', value: '15:00' },
//     { label: '15:30', value: '15:30' },
//     { label: '16:00', value: '16:00' },
//     { label: '16:30', value: '16:30' },
//   ];

//   const specialties = [
//     { label: 'Coloring', value: 'Coloring' },
//     { label: 'Blowout', value: 'Blowout' },
//     { label: 'Hairstyling', value: 'Hairstyling' },
//     { label: 'Manicure', value: 'Manicure' },
//     { label: 'Pedicure', value: 'Pedicure' },
//     { label: 'Manicure & Pedicure', value: 'Manicure & Pedicure' },
//   ];

//   const types = [
//     { label: 'In Person', value: 'In Person' },
//     { label: 'Audio Call', value: 'Audio Call' },
//     { label: 'Video Session', value: 'Video Session' },
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Book Appointment</Text>
//       <View style={styles.info}>
//         <Text style={styles.infoText}>Naza Beauty</Text>
//         <Text style={styles.infoText}>San Francisco, CA</Text>
//       </View>
//       <CalendarPicker
//         onDayPress={(day) => setSelectedDay(day.dateString)}
//         selectedDayColor="#FF0000"
//         selectedDayTextColor="#FFFFFF"
//         markedDates={days}
//       />
//       <RNPickerSelect
//         onValueChange={(value) => setSelectedTime(value)}
//         items={times}
//         placeholder={{ label: 'Pick a time', value: null }}
//       />
//       <RadioButtonsGroup
//         options={specialties}
//         onChange={(option) => setSelectedSpecialty(option.label)}
//         activeButton={selectedSpecialty}
//       />
//       <RadioButtonsGroup
//         options={types}
//         onChange={(option) => setSelectedType(option.label)}
//         activeButton={selectedType}
//       />
//       <View style={styles.confirm}>
//         <Text style={styles.confirmText}>Confirm</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   info: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   infoText: {
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   confirm: {
//     backgroundColor: '#FF0000',
//     borderRadius: 5,
//     padding: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   confirmText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//   },
// });

// export default StatisticsClientScreen;

