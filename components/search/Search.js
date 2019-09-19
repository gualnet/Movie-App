import React from 'react';
import { View, Button, TextInput, FlatList, Text } from 'react-native';
import style from './style';
import data from '../../helpers/films';
import FilmItem from '../filmItem/FilmItem';
import { getFilmsFromApiWithSearchedText } from '../../API/TMDb'

const { Component } = React;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
    };
    this.searchText = '';
  }

  async _loadFilms() {
    if (this.searchText.length > 0) {
      try {
        const filmsData = await getFilmsFromApiWithSearchedText(this.searchText);
        this.setState({ films: filmsData.results })
        console.log('filmsData', filmsData.results[0]);
      } catch (error) {
        console.error('ERRROR', error);
      }

    }
  };
  
  _searchTextInputChange(text) {
    this.searchText = text;
  };

  render() {
    console.log('RENDER');
    return (
      <View style={style.view}>
        <TextInput
          style={style.text_input}
          placeholder="Titre"
          onChangeText={text => this._searchTextInputChange(text)}
        >
        </TextInput>
        <Button
          style={style.search_button}
          title="Recherche" onPress={async () => await this._loadFilms()}>
        </Button>
        <FlatList
          data={this.state.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <FilmItem Film={item}/>}
        >
        </FlatList>
      </View>
    );
  };
};

export default Search;