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
    <div className="w-full max-w-[600px] mx-auto px-4">
      <Formik
        initialValues={initialValues}
        validationSchema={searchMovieSchema}
        onSubmit={onSubmit}
      >
        <BaseForm buttonPosition={BTN_POSITION} buttonStyle={BTN_STYLE}>
          <div className="relative">
            <FormikInput
              autoComplete="off"
              placeholder="Buscar película..."
              name="movieQuery"
              type="text"
              ErrorMsg
              inputStyle="w-full px-4 py-3 bg-background border border-border-subtle text-text-primary rounded-xl focus:outline-none focus:border-primary sm:text-base placeholder:text-text-secondary"
              labelStyle="hidden"
            />
          </div>
        </BaseForm>
      </Formik>
    </div>
  );
};

export default SearchForm;