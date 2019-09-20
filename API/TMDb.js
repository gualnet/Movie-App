import {API_TOKEN} from '../helpers/token';

export const getFilmsFromApiWithSearchedText = async (text, page) => {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('[ERROR]', error);
  }
};

export const getImageFromApi = (name) => {
  return 'https://image.tmdb.org/t/p/w300' + name;
};

export const getFilmDetailFromApi = async (idFilm) => {
  const url = `https://api.themoviedb.org/3/movie/${idFilm}?api_key=${API_TOKEN}&language=fr`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('[ERROR]', error);
  }
}