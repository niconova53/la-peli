import { FormInitialValues } from "./types";

export const BTN_POSITION = "flex justify-end";
export const BTN_STYLE =
  "disabled:opacity-50 py-2 px-5 mt-8 sm:mt-4 mb-1 bg-primary text-white text-xl font-headline font-semibold rounded-lg hover:bg-primary-dim focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-40 transition-colors";

export const initialValues: FormInitialValues = {
  movieQuery: "",
};
