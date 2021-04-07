/* eslint-disable no-unused-vars */
import * as React from "react";

export type IDrawerOwnProps = {
  container: React.RefObject<HTMLInputElement>;
  show: boolean;
  setShow: (show: boolean) => void;
};

export type DrawerItem = {
  title: string;
  href: string;
};
