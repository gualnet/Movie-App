import React from 'react';
import { View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import style from './style';
import FilmItem from '../filmItem/FilmItem';
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

  _displayDetailForFilm = (idFilm) => {
    console.log('Film ID', idFilm);
    this.props.navigation.navigate("FilmDetails", { idFilm });
  };

  render() {
    console.log('RENDER');
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
        <FlatList
          data={this.state.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <FilmItem Film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPage) {
              this._loadFilms();
            };
          }}
        >
        </FlatList>
        {this._displayLoading()}
      </View>
    );
  };
};

export default Search;