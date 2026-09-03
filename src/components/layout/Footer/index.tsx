import React, { FC } from "react";
import { IFooterOwnProps } from "./types";
import { fullDate } from "./constants";

const Footer: FC<IFooterOwnProps> = () => {
  return (
    <div className="absolute bottom-0 w-full bg-surface-container-lowest border-t border-outline-variant font-sans">
      <div className="flex flex-wrap min-w-160 w-full mx-1 sm:mx-6 justify-center sm:justify-start">
        <p className="my-1 px-2 text-on-surface-variant whitespace-nowrap">©{fullDate}</p>
        <p className="my-1 px-2 italic text-secondary whitespace-nowrap">
          Nico Novacovich
        </p>
        <p className="my-1 px-2 font-major text-on-surface whitespace-nowrap"> FrontEnd Dev</p>
      </div>
    </div>
  );
};

export default Footer;
