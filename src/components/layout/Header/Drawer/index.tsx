import React, { FC } from "react";
import { Transition } from "@tailwindui/react";
import { NavLink } from "react-router-dom";
import { IDrawerOwnProps, DrawerItem } from "./types";
import { headerItems } from "../constants";

const DrawerResponsive: FC<IDrawerOwnProps> = ({
  container,
  show,
  setShow,
}) => {
  return (
    <div
      className="md:hidden absolute right-5 w-2/3 z-10"
      id="mobile-menu"
      ref={container}
    >
      <Transition
        show={show}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 mt-2 bg-surface-container rounded-lg shadow-card-soft ring-1 ring-outline-variant">
          {headerItems.map((item: DrawerItem) => {
            return (
              <NavLink
                onClick={() => setShow(false)}
                key={`header-nav-item-${item.href}`}
                to={item.href}
                replace
                activeClassName="text-primary font-semibold"
                className="text-on-surface-variant hover:bg-surface-container-high hover:text-primary truncate px-3 py-2 rounded-lg text-base font-medium flex transition-colors"
              >
                {item.title}
              </NavLink>
            );
          })}
          <NavLink
            onClick={() => setShow(false)}
            to="/buscar"
            replace
            activeClassName="text-primary font-semibold"
            className="text-on-surface-variant hover:bg-surface-container-high hover:text-primary truncate px-3 py-2 rounded-lg text-base font-medium flex transition-colors"
          >
            Buscar
          </NavLink>
        </div>
      </Transition>
    </div>
  );
};

export default DrawerResponsive;