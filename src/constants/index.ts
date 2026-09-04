export const API_TOKEN = process.env.API_TOKEN;
export const API_URL = process.env.API_URL || "https://api.themoviedb.org/";
export const API_IMG_URL =
  process.env.API_IMG_URL || "https://image.tmdb.org/t/p/";

// Mapping of TMDB genre ids → Spanish names (used when the API only returns genre_ids).
export const GENRE_MAP: Record<number, string> = {
  28: "Acción",
  12: "Aventura",
  16: "Animación",
  35: "Comedia",
  80: "Crimen",
  99: "Documental",
  18: "Drama",
  10751: "Familiar",
  14: "Fantasía",
  36: "Historia",
  27: "Terror",
  10402: "Música",
  9648: "Misterio",
  10749: "Romance",
  878: "Ciencia Ficción",
  10770: "Película de TV",
  53: "Suspenso",
  10752: "Bélica",
  37: "Western",
};

export const genreName = (genreId: number): string =>
  GENRE_MAP[genreId] || "Género";