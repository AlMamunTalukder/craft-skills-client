"use client";

import React, { useState, useEffect } from "react";
import Container from "./Container";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaUsers,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { SiteContent } from "@prisma/client";
import UserMenu from "../user-menu";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

type MenuItem = {
  logo: string;
  siteData: SiteContent;
  user?: Session["user"] | null;
};

const Header = ({ logo, siteData }: MenuItem) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathName = usePathname();
  const user = useSession().data?.user || null;

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

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Admission", href: "/admission" },
    { name: "Review", href: "#reviews" },
  ];

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

  return (
    <>
      <div className=" top-0 z-50 w-full shadow-sm transition-all duration-300 bg-white bg-white/90">
        <Container>
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src={logo}
                  height={150}
                  width={150}
                  alt="Logo"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-3">
              <ul className="flex gap-6">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`
                      text-base relative px-1 py-2
                      transition-all duration-300
                      hover:text-[#1ab69d] group font-semibold
                      ${
                        pathName === item.href
                          ? "text-[#1ab69d]"
                          : "text-gray-700"
                      }
                    `}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <UserMenu user={user} />
            </nav>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                className="p-2 text-gray-600 hover:text-[#1ab69d] transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 pt-1 border-t border-gray-100 animate-fade-down">
              <ul className="flex flex-col space-y-3">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="block py-2 px-4 text-gray-600 font-semibold uppercase hover:text-[#1ab69d] hover:bg-gray-50 rounded-lg transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="flex justify-center items-center">
                  <UserMenu user={user} />
                </li>
              </ul>
            </div>
          )}
        </Container>

        <div className=" ">
          <div className=" md:hidden flex items-center gap-3 md:gap-2 bg-gradient-to-r from-[#4F0187] to-[#3C016F]  justify-center py-1">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-7 w-7 text-lg"
                aria-label={social.label}
                style={{ color: "white" }}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
