import axios from "./instance";
import { API_KEY } from "../constants";

// const source = axios.CancelToken.source();
// cancel && source.cancel();
// ,{cancelToken: source.token}
// if (!axios.isCancel(err)) { throw err; }

export const getCurrentMovies = async (cancel: boolean = false) => {
  try {
    if (!cancel) {
      const res = await axios.get(`3/movie/now_playing?${API_KEY}`);
      return res.data.results;
    }
  } catch (err) {
    throw err;
  }
};

export const getComingSoon = async (cancel: boolean = false) => {
  try {
    if (!cancel) {
      const res = await axios.get(`3/movie/upcoming?${API_KEY}`);
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
      const res = await axios.get(`3/movie/${movieId}?${API_KEY}`);
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
      const res = await axios.get(`3/movie/${movieId}/reviews?${API_KEY}`);
      return res.data.results;
    }
  } catch (err) {
    throw err;
  }
};

export const getGenres = async (cancel: boolean = false) => {
  try {
    if (!cancel) {
      const res = await axios.get(`3/genre/movie/list?${API_KEY}`);
      return res.data.genres;
    }
  } catch (err) {
    throw err;
  }
};

export const getByGenre = async (genreId: string, cancel: boolean = false) => {
  try {
    if (!cancel) {
      const res = await axios.get(
        `3/discover/movie?${API_KEY}&with_genres=${genreId}`
      );
      return res.data;
    }
  } catch (err) {
    throw err;
  }
};

export const search = async (query: string) => {
  try {
    const res = await axios.get(`3/search/movie?query=${query}&${API_KEY}`);
    return res.data.results;
  } catch (err) {
    throw err;
  }
};
