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
        width: 200, // Adjust the width as needed
        height: 200, // Adjust the height as needed
        resizeMode: 'contain', // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
    },
    button: {
        backgroundColor: '#2C64C6',
        width: 200,
        paddingVertical: 12,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        color: 'white'
    }
})