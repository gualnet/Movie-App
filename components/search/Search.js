import React from 'react';
import { connect } from 'react-redux';
import { View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import style from './style';
import FilmList from '../filmList/FilmList';

import { getFilmsFromApiWithSearchedText } from '../../API/TMDb'

const { Component } = React;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      isLoading: false,
    };
    this.searchText = '';
    this.page = 0;
    this.totalPage = 0;
  }

  async _loadFilms() {
    if (this.searchText.length > 0) {
      try {
        this.setState({ isLoading: true });
        const filmsData = await getFilmsFromApiWithSearchedText(this.searchText, this.page + 1);
        this.page = filmsData.page;
        this.setState({
          films: [...this.state.films, ...filmsData.results],
          isLoading: false,
        });
      } catch (error) {
        console.error('ERRROR', error);
      }
    }
  };
  
  _searchTextInputChange(text) {
    this.searchText = text;
  };

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={style.viewLoading}>
          <ActivityIndicator size='large' color='#003AFF'/>
        </View>
      )
    }
  };

  _searchFilms() {
    this.page = 0;
    this.totalPage = 0;
    this.setState({ films: [] });
    this._loadFilms();
  };

  render() {
    console.log('RENDER Search');
    return (
      <View style={style.view}>
        <TextInput
          style={style.text_input}
          placeholder="Titre"
          onChangeText={text => this._searchTextInputChange(text)}
          onSubmitEditing={() => this._searchFilms()}
        >
        </TextInput>
        <Button
          style={style.search_button}
          title="Recherche" onPress={async () => await this._searchFilms()}>
        </Button>
        <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPage={this.totalPage}
        />
        {this._displayLoading()}
      </View>
    );
  };
};


const mapStateToProps = (state) => {
  return {
    favoritesFilms: state.favoritesFilms,
  };
};

export default connect(mapStateToProps)(Search);