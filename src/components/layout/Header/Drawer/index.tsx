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
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 mt-2 bg-gray-800 bg-opacity-90 rounded-md ring-1 ring-black ring-opacity-5">
          {headerItems.map((item: DrawerItem) => {
            return (
              <NavLink
                onClick={() => setShow(false)}
                key={`header-nav-item-${item.href}`}
                to={item.href}
                replace
                activeClassName="text-green-600"
                className="text-gray-200 hover:bg-green-600 hover:text-white truncate px-3 py-2 rounded-md text-base font-medium flex"
              >
                {item.title}
              </NavLink>
            );
          })}
        </div>
      </Transition>
    </div>
  );
};

export default DrawerResponsive;
