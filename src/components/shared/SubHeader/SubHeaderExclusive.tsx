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
import { AlertCircle } from "lucide-react";
import { pushEvent } from "@/src/utils/dataLayer";

const CountdownTimer = dynamic(
  () => import("@/src/components/home/CountdownTimer"),
  {
    ssr: false,
  },
);

interface SiteData {
  facebook?: string;
  whatsapp?: string;
  youtube?: string;
  telegram?: string;
}

interface VisitorStatus {
  status: "active" | "blocked" | "registered";
  stage?: number;
  expiryTime?: string;
  isBlocked: boolean;
  registered: boolean;
  stageLabel?: string;
}

const PHONE_NUMBER = "8801700999093";
const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER}`;

export default function SubHeaderExclusive() {
  const [siteData, setSiteData] = useState<SiteData>({});
  const [visitor, setVisitor] = useState<VisitorStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

    // Fetch visitor status (for timer)
    fetch(`${API_URL}/exclusive/visitor-status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVisitor(data);
        }
      })
      .catch(console.error);

    // Fetch site data for social links
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
    // ✅ GTM Event: add_to_cart
    pushEvent("add_to_cart", {
      ecommerce: {
        currency: "BDT",
        value: 199,
        items: [
          {
            item_id: "exclusive_offer_199",
            item_name: "Voice & Public Speaking Masterclass",
            item_category: "exclusive_offer",
            price: 199,
            quantity: 1,
          },
        ],
      },
    });

    const el = document.getElementById("registration-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  // const handleScroll = () => {
  //   const el = document.getElementById("registration-form");
  //   if (el) {
  //     el.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };

  // Hide while loading
  if (loading) return null;
  if (!visitor) return null;

  // ==============================
  // BLOCKED / REGISTERED STATE – show expiry banner with WhatsApp
  // ==============================
  if (visitor.status === "blocked" || visitor.status === "registered") {
    return (
      <div className="sticky top-0 z-50 w-full bg-black shadow-lg border-b border-red-500/30 text-white py-2 md:py-3">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="hidden sm:block w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="text-red-400 w-4 h-4" />
              </div>
              <div>
                <p className="text-sm md:text-base font-bold text-white">
                  🚫 ১৯৯ টাকার অফারটি শেষ!
                </p>
                <p className="text-xs md:text-sm text-red-300 font-semibold">
                  বর্তমান প্রাইস ৫,০০০ টাকা
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xs md:text-sm text-white/70 text-center md:text-right">
                বিশেষ অনুরোধে যোগাযোগ করুন
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2 px-4 rounded-full transition transform hover:scale-[1.02] shadow-lg"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
                <span className="sm:hidden">মেসেজ</span>
              </a>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // ==============================
  // ACTIVE STATE – show countdown and registration button
  // ==============================
  if (visitor.status !== "active") return null;

  const targetDate = visitor.expiryTime;

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
              Voice & Public Speaking Masterclass
            </h3>
            <p className="text-[12px] md:text-[15px] text-[#F26422] font-medium opacity-90 uppercase tracking-tighter pb-[2px] md:pb-0">
              Exclusive Limited Time Offer
              {visitor.stageLabel && (
                <span className="ml-2 text-white/60 text-[10px] md:text-xs">
                  • {visitor.stageLabel}
                </span>
              )}
            </p>
          </div>

          <div className="md:w-[170px] px-1 md:px-0 pb-1.5 md:pb-0">
            <CountdownTimer targetDate={targetDate} />
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
