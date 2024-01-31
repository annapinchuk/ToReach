import { StyleSheet } from "react-native";

export const NavigationButtonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
    appRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    appName: {
        paddingLeft: 10,
        color: 'blue',
        textDecorationLine: 'underline'
    },
    button: {
        backgroundColor: '#3B82F6',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center'
    }
})
