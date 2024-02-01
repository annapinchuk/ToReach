import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
  },
  timeSlotColumn: {
    marginRight: 10,
    paddingHorizontal: 10,
  },
  timeSlot: {
    height: 30,
    justifyContent: 'center',
  },
  timeSlotText: {
    textAlign: 'right',
    color: '#777',
  },
  meetingsContainer: {
    flex: 1,
  },
  itemContainer: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  itemTime: {
    color: '#777',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
