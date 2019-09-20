import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Image, ActivityIndicator, Button } from 'react-native';
import style from './style';
import { getImageFromApi } from '../../API/TMDb';
import { getFilmDetailFromApi } from '../../API/TMDb';

class FilmDetails extends React.Component {
  constructor(props) {
    super(props);
    this.idFilm = undefined;
    this.state = {
      film: undefined,
      isLoading: true,
    };
  };

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={style.loadingView}>
          <ActivityIndicator size='large' color='#003AFF'/>
        </View>
      )
    }
  };

  _formatFilmGenres(genres) {
    if (!genres || genres.length === 0) return '';
    let genresString = '';
    let index = 0;
    while (index < genres.length - 1) {
      genresString += `${genres[index].name} / `;
      index++;
    };
    genresString += `${genres[index].name}`
    return genresString;
  };

  _formatFilmCompanies(companies) {
    if (!companies || companies.length === 0) return '';
    let cieSting = '';
    let index = 0;
    while (index < companies.length - 1) {
      cieSting += `${companies[index].name} / `;
      index++;
    };
    cieSting += `${companies[index].name}`
    return cieSting;
  };

  _toggleFavorite() {
    const action = {
      type: "TOGGLE_FAVORITE",
      value: this.state.film,
    };
    this.props.dispatch(action);
  };

  _displayFavoriteImage() {
    var sourceImage = require('../../assets/fav_off.png');
    if (this.props.favoritesFilms.findIndex(film => film.id === this.state.film.id) !== -1) {
      sourceImage = require('../../assets/fav_on.png');
    }
    return (
      <Image
        style={style.favoriteImage}
        source={sourceImage}
      />
    )
  };

  _displayFilm() {
    const film = this.state.film;
    if (film) {
      return (
        <ScrollView style={style.scrollView}>
          <Image
            style={style.image}
            source={{uri: getImageFromApi(film.poster_path)}}
          />
          <ScrollView style={style.middleView}>
            <Text style={style.title}>{film.title}</Text>
            <TouchableOpacity
              style={style.favoriteButton}
              onPress={() => this._toggleFavorite()}
            >
              {this._displayFavoriteImage()}
            </TouchableOpacity>
            <Text style={style.overview}>{film.overview}</Text>
            <Text style={style.otherDetails}>{'Sorti le: ' + moment(film.release_date).format('L')}</Text>
            <Text style={style.otherDetails}>{`Note: ${film.vote_average}`}</Text>
            <Text style={style.otherDetails}>{`Nombre de votes: ${film.vote_count}`}</Text>
            <Text style={style.otherDetails}>{'Budget: '+ numeral(film.budget).format(0,0)}</Text>
            <Text style={style.otherDetails}>{'Genre(s): ' + this._formatFilmGenres(film.genres)}</Text>
            <Text style={style.otherDetails}>{'Companie(s): ' + this._formatFilmCompanies(film.production_companies)}</Text>
          </ScrollView>
        </ScrollView>
      );
    };
  };

  componentDidUpdate() {
    // console.log('componentDidUpdate');
    this.props.favoritesFilms.map((film) => console.log('->', film.id))
  }

  async componentDidMount() {
    if (this.idFilm) {
      const data = await getFilmDetailFromApi(this.idFilm);
      this.setState({
        film: data,
        isLoading: false,
      });
    }
  };

  render() {
    // to get the params passed via the react-navigation
    const navParams = this.props.navigation.state.params;
    this.idFilm = navParams.idFilm;
    return (
      <View style={style.mainView}>
        {this._displayFilm()}
        {this._displayLoading()}
      </View>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    favoritesFilms: state.favoritesFilms,
  };
};

export default connect(mapStateToProps)(FilmDetails);
