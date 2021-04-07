export type IFormikInputOwnProps = {
  label?: string;
  name: string;
  type?: string;
  rows?: number;
  tag?: "input" | "textarea";
  labelStyle?: string;
  inputStyle?: string;
  ErrorMsg?: boolean;
  autoComplete?: string;
  placeholder?: string;
};
