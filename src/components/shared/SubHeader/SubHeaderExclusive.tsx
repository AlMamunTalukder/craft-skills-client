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
import Container from "../Container";

const CountdownTimer = dynamic(() => import("@/src/components/home/CountdownTimer"), {
  ssr: false,
});

interface ActiveBatch {
  _id: string;
  batchNo: string | number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  offerPrice: number;
  isActive: boolean;
}

interface SiteData {
  facebook?: string;
  whatsapp?: string;
  youtube?: string;
  telegram?: string;
}

export default function SubHeaderExclusive() {
  const [activeBatch, setActiveBatch] = useState<ActiveBatch | null>(null);
  const [siteData, setSiteData] = useState<SiteData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    
    // Fetch active batch
    fetch(`${API_URL}/exclusive-batches/active`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setActiveBatch(data.data);
        }
      })
      .catch(console.error);

    // Fetch site data
    fetch("/api/site")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSiteData({
            facebook: data.data.facebook,
            whatsapp: data.data.whatsapp,
            youtube: data.data.youtube,
            telegram: data.data.telegram,
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleScroll = () => {
    // Target the registration form by ID
    const el = document.getElementById("registration-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) return null;
  if (!activeBatch) return null;
  if (!activeBatch.isActive) return null;

  // Check if batch has expired using endDate
  const now = new Date();
  const endDate = new Date(activeBatch.endDate);
  if (now > endDate) return null;

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
    <div className="sticky top-0 z-50 w-full bg-black shadow-lg border-b border-[#F26422]/20 text-white py-0 md:py-1.5">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between pt-2 md:pt-3 md:pb-1">
          <div className="flex items-center justify-center md:items-start flex-col text-center md:text-left md:px-2">
            <h3 className="text-[13px] md:text-[17px] leading-tight font-bold">
              {activeBatch.title}
            </h3>
            <p className="text-[12px] md:text-[15px] text-[#F26422] font-medium opacity-90 uppercase tracking-tighter pb-[2px] md:pb-0">
              {activeBatch.description || `Batch ${activeBatch.batchNo}`}
            </p>
          </div>

          <div className="md:w-[170px] px-1 md:px-0 pb-1.5 md:pb-0">
            <CountdownTimer targetDate={activeBatch.endDate} />
          </div>

          <div className="w-[170px] px-4 md:px-0">
            <button
              onClick={handleScroll}
              className="flex gap-2 justify-center items-center content-center bg-gradient-to-r from-[#F26422] to-[#ff7b42] hover:from-[#ff7b42] hover:to-[#F26422] transition-all duration-300 rounded-full border-2 border-white px-3 py-1 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95"
            >
              <FaHandPointRight className="text-white text-[16px] md:text-[16px]" />
              <span className="text-sm md:text-base whitespace-nowrap font-bold">
                এখনই জয়েন করুন
              </span>
            </button>
          </div>

          <div className="flex justify-center md:justify-end mb-0 md:mb-0 pt-0 md:pt-0">
            <div className="hidden md:flex items-center gap-3 md:gap-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm transition-all duration-300 flex items-center justify-center h-6 md:h-9 w-6 md:w-9 rounded-full bg-white/10 hover:bg-white/20 shadow-md"
                  aria-label={social.label}
                  style={{ color: "white" }}
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