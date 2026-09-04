import React, { FC, useState, useEffect, useCallback } from "react";
import { IBodyOwnProps } from "./types";

const Body: FC<IBodyOwnProps> = ({ children }) => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = useCallback(() => {
    if (window.pageYOffset > 400) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [checkScrollTop]);

  function handleScrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div
      className="relative overflow-x-hidden w-full min-h-screen bg-background flex flex-col"
      style={{ paddingTop: "72px" }}
    >
      <div className="flex-grow flex flex-col">{children}</div>
      <button
        className={`${
          showScroll ? "flex" : "hidden"
        } fixed bottom-16 right-4 text-xl overflow-hidden bg-primary rounded-lg w-28 h-12 items-center hover:bg-primary-hover focus:outline-none shadow-card-soft z-40`}
        type="button"
        onClick={handleScrollTop}
      >
        <span className="text-center w-full font-headline font-semibold text-white">
          Subir ↑
        </span>
      </button>
    </div>
  );
};

export default Body;
