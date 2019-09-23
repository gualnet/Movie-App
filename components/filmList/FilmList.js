import React from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import style from './style'
import FilmItem from '../filmItem/FilmItem';

class FilmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
    }
  };

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetails", { idFilm });
  };

  render() {
    return (
      <FlatList
          data={this.props.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <FilmItem
              Film={item}
              displayDetailForFilm={this._displayDetailForFilm}
            />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.props.page < this.props.totalPage) {
              this.props.loadFilms();
            };
          }}
          extraData={this.props.favoritesFilms}
        >
      </FlatList>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    favoritesFilms: state.favoritesFilms,
  };
};

export default connect(mapStateToProps)(FilmList);