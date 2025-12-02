// This page for Free registration.

"use client";

import { Seminar, SiteContent } from "@prisma/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaHandPointRight,
  FaTelegramPlane,
  FaUsers,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import Container from "./Container";
import "./subheader.css";


const CountdownTimer = dynamic(
  () => import("../home/CountdownTimer"),
  { ssr: false },
);

type Props = {
  siteData: Partial<SiteContent>;
  seminar: Partial<Seminar> | null;
};



export default function SubHeader({ siteData, seminar }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname();

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
    if (!seminar || !seminar.isActive) return false;

    const now = new Date();
    const deadlineDate = seminar.registrationDeadline
      ? new Date(seminar.registrationDeadline)
      : null;

    // Seminar is active if it's marked as active AND
    // the registration deadline has not passed
    return seminar.isActive && deadlineDate && now < deadlineDate;
  }; 

  return (
    <div
      className={`sticky top-0 z-50 w-full shadow-sm transition-all duration-300 responsive-header ${
        isScrolled
          ? "bg-gradient-to-r from-[#4F0187] to-[#3C016F] shadow-md text-white py-0 md:py-3"
          : " bg-gradient-to-r from-[#4F0187] to-[#3C016F] shadow-md text-white py-0 md:py-3"
      }`}
    >
      <Container>
        {/* Seminar information - conditionally rendered based on seminar status */}
        {isSeminarActive() ? (
          // **IF SEMINAR IS ACTIVE: Show full bar**
          <div className="flex flex-col md:flex-row items-center justify-between pt-2 md:pt-3 md:pb-1 space-y-[2px] md:space-y-0">
            {/* Left side - Registration info and time */}
            <div className="flex items-center md:items-start flex-col text-center md:text-left  md:px-2">
              <h3 className="text-[13px] md:text-[17px] leading-tight">
                {seminar?.title || "ফ্রি সেমিনারে যুক্ত হতে রেজিস্ট্রেশন করুন।"}
              </h3>

              <div className="flex items-center gap-1 text-xs sm:text-base text-gray-200 font-medium">
                <span>{seminar?.description}</span>
              </div>
            </div>

            {/* Middle - Countdown timer */}
            <div className="w-[150px] sm:w-[150px] md:w-[170px] px-1 md:px-0">
              {/* my-2 md:my-0 md:mx-2 lg:mx-4 w-full sm:w-auto md:px-4 */}
              <div className="md:bg-white/5 md:backdrop-blur-sm px-1 md:px-5 py-0 md:py-0 rounded-lg md:border md:border-white/10 shadow-lg">
                <CountdownTimer targetDate={seminar?.registrationDeadline} />
              </div>
            </div>

            {/* Right side - Registration button */}
            <div className="w-[222px] md:w-[150px] px-4 md:px-0">
              <Link
                href={
                  pathName === "/admission"
                    ? "#admission"
                    : "#registration-form"
                }
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#DC25FF] to-[#3C016F] border-2 md:border border-white px-2 md:px-1 py-1 rounded-full md:rounded-lg text-white hover:shadow-lg hover:shadow-[#DC25FF]/20 transition-all duration-300 w-full"
                aria-label="Register Now"
              >
                <FaHandPointRight className="text-white text-[16px] md:text-[16px] " />
                <span className="text-sm md:text-base whitespace-nowrap ">
                  রেজিস্ট্রেশন করুন
                </span>
              </Link>
            </div>

            {/* Social Icon */}
            <div className="flex justify-center md:justify-end mb-[6px] md:mb-2 pt-1">
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
        ) : (
          // **ELSE (SEMINAR NOT ACTIVE): Show only social icons**
          <div className="flex justify-center md:justify-end py-2 md:py-0">
            {/* Note: Removed 'hidden' class to show on mobile */}
            <div className="flex items-center gap-3 md:gap-2">
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
        )}
      </Container>
    </div>
  );
}
