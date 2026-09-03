/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IGenreSelectedOwnProps, MovieValues } from "./types";
import { Card } from "../../components";
import { getByGenre } from "../../services/moviesAPI";

const GenreSelected: FC<IGenreSelectedOwnProps> = () => {
  const [movies, setMovies] = useState<MovieValues[]>([]);
  const { id, name } = useParams<{ id: string; name: string }>();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleMovie = async () => {
      try {
        const res = await getByGenre(id);
        setMovies(res.results);
      } catch (error) {
        console.log(error);
      }
    };
    handleMovie();
    return () => {
      getByGenre("0", true);
    };
  }, [id]);

  const openMovie = (id: number) => {
    if (id !== null) {
      history.push(`/movie/${id}`);
    }
  };

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div className="flex justify-between items-end border-b border-outline/30 pb-2">
        <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-white tracking-tight capitalize">
          {name ? name.replace(/-/g, " ") : ""}
        </h1>
      </div>

      {movies.length === 0 && (
        <p className="text-center text-xl font-sans my-4 text-on-surface-variant break-words whitespace-pre-wrap">
          Cargando...
        </p>
      )}

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
    </main>
  );
};

export default GenreSelected;