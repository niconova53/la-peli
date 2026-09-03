import React, { FC } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { IHeaderOwnProps, HeaderItem } from "./types";
import { headerItems } from "./constants";
import Drawer from "./Drawer";
import { useDropBtn } from "../../../hooks";

const Header: FC<IHeaderOwnProps> = () => {
  const { show, setShow, container } = useDropBtn();
  const history = useHistory();

  return (
    <header className="bg-background/90 backdrop-blur-md fixed top-0 w-full z-50 shadow-md border-b border-outline/30 transition-all duration-300">
      <nav className="flex justify-between items-center px-6 py-2 max-w-7xl mx-auto z-50 w-full">
        <button
          type="button"
          className="flex items-center gap-1 focus:outline-none"
          onClick={() => history.push("/cartelera")}
        >
          <span className="font-headline text-2xl font-bold text-primary tracking-tight">
            La Peli
          </span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {headerItems.map((item: HeaderItem) => {
            return (
              <NavLink
                key={`header-nav-item-${item.href}`}
                to={item.href}
                replace
                activeClassName="text-primary border-b-2 border-primary"
                className="font-headline text-base text-secondary hover:text-primary pb-1 transition-colors border-b-2 border-transparent active:scale-95 duration-100"
              >
                {item.title}
              </NavLink>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden md:flex text-secondary hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container active:scale-95 duration-100 focus:outline-none"
            onClick={() => history.push("/buscar")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <button
            type="button"
            className="md:hidden text-secondary hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container active:scale-95 duration-100 focus:outline-none"
            onClick={() => setShow(!show)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={show ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>

      <Drawer container={container} show={show} setShow={setShow} />
    </header>
  );
};

export default Header;