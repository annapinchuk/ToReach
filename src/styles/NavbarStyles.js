import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
    },
    overlay: {
        height: 800,
        width: '40%',
        zIndex: 1,
        paddingTop: 50,
        backgroundColor: 'white',
        padding: 20,
    },
    PageButton: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
        marginTop: 15,
    },
    icon: {
        position: 'absolute',
        left: 16,
        zIndex: 2,
        top: 20,
    }
});

export { styles };