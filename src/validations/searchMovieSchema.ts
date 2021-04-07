import { object, string } from "yup";

export default object().shape({
  movieQuery: string()
    .max(20, "Máximo 20 letras.")
    .required("Ingresar al menos una letra."),
});
