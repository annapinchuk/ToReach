import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align items at the top
        backgroundColor: '#5B8BDF',
        alignItems: 'center',
        paddingTop: 40, // Add padding to give some space at the top
        flexDirection: 'column',
        gap: 20
    },
    logo: {
        width: 100, // Adjust the width as needed
        height: 100, // Adjust the height as needed
        resizeMode: 'contain', // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
    },
    button: {
        backgroundColor: '#2C64C6',
        width: 300,
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    iconText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    pressableWithMargin:{
        marginRight: 25
    },
    iconTextContainer: {
        flexDirection: 'colomn',
        justifyContent: 'flex-start',  
        alignItems: 'center',    
      },

      input: {
        height: 50,
        width: '75%',
        borderColor: '#2C64C6',
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 3,
        marginBottom: 16,
        paddingLeft: 8,
        textAlign: 'right',
        fontSize: 18,     
        fontWeight: 'bold',  
      },
      inputWithMargin: {
        marginTop: 30, // Adjust the margin based on your design
        // Add other styles for the input with margin if needed
      },
      serchText:{
        textAlign: 'left',
        fontSize: 18, 
        fontWeight: 'bold',
        color: 'white'
      }
     
    
})