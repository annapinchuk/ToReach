import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    logInScreen: {
        container: {
            flex: 1,
            justifyContent: 'flex-start', // Align items at the top
            backgroundColor: '#5B8BDF',
            alignItems: 'center',
            paddingTop: 40, // Add padding to give some space at the top
        },
        logo: {
            width: 200, // Adjust the width as needed
            height: 200, // Adjust the height as needed
            resizeMode: 'contain', // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
        },
        // header: {
        //     color: "white",
        //     fontWeight: "bold",
        //     fontSize: 60,
        // },
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

    }
})