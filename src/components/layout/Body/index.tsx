import React, { FC, useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import { IBodyOwnProps } from "./types";

const Body: FC<IBodyOwnProps> = ({ children }) => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return function cleanup() {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    if (scroll) {
      scroll.scrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-x-hidden w-full min-h-screen bg-background pt-[72px] flex flex-col">
      <div className="flex-grow flex flex-col">{children}</div>

      <button
        className={`${
          showScroll ? "flex" : "hidden"
        } fixed bottom-16 right-4 text-xl overflow-hidden bg-primary rounded-lg w-28 h-12 items-center hover:bg-primary-hover focus:outline-none shadow-card-soft z-40`}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          scrollTop();
        }}
      >
        <p className="text-center w-full font-headline font-semibold text-white">
          Subir ↑
        </p>
      </button>
    </div>
  );
};

export default Body;