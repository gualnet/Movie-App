import React from 'react';
import { View, Text, Image } from 'react-native';
import style from './style';
import { getImageFromApi } from '../../API/TMDb';

const { Component } = React;

/**
 * props {
 *  Film: Object
 * }
 */
class FilmItem extends Component {
  
  render() {
    const film = this.props.Film
    return (
      <View style={style.viewMain}>
        <Image style={style.film_image}
          // source={require('../../assets/icon.png')}></Image>
          source={{uri: getImageFromApi(film.poster_path)}}></Image>
        <View style={style.viewContent}>
          <View style={style.viewHeader}>
            <Text style={style.film_title}>{film.title}</Text>
            <Text style={style.film_vote}>{film.vote_average}</Text>
          </View>
          <View style={style.viewMiddle}>
            <Text style={style.film_description} numberOfLines={6}>{film.overview} </Text>
          </View>
          <View style={style.viewBottom}>
            <Text style={style.film_date}>{film.release_date}</Text>
          </View>
        </View>
        
      </View>
    );
  };
};

export default FilmItem;
// salack
// %0SlQ1BWcu^0