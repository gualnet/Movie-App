import { createStore } from 'redux';
import { toggleFavorite } from './reducers/favorite';


export default createStore(toggleFavorite);

