/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMovieSelectedOwnProps, MovieValues } from "./types";
import { getMovieById, getMovieReviews } from "../../services/moviesAPI";
import { API_IMG_URL } from "../../constants";

const MovieSelected: FC<IMovieSelectedOwnProps> = () => {
  const [movie, setMovie] = useState<MovieValues>({});
  const [reviews, setReviews] = useState<any[]>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleMovie = async () => {
      try {
        const movieInfo = await getMovieById(id);
        const movieReviews = await getMovieReviews(id);

        setMovie(movieInfo);
        setReviews(movieReviews);
      } catch (error) {
        console.log(error);
      }
    };
    handleMovie();
    return () => {
      getMovieById("0", true);
      getMovieReviews("0", true);
    };
  }, [id]);

  const year = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "—";

  return (
    <main className="flex-grow w-full flex flex-col">
      {/* Hero */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full bg-surface-container"
          style={
            movie.backdrop_path
              ? {
                  backgroundImage: `url(${API_IMG_URL}original${movie.backdrop_path})`,
                }
              : {}
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full md:w-2/3 flex flex-col gap-3">
          <span className="bg-primary/20 text-primary-fixed px-3 py-1 rounded-full text-sm font-headline w-max border border-primary/30 backdrop-blur-sm">
            Estreno de la Semana
          </span>
          <h1 className="font-headline text-4xl md:text-6xl text-white font-extrabold tracking-tight">
            {movie.title || "Cargando..."}
          </h1>
          <p className="font-sans text-base md:text-lg text-on-surface-variant line-clamp-3 md:line-clamp-4 max-w-2xl">
            {movie.overview || "Cargando..."}
          </p>
        </div>
      </section>

      {/* Info strip */}
      <section className="w-full max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-container rounded-xl p-4 border border-outline/20 flex flex-col gap-1">
          <span className="font-sans text-xs text-on-surface-variant uppercase tracking-wide">
            Año
          </span>
          <span className="font-headline text-xl text-on-surface font-bold">
            {year}
          </span>
        </div>
        <div className="bg-surface-container rounded-xl p-4 border border-outline/20 flex flex-col gap-1">
          <span className="font-sans text-xs text-on-surface-variant uppercase tracking-wide">
            Rating
          </span>
          <span className="font-headline text-xl text-on-surface font-bold flex items-center gap-2">
            <span className="text-tertiary">★</span>
            {movie.vote_average ? movie.vote_average : "—"}
          </span>
        </div>
        <div className="bg-surface-container rounded-xl p-4 border border-outline/20 flex flex-col gap-1">
          <span className="font-sans text-xs text-on-surface-variant uppercase tracking-wide">
            Reseñas
          </span>
          <span className="font-headline text-xl text-on-surface font-bold">
            {reviews ? reviews.length : 0}
          </span>
        </div>
        <div className="bg-surface-container rounded-xl p-4 border border-outline/20 flex flex-col gap-1">
          <span className="font-sans text-xs text-on-surface-variant uppercase tracking-wide">
            Idioma
          </span>
          <span className="font-headline text-xl text-on-surface font-bold">
            {movie.original_language
              ? movie.original_language.toUpperCase()
              : "—"}
          </span>
        </div>
      </section>

      {/* Reviews */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-12 flex flex-col gap-4">
        <div className="flex justify-between items-end border-b border-outline/30 pb-2">
          <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Reseñas de Usuarios
          </h2>
        </div>

        {reviews.length === 0 && (
          <p className="font-sans text-base text-on-surface-variant py-4">
            Aún no hay reseñas para esta película.
          </p>
        )}

        <div className="flex flex-col gap-4">
          {reviews.length > 0 &&
            reviews.map((e: any) => {
              return (
                <div
                  key={e.id}
                  className="bg-surface-container rounded-xl p-5 border border-outline/20 flex flex-col gap-2"
                >
                  <h3 className="font-headline text-lg font-bold text-on-surface">
                    {e.author}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant whitespace-pre-wrap break-words">
                    {e.content}
                  </p>
                </div>
              );
            })}
        </div>
      </section>
    </main>
  );
};

export default MovieSelected;