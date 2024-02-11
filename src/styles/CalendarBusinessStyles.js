import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    itemContainer: {
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17,
    },
    itemContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    itemTime: {
      color: 'black' ,// black
    },
    appointmentRectangle: {
      width: 60,
      backgroundColor: '#3498db',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    separator: {
      height: 1,
      backgroundColor: '#ced0ce',
    },
    emptyDate: {
      height: 250,
      flex: 1,
      justifyContent: 'center', // Center the content vertically
      alignItems: 'center',     // Center the content horizontally
      backgroundColor: '#f0f0f0', // Set a background color
      borderBottomWidth: 1,       // Add a border at the bottom
      borderBottomColor: '#ccc',  // Border color
      marginVertical: 10,         // Adjust vertical margin
    },
});
