/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMovieSelectedOwnProps, MovieValues } from "./types";
import { getMovieById, getMovieReviews } from "../../services/moviesAPI";
import { API_IMG_URL } from "../../constants";

const MovieSelected: FC<IMovieSelectedOwnProps> = () => {
  const [movie, setMovie] = useState<MovieValues>({});
  const [reviews, setReviews] = useState([]);

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
  }, []);

  const bgStyle = {
    backgroundImage:
      "url(" + API_IMG_URL + "original" + movie.backdrop_path + ")",
  };

  return (
    <div className="mx-6 bg-surface-container-lowest border border-outline-variant rounded-lg mt-4 mb-8 shadow-card-soft">
      <div
        style={movie.backdrop_path ? bgStyle : {}}
        className="relative font-sans text-white rounded-lg flex flex-col justify-start w-full min-h-screen bg-cover bg-center bg-opacity-70 overflow-hidden"
      >
        <div
          className={`w-full h-full bg-secondary bg-opacity-80 absolute ${
            movie.backdrop_path && "animate-pulse-10"
          }`}
        />

        <div className="flex flex-col w-full h-full z-10 p-10">
          <h2 className="mb-4 text-4xl font-headline font-extrabold tracking-tight">{movie.title}</h2>

          <p className="mb-4 break-words whitespace-pre-wrap ">
            <strong className="mr-2">Sinopsis: </strong>
            {movie.overview ? movie.overview : "Cargando..."}
          </p>

          <p className="mb-4 break-words whitespace-pre-wrap">
            <strong className="mr-2">Año: </strong>
            {movie.release_date ? movie.release_date : "Cargando..."}
          </p>

          <p className="mb-4 break-words whitespace-pre-wrap">
            <strong className="mr-2">Rating: </strong>
            {movie.vote_average ? movie.vote_average : "Cargando..."}
          </p>

          <p className="mb-4 break-words whitespace-pre-wrap">
            <strong className="mr-2">Reviews: </strong>
            {reviews && reviews.length}
          </p>

          {reviews.length > 0 && (
            <div
              id="rev"
              className="max-h-96 overflow-y-auto overflow-x-hidden"
            >
              {reviews.map((e: any) => {
                return (
                  <div key={e.id} className="mb-4 mt-2">
                    <h3 className="my-2">
                      <span className="font-semibold">Autor : </span>
                      {e.author}
                    </h3>
                    <p className="mr-2 mb-8">{e.content}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieSelected;
