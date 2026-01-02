"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdArrowForward } from "react-icons/md";
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
    <Link
      href={getHref()}
      className="flex items-center gap-2 bg-linear-to-r from-[#DC25FF] to-[#3C016F] hover:from-[#3C016F] hover:to-[#DC25FF] transition-all duration-300 border border-white px-6 py-3 rounded-lg text-white font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
    >
      {pathname === "/" ? (
        <span className="text-sm md:text-base font-semibold whitespace-nowrap">
          রেজিস্ট্রেশন করুন
        </span>
      ) : (
        <span className="text-sm md:text-base font-semibold whitespace-nowrap">
          ভর্তি কনফার্ম করুন
        </span> 
      )}
      <MdArrowForward className="animate-pulse" />
    </Link>
  );
};

export default CtaLinkButton;
