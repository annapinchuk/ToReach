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
      height: 15,
      flex: 1,
      paddingTop: 30,
    },
});
