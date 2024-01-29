import { StyleSheet } from "react-native";

// Styles
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5B8BDF',
        padding: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: 'white'
    },
    text: {
        color: 'white',
        fontSize: 16,
        marginTop: 8,
    },
    input: {
        fontSize: 16,
        marginTop: 8,
        borderWidth: 1,
        padding: 8,
        color: 'white',
        borderColor: 'white',
    },
    button: {
        backgroundColor: '#3B82F6',
        width: 120,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
    },
    logoutButton: {
        backgroundColor: '#F87171',
        width: 120,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 30
    }
});