/* eslint-disable no-console */
import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ICurrentMoviesOwnProps, MovieValues } from "./types";
import { Card } from "../../components";
import { getCurrentMovies } from "../../services/moviesAPI";
import { API_IMG_URL, genreName } from "../../constants";

const CurrentMovies: FC<ICurrentMoviesOwnProps> = () => {
  const [movies, setMovies] = useState<MovieValues[]>([]);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleMovies = async () => {
      try {
        const res = await getCurrentMovies();
        setMovies(res);
      } catch (err) {
        console.log(err);
      }
    };
    handleMovies();

    return () => {
      getCurrentMovies(true);
    };
  }, []);

  const openMovie = (id: number) => {
    if (id !== null) {
      history.push(`/movie/${id}`);
    }
  };

  const featured = movies[0];

  return (
    <main className="flex-grow">
      {movies.length === 0 && (
        <p className="text-center text-xl font-sans my-4 text-text-secondary break-words whitespace-pre-wrap">
          Cargando...
        </p>
      )}

      {featured && (
        <section className="relative w-full h-[500px] flex items-end">
          <div className="absolute inset-0 z-0">
            {featured.backdrop_path && (
              <img
                src={`${API_IMG_URL}original${featured.backdrop_path}`}
                alt={featured.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 mt-6 border shadow-sm bg-surface-card" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
              <span className="text-tertiary text-xs leading-none">★</span>
              <span className="font-headline font-bold text-white uppercase" style={{ fontSize: "11px", letterSpacing: "0.12em" }}>
                Estreno de la Semana
              </span>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl text-white mb-2 font-bold leading-tight drop-shadow-lg">
              Estreno de la Semana: {featured.title}
            </h1>
            <p className="font-sans text-lg text-white max-w-2xl leading-relaxed drop-shadow">
              {featured.overview}
            </p>
            <div className="mt-6 flex gap-4">
              <button
                type="button"
                onClick={() => openMovie(featured.id)}
                className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-headline font-semibold flex items-center gap-2 transition-colors"
              >
                <span className="text-lg leading-none">▶</span>
                Ver Detalles
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="flex justify-between items-end mb-6">
          <h2 className="font-headline text-3xl md:text-4xl text-white font-bold tracking-tight">
            Cartelera Actual
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.length > 0 &&
            movies.map((e: MovieValues) => {
              return (
                <Card
                  key={e.id}
                  poster={e.poster_path}
                  title={e.title}
                  overview={e.overview}
                  release={e.release_date}
                  rating={e.vote_average}
                  genre={
                    e.genre_ids && e.genre_ids.length > 0
                      ? genreName(e.genre_ids[0])
                      : ""
                  }
                  movieId={e.id}
                  openMovie={openMovie}
                />
              );
            })}
        </div>
      </section>
    </main>
  );
};

export default CurrentMovies;