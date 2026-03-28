"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";



const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-[140px] right-4 md:right-6 p-2.5 text-purple-600 border border-purple-400  rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110 cursor-pointer ${visible ? "opacity-100 bg-white" : "opacity-0 pointer-events-none"
        }`}
      aria-label="Scroll to Top"
    >

      <FaArrowUp />

    </button>
  );
};

export default ScrollToTop;
