import React, { FC } from "react";
import { useFormikContext } from "formik";
import { IFormOwnProps } from "./types";

const BaseForm: FC<IFormOwnProps> = ({
  children,
  buttonPosition,
  buttonStyle,
  formStyle = "flex flex-col",
  buttonIconOrText = "Enviar",
}) => {
  let Icon;

  const renderInsideBtn = () => {
    switch (buttonIconOrText.type) {
      case "icon":
        Icon = buttonIconOrText.icon;
        return <Icon />;

      case "text":
        return buttonIconOrText.text;

      default:
        return "Enviar";
    }
  };

  const { submitForm, isSubmitting } = useFormikContext();

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    submitForm();
  };

  return (
    <form className={formStyle} onSubmit={handleFormSubmit}>
      {children}

      <div className={buttonPosition}>
        <button type="submit" className={buttonStyle} disabled={isSubmitting}>
          {renderInsideBtn()}
        </button>
      </div>
    </form>
  );
};

export default BaseForm;
