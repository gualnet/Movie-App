import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },

  loadingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollView: {
    flex: 1,
    flexDirection: "column",
    // alignContent: "center",
  },
  
  image: {
    width: '98%',
    height: 150,
    // marginLeft: 5,
    // marginRight: 5,
    alignSelf: "center",
    // justifyContent: "center",
  },

  middleView: {
    flex: 5,
    margin: 5,
  },

  title: {
    alignSelf: "center",
    flexWrap: "wrap",
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
  },

  overview: {
    alignSelf: "center",
    flexWrap: "wrap",
    fontSize: 12,
    marginTop: 6,
    marginBottom: 6,
  },

  otherDetails: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  favoriteButton: {
    alignItems: "center",
  },

  favoriteImage: {
    height: 40,
    width: 40,
  }

});

export default style;