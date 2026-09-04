/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMovieSelectedOwnProps, MovieValues } from "./types";
import { getMovieById, getMovieReviews } from "../../services/moviesAPI";
import { API_IMG_URL } from "../../constants";
import { translateToSpanish, translateManyToSpanish } from "../../services/translate";

const MovieSelected: FC<IMovieSelectedOwnProps> = () => {
  const [movie, setMovie] = useState<MovieValues>({});
  const [reviews, setReviews] = useState<any[]>([]);
  const [overviewEs, setOverviewEs] = useState<string | null>(null);
  const [reviewsEs, setReviewsEs] = useState<Record<string, string>>({});

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

  useEffect(() => {
    if (movie.overview) {
      translateToSpanish(movie.overview).then(setOverviewEs);
    } else {
      setOverviewEs(null);
    }
  }, [movie.overview]);

  useEffect(() => {
    if (reviews.length === 0) {
      setReviewsEs({});
      return;
    }
    const contents = reviews.map((r) => r.content as string);
    translateManyToSpanish(contents).then((translated) => {
      const map: Record<string, string> = {};
      reviews.forEach((r, i) => {
        map[r.id] = translated[i];
      });
      setReviewsEs(map);
    });
  }, [reviews]);

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";

  return (
    <main className="flex-grow w-full flex flex-col">
      {/* Hero */}
      <section className="relative w-full overflow-hidden flex items-center" style={{ minHeight: "560px" }}>
        <div
          className="absolute inset-0 bg-cover bg-center w-full h-full bg-surface-card"
          style={
            movie.backdrop_path
              ? {
                  backgroundImage: `url(${API_IMG_URL}original${movie.backdrop_path})`,
                }
              : {}
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto p-6 md:p-12 flex flex-col gap-3">
          <span className="px-3 py-1.5 rounded-full font-headline font-bold w-max border shadow-sm bg-surface-card text-white uppercase" style={{ fontSize: "11px", letterSpacing: "0.12em", borderColor: "rgba(255,255,255,0.10)" }}>
            ★ Estreno de la Semana
          </span>
          <h1 className="font-headline text-white font-bold" style={{ fontSize: "48px", lineHeight: "56px", letterSpacing: "-0.02em" }}>
            {movie.title || "Cargando..."}
          </h1>
          <p className="font-sans text-white max-w-2xl leading-relaxed drop-shadow" style={{ fontSize: "18px", lineHeight: "28px" }}>
            {overviewEs || movie.overview || "Sinopsis no disponible por el momento — descubre esta película en detalle."}
          </p>
        </div>
      </section>

      {/* Info strip */}
      <section className="w-full max-w-[1200px] mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-card rounded-xl p-4 border border-border-subtle flex flex-col gap-1">
          <span className="font-sans text-text-secondary uppercase" style={{ fontSize: "12px", lineHeight: "14px", letterSpacing: "0.08em", fontWeight: 600 }}>
            Año
          </span>
          <span className="font-headline text-xl text-white font-bold">
            {year}
          </span>
        </div>
        <div className="bg-surface-card rounded-xl p-4 border border-border-subtle flex flex-col gap-1">
          <span className="font-sans text-text-secondary uppercase" style={{ fontSize: "12px", lineHeight: "14px", letterSpacing: "0.08em", fontWeight: 600 }}>
            Rating
          </span>
          <span className="font-headline text-xl text-white font-bold flex items-center gap-2">
            <span className="text-tertiary">★</span>
            {movie.vote_average ? movie.vote_average : "—"}
          </span>
        </div>
        <div className="bg-surface-card rounded-xl p-4 border border-border-subtle flex flex-col gap-1">
          <span className="font-sans text-text-secondary uppercase" style={{ fontSize: "12px", lineHeight: "14px", letterSpacing: "0.08em", fontWeight: 600 }}>
            Reseñas
          </span>
          <span className="font-headline text-xl text-white font-bold">
            {reviews ? reviews.length : 0}
          </span>
        </div>
        <div className="bg-surface-card rounded-xl p-4 border border-border-subtle flex flex-col gap-1">
          <span className="font-sans text-text-secondary uppercase" style={{ fontSize: "12px", lineHeight: "14px", letterSpacing: "0.08em", fontWeight: 600 }}>
            Idioma
          </span>
          <span className="font-headline text-xl text-white font-bold">
            {movie.original_language
              ? movie.original_language.toUpperCase()
              : "—"}
          </span>
        </div>
      </section>

      {/* Reviews */}
      <section className="w-full max-w-[1200px] mx-auto px-6 pb-12 flex flex-col gap-4">
        <div className="flex justify-between items-end border-b border-border-subtle pb-2">
          <h2 className="font-headline font-bold text-white tracking-tight" style={{ fontSize: "30px", lineHeight: "36px" }}>
            Reseñas de Usuarios
          </h2>
        </div>

        {reviews.length === 0 && (
          <p className="font-sans text-text-secondary py-4" style={{ fontSize: "16px", lineHeight: "24px" }}>
            Aún no hay reseñas para esta película.
          </p>
        )}

        <div className="flex flex-col gap-4">
          {reviews.length > 0 &&
            reviews.map((e: any) => {
              return (
                <div
                  key={e.id}
                  className="bg-surface-card rounded-xl p-5 border border-border-subtle flex flex-col gap-2"
                >
                  <h3 className="font-headline text-white font-bold" style={{ fontSize: "18px", lineHeight: "28px" }}>
                    {e.author}
                  </h3>
                  <p className="font-sans text-text-secondary whitespace-pre-wrap break-words" style={{ fontSize: "14px", lineHeight: "20px" }}>
                    {reviewsEs[e.id] || e.content}
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
