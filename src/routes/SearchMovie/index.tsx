import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { ISearchMovieOwnProps, MovieValues } from "./types";
import { SearchForm, Card } from "../../components";
import { genreName } from "../../constants";

const SearchMovie: FC<ISearchMovieOwnProps> = () => {
  const [movieSearch, setMovieSearch] = useState("");
  const [moviesList, setMoviesList] = useState<MovieValues[]>([]);
  const [errorSearch, setErrorSearch] = useState(false);
  const history = useHistory();

  const openMovie = (id: number) => {
    if (id !== null) {
      history.push(`/movie/${id}`);
    }
  };

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-6 py-10 flex flex-col gap-6">
      <section className="flex flex-col items-center justify-center text-center py-6">
        <h1 className="font-headline text-white font-bold tracking-tight" style={{ fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.01em" }}>
          Encuentra tu próxima película
        </h1>
        <p className="font-sans text-text-secondary max-w-2xl" style={{ fontSize: "18px", lineHeight: "28px" }}>
          Busca por título y descubre tu próxima historia favorita.
        </p>
      </section>

      <SearchForm
        setMovieSearch={setMovieSearch}
        setMoviesList={setMoviesList}
        setErrorSearch={setErrorSearch}
      />

      {movieSearch && (
        <p className="text-center font-sans my-2 text-text-secondary break-words whitespace-pre-wrap" style={{ fontSize: "18px", lineHeight: "28px" }}>
          Resultados de:
          <span className="text-primary ml-2 italic font-medium">
            {movieSearch}
          </span>
        </p>
      )}

      {errorSearch && (
        <p className="text-center font-sans my-4 text-text-secondary break-words whitespace-pre-wrap" style={{ fontSize: "18px", lineHeight: "28px" }}>
          No hay resultados
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {moviesList.length > 0 &&
          moviesList.map((e: MovieValues) => {
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

export default SearchMovie;