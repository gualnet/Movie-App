import React from 'react';
// import { Text } from 'react-native';
import { connect } from 'react-redux';
import FilmList from '../filmList/FilmList';
import style from './style'

class Favorites extends React.Component {

  render() {
    return (
      <FilmList
        style={style.list}
        films={this.props.favoritesFilms}
        navigation={this.props.navigation}
        // loadFilms= // is never called when page == totalPage
        page={1}
        totalPage={1}
      />
    );
  };
};

const mapStateToProps = (state) => {
  return {
    favoritesFilms: state.favoritesFilms,
  };
};

export default connect(mapStateToProps)(Favorites);