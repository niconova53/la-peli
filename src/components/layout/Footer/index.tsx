import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { IFooterOwnProps } from "./types";
import { headerItems } from "../Header/constants";

const Footer: FC<IFooterOwnProps> = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-container w-full mt-auto rounded-t-xl border-t border-outline-variant">
      <div className="w-full px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-headline text-xl font-bold text-on-surface">
            La Peli
          </span>
          <p className="font-sans text-sm text-on-surface-variant">
            © {year} La Peli. Descubre el cine.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center md:justify-end gap-4">
          {headerItems.map((item) => (
            <NavLink
              key={`footer-nav-${item.href}`}
              to={item.href}
              className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              {item.title}
            </NavLink>
          ))}
          <a
            href="https://www.linkedin.com/in/nicolas-novacovich-002211173/"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            Desarrollador
          </a>
          <span className="font-sans text-sm text-on-surface-variant cursor-default">
            Términos Legales
          </span>
          <span className="font-sans text-sm text-on-surface-variant cursor-default">
            Privacidad
          </span>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;