import React from 'react';
import { View, Button, TextInput, FlatList, Text } from 'react-native';
import style from './style';
import data from '../../helpers/films';
import FilmItem from '../filmItem/FilmItem';

const { Component } = React;

class Search extends Component {
  
  render() {
    return (
      <View style={style.view}>
        <TextInput
          style={style.text_input}
          placeholder="Titre">
        </TextInput>
        <Button
          style={style.search_button}
          title="Recherche" onKeyPress={() => {machine = 'coucou'}}>
        </Button>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <FilmItem Film={item}/>}
        >
        </FlatList>
      </View>
    );
    
  };
};

export default Search;