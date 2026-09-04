import axios from "./instance";

// const source = axios.CancelToken.source();
// cancel && source.cancel();
// ,{cancelToken: source.token}
// if (!axios.isCancel(err)) { throw err; }

export const getCurrentMovies = async (cancel: boolean = false) => {
  try {
    if (!cancel) {
      const res = await axios.get("3/movie/now_playing?language=es-ES");
      return res.data.results;
    }
  } catch (err) {
    throw err;
  }
};

export const getComingSoon = async (cancel: boolean = false) => {
  try {
    if (!cancel) {
      const res = await axios.get("3/movie/upcoming?language=es-ES");
      return res.data.results;
    }
  } catch (err) {
    throw err;
  }
};

export const getMovieById = async (
  movieId: string,
  cancel: boolean = false
) => {
  try {
    if (!cancel) {
      const res = await axios.get(`3/movie/${movieId}?language=es-ES`);
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};

export const getMovieReviews = async (
  movieId: string,
  cancel: boolean = false
) => {
  try {
    if (!cancel) {
      const res = await axios.get(`3/movie/${movieId}/reviews?language=es-ES`);
      return res.data.results;
    }
  } catch (err) {
    throw err;
  }
};

export const getGenres = async (cancel: boolean = false) => {
  try {
    if (!cancel) {
      const res = await axios.get("3/genre/movie/list?language=es-ES");
      return res.data.genres;
    }
  } catch (err) {
    throw err;
  }
};

export const getByGenre = async (genreId: string, cancel: boolean = false) => {
  try {
    if (!cancel) {
      const res = await axios.get(`3/discover/movie?with_genres=${genreId}&language=es-ES`);
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};

export const search = async (query: string) => {
  try {
    const res = await axios.get(`3/search/movie?query=${query}&language=es-ES`);
    return res.data.results;
  } catch (err) {
    throw err;
  }
};