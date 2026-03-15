/* eslint-disable @typescript-eslint/no-unused-vars */
// components/SubHeaderAdmission.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
  FaTelegramPlane,
  FaUsers,
  FaHandPointRight,
} from "react-icons/fa";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Batch, SiteContent } from "@/types";

const CountdownTimer = dynamic(
  () => import("@/src/components/home/CountdownTimer"),
  { ssr: false }
);

type Props = {
  siteData: Partial<SiteContent>;
  batch: Batch | null;
};

export default function SubHeaderAdmission({ siteData, batch }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => { 
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      label: "Facebook",
      href: siteData?.facebook || "#",
      color: "#1877F2",
    },
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      href: siteData?.whatsapp || "#",
      color: "#25D366",
    },
    {
      icon: <FaYoutube />,
      label: "YouTube",
      href: siteData?.youtube || "#",
      color: "#FF0000",
    },
    {
      icon: <FaTelegramPlane />,
      label: "Telegram",
      href: siteData?.telegram || "#",
      color: "#0088cc",
    },
    {
      icon: <FaUsers />,
      label: "Community",
      href: siteData?.facebookGroup || "#",
      color: "#4267B2",
    },
  ];

  const isSeminarActive = () => {
    if (!batch || !batch.isActive) return false;

    const now = new Date();
    const deadlineDate = batch.registrationEnd
      ? new Date(batch.registrationEnd)
      : null;

    return batch.isActive && deadlineDate && now < deadlineDate;
  };

  if (!batch || !isSeminarActive()) return null;

  return (
    <div
      className={`sticky top-0 z-50 w-full shadow-sm transition-all duration-300 ${
        isScrolled
          ? "bg-linear-to-r from-[#4F0187] to-[#3C016F] shadow-md text-white py-0 md:py-3"
          : "bg-linear-to-r from-[#4F0187] to-[#3C016F] shadow-md text-white py-0 md:py-3"
      }`}
    >
      <div className="max-w-[1100px] w-full mx-auto px-5 ">
        <div className="flex flex-col md:flex-row items-center justify-between pt-2 md:pt-3 md:pb-1 space-y-0.5 md:space-y-0">
          {/* Left: Course Info */}
          <div className="flex items-center gap-3">
            
            <div className="text-center md:text-left">
              <h3 className="text-sm md:text-base font-bold text-white leading-tight tracking-wide">
                {batch?.name}
              </h3>
              <p className="text-[10px] md:text-xs text-purple-200 font-medium opacity-80 uppercase tracking-tighter">
                {batch?.description}
              </p>
            </div>
          </div>

          {/* Center & Right: Timer & Action Wrapper */}
          <div className="flex items-center gap-4 md:gap-8 bg-black/20 md:bg-transparent p-2 md:p-0 rounded-2xl w-full md:w-auto justify-center">
            
            {/* Countdown Container */}
            <div className="scale-90 md:scale-100">
              <CountdownTimer targetDate={batch?.registrationEnd} />
            </div>

            {/* Premium Button */}
            <Link
              href="#admission"
              className="group relative flex items-center gap-2 bg-gradient-to-r from-[#DC25FF] to-[#7000FF] px-5 py-2 md:py-2.5 rounded-full text-white shadow-[0_0_20px_rgba(220,37,255,0.3)] hover:shadow-[#DC25FF]/50 transition-all duration-300"
            >
              <span className="text-xs md:text-sm font-black whitespace-nowrap z-10">
                ভর্তি নিশ্চিত করুন
              </span>
              <FaHandPointRight className="group-hover:translate-x-1 transition-transform z-10" />
              
              {/* Shine Animation */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] group-hover:left-[100%] transition-all duration-1000" />
              </div>
            </Link>
          </div>

          {/* Social Icon */}
          <div className="flex justify-center md:justify-end mb-1.5 md:mb-2 pt-1">
            <div className="hidden md:flex items-center gap-3 md:gap-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm transition-all duration-300 flex items-center justify-center h-6 md:h-9 w-6 md:w-9 rounded-full bg-white/10 hover:bg-white/20 shadow-md"
                  aria-label={social.label}
                  style={{
                    color: "white",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = social.color)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "white")
                  }
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}