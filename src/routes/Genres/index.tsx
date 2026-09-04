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
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-6 py-10 flex flex-col gap-8">
      <section className="flex flex-col items-center justify-center text-center py-6">
        <h1 className="font-headline text-3xl md:text-4xl text-white mb-2 font-bold tracking-tight">
          Explora por Género
        </h1>
        <p className="font-sans text-base text-text-secondary max-w-2xl">
          Descubre tu próxima película favorita navegando por nuestras
          categorías cuidadosamente seleccionadas.
        </p>
      </section>

      {genres.length === 0 && (
        <p className="text-center text-xl font-sans my-4 text-text-secondary break-words whitespace-pre-wrap">
          Cargando...
        </p>
      )}

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {genres.length > 0 &&
          genres.map((e: any) => {
            return (
              <div
                key={e.id}
                onClick={() => {
                  openGenre(e.id, e.name);
                }}
                className="group flex flex-col items-center justify-center bg-surface-card p-8 rounded-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden border border-border-subtle hover:border-primary"
              >
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.05] transition-colors duration-300" />
                <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary text-primary group-hover:text-white border border-border-subtle">
                  <MovieIcon className="w-8 h-8 fill-current" />
                </div>
                <h3 className="font-headline text-xl text-white group-hover:text-primary transition-colors duration-300 text-center font-semibold">
                  {e.name}
                </h3>
              </div>
            );
          })}
      </section>
    </main>
  );
};

export default Genres;