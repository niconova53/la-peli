import React, { FC } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { IHeaderOwnProps, HeaderItem } from "./types";
import { headerItems } from "./constants";
import Drawer from "./Drawer";
import { useDropBtn } from "../../../hooks";

const Logo: FC = () => (
  <span className="flex items-center gap-2">
    <svg viewBox="0 0 48 48" className="w-8 h-8 rounded-md" aria-hidden="true">
      <rect width="48" height="48" rx="10" fill="#a078ff" />
      <circle cx="24" cy="24" r="7" fill="none" stroke="#0f172a" strokeWidth="3" />
      <circle cx="24" cy="24" r="2.5" fill="#0f172a" />
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
    <header
      className="bg-surface-card/80 backdrop-blur-xl fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 max-w-full mx-auto"
      style={{ borderBottom: "1px solid #334155" }}
    >
      <button
        type="button"
        className="flex items-center gap-1 focus:outline-none"
        onClick={() => history.push("/cartelera")}
      >
        <Logo />
      </button>

      <nav className="hidden md:flex gap-6 items-center">
        {headerItems.map((item: HeaderItem) => {
          return (
            <NavLink
              key={`header-nav-item-${item.href}`}
              to={item.href}
              replace
              activeClassName="text-primary font-bold border-b-2 border-primary"
              className="text-on-surface-variant hover:text-text-primary transition-colors duration-300 hover:bg-surface-variant/50 px-2 py-1 rounded-sm border-b-2 border-transparent"
            >
              {item.title}
            </NavLink>
          );
        })}
      </nav>

      <div className="flex items-center">
        <button
          type="button"
          aria-label="Buscar"
          className="hidden md:flex p-2 text-on-surface-variant hover:text-text-primary transition-colors rounded-full hover:bg-surface-variant/50 focus:outline-none"
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
          className="md:hidden p-2 text-on-surface-variant hover:text-text-primary transition-colors rounded-full hover:bg-surface-variant/50 focus:outline-none"
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

      <Drawer container={container} show={show} setShow={setShow} />
    </header>
  );
};

export default Header;