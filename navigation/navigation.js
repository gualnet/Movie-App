import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import style from './style';
import Test from '../components/tests/Test';
import Search from '../components/search/Search';
import Favorites from '../components/favorites/favorites';
import FilmDetails from '../components/filmDetails/filmDetails';

const SearchStackNavigator = createStackNavigator({
  Search: { 
    screen: Search,
    navigationOptions: ({navigation}) => ({
      title: "Rechercher",
    })
  },
  FilmDetails: {
    screen: FilmDetails,
    navigationOptions: () => ({
      title: "Film Details",
    }),
  },
});

const MovieTabNavigator = createBottomTabNavigator({
  Test: {
    screen: Test,
  },
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: () => ({
      tabBarIcon: () => {
        return (
          <Image
            source={require('../assets/search.png')}
            style={style.bottomMenuBarButton}
          />
        );
        
      }
    }),
  },
  Favorites: {
    screen: Favorites,
    navigationOptions: () => ({
      tabBarIcon: () => {
        return (
          <Image
            source={require('../assets/fav_off.png')}
            style={style.bottomMenuBarButton}
          />
        );
      }
    }),
  },
}, {
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#F8F8F8',
  },
});

const Navigation = createAppContainer(MovieTabNavigator);

export default Navigation;