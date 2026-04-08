"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaHandPointRight,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import Container from "./Container";
import "./subheader.css";
import { Seminar, SiteContent } from "@/types";

const CountdownTimer = dynamic(() => import("../home/CountdownTimer"), {
  ssr: false,
});

type Props = {
  siteData: Partial<SiteContent>;
  seminar: Partial<Seminar> | null;
};

export default function SubHeader({ siteData, seminar }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  const getCorrectedDeadline = () => {
    if (!seminar?.registrationDeadline) return undefined;
    const originalDate = new Date(seminar.registrationDeadline);
    const bdDate = new Date(originalDate.getTime() + 6 * 60 * 60 * 1000);
    return bdDate.toISOString();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSeminarActive = () => {
    if (!seminar || !seminar.isActive) return false;

    const now = new Date();
    const deadlineDate = seminar.registrationDeadline
      ? new Date(seminar.registrationDeadline)
      : null;

    return deadlineDate && now < deadlineDate;
  };

  // ✅ Scroll handler (ONLY ADDITION)
  const handleScroll = () => {
    const el = document.getElementById("registration-form");
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ✅ IMPORTANT: stop rendering completely
  if (!isSeminarActive()) return null;

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

  return (
    <div className="sticky top-0 z-50 h-[89px] md:h-full md:w-full bg-linear-to-r from-[#4F0187] to-[#3C016F] shadow-md text-white py-0 md:py-1.5">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between pt-2 md:pt-3 md:pb-1">
          <div className="flex items-center justify-center md:items-start flex-col text-center md:text-left md:px-2">
            <h3 className="text-[13px] md:text-[17px] leading-tight">
              {seminar?.title}
            </h3>

            <p className="text-[12px] md:text-[15px] text-purple-100 font-medium opacity-80 uppercase tracking-tighter pb-[2px] md:pb-0">
              {seminar?.description}
            </p>
          </div>

          <div className="md:w-[170px] px-1 md:px-0 pb-1.5 md:pb-0">
            <CountdownTimer targetDate={getCorrectedDeadline()} />
          </div>

          {/* ✅ UPDATED BUTTON (removed Link, added scroll) */}
          <div className=" w-[170px] px-4 md:px-0">
            <button
              onClick={handleScroll}
              className="flex gap-2 justify-center items-center content-center bg-gradient-to-r from-[#DC25FF] to-[#7000FF] rounded-full border-2 border-white px-3 py-1 cursor-pointer"
            >
              <FaHandPointRight className="text-white text-[16px] md:text-[16px]" />
              <span className="text-sm md:text-base whitespace-nowrap">
                রেজিস্ট্রেশন করুন
              </span>
            </button>
          </div>

          <div className="flex justify-center md:justify-end mb-0 md:mb-0 pt-0 md:pt-0">
            <div className=" hidden md:flex items-center gap-3 md:gap-2">
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
