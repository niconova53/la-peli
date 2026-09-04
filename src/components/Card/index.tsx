import React, { FC } from "react";
import { IcardOwnProps } from "./types";
import { API_IMG_URL } from "../../constants";

const FallbackPoster: FC<{ title: string }> = ({ title }) => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface-card via-surface-container-high to-background p-6 text-center">
    <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
      <span className="material-symbols-outlined text-primary" style={{ fontSize: "32px" }}>
        movie
      </span>
    </div>
    <span className="font-headline font-bold text-white line-clamp-2 px-2" style={{ fontSize: "14px", lineHeight: "18px" }}>
      {title}
    </span>
    <span className="font-sans text-text-secondary" style={{ fontSize: "11px", letterSpacing: "0.06em" }}>
      Sin póster disponible
    </span>
  </div>
);

const Card: FC<IcardOwnProps> = ({ poster, title, overview, release, rating, genre, movieId, openMovie }) => {
  return (
    <div
      onClick={() => openMovie(movieId)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") openMovie(movieId);
      }}
      role="button"
      tabIndex={0}
      className="group relative bg-surface-card rounded-xl border border-border-subtle overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-card-hover flex flex-col h-full cursor-pointer"
    >
      <div className="relative overflow-hidden bg-surface-container-high" style={{ aspectRatio: "2 / 3" }}>
        {poster ? (
          <img
            src={`${API_IMG_URL}w500${poster}`}
            alt={`Póster de ${title}`}
            className="w-full h-full object-cover transform-gpu transition-transform duration-300 ease-out group-hover:scale-105"
            style={{ willChange: "transform" }}
          />
        ) : (
          <FallbackPoster title={title} />
        )}

        <div className="absolute top-2 left-2 right-2 flex justify-end gap-1.5 flex-wrap pointer-events-none">
          {release ? (
            <span
              className="px-2 py-1 rounded-md font-bold text-white border font-sans shrink-0"
              style={{ backgroundColor: "rgba(11, 19, 38, 0.72)", backdropFilter: "blur(6px)", fontSize: "12px", lineHeight: "14px", borderColor: "rgba(0,0,0,0.4)" }}
            >
              {release.slice(0, 4)}
            </span>
          ) : null}
          {rating ? (
            <span
              className="px-2 py-1 rounded-md font-bold text-white flex items-center gap-1 border font-sans shrink-0"
              style={{ backgroundColor: "rgba(11, 19, 38, 0.72)", backdropFilter: "blur(6px)", fontSize: "12px", lineHeight: "14px", borderColor: "rgba(0,0,0,0.4)" }}
            >
              <span className="text-tertiary leading-none" style={{ fontSize: "10px" }}>
                ★
              </span>
              {rating.toFixed(1)}
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {genre ? (
          <div className="mb-1">
            <span
              className="bg-border-subtle text-text-secondary px-2 py-0.5 rounded-sm uppercase font-sans"
              style={{ fontSize: "12px", lineHeight: "14px", letterSpacing: "0.08em", fontWeight: 600 }}
            >
              {genre}
            </span>
          </div>
        ) : null}
        <h3 className="font-headline text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors font-bold" style={{ fontSize: "18px", lineHeight: "24px" }}>
          {title}
        </h3>
        <p className="font-sans text-text-secondary line-clamp-2" style={{ fontSize: "14px", lineHeight: "20px" }}>
          {overview || "Sin descripción disponible."}
        </p>
      </div>
    </div>
  );
};

export default Card;
