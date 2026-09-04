/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IGenreSelectedOwnProps, MovieValues } from "./types";
import { Card } from "../../components";
import { getByGenre } from "../../services/moviesAPI";
import { genreName } from "../../constants";

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
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-6 py-10 flex flex-col gap-6">
      <div className="flex justify-between items-end border-b border-border-subtle pb-2">
        <h1 className="font-headline text-white font-bold tracking-tight capitalize" style={{ fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.01em" }}>
          {name ? name.replace(/-/g, " ") : ""}
        </h1>
      </div>

      {movies.length === 0 && (
        <p className="text-center font-sans my-4 text-text-secondary break-words whitespace-pre-wrap" style={{ fontSize: "18px", lineHeight: "28px" }}>
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

export default GenreSelected;