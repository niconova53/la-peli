/* eslint-disable no-console */
import React, { FC } from "react";
import { Formik } from "formik";
import { ISearchFormOwnProps, OnSubmit } from "./types";
import { BTN_POSITION, BTN_STYLE, initialValues } from "./constants";
import { BaseForm, FormikInput } from "../../forms";
import { search } from "../../../services/moviesAPI";
import { searchMovieSchema } from "../../../validations";

const SearchForm: FC<ISearchFormOwnProps> = ({
  setMovieSearch,
  setMoviesList,
  setErrorSearch,
}) => {
  const onSubmit: OnSubmit = async (formData, { resetForm }) => {
    try {
      const movies = await search(formData.movieQuery);
      setMovieSearch(formData.movieQuery);
      setMoviesList(movies);
      resetForm();

      if (movies.length > 0) {
        setErrorSearch(false);
      } else {
        setErrorSearch(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full sm:w-1/2 xl:w-1/3 mx-auto px-4">
      <Formik
        initialValues={initialValues}
        validationSchema={searchMovieSchema}
        onSubmit={onSubmit}
      >
        <BaseForm buttonPosition={BTN_POSITION} buttonStyle={BTN_STYLE}>
          <div className="relative">
            <FormikInput
              autoComplete="off"
              placeholder=" "
              name="movieQuery"
              type="text"
              ErrorMsg
              inputStyle="w-full px-4 py-2 border-2 border-gray-300 text-gray-900 rounded-sm focus:outline-none sm:text-sm"
              labelStyle="absolute top-0 pt-1 pl-4 italic font-medium text-gray-700 -z-1 duration-300"
            />
          </div>
        </BaseForm>
      </Formik>
    </div>
  );
};

export default SearchForm;
