import React from 'react';
import numeral from 'numeral';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Image, ActivityIndicator } from 'react-native';
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

  _displayFilm() {
    const film = this.state.film;
    if (film) {
      console.log('001',film)
      return (
        <ScrollView style={style.scrollView}>
          <Image
            style={style.image}
            source={{uri: getImageFromApi(film.poster_path)}}
          />
          <ScrollView style={style.middleView}>
            <Text style={style.title}>{film.title}</Text>
            <Text style={style.overview}>{film.overview}</Text>
            <Text style={style.otherDetails}>{'Sorti le: ' + moment(film.release_date).format('L')}</Text>
            <Text style={style.otherDetails}>{`Note: ${film.vote_average}`}</Text>
            <Text style={style.otherDetails}>{`Nombre de votes: ${film.vote_count}`}</Text>
            <Text style={style.otherDetails}>{'Budget: '+ numeral(film.budget).format(0,0)}</Text>
            <Text style={style.otherDetails}>{'Genre(s): ' + this._formatFilmGenres(film.genres)}</Text>
            <Text style={style.otherDetails}>{'Companie(s): ' + this._formatFilmCompanies(film.production_companies)}</Text>
          </ScrollView>
          
        </ScrollView>
        // <ScrollView style={style.scrollView}>
        //   <Text>TITLE: {film.title}</Text>
        //   <Text>OVERVIEW: {film.overview}</Text>
        // </ScrollView>
    )
    }
  };

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

export default FilmDetails;
