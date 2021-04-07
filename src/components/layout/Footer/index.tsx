import React, { FC } from "react";
import { IFooterOwnProps } from "./types";
import { fullDate } from "./constants";

const Footer: FC<IFooterOwnProps> = () => {
  return (
    <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-20 font-semibold font-raleway">
      <div className="flex flex-wrap min-w-160 w-full mx-1 sm:mx-6 justify-center sm:justify-start">
        <p className="my-1 px-2 text-gray-400 whitespace-nowrap">©{fullDate}</p>
        <p className="my-1 px-2 italic text-gray-200 whitespace-nowrap">
          Nico Novacovich
        </p>
        <p className="my-1 px-2 font-major whitespace-nowrap"> FrontEnd Dev</p>
      </div>
    </div>
  );
};

export default Footer;
