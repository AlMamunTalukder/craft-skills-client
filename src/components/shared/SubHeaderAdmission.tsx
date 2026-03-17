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
  <div
        className={`sticky top-0 z-50 w-full shadow-sm transition-all duration-300 responsive-header ${
          isScrolled
            ? "bg-linear-to-r from-[#4F0187] to-[#3C016F] shadow-md text-white py-0 md:py-1.5"
            : " bg-linear-to-r from-[#4F0187] to-[#3C016F] shadow-md text-white py-0 md:py-3"
        }`}
      >
        <Container>
     
       <div className="flex flex-col md:flex-row items-center justify-between pt-2 md:pt-3 md:pb-1 space-y-[3px] md:space-y-0">
            {/* Left: Course Info */}
            <div className="flex items-center">
              <div className="text-center md:text-left">
                <h3 className="text-[13px] md:text-[17px] leading-tight">
                  {batch?.name}
                </h3>
                <p className="text-[15px] md:text-xs text-purple-100 font-medium opacity-80 uppercase tracking-tighter">
                  {batch?.description}
                </p>
              </div>
            </div>

            {/* Center & Right: Timer & Action Wrapper */}
            <div className="flex flex-col md:flex-row items-center  md:bg-transparent rounded-2xl w-full md:w-auto justify-center space-y-[3px] md:space-y-0 md:gap-5 ">
              {/* Countdown Container */}
              <div className="scale-90 md:scale-100">
                <CountdownTimer targetDate={batch?.registrationEnd} />
              </div>

              {/* Premium Button */}
              <Link
                href="#admission"
                className=""
              >
                <Button className="bg-gradient-to-r from-[#DC25FF] to-[#7000FF] rounded-full">
                  <FaHandPointRight className="text-white text-[16px] md:text-[16px] " />
                   <span className="text-xs md:text-sm font-black whitespace-nowrap z-10">
                    ভর্তি নিশ্চিত করুন
                  </span>
                </Button>
                
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
       
      </Container>
    </div>
  );
}
