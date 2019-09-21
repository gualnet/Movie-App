import React from 'react';
import { Platform, View } from 'react-native';
import style from './style';

class Test extends React.Component {

  render() {
    console.log('Platform', Platform.OS)
    console.log('Platform', Platform.Version)
    // console.log('Platform', Platform.OS)
    return (
      <View style={style.main_container}>
        <View style={style.subview_container}>
          
        </View>
      </View>
    )
  }
}

export default Test