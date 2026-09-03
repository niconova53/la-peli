import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { IFooterOwnProps } from "./types";
import { headerItems } from "../Header/constants";

const Footer: FC<IFooterOwnProps> = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-container border-t border-outline/30 w-full mt-8 flex flex-col md:flex-row justify-between items-center p-8 max-w-7xl mx-auto gap-4 rounded-t-xl">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <span className="font-headline text-xl font-bold text-white">
          La Peli
        </span>
        <span className="font-sans text-sm text-on-surface-variant hidden md:inline">
          |
        </span>
        <span className="font-sans text-sm text-on-surface-variant">
          © {year} La Peli. Todos los derechos reservados.
        </span>
      </div>

      <nav className="flex flex-wrap justify-center gap-4">
        {headerItems.map((item) => (
          <NavLink
            key={`footer-nav-${item.href}`}
            to={item.href}
            className="font-sans text-sm text-on-surface-variant hover:text-primary hover:underline transition-all opacity-80 hover:opacity-100 duration-200"
          >
            {item.title}
          </NavLink>
        ))}
        <a
          href="https://www.linkedin.com/in/nicolas-novacovich-002211173/"
          target="_blank"
          rel="noreferrer"
          className="font-sans text-sm text-on-surface-variant hover:text-primary hover:underline transition-all opacity-80 hover:opacity-100 duration-200"
        >
          Desarrollador
        </a>
      </nav>
    </footer>
  );
};

export default Footer;