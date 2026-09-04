/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMovieSelectedOwnProps, MovieValues } from "./types";
import { getMovieById, getMovieReviews } from "../../services/moviesAPI";
import { API_IMG_URL } from "../../constants";
import { translateManyToSpanish, getCachedTranslation } from "../../services/translate";

const VISIBLE_BATCH = 5;

const MovieSelected: FC<IMovieSelectedOwnProps> = () => {
  const [movie, setMovie] = useState<MovieValues>({});
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewsEs, setReviewsEs] = useState<Record<string, string>>({});
  const [visibleCount, setVisibleCount] = useState(VISIBLE_BATCH);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleMovie = async () => {
      try {
        const movieInfo = await getMovieById(id);
        const movieReviews = await getMovieReviews(id);
        setMovie(movieInfo);
        setReviews(movieReviews);
        setVisibleCount(VISIBLE_BATCH);
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

  // Auto-traduce solo las visibles (5 primeras), con cache localStorage
  useEffect(() => {
    if (reviews.length === 0) {
      setReviewsEs({});
      return;
    }
    const visible = reviews.slice(0, visibleCount);
    // Si ya están en cache, mostrar instantáneo
    const cachedMap: Record<string, string> = {};
    const toTranslate: { id: string; content: string }[] = [];
    visible.forEach((r) => {
      const cached = getCachedTranslation(r.content);
      if (cached && cached !== r.content) {
        cachedMap[r.id] = cached;
      } else {
        toTranslate.push({ id: r.id, content: r.content });
      }
    });
    if (Object.keys(cachedMap).length > 0) {
      setReviewsEs((prev) => ({ ...prev, ...cachedMap }));
    }
    if (toTranslate.length === 0) return;

    let cancelled = false;
    translateManyToSpanish(
      toTranslate.map((t) => t.content),
      toTranslate.length
    ).then((translated) => {
      if (cancelled) return;
      const map: Record<string, string> = {};
      toTranslate.forEach((t, i) => {
        map[t.id] = translated[i];
      });
      setReviewsEs((prev) => ({ ...prev, ...map }));
    });
    return () => {
      cancelled = true;
    };
  }, [reviews, visibleCount]);

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";
  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = reviews.length > visibleCount;

  return (
    <main className="flex-grow w-full flex flex-col">
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
          <h1 className="font-headline text-white font-bold" style={{ fontSize: "48px", lineHeight: "56px", letterSpacing: "-0.02em" }}>
            {movie.title || "Cargando..."}
          </h1>
          <p className="font-sans text-white max-w-2xl leading-relaxed drop-shadow" style={{ fontSize: "18px", lineHeight: "28px" }}>
            {movie.overview || "Sinopsis no disponible por el momento — descubre esta película en detalle."}
          </p>
        </div>
      </section>

      <section className="w-full max-w-[1200px] mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-card rounded-xl p-4 border border-border-subtle flex flex-col gap-1">
          <span className="font-sans text-text-secondary uppercase" style={{ fontSize: "12px", lineHeight: "14px", letterSpacing: "0.08em", fontWeight: 600 }}>Año</span>
          <span className="font-headline text-xl text-white font-bold">{year}</span>
        </div>
        <div className="bg-surface-card rounded-xl p-4 border border-border-subtle flex flex-col gap-1">
          <span className="font-sans text-text-secondary uppercase" style={{ fontSize: "12px", lineHeight: "14px", letterSpacing: "0.08em", fontWeight: 600 }}>Rating</span>
          <span className="font-headline text-xl text-white font-bold flex items-center gap-2">
            <span className="text-tertiary">★</span>
            {movie.vote_average ? movie.vote_average : "—"}
          </span>
        </div>
        <div className="bg-surface-card rounded-xl p-4 border border-border-subtle flex flex-col gap-1">
          <span className="font-sans text-text-secondary uppercase" style={{ fontSize: "12px", lineHeight: "14px", letterSpacing: "0.08em", fontWeight: 600 }}>Reseñas</span>
          <span className="font-headline text-xl text-white font-bold">{reviews ? reviews.length : 0}</span>
        </div>
        <div className="bg-surface-card rounded-xl p-4 border border-border-subtle flex flex-col gap-1">
          <span className="font-sans text-text-secondary uppercase" style={{ fontSize: "12px", lineHeight: "14px", letterSpacing: "0.08em", fontWeight: 600 }}>Idioma</span>
          <span className="font-headline text-xl text-white font-bold">{movie.original_language ? movie.original_language.toUpperCase() : "—"}</span>
        </div>
      </section>

      <section className="w-full max-w-[1200px] mx-auto px-6 pb-12 flex flex-col gap-4">
        <div className="flex justify-between items-end border-b border-border-subtle pb-2">
          <h2 className="font-headline font-bold text-white tracking-tight" style={{ fontSize: "30px", lineHeight: "36px" }}>Reseñas de Usuarios</h2>
        </div>

        {reviews.length === 0 && (
          <p className="font-sans text-text-secondary py-4" style={{ fontSize: "16px", lineHeight: "24px" }}>Aún no hay reseñas para esta película.</p>
        )}

        <div className="flex flex-col gap-4">
          {visibleReviews.map((e: any) => (
            <div key={e.id} className="bg-surface-card rounded-xl p-5 border border-border-subtle flex flex-col gap-2">
              <h3 className="font-headline text-white font-bold" style={{ fontSize: "18px", lineHeight: "28px" }}>{e.author}</h3>
              <p className="font-sans text-text-secondary whitespace-pre-wrap break-words" style={{ fontSize: "14px", lineHeight: "20px" }}>
                {reviewsEs[e.id] || e.content}
              </p>
              {!reviewsEs[e.id] && (
                <span className="font-sans text-xs text-text-secondary/60" style={{ fontSize: "11px" }}>Traduciendo automáticamente...</span>
              )}
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + VISIBLE_BATCH)}
            className="self-center mt-2 px-6 py-2.5 rounded-full border border-border-subtle text-text-secondary hover:border-primary hover:text-primary font-sans font-semibold transition-colors"
            style={{ fontSize: "14px" }}
          >
            Ver más reseñas ({reviews.length - visibleCount} restantes)
          </button>
        )}
      </section>
    </main>
  );
};

export default MovieSelected;
