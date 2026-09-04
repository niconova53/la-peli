/* eslint-disable no-console */
import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IGenresOwnProps, OpenGenre } from "./types";
import { getGenres } from "../../services/moviesAPI";
import { genreIcon } from "../../constants";

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
        <h1 className="font-headline text-white font-bold tracking-tight" style={{ fontSize: "48px", lineHeight: "56px", letterSpacing: "-0.02em" }}>
          Explora por Género
        </h1>
        <p className="font-sans text-text-secondary max-w-2xl" style={{ fontSize: "18px", lineHeight: "28px" }}>
          Descubre tu próxima película favorita navegando por nuestras categorías cuidadosamente seleccionadas.
        </p>
      </section>

      {genres.length === 0 && (
        <p className="text-center font-sans my-4 text-text-secondary break-words whitespace-pre-wrap" style={{ fontSize: "20px" }}>
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
                className="genre-card group flex flex-col items-center justify-center bg-surface-card p-8 rounded-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden border border-border-subtle hover:border-primary h-[200px]"
              >
                <div className="genre-icon-container w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 border bg-background group-hover:bg-primary group-hover:scale-110" style={{ borderColor: "#334155" }}>
                  <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors duration-300" style={{ fontSize: "32px" }}>
                    {genreIcon(e.id)}
                  </span>
                </div>
                <h3 className="genre-title font-headline text-white group-hover:text-primary transition-colors duration-300 text-center font-bold" style={{ fontSize: "20px", lineHeight: "28px" }}>
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
