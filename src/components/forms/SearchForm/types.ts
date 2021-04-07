/* eslint-disable no-unused-vars */
import { FormikHelpers } from "formik";

export type ISearchFormOwnProps = {
  setMovieSearch: (query: string) => void;
  setMoviesList: (list: []) => void;
  setErrorSearch: (error: boolean) => void;
};

export type FormInitialValues = {
  movieQuery: string;
};

export type OnSubmit = (
  values: FormInitialValues,
  formik: FormikHelpers<FormInitialValues>
) => void;
