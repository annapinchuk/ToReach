import { StyleSheet } from 'react-native';

export const Loginstyles = StyleSheet.create({
    // All the page
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align items at the top
        backgroundColor: '#5B8BDF',
        alignItems: 'center',
        paddingTop: 40, // Add padding to give some space at the top
        flexDirection: 'column',
        gap: 20
    },
    // Input components
    inputContainer: {
        position: 'relative', // Make the position of TextInput container relative
        width: '80%',
        alignItems : 'flex-end'   ,
        marginBottom: 5,
        marginTop: 0,
        marginTop: 10
        
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: '#2C64C6',
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 3,
        marginBottom: 10,
        paddingLeft: 8,
        textAlign: 'right',
        alignSelf: 'center',

    },
    //logo component
    logo: {
        width: 200, // Adjust the width as needed
        height: 200, // Adjust the height as needed
        resizeMode: 'contain', // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
        alignSelf: 'center',
    },
    // Button components
    button: {
        backgroundColor: '#2C64C6',
        width: 200,
        paddingVertical: 12,
        borderRadius: 10,
        alignSelf: 'center',

    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        color: 'white'
    },
    // view components
    View: {
        flexDirection: 'row', // Ensure items are in the same row and in reverse order
        alignItems: 'center', // Align items vertically in the center
        alignSelf: 'center',
        marginTop: 16,

    },
    // Text components
    LinkText: {
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
        marginRight: 3, // Add margin to separate text and button
        position: 'absolute', // Make the position of ForgotPassword container absolute
        bottom: 0, // Align to the bottom
        right: 0, // Align to the right
    },
    // Modal components
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 24,
        marginBottom: 16,
    },
    modalButton: {
        backgroundColor: '#2C64C6',
        width: 200,
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 16,
    },
    modalButtonText: {
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        color: 'white',
    },

})
