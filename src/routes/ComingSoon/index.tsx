/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IComingSoonOwnProps, MovieValues } from "./types";
import { Card } from "../../components";
import { getComingSoon } from "../../services/moviesAPI";

const ComingSoon: FC<IComingSoonOwnProps> = () => {
  const [movies, setMovies] = useState([]);
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
    <>
      {movies.length === 0 && (
        <p className="font-semibold text-center text-xl font-montserrat my-4 text-gray-400 break-words whitespace-pre-wrap">
          Cargando...
        </p>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 px-5 sm:px-10 md:px-20 lg:px-40 xl:px-10 gap-8 my-8">
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
              ></Card>
            );
          })}
      </div>
    </>
  );
};

export default ComingSoon;
