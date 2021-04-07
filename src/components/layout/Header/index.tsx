import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { IHeaderOwnProps, HeaderItem } from "./types";
import { headerItems } from "./constants";
import Drawer from "./Drawer";
import { useDropBtn } from "../../../hooks";

const Header: FC<IHeaderOwnProps> = () => {
  const { show, setShow, container } = useDropBtn();

  return (
    <header>
      <nav className="w-full bg-transparent p-6">
        <div className="flex justify-between items-center">
          <div className="text-red-500 font-montserrat font-bold text-3xl md:text-4xl">
            La Peli
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="relative w-10 h-10 text-gray-500 bg-white rounded-sm focus:outline-none"
              onClick={() => setShow(!show)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <span
                  aria-hidden="true"
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                    show ? "rotate-45" : "-translate-y-1.5"
                  }`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                    show && "opacity-0"
                  }`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                    show ? "-rotate-45" : "translate-y-1.5"
                  }`}
                ></span>
              </div>
            </button>
          </div>

          <div className="hidden md:flex">
            <div className="w-full ml-10 flex justify-end items-end space-x-4">
              {headerItems.map((item: HeaderItem) => {
                return (
                  <NavLink
                    key={`header-nav-item-${item.href}`}
                    to={item.href}
                    replace
                    activeClassName="text-green-600"
                    className="text-gray-300 font-raleway font-bold hover:text-green-600 px-3 pt-2 rounded-md text-base lg:text-xl flex justify-center"
                  >
                    {item.title}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>

        <Drawer container={container} show={show} setShow={setShow} />
      </nav>
    </header>
  );
};

export default Header;
