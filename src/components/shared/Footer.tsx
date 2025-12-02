"use client"

import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaUserFriends,
  FaWhatsapp,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";
import Image from "next/image";
import Container from "./Container";
import Link from "next/link";
import bg from "@/public/img/bg.webp";
import { useState, useEffect } from "react";
import { SiteContent } from "@/types";
import logofooter from "../../../public/img/footerlogo.png";


const Footer = () => {
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSiteContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/site');
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch data');
        }
        
        setSiteContent(result.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'অজানা ত্রুটি');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiteContent();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <footer className="relative text-white py-12 md:py-16 overflow-hidden bg-gray-900">
        <Container>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#DC25FF] mx-auto"></div>
            <p className="text-gray-300 mt-3">লোড হচ্ছে...</p>
          </div>
        </Container>
      </footer>
    );
  }

  // Show error state
  if (error || !siteContent) {
    return (
      <footer className="relative text-white py-12 md:py-16 overflow-hidden bg-gray-900">
        <Container>
          <div className="text-center py-8">
            <p className="text-red-300">ডেটা লোড করতে সমস্যা হচ্ছে</p>
            <p className="text-sm text-gray-400 mt-2">
              অনুগ্রহ করে পৃষ্ঠাটি রিফ্রেশ করুন
            </p>
          </div>
        </Container>
      </footer>
    );
  }

  const {
    logoDark,
    tagline,
    email,
    phone1,
    phone2,
    address,
    facebook,
    facebookGroup,
    whatsapp,
    youtube,
    telegram,
  } = siteContent;

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      label: "Facebook",
      href: facebook,
      color: "#1877F2",
    },
    {
      icon: <FaUserFriends />,
      label: "Groups",
      href: facebookGroup,
      color: "#4267B2",
    },
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      href: whatsapp,
      color: "#25D366",
    },
    {
      icon: <FaYoutube />,
      label: "YouTube",
      href: youtube,
      color: "#FF0000",
    },
    {
      icon: <FaTelegramPlane />,
      label: "Telegram",
      href: telegram,
      color: "#0088cc",
    },
  ];

  return (
    <footer className="relative text-white py-12 md:py-16 overflow-hidden">
      <Image
        src={bg}
        alt="Footer Background"
        fill
        priority
        placeholder="blur"
        quality={80}
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Logo */}
            <div className="flex flex-col items-center md:items-start">
              <Link href="/">
                {logoDark && (
                  <Image
                    src={logofooter}
                    alt="Craft Institute Logo"
                    width={180}
                    height={100}
                    className="h-12 w-auto object-contain"
                  />
                )}
              </Link>
              <p className="text-sm text-gray-300 mt-3 text-center md:text-left">
              কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4 text-[#DC25FF]">
                যোগাযোগ করুন
              </h3>
              <div className="space-y-3 text-sm">
                <Link
                  href={`tel:${phone1}`}
                  className="flex items-center gap-3 hover:text-[#DC25FF] transition-colors duration-300"
                >
                  <FaPhone className="text-gray-300" />
                  {phone1}
                </Link>
                {phone2 && (
                  <Link
                    href={`tel:${phone2}`}
                    className="flex items-center gap-3 hover:text-[#DC25FF] transition-colors duration-300"
                  >
                    <FaPhone className="text-gray-300" />
                    {phone2}
                  </Link>
                )}
                <Link
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 hover:text-[#DC25FF] transition-colors duration-300"
                >
                  <FaEnvelope className="text-gray-300" />
                  {email}
                </Link>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4 text-[#DC25FF]">
                সোশ্যাল মিডিয়া
              </h3>
              <div className="flex flex-wrap gap-4 mt-2">
                {socialLinks.map(
                  (social, index) =>
                    social.href && (
                      <Link
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        title={social.label}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-md"
                        style={{ color: social.color }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-lg">{social.icon}</span>
                      </Link>
                    ),
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-lg font-semibold mb-4 text-[#DC25FF]">
                ঠিকানা
              </h3>
              <div className="text-sm leading-relaxed flex items-start gap-3">
                <p className="text-gray-200 text-center md:text-left">
                  {address}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700/50 mt-10 pt-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
              <p>
                © {new Date().getFullYear()} ক্রাফট ইনস্টিটিউট। সর্বস্বত্ব
                সংরক্ষিত।
              </p>
              <div className="flex gap-4 mt-2 md:mt-0">
                <Link href="#" className="hover:text-[#DC25FF] transition-colors">
                  গোপনীয়তা নীতি
                </Link>
                <span>|</span>
                <Link href="#" className="hover:text-[#DC25FF] transition-colors">
                  শর্তাবলী
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;