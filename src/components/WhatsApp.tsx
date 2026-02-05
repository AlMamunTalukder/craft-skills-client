"use client";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const WhatsApp = () => {
  // 1. Updated Number (Added 880 for Bangladesh country code)
  const phoneNumber = "8801700999093";
  
  const message = "Hello! I visited your website and have a query.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"     
      className="group fixed bottom-[55px] right-4 md:right-6 p-2 text-white bg-[#25D366] rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      {/* 3. The Hover Message (Tooltip) */}
      <span className="absolute right-11 px-3 py-1 bg-white text-gray-800 text-xs font-bold rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Whatsapp-এ ম্যাসেজ করুন। 
      </span>

      <FaWhatsapp className="h-6 w-6" />
    </Link>
  );
};

export default WhatsApp;