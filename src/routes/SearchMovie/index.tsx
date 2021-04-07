import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { ISearchMovieOwnProps, MovieValues } from "./types";
import { SearchForm, Card } from "../../components";

const SearchMovie: FC<ISearchMovieOwnProps> = () => {
  const [movieSearch, setMovieSearch] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [errorSearch, setErrorSearch] = useState(false);
  const history = useHistory();

  const openMovie = (id: number) => {
    if (id !== null) {
      history.push(`/movie/${id}`);
    }
  };

  return (
    <>
      <h2 className="font-bold text-center text-3xl font-montserrat my-4 text-gray-400 break-words whitespace-pre-wrap">
        Buscar Peli
      </h2>

      <p className="font-semibold text-center text-xl font-montserrat my-4 text-gray-400 break-words whitespace-pre-wrap">
        resultados de:
        <span className="text-gray-200 ml-3 italic">{movieSearch}</span>
      </p>

      <SearchForm
        setMovieSearch={setMovieSearch}
        setMoviesList={setMoviesList}
        setErrorSearch={setErrorSearch}
      />

      {errorSearch && (
        <p className="font-semibold text-center text-xl font-montserrat my-4 text-gray-400 break-words whitespace-pre-wrap">
          No hay resultados
        </p>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 px-5 sm:px-10 md:px-20 lg:px-40 xl:px-10 gap-8 my-8">
        {moviesList.length > 0 &&
          moviesList.map((e: MovieValues) => {
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

export default SearchMovie;
