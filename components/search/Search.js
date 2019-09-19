import React from 'react';
import { View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
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
      isLoading: false,
    };
    this.searchText = '';
  }

  async _loadFilms() {
    if (this.searchText.length > 0) {
      try {
        this.setState({ isLoading: true });
        const filmsData = await getFilmsFromApiWithSearchedText(this.searchText);
        this.setState({
          films: filmsData.results,
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
  }

  render() {
    console.log('RENDER');
    return (
      <View style={style.view}>
        <TextInput
          style={style.text_input}
          placeholder="Titre"
          onChangeText={text => this._searchTextInputChange(text)}
          onSubmitEditing={() => this._loadFilms()}
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
        {this._displayLoading()}
      </View>
    );
  };
};

export default Search;