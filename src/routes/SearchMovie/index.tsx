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
    <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
      <section className="flex flex-col items-center justify-center text-center py-6">
        <h1 className="font-headline text-3xl md:text-4xl text-on-surface mb-2 font-bold tracking-tight">
          Encuentra tu próxima película
        </h1>
        <p className="font-sans text-base text-on-surface-variant max-w-2xl">
          Busca por título y descubre tu próxima historia favorita.
        </p>
      </section>

      <SearchForm
        setMovieSearch={setMovieSearch}
        setMoviesList={setMoviesList}
        setErrorSearch={setErrorSearch}
      />

      {movieSearch && (
        <p className="text-center text-lg font-sans my-2 text-on-surface-variant break-words whitespace-pre-wrap">
          Resultados de:
          <span className="text-primary ml-2 italic font-medium">
            {movieSearch}
          </span>
        </p>
      )}

      {errorSearch && (
        <p className="text-center text-xl font-sans my-4 text-on-surface-variant break-words whitespace-pre-wrap">
          No hay resultados
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
              />
            );
          })}
      </div>
    </main>
  );
};

export default SearchMovie;