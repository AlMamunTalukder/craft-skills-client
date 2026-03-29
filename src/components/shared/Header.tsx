/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// src/components/shared/Header.tsx
"use client";

import { useState } from "react";
import Container from "./Container";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "../user-menu";
import logo from "../../../public/img/headerlogo.png";
import { SiteContent } from "@/types";

interface HeaderProps {
  siteData: SiteContent | null;
  logo?: string;
  user: any;
}

const Header = ({ siteData, logo: logoUrl, user }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

 

  const displayLogo = logoUrl || logo;

  const showPdfMenu = siteData?.showPdfMenu !== false;

  const baseMenuItems = [
    { name: "Home", href: "/" },
    { name: "Admission", href: "/admission" },
    { name: "Review", href: "/reviews" },
  ];

  const pdfMenuItem = {
    name: "PDF Download",
    href: "/seminar-confirmation",
  };

  const menuItems = showPdfMenu
    ? [...baseMenuItems, pdfMenuItem]
    : baseMenuItems;

  return (
    <div className="top-0 z-50 w-full shadow-sm bg-white">
      <Container>
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="relative">
                {typeof displayLogo === "string" ? (
                  <Image
                    src={displayLogo}
                    alt={siteData?.name || "Logo"}
                    height={150}
                    width={150}
                    priority
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src={logo}
                    alt={siteData?.name || "Logo"}
                    height={150}
                    width={150}
                    priority
                    className="object-contain"
                  />
                )}
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav>
              <ul className="flex items-center gap-1">
                {menuItems.map((item, index) => {
                  const isActive = pathName === item.href;
                  return (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={`relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full group
                          ${isActive ? "text-[#4F0187]" : "text-slate-600 hover:text-[#4F0187]"}`}
                      >
                        {item.name}
                        {/* Underline Animation */}
                        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-[#4F0187] rounded-full transition-all duration-300 
                          ${isActive ? "w-4" : "w-0 group-hover:w-4"}`} 
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            <div className="h-6 w-[1px] bg-slate-200 mx-2" /> {/* Divider */}
            
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="p-2 text-gray-600 hover:text-[#1ab69d] transition-colors duration-300 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-1 border-t border-gray-100">
            <ul className="flex flex-col space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="block py-2 px-4 text-gray-600 font-semibold hover:text-[#1ab69d] hover:bg-gray-50 rounded-lg transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="flex justify-center items-center">
                <UserMenu  />
              </li>
            </ul>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Header;
