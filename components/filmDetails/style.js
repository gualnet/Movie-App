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
    height: null,
    width: null,
  },

  share_touchable_floatingActionButton: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: "#e91e63",
    justifyContent: "center",
    alignItems: "center",
  },
  share_image: {
    width: 30,
    height: 30,
  },

  share_touchable_headerRightButton: {
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    
  },

});

export default style;