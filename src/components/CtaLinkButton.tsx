"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { MdArrowForward } from "react-icons/md";
import { pushEvent } from "../utils/dataLayer";

const CtaLinkButton = () => {
  const pathname = usePathname();

  const handleScroll = () => {
  const isMobile = window.innerWidth < 768;
  
  if (pathname === "/admission") {
    pushEvent('begin_checkout', {
      ecommerce: {
        currency: 'BDT',
        items: [{
          item_id: 'admission_banner_btn',
          item_name: 'Course Admission',
          item_category: 'admission',
          quantity: 1,
        }],
      },
    });
  } else {
    pushEvent('add_to_cart', {
      ecommerce: {
        currency: 'BDT',
        value: 0,
        items: [{
          item_id: 'seminar_banner_btn',
          item_name: 'Free Seminar',
          item_category: 'seminar',
          price: 0,
          quantity: 1,
        }],
      },
    });
  }
  
  const targetId = pathname === "/admission" ? "admission" : "registration-form";
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
        {pathname === "/admission" ? "ভর্তি নিশ্চিত করুন" : "রেজিস্ট্রেশন করুন"}
      </span>

      <div className="relative flex items-center justify-center bg-white/20 rounded-full p-1.5 hover:bg-white/30 transition-colors">
        <MdArrowForward className="text-xl hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Button>
  );
};

export default CtaLinkButton;
// "use client";

// import { Button } from "@/components/ui/button";
// import { usePathname } from "next/navigation";
// import { MdArrowForward } from "react-icons/md";

// const CtaLinkButton = () => {
//   const pathname = usePathname();

//   const handleScroll = () => {
//     const isMobile = window.innerWidth < 768;

//     const targetId =
//       pathname === "/admission" ? "admission" : "registration-form";

//     const scrollToForm = () => {
//       const el = document.getElementById(targetId);
//       if (el) {
//         el.scrollIntoView({
//           behavior: isMobile ? "auto" : "smooth",
//           block: "start",
//         });
//       }
//     };

//     scrollToForm();
//     setTimeout(scrollToForm, 300);
//   };

//   return (
//     <Button
//       onClick={handleScroll}
//       className="relative flex items-center gap-3 bg-gradient-to-r from-[#DC25FF] to-[#3C016F] px-3 md:px-8 py-5 md:py-8 rounded-full text-white overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-white/20"
//     >
//       <span className="relative text-base md:text-lg font-bold tracking-wide whitespace-nowrap pt-1">
//         {pathname === "/admission"
//           ? "ভর্তি নিশ্চিত করুন"
//           : "রেজিস্ট্রেশন করুন"}
//       </span>

//       <div className="relative flex items-center justify-center bg-white/20 rounded-full p-1.5 hover:bg-white/30 transition-colors">
//         <MdArrowForward className="text-xl hover:translate-x-1 transition-transform duration-300" />
//       </div>
//     </Button>
//   );
// };

// export default CtaLinkButton;
