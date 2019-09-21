import { StyleSheet, Platform } from 'react-native';

const style = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subview_container: {
    backgroundColor: Platform.OS === 'ios' ? 'red' : 'blue',
    width: 50,
    height: 50,
  },
});

export default style;