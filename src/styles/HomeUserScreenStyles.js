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
        width: 100, // Adjust the width as needed
        height: 100, // Adjust the height as needed
        resizeMode: 'contain', // Options: 'cover', 'contain', 'stretch', 'repeat', 'center'
    },
    button: {
        backgroundColor: '#2C64C6',
        width: 300,
        paddingVertical: 12,
        borderRadius: 20,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    iconText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    pressableWithMargin:{
        marginRight: 25
    },
    iconTextContainer: {
        flexDirection: 'colomn',
        justifyContent: 'flex-start',  
        alignItems: 'center',    
      },

      input: {
        height: 50,
        width: '75%',
        borderColor: '#2C64C6',
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 3,
        marginBottom: 16,
        paddingLeft: 8,
        textAlign: 'right',
        fontSize: 18,     
        fontWeight: 'bold',  
      },
      inputWithMargin: {
        marginTop: 30, // Adjust the margin based on your design
        // Add other styles for the input with margin if needed
      },
      rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly', // or 'space-around'
        alignItems: 'center',
        marginVertical: 20, // Adjust as needed
      },
      pressableContainer: {
        alignItems: 'center',
        marginHorizontal: 15,
      },
      serchText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
      },
      calendarIcon: {
        marginTop: 10, // Adjust the space between text and icon
      },
      categoryItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        
      },
    
      modalCloseButton: {
        backgroundColor: '#2C64C6',
        padding: 10,
        marginBottom: 30,
        marginRight:10,
        borderRadius: 10,
        alignSelf: 'flex-end',
      },
      categoryInputContainer: {
        marginBottom: 16,
        width: '80%',
        borderColor: '#2C64C6',
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 3,
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 40,
      },
    
      categoryInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    
      categoryInputText: {
        color: '#2C64C6',
        fontSize: 16,
      },
    
      categoryButton: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
      },
    
      inputPlaceholder: {
        height: 40,
        textAlign: 'right',
        color: '#CCCCCC',
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center'
      },
    
      selectedCategoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C64C6',
        borderRadius: 10,
        marginRight: 8,
        marginBottom: 8,
      },
    
      selectedCategoryText: {
        color: 'white',
        fontSize: 16,
        padding: 5,
      },
    
      removeCategoryButton: {
        color: 'white',
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold',
      },
    
      chooseButton: {
        color: 'blue',
      }
     
     
    
})