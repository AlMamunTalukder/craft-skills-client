
// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { MdArrowForward } from "react-icons/md";

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
//     <Link href={getHref()} className="relative group inline-block">
 
      
//       {/* Main Button Body */}
//       <Button className="relative flex items-center gap-3 bg-gradient-to-r from-[#DC25FF] to-[#3C016F] px-3 md:px-8 py-5 md:py-8 rounded-full text-white overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-[1.02] active:scale-95 border border-white/20">
        
  

//         {/* Text Content */}
//         <span className="relative text-base md:text-lg font-bold tracking-wide whitespace-nowrap pt-1">
//           {pathname === "/" ? "রেজিস্ট্রেশন করুন" : "ভর্তি নিশ্চিত করুন"}
//         </span> 

       
//         <div className="relative flex items-center justify-center bg-white/20 rounded-full p-1.5 group-hover:bg-white/30 transition-colors">
//           <MdArrowForward className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
//         </div>
//       </Button>

//       {/* Global CSS for the Shimmer Animation */}
//       <style jsx global>{`
//         @keyframes shimmer {
//           100% {
//             transform: translateX(100%);
//           }
//         }
//       `}</style>
//     </Link>
//   );
// };

// export default CtaLinkButton;


"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { MdArrowForward } from "react-icons/md";

const CtaLinkButton = () => {
  const pathname = usePathname();

  const handleScroll = () => {
    const isMobile = window.innerWidth < 768;

    
    const targetId =
      pathname === "/admission" ? "admission" : "registration-form";

    const scrollToForm = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({
          behavior: isMobile ? "auto" : "smooth",
          block: "start",
        });
      }
    };

    scrollToForm();
    setTimeout(scrollToForm, 300); 
  };

  return (
    <Button
      onClick={handleScroll}
      className="relative flex items-center gap-3 bg-gradient-to-r from-[#DC25FF] to-[#3C016F] px-3 md:px-8 py-5 md:py-8 rounded-full text-white overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-white/20"
    >
      <span className="relative text-base md:text-lg font-bold tracking-wide whitespace-nowrap pt-1">
        {pathname === "/admission"
          ? "ভর্তি নিশ্চিত করুন"
          : "রেজিস্ট্রেশন করুন"}
      </span>

      <div className="relative flex items-center justify-center bg-white/20 rounded-full p-1.5 hover:bg-white/30 transition-colors">
        <MdArrowForward className="text-xl hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Button>
  );
};

export default CtaLinkButton;