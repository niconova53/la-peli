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
        } fixed right-4 items-center justify-center rounded-full w-11 h-11 text-white focus:outline-none z-40 backdrop-blur-md border border-white/10 shadow-lg transition-all hover:scale-105`}
        style={{ bottom: "114px", backgroundColor: "rgba(139,92,246,0.22)" }}
        type="button"
        onClick={handleScrollTop}
        aria-label="Subir"
      >
        <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>
          arrow_upward
        </span>
      </button>
    </div>
  );
};

export default Body;
