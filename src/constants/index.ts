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

export const GENRE_ICON_MAP: Record<number, string> = {
  28: "local_fire_department",
  12: "explore",
  16: "movie",
  35: "sentiment_very_satisfied",
  80: "gavel",
  99: "videocam",
  18: "theater_comedy",
  10751: "family_restroom",
  14: "auto_awesome",
  36: "history_edu",
  27: "skull",
  10402: "music_note",
  9648: "search",
  10749: "favorite",
  878: "rocket_launch",
  10770: "live_tv",
  53: "warning",
  10752: "military_tech",
  37: "terrain",
};

export const genreName = (genreId: number): string =>
  GENRE_MAP[genreId] || "Género";

export const genreIcon = (genreId: number): string =>
  GENRE_ICON_MAP[genreId] || "movie";