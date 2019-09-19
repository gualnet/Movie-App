import {API_TOKEN} from '../helpers/token';

export const getFilmsFromApiWithSearchedText = async (text) => {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('[ERROR]', error);
  }
};