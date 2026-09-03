/* eslint-disable no-console */
import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IGenresOwnProps, OpenGenre } from "./types";
import { getGenres } from "../../services/moviesAPI";
import { MovieIcon } from "../../assets/icons";

const Genres: FC<IGenresOwnProps> = () => {
  const [genres, setGenres] = useState([]);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleGenres = async () => {
      try {
        const res = await getGenres();
        setGenres(res);
      } catch (err) {
        console.log(err);
      }
    };
    handleGenres();

    return () => {
      getGenres(true);
    };
  }, []);

  const openGenre: OpenGenre = (id, name) => {
    if (id !== null) {
      history.push(`/generos/${name}/${id}`);
    }
  };

  return (
    <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div className="flex justify-between items-end border-b border-outline/30 pb-2">
        <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Explora por Género
        </h1>
      </div>

      {genres.length === 0 && (
        <p className="text-center text-xl font-sans my-4 text-on-surface-variant break-words whitespace-pre-wrap">
          Cargando...
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {genres.length > 0 &&
          genres.map((e: any) => {
            return (
              <div
                key={e.id}
                onClick={() => {
                  openGenre(e.id, e.name);
                }}
                className="group flex flex-col bg-surface-container border border-outline/20 rounded-xl shadow-card-soft cursor-pointer hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-full flex flex-col justify-around text-center py-6">
                  <MovieIcon className="w-12 h-12 fill-current text-on-surface-variant group-hover:text-primary mx-auto transition-colors" />
                  <div>
                    <h3 className="font-headline font-semibold my-4 text-white break-words whitespace-pre-wrap">
                      {e.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default Genres;