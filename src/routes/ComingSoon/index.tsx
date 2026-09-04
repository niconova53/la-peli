/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IComingSoonOwnProps, MovieValues } from "./types";
import { Card } from "../../components";
import { getComingSoon } from "../../services/moviesAPI";
import { genreName } from "../../constants";

const ComingSoon: FC<IComingSoonOwnProps> = () => {
  const [movies, setMovies] = useState<MovieValues[]>([]);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleMovies = async () => {
      try {
        const res = await getComingSoon();
        setMovies(res);
      } catch (err) {
        console.log(err);
      }
    };
    handleMovies();

    return () => {
      getComingSoon(true);
    };
  }, []);

  const openMovie = (id: number) => {
    if (id !== null) {
      history.push(`/movie/${id}`);
    }
  };

  return (
    <main className="flex-grow max-w-[1200px] mx-auto px-6 py-10 w-full">
      <section className="flex flex-col items-center justify-center text-center py-6">
        <h1 className="font-headline text-3xl md:text-4xl text-white mb-2 font-bold tracking-tight">
          Próximamente
        </h1>
        <p className="font-sans text-base text-text-secondary max-w-2xl">
          Conoce los estrenos que están por llegar.
        </p>
      </section>

      {movies.length === 0 && (
        <p className="text-center text-xl font-sans my-4 text-text-secondary break-words whitespace-pre-wrap">
          Cargando...
        </p>
      )}

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
    </main>
  );
};

export default ComingSoon;