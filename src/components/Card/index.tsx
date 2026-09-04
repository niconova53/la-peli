import React, { FC } from "react";
import { IcardOwnProps } from "./types";
import { API_IMG_URL } from "../../constants";

const Card: FC<IcardOwnProps> = ({
  poster,
  title,
  overview,
  release,
  rating,
  genre,
  movieId,
  openMovie,
}) => {
  return (
    <div
      onClick={() => openMovie(movieId)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          openMovie(movieId);
        }
      }}
      role="button"
      tabIndex={0}
      className="group relative bg-surface-card rounded-xl border border-border-subtle overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-card-hover flex flex-col h-full cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-surface-container-high">
        {poster ? (
          <img
            src={`${API_IMG_URL}w500${poster}`}
            alt={`Póster de ${title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-secondary font-sans" style={{ fontSize: "14px" }}>
            Sin póster
          </div>
        )}

        <div className="absolute top-2 right-2 flex gap-1">
          {release ? (
            <span
              className="px-2 py-1 rounded-md font-bold text-white border font-sans"
              style={{ backgroundColor: "rgba(11, 19, 38, 0.72)", backdropFilter: "blur(6px)", fontSize: "12px", lineHeight: "14px", borderColor: "rgba(0,0,0,0.4)" }}
            >
              {release.slice(0, 4)}
            </span>
          ) : null}
          {rating ? (
            <span
              className="px-2 py-1 rounded-md font-bold text-white flex items-center gap-1 border font-sans"
              style={{ backgroundColor: "rgba(11, 19, 38, 0.72)", backdropFilter: "blur(6px)", fontSize: "12px", lineHeight: "14px", borderColor: "rgba(0,0,0,0.4)" }}
            >
              <span className="text-tertiary leading-none" style={{ fontSize: "10px" }}>★</span>
              {rating.toFixed(1)}
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        {genre ? (
          <div className="mb-1">
            <span className="bg-border-subtle text-text-secondary px-2 py-0.5 rounded-sm uppercase font-sans" style={{ fontSize: "12px", lineHeight: "14px", letterSpacing: "0.08em", fontWeight: 600 }}>
              {genre}
            </span>
          </div>
        ) : null}
        <h3 className="font-headline text-white mb-2 line-clamp-1 group-hover:text-primary transition-colors font-bold" style={{ fontSize: "18px", lineHeight: "24px" }}>
          {title}
        </h3>
        <p className="font-sans text-text-secondary line-clamp-2 mt-auto" style={{ fontSize: "14px", lineHeight: "20px" }}>
          {overview}
        </p>
      </div>
    </div>
  );
};

export default Card;
