import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Platform, View, Text, Image, ActivityIndicator, Share } from 'react-native';
import style from './style';
import { getImageFromApi } from '../../API/TMDb';
import { getFilmDetailFromApi } from '../../API/TMDb';
import EnlargeShrink from '../../Animation/EnlargeShrink';

class FilmDetails extends React.Component {
  // surcharge de la fonction react
  static navigationOptions = ({ navigation }) => {
    // ici la magie.. on recupere les data passé via le state de la navigation
    const params = navigation.state.params;
    // puis 
    if (params.film && Platform.OS === 'ios') {
      return {
        headerRight: (
          <TouchableOpacity
            style={style.share_touchable_headerRightButton}
            onPress={() => params.shareFilm()}>
            <Image
              style={style.share_image}
              source={require('../../assets/ic_share.png')} />
          </TouchableOpacity>
        ),
      };
    }

    
  };

  constructor(props) {
    super(props);
    this.idFilm = undefined;
    this.state = {
      film: undefined,
      isLoading: true,
    };
  };

  _updateNavigationParams() {
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film,
    });
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
    let imageHeight = 40;
    let imageWidth = 40;
    if (this.props.favoritesFilms.findIndex(film => film.id === this.state.film.id) !== -1) {
      sourceImage = require('../../assets/fav_on.png');
      imageHeight = 80;
      imageWidth = 80;
    }
    // enlargeShrink provide animation for the fav icon
    return (
      <EnlargeShrink
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        style={style.favoriteImage}
        source={sourceImage} />
    );
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

  _displayFloatingActionButton() {
    const film = this.state.film;
    if (film && Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={style.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}>
          <Image
            style={style.share_image}
            source={require('../../assets/ic_share.png')} />
        </TouchableOpacity>
      );
    }
  };

  _shareFilm = () => {
    const film = this.state.film;
    Share.share({
      title: film.title,
      message: film.overview,
    });
  };

  componentDidUpdate() {
    // console.log('componentDidUpdate');
    this.props.favoritesFilms.map((film) => console.log('->', film.id))
  }

  async componentDidMount() {
    /**
     * on met a jour le state du component avec les données recuperees
     * 
     * puis on emet a jour le state de la navifation pour pouvoir acceder aux donnees
     * de films depuis la navigation (cf navigationOptions)
     */
    if (this.idFilm) {
      const data = await getFilmDetailFromApi(this.idFilm);
      this.setState({
        film: data,
        isLoading: false,
      }, () => { this._updateNavigationParams() });
      
    
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
        {this._displayFloatingActionButton()}
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
