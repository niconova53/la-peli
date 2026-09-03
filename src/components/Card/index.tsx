import React, { FC } from "react";
import { IcardOwnProps } from "./types";
import { API_IMG_URL } from "../../constants";

const Card: FC<IcardOwnProps> = ({
  poster,
  title,
  overview,
  release,
  movieId,
  openMovie,
}) => {
  return (
    <div
      onClick={() => {
        openMovie(movieId);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          openMovie(movieId);
        }
      }}
      role="button"
      tabIndex={0}
      className="bg-surface-container rounded-xl overflow-hidden flex flex-col group hover:-translate-y-2 transition-transform duration-300 cursor-pointer border border-outline/20 shadow-md"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-container-high">
        {poster ? (
          <img
            src={`${API_IMG_URL}w500${poster}`}
            alt={`Póster de ${title}`}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="object-cover w-full h-full flex items-center justify-center text-on-surface-variant">
            Sin póster
          </div>
        )}
        {release ? (
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm border border-outline/30">
            <span className="font-headline text-sm font-bold text-tertiary">
              {release.slice(0, 4)}
            </span>
          </div>
        ) : null}
      </div>

      <div className="p-2 md:p-4 flex flex-col flex-grow gap-1">
        <h3 className="font-headline text-lg md:text-xl text-white font-bold line-clamp-1 leading-6">
          {title}
        </h3>
        <p className="font-sans text-sm text-on-surface-variant line-clamp-2">
          {overview}
        </p>
      </div>
    </div>
  );
};

export default Card;