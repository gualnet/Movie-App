import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  viewMain: {
    height: 190,
    flexDirection: "row",
  },
  viewContent: {
    // backgroundColor: '#00FF00',
    flex: 1,
    margin: 5,
  },
  viewHeader: {
    flex: 3,
    flexDirection: "row",
  },
  viewMiddle: {
    flex: 7,
  },
  viewBottom: {
    flex: 1,
  },
  film_title: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5
  },
  film_vote: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666',
  },
  film_description: {
    fontStyle: 'italic',
    color: '#666666'
  },
  film_date: {
    textAlign: 'right',
    fontSize: 14
  },
  film_date: {
    textAlign: 'right',
    fontSize: 14
  },
  film_image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },

});

export default style;