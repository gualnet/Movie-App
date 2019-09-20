import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Search from '../components/search/Search';
import FilmDetails from '../components/filmDetails/filmDetails';

const SearchStackNavigator = createStackNavigator({
  // each screen have a profile
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
    })
  },
});

const Navigation = createAppContainer(SearchStackNavigator);

export default Navigation;