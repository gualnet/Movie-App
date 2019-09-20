import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  view: {
    // marginTop: 40,
    flex: 1,
  },
  search_button: {
    // paddingTop: 20,
  },
  text_input: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
  },

  viewLoading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 85,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default style;