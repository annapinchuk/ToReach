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
    middleBox: {
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-evently",
        alignItems: "center",
        height: "95%",
    },
    inputBox: {
        backgroundColor: "white",
        width: "80%",
        // color: "gray",
    },
    button: {
        fontSize: 18
    }
})