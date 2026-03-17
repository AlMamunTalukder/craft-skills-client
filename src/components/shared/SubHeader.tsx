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
import { Button } from "@/components/ui/button";

const CountdownTimer = dynamic(() => import("../home/CountdownTimer"), {
  ssr: false,
});

type Props = {
  siteData: Partial<SiteContent>;
  seminar: Partial<Seminar> | null;
};

export default function SubHeader({ siteData, seminar }: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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

  const isSeminarActive = () => {
    if (!seminar || !seminar.isActive) return false;

    const now = new Date();
    const deadlineDate = seminar.registrationDeadline
      ? new Date(seminar.registrationDeadline)
      : null;

    return deadlineDate && now < deadlineDate;
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
    <div
      className={`sticky top-0 z-50 w-full shadow-sm transition-all duration-300 responsive-header ${
        isScrolled
          ? "bg-linear-to-r from-[#4F0187] to-[#3C016F] shadow-md text-white py-0 md:py-1.5"
          : " bg-linear-to-r from-[#4F0187] to-[#3C016F] shadow-md text-white py-0 md:py-3"
      }`}
    >
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between pt-2 md:pt-3 md:pb-1 space-y-[4px] md:space-y-0">
          <div className="flex items-center justify-center md:items-start flex-col text-center md:text-left  md:px-2">
            <h3 className="text-[13px] md:text-[17px] leading-tight">
              {seminar?.title || "ফ্রি সেমিনারে যুক্ত হতে রেজিস্ট্রেশন করুন।"}
            </h3>

            <p className="text-[12px] md:text-[15px] text-purple-100 font-medium opacity-80 uppercase tracking-tighter">
              {seminar?.description}
            </p>
          </div>

          <div className="md:w-[170px] px-1 md:px-0">
            <CountdownTimer targetDate={seminar?.registrationDeadline} />
          </div>

          <div className=" md:w-[140px] px-4 md:px-0">
            <Link
              href={"#registration-form"}
              className=""
              aria-label="Register Now"
            >
              <Button className="bg-gradient-to-r from-[#DC25FF] to-[#7000FF] rounded-full border border-white">
                <FaHandPointRight className="text-white text-[16px] md:text-[16px] " />
                <span className="text-sm md:text-base whitespace-nowrap ">
                  রেজিস্ট্রেশন করুন
                </span>
              </Button>
            </Link>
          </div>
          <div className="flex justify-center md:justify-end mb-[6px] md:mb-0 pt-1 md:pt-0">
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
