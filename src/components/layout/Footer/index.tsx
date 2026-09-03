import React, { FC } from "react";
import { IFooterOwnProps } from "./types";
import { fullDate } from "./constants";

const Footer: FC<IFooterOwnProps> = () => {
  return (
    <div className="absolute bottom-0 w-full bg-white border-t border-grayBorder font-sans">
      <div className="flex flex-wrap min-w-160 w-full mx-1 sm:mx-6 justify-center sm:justify-start">
        <p className="my-1 px-2 text-gray-500 whitespace-nowrap">©{fullDate}</p>
        <p className="my-1 px-2 italic text-deep-navy whitespace-nowrap">
          Nico Novacovich
        </p>
        <p className="my-1 px-2 font-major whitespace-nowrap"> FrontEnd Dev</p>
      </div>
    </div>
  );
};

export default Footer;
