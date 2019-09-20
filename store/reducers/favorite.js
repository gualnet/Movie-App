

const initialState = {
  favoritesFilms: [],
};

export const toggleFavorite = (state = initialState, action) => {

  let nextState = {
    favoritesFilms: [...favoritesFilms]
  };

  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const favoriteFilmIndex = state.favoritesFilms.findIndex(item => item.id === action.value.id);
      if (favoriteFilmIndex !== -1) {
        nextState.favoritesFilms.filter((item, index) => index !== favoriteFilmIndex);
      } else {
        nextState.favoritesFilms.push(action.value);
      }
    default:
      return nextState;
  }
};
