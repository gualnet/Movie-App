
const initialState = {
  favoritesFilms: [],
};

export const toggleFavorite = (state = initialState, action) => {

  let nextState = {
    favoritesFilms: [...state.favoritesFilms]
  };

  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const favoriteFilmIndex = state.favoritesFilms.findIndex(film => film.id === action.value.id);
      if (favoriteFilmIndex !== -1) {
        nextState.favoritesFilms.splice(favoriteFilmIndex, 1);
      } else {
        nextState.favoritesFilms.push(action.value);
      }
      return nextState;
    default:
      return nextState;
  }
};
