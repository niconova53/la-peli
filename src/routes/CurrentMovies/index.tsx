/* eslint-disable no-console */
import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ICurrentMoviesOwnProps, MovieValues } from "./types";
import { Card } from "../../components";
import { getCurrentMovies } from "../../services/moviesAPI";
import { API_IMG_URL } from "../../constants";

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
    <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
      {movies.length === 0 && (
        <p className="text-center text-xl font-sans my-4 text-on-surface-variant break-words whitespace-pre-wrap">
          Cargando...
        </p>
      )}

      {featured && (
        <section
          onClick={() => openMovie(featured.id)}
          className="relative w-full rounded-xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] group cursor-pointer border border-outline/30"
        >
          <div
            className="absolute inset-0 bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url(${API_IMG_URL}original${featured.backdrop_path})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full md:w-2/3 flex flex-col gap-2">
            <span className="bg-primary/20 text-primary-fixed px-3 py-1 rounded-full text-sm font-headline w-max border border-primary/30 backdrop-blur-sm">
              Estreno de la Semana
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-white font-bold tracking-tight">
              {featured.title}
            </h2>
            <p className="font-sans text-base text-on-surface-variant line-clamp-2 md:line-clamp-3">
              {featured.overview}
            </p>
            <button
              className="mt-2 bg-primary text-on-primary font-headline text-sm px-4 py-2 rounded-lg w-max hover:bg-primary-dim transition-colors shadow-md flex items-center gap-2 active:scale-95"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openMovie(featured.id);
              }}
            >
              <span className="text-lg leading-none">▶</span>
              Ver más
            </button>
          </div>
        </section>
      )}

      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-end border-b border-outline/30 pb-2">
          <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Cartelera Actual
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {movies.length > 0 &&
            movies.map((e: MovieValues) => {
              return (
                <Card
                  key={e.id}
                  poster={e.poster_path}
                  title={e.title}
                  overview={e.overview}
                  release={e.release_date}
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