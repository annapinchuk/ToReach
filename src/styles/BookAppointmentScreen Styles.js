import { StyleSheet } from 'react-native';

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5B8BDF',
        paddingStart: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    businessImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    businessName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    section: {
        marginBottom: 20,
    },
    dateSection: {
        marginBottom: 20,
        width: '50%',
    },
    sectionText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
        color: 'white'
    },
    picker: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    options: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
    },
    option: {
        backgroundColor: 'rgba(255, 255, 255 , 0.4)',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    selectedOption: {
        backgroundColor: '#2C64C6',
        // backgroundColor: '#3B82F6',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10
    },
    saveButton: {
        backgroundColor: '#2C64C6',
        width: '50%',
        paddingVertical: 5,
        // paddingHorizontal: 0,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: 16,
        // marginBottom: 10,
        fontWeight: 'bold',
        color: 'white',
    }
});
