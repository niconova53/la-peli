import React, { FC } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { IHeaderOwnProps, HeaderItem } from "./types";
import { headerItems } from "./constants";
import Drawer from "./Drawer";
import { useDropBtn } from "../../../hooks";

const Logo: FC = () => (
  <span className="flex items-center gap-2">
    <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
      <rect width="48" height="48" rx="10" fill="#1e293b" />
      <circle
        cx="24"
        cy="24"
        r="7"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="3"
      />
      <circle cx="24" cy="24" r="2.5" fill="#8b5cf6" />
    </svg>
    <span className="font-headline text-2xl font-bold text-primary tracking-tight">
      La Peli
    </span>
  </span>
);

const Header: FC<IHeaderOwnProps> = () => {
  const { show, setShow, container } = useDropBtn();
  const history = useHistory();

  return (
    <header className="bg-surface-container-low sticky top-0 z-50 w-full shadow-sm border-b border-surface-container">
      <nav className="flex justify-between items-center w-full px-6 py-2 max-w-7xl mx-auto">
        <button
          type="button"
          className="flex items-center gap-1 focus:outline-none hover:scale-105 transition-transform"
          onClick={() => history.push("/cartelera")}
        >
          <Logo />
        </button>

        <div className="hidden md:flex items-center gap-6">
          {headerItems.map((item: HeaderItem) => {
            return (
              <NavLink
                key={`header-nav-item-${item.href}`}
                to={item.href}
                replace
                activeClassName="text-primary border-b-2 border-primary"
                className="font-headline text-base text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg px-3 py-2 transition-all duration-200 border-b-2 border-transparent"
              >
                {item.title}
              </NavLink>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Buscar"
            className="hidden md:flex text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-surface-container active:scale-95 duration-100 focus:outline-none"
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
            aria-label="Menú"
            className="md:hidden text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-surface-container active:scale-95 duration-100 focus:outline-none"
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