import { StyleSheet } from "react-native";

// Styles
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5B8BDF',
        // alignItems: 'center',
         paddingHorizontal:30,
    
      },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        color: 'white',
        textAlign: 'left',
        marginBottom: 15,
    },
    card: {
        width: '100%',
        height:'8%',
        backgroundColor: 'rgba(255, 255, 255 , 0.4)',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'column',
        gap: 10,
        flexDirection: 'row', // Display items in the same row
        marginBottom: 16, // Add margin between cards
        alignItems: 'center', // Center items vertically within the card
      
    },
    text: {
        color: 'white',
        fontSize: 16,
        // marginTop: 8,
        textAlign: 'left',
    },
    input: {
        fontSize: 16,
        marginTop: 1,
        borderWidth: 1,
        padding: 4,
        color: 'white',
        borderColor: 'white',
        textAlign: 'right',
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