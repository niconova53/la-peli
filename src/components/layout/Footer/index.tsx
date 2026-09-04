import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { IFooterOwnProps } from "./types";
import { headerItems } from "../Header/constants";

const Footer: FC<IFooterOwnProps> = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-card border-t border-border-subtle w-full flex flex-col md:flex-row justify-between items-center px-6 py-10 gap-6 mt-auto">
      <div className="flex items-center gap-2">
        <span className="font-headline text-lg font-bold text-primary">
          La Peli
        </span>
        <span className="text-text-secondary font-sans text-sm">
          © {year}. Descubre el cine.
        </span>
      </div>

      <nav className="flex flex-wrap justify-center gap-4 md:gap-6 font-sans text-sm">
        {headerItems.map((item) => (
          <NavLink
            key={`footer-nav-${item.href}`}
            to={item.href}
            className="text-text-secondary hover:text-text-primary hover:underline transition-opacity duration-200"
          >
            {item.title}
          </NavLink>
        ))}
        <span className="text-text-secondary hover:text-text-primary hover:underline transition-opacity duration-200 cursor-default">
          Términos Legales
        </span>
        <span className="text-text-secondary hover:text-text-primary hover:underline transition-opacity duration-200 cursor-default">
          Privacidad
        </span>
      </nav>
    </footer>
  );
};

export default Footer;