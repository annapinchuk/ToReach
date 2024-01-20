import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'flex-start', // Align items at the top
        backgroundColor: '#5B8BDF',
        alignItems: 'center',
        paddingTop: 0, // Add padding to give some space at the top
        flexDirection: 'row',
        gap: 20
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align items at the top
        backgroundColor: '#5B8BDF',
        alignItems: 'center',
        alignItems: 'flex-end',
        paddingTop: 40, // Add padding to give some space at the top
        flexDirection: 'column',
        gap: 20
    },
    forgotContainer: {
        flex: 1,
        justifyContent: 'flex-start', // Align items at the top
        backgroundColor: '#5B8BDF',
        alignItems: 'flex-end',
        paddingTop: 0, // Add padding to give some space at the top
        flexDirection: 'column',
        gap: 20
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: '#2C64C6',
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 3,
        marginBottom: 16,
        paddingLeft: 8,
        textAlign: 'right',
        alignSelf: 'center',

    },
    inputContainer: {
        position: 'relative', // Make the position of TextInput container relative
    },
    logo: {
        width: 200, // Adjust the width as needed
        height: 200, // Adjust the height as needed
        resizeMode: 'contain', // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#2C64C6',
        width: 200,
        paddingVertical: 12,
        borderRadius: 10,
        alignSelf: 'center',

    },
    View: {
        flexDirection: 'row-reverse', // Ensure items are in the same row and in reverse order
        alignItems: 'center', // Align items vertically in the center
        marginTop: 16,
        
    },
    loginText: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 16,
        marginRight: 8, // Add margin to separate text and button
        
    },
    Text: {
        color: 'black',
        fontSize: 16,
        marginRight: 8, // Add margin to separate text and button
    },
    ForgotPassword: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 16,
        position: 'absolute', // Make the position of ForgotPassword container absolute
        bottom: 0, // Align to the bottom
        right: 0, // Align to the right

    },
    
    buttonText: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        color: 'white'
    }
    
})
