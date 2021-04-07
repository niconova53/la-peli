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
    <>
      {genres.length === 0 && (
        <p className="font-semibold text-center text-xl font-montserrat my-4 text-gray-400 break-words whitespace-pre-wrap">
          Cargando...
        </p>
      )}

      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-10 md:px-20 lg:px-40 xl:px-10 gap-8 my-8">
        {genres.length > 0 &&
          genres.map((e: any) => {
            return (
              <div
                key={e.id}
                onClick={() => {
                  openGenre(e.id, e.name);
                }}
                className="group flex flex-col bg-gray-800 opacity-75 rounded cursor-pointer hover:opacity-95"
              >
                <div className="w-full flex flex-col justify-around text-center">
                  <MovieIcon className="w-12 h-12 mt-4 fill-current text-gray-500 group-hover:text-red-600 mx-auto" />
                  <div>
                    <h3 className="font-bold font-montserrat my-4 text-gray-200 break-words whitespace-pre-wrap">
                      {e.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Genres;
