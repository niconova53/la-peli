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
      className="group flex flex-col sm:flex-row py-4 pr-2 sm:pr-0 pl-2 lg:py-6 lg:pl-4 bg-gray-800 opacity-75 rounded cursor-pointer hover:opacity-95"
    >
      <div className="flex justify-center sm:justify-end sm:min-w-max rounded-lg overflow-hidden">
        {poster ? (
          <img
            src={`${API_IMG_URL}t/p/w300${poster}`}
            alt="movie poster"
            className="transition ease-out duration-700 transform group-hover:scale-125 group-hover:-translate-y-12"
          />
        ) : null}
      </div>

      <div className="w-full flex flex-col justify-between font-raleway text-white text-center truncate">
        <div>
          <h2 className="text-2xl font-medium mb-4 break-words whitespace-pre-wrap">
            {title}
          </h2>
          <p className="px-4 md:px-8 mb-2 break-words whitespace-pre-wrap">
            <strong className="mr-2">Sinopsis: </strong>
            {overview}
          </p>
        </div>
        <p>
          <strong className="mr-2">Año: </strong>
          {release}
        </p>
      </div>
    </div>
  );
};

export default Card;
