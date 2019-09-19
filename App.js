import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Search from './components/search/Search';

export default function App() {
  return (
    <Search></Search>
    // <View style={styles.container}>
    //   <Text>Hello world !</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
