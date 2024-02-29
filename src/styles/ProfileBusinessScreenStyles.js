import { StyleSheet } from 'react-native';

export const ProfileBusinessScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        rowGap: 10,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 16
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 16,
    },
    businessName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    categoryRatingContainer: {
        marginTop: 8,
        marginBottom: 8,
        textAlign: 'right',
    },
    rating: {
        fontSize: 20,
        color: 'white',
        textAlign: 'right',
      },
    categoryContainer: {
        flexDirection: 'row',
        // marginTop: 8,
        // marginBottom: 8,
        alignSelf: 'flex-start'
    },
    category: {
        fontSize: 18,
        marginBottom: 8,
        color: 'white',
        textAlign: 'right',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        // textDecorationLine: 'underline',
        marginRight: 8,
        textAlign: 'left',
    },
    subLabel: {
        fontSize: 18,
        color: 'white',
        marginRight: 8,
        textAlign: 'left',
      },
    editDescriptionInput: {
        backgroundColor: 'white', // Set the background color as needed
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        textAlign: 'right'
    },
    description: {
        marginTop: 8,
        fontSize: 16,
        color: 'white',
        textAlign: 'left',
      },
      star: {
        fontSize: 20,
        color: 'gold',
      },
    dropdownStyle: {
        backgroundColor: 'white',
        borderColor: '#2C64C6',
        borderWidth: 3,
        borderRadius: 10,
        textAlign: 'left',
        alignSelf: 'flex-end'
      },
      dropdownItemStyle: {
        justifyContent: 'flex-start',
        textAlign: 'left',
    
      },
    dropdownListStyle: {
    borderColor: '#2C64C6',
    borderWidth: 3,
    textAlign: 'left',

    },
    placeHolderStyle: {
    color: "#A9A9A9",
    textAlign: 'left',

    },
    photosContainer: {
    marginVertical: 16,
    },
    photo: {
    width: 150,
    height: 150,
    marginRight: 8,
    borderRadius: 8,
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
    },
    containerTorim: {
        backgroundColor: '#5B8BDF',
        alignItems: 'center',
        paddingBottom: 40,
        paddingTop: 20,
        gap: 15,
        flex: 1,
    },

});