import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import style from './style';
import { getImageFromApi } from '../../API/TMDb';
import FadeIn from '../../Animation/FadeIn';

const { Component } = React;

/**
 * props {
 *  Film: Object
 * }
 */
class FilmItem extends Component {
  _displayFavoriteImage() {
    var sourceImage = require('../../assets/fav_off.png');
    if (this.props.favoritesFilms.findIndex(film => film.id === this.props.Film.id) !== -1) {
      sourceImage = require('../../assets/fav_on.png');
      return (
        <Image
          style={style.favoriteImage}
          source={sourceImage}
        />
      )
    }
    return;
  };
  
  render() {
    const film = this.props.Film
    const displayDetailForFilm = this.props.displayDetailForFilm;
    return (
      <FadeIn>
        <TouchableOpacity
          style={style.viewMain}
          onPress={() => displayDetailForFilm(film.id)}
          >
          <Image style={style.film_image}
            source={{uri: getImageFromApi(film.poster_path)}}></Image>
          <View style={style.viewContent}>
            <View style={style.viewHeader}>
              {this._displayFavoriteImage()}
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
        </TouchableOpacity>
      </FadeIn>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    favoritesFilms: state.favoritesFilms,
  };
};

export default connect(mapStateToProps)(FilmItem);