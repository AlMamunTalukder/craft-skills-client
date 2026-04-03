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
import Container from "./Container";
import { Button } from "@/components/ui/button";

const CountdownTimer = dynamic(
  () => import("@/src/components/home/CountdownTimer"),
  { ssr: false },
);

type Props = {
  siteData: Partial<SiteContent>;
  batch: Batch | null;
};

export default function SubHeaderAdmission({ siteData, batch }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const isMobile = window.innerWidth < 768;

    const scrollToForm = () => {
      const el = document.getElementById("admission");
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
  ];

  const isRegistrationActive = () => {
    if (!batch || !batch.isActive) return false;

    const now = new Date();
    const deadlineDate = batch.registrationEnd
      ? new Date(batch.registrationEnd)
      : null;

    return batch.isActive && deadlineDate && now < deadlineDate;
  };

  if (!batch || !isRegistrationActive()) return null;

  return (
    <div className="sticky top-0 z-50 h-[89px] md:h-full md:w-full bg-linear-to-r from-[#4F0187] to-[#3C016F] shadow-md text-white py-0 md:py-1.5">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between pt-2 md:pt-3 md:pb-1">
          <div className="flex items-center justify-center md:items-start flex-col text-center md:text-left md:px-2">
            <h3 className="text-[13px] md:text-[17px] leading-tight">
              {batch?.name}
            </h3>

            <p className="text-[12px] md:text-[15px] text-purple-100 font-medium opacity-80 uppercase tracking-tighter pb-[2px] md:pb-0">
              {batch?.description}
            </p>
          </div>

          <div className="md:w-[170px] px-1 md:px-0 pb-1.5 md:pb-0">
            <CountdownTimer targetDate={batch?.registrationEnd} />
          </div>

          <div className=" w-[170px] px-4 md:px-0">
            <button
              onClick={handleScroll}
              className="flex gap-2 justify-center items-center content-center bg-gradient-to-r from-[#DC25FF] to-[#7000FF] rounded-full border-2 border-white px-3 py-1 cursor-pointer"
            >
              <FaHandPointRight className="text-white text-[16px] md:text-[16px]" />
              <span className="text-sm md:text-base whitespace-nowrap">
                ভর্তি নিশ্চিত করুন
              </span>
            </button>
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
                  onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
