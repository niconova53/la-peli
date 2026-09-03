/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { useField } from "formik";
import { IFormikInputOwnProps } from "./types";

const FormikInput: FC<IFormikInputOwnProps> = ({
  label = "",
  labelStyle = "hidden",
  inputStyle = "",
  ErrorMsg = false,
  tag = "input",
  ...props
}) => {
  const { name } = props;
  const Tag = tag;
  const [field, meta] = useField(props);
  const textError =
    meta.touched && meta.error ? (
      <div className="text-red-500 font-medium text-sm lg:text-base text-shadow-white absolute -bottom-6 lg:-bottom-7 left-0 w-full truncate">
        {meta.error}
      </div>
    ) : null;

  const borderError =
    meta.touched && meta.error
      ? "focus:outline-none border-ruby focus:border-ruby"
      : "focus:outline-none focus:border-primary";

  return (
    <>
      <Tag {...field} {...props} className={inputStyle + borderError} />

      <label htmlFor={name} className={labelStyle}>
        {label}
      </label>

      {ErrorMsg && textError}
    </>
  );
};

export default FormikInput;
