import { StyleSheet } from 'react-native';

export const businessPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B8BDF',
    padding: 16,
    
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
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
    alignSelf: 'flex-end'
  },
  category: {
    fontSize: 18,
    marginBottom: 8,
    color: 'white',
    textAlign: 'right',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textDecorationLine: 'underline',
    marginRight: 8,
    textAlign: 'right',
    
  },
  rating: {
    fontSize: 20,
    color: 'white',
    textAlign: 'right',
  },
  photosContainer: {
    marginTop: 16,
  },
  photo: {
    width: 150,
    height: 150,
    marginRight: 8,
    borderRadius: 8,
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    color: 'white',
    textAlign: 'right',
  },
  star: {
    fontSize: 20,
    color: 'gold',
  },
  torButton: {
    backgroundColor: '#2C64C6',
    width: 100,
    paddingVertical: 12,
    borderRadius: 20,
  },
  torButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16, // Add any additional spacing if needed
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  // Add a new style for the content container of ScrollView
  scrollViewContentContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: 15,
    marginBottom: 8
  },
});
