// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { MdArrowForward } from "react-icons/md";
// import React from "react";

// const CtaLinkButton = () => {
//   const pathname = usePathname();

//   const getHref = () => {
//     switch (pathname) {
//       case "/":
//         return "#registration-form";
//       case "/admission":
//         return "#admission";
//       default:
//         return "#";
//     }
//   };

//   return (
//     <Link
//       href={getHref()}
//       className="flex items-center gap-2 bg-linear-to-r from-[#DC25FF] to-[#3C016F] hover:from-[#3C016F] hover:to-[#DC25FF] transition-all duration-300 border border-white px-6 py-3 rounded-lg text-white font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//     >
//       {pathname === "/" ? (
//         <span className="text-sm md:text-base font-semibold whitespace-nowrap">
//           রেজিস্ট্রেশন করুন
//         </span>
//       ) : (
//         <span className="text-sm md:text-base font-semibold whitespace-nowrap">
//           ভর্তি কনফার্ম করুন
//         </span> 
//       )}
//       <MdArrowForward className="animate-pulse" />
//     </Link>
//   );
// };

// export default CtaLinkButton;


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdArrowForward } from "react-icons/md";
import { motion } from "framer-motion"; // Optional but recommended for smooth scaling
import React from "react";

const CtaLinkButton = () => {
  const pathname = usePathname();

  const getHref = () => {
    switch (pathname) {
      case "/":
        return "#registration-form";
      case "/admission":
        return "#admission";
      default:
        return "#";
    }
  };

  return (
    <Link href={getHref()} className="relative group inline-block">
      {/* Outer Glow Layer (Animated) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#DC25FF] to-[#3C016F] rounded-full blur opacity-40 group-hover:opacity-100 group-hover:duration-200 transition duration-1000"></div>
      
      {/* Main Button Body */}
      <div className="relative flex items-center gap-3 bg-gradient-to-r from-[#DC25FF] to-[#3C016F] px-8 py-3.5 md:py-4 rounded-full text-white overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02] active:scale-95 border border-white/20">
        
        {/* Shimmering Light Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />

        {/* Text Content */}
        <span className="relative text-base md:text-lg font-bold tracking-wide whitespace-nowrap pt-1">
          {pathname === "/" ? "রেজিস্ট্রেশন করুন" : "ভর্তি কনফার্ম করুন"}
        </span>

        {/* Animated Icon Container */}
        <div className="relative flex items-center justify-center bg-white/20 rounded-full p-1.5 group-hover:bg-white/30 transition-colors">
          <MdArrowForward className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Global CSS for the Shimmer Animation */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </Link>
  );
};

export default CtaLinkButton;