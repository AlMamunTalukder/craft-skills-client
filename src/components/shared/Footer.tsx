/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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
import { getSiteData } from "@/lib/api";

export default function Footer() {
  const pathname = usePathname();
  const [siteData, setSiteData] = useState<any>(null);

  const isExclusive = pathname?.startsWith("/exclusive");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSiteData();
        setSiteData(data);
      } catch (error) {
        console.error("Failed to fetch site data:", error);
      }
    }
    fetchData();
  }, []);

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      label: "Facebook",
      href: siteData?.facebook,
      color: isExclusive ? "#F26422" : "#1877F2",
    },
    {
      icon: <FaUserFriends />,
      label: "Groups",
      href: siteData?.facebookGroup,
      color: isExclusive ? "#ffffff" : "#4267B2",
    },
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      href: siteData?.whatsapp,
      color: "#25D366",
    },
    {
      icon: <FaYoutube />,
      label: "YouTube",
      href: siteData?.youtube,
      color: "#FF0000",
    },
    {
      icon: <FaTelegramPlane />,
      label: "Telegram",
      href: siteData?.telegram,
      color: "#0088cc",
    },
  ];

  const theme = {
    bgClass: isExclusive ? "bg-black" : "bg-black/50",
    accentText: isExclusive ? "text-[#F26422]" : "text-[#DC25FF]",
    hoverText: isExclusive ? "hover:text-[#F26422]" : "hover:text-[#DC25FF]",
    borderClass: isExclusive ? "border-white/[0.05]" : "border-gray-700/50",
  };

  return (
    <footer className={`relative text-white py-16 overflow-hidden ${isExclusive ? "bg-black" : ""}`}>
      
      {!isExclusive && (
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
      )}

      {/* Background Masking Layer Overlay */}
      <div className={`absolute inset-0 z-0 ${theme.bgClass}`} />

      <div className="relative z-10">
        <Container>
          
          {/* MAIN FOOTER LAYOUT (Clean, balanced 3-column architecture) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
            
            {/* COLUMN 1: BRAND IDENTITY (Spans 5 cols) */}
            <div className="md:col-span-5 space-y-4 flex flex-col items-center md:items-start text-center md:text-left">
              <Link href="/">
                <Image
                  src="/img/footerlogo.png"
                  alt="Craft Institute Logo"
                  width={180}
                  height={100}
                  className="h-11 w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
                কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে। আপনার কণ্ঠকে রূপান্তর করুন একটি পেশাদার ক্যারিয়ারে।
              </p>
              {siteData?.tradeLicense && (
                <p className="text-xs text-gray-500 font-medium pt-1">
                  ট্রেড লাইসেন্স নং: {siteData.tradeLicense}
                </p>
              )}
            </div>

            {/* COLUMN 2: QUICK LINK ROUTING (Spans 3 cols) */}
            <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className={`text-base font-bold tracking-wide mb-4 ${theme.accentText}`}>
                প্রয়োজনীয় লিংক
              </h3>
              <div className="flex flex-col space-y-2.5 text-sm font-medium text-gray-400">
                <Link href="/about-us" className={`${theme.hoverText} transition-colors duration-200`}>আমাদের সম্পর্কে (About Us)</Link>
                <Link href="/terms-and-conditions" className={`${theme.hoverText} transition-colors duration-200`}>শর্তাবলী (Terms & Conditions)</Link>
                <Link href="/privacy-policy" className={`${theme.hoverText} transition-colors duration-200`}>প্রাইভেসি পলিসি (Privacy Policy)</Link>
                <Link href="/refund-policy" className={`${theme.hoverText} transition-colors duration-200`}>রিফান্ড পলিসি (Refund Policy)</Link>
              </div>
            </div>

            {/* COLUMN 3: CORPORATE CONTACTS & ADDRESS (Spans 4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className={`text-base font-bold tracking-wide mb-4 ${theme.accentText}`}>
                যোগাযোগ ও ঠিকানা
              </h3>
              <div className="space-y-3 text-sm font-medium text-gray-300 mb-4">
                {siteData?.phone1 && (
                  <Link href={`tel:${siteData.phone1}`} className={`flex items-center justify-center md:justify-start gap-3 ${theme.hoverText} transition-colors duration-300`}>
                    <FaPhone className="text-gray-500 text-xs flex-shrink-0" />
                    <span>{siteData.phone1}</span>
                  </Link>
                )}
                {siteData?.phone2 && (
                  <Link href={`tel:${siteData.phone2}`} className={`flex items-center justify-center md:justify-start gap-3 ${theme.hoverText} transition-colors duration-300`}>
                    <FaPhone className="text-gray-500 text-xs flex-shrink-0" />
                    <span>{siteData.phone2}</span>
                  </Link>
                )}
                {siteData?.email && (
                  <Link href={`mailto:${siteData.email}`} className={`flex items-center justify-center md:justify-start gap-3 ${theme.hoverText} transition-colors duration-300`}>
                    <FaEnvelope className="text-gray-500 text-xs flex-shrink-0" />
                    <span>{siteData.email}</span>
                  </Link>
                )}
              </div>
              <div className="text-xs font-normal leading-relaxed text-gray-400 border-t border-white/[0.04] pt-3 w-full max-w-sm md:max-w-none">
                <p>{siteData?.address}</p>
              </div>
            </div>

          </div>

          {/* FOOTER'S FOOTER SECTION (Sub-bar housing structural outputs and social arrays) */}
          <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Copyright block text alignment */}
            <div className="text-xs md:text-sm text-gray-400 font-medium text-center lg:text-left order-3 lg:order-1">
              © {new Date().getFullYear()} ক্রাফট স্কিলস। সর্বস্বত্ব সংরক্ষিত।
            </div>

            {/* SOCIAL MEDIA HOUSING (Relocated cleanly directly inside the subfooter area) */}
            <div className="flex items-center justify-center gap-2.5 order-1 lg:order-2">
              {socialLinks.map(
                (social, index) =>
                  social.href && (
                    <Link
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      title={social.label}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                      style={{ color: social.color }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-sm">{social.icon}</span>
                    </Link>
                  )
              )}
            </div>

            {/* Payment Systems badge rendering block alignment */}
            <div className="order-2 lg:order-3">
              <Image
                src="/img/payment.png"
                alt="Payment Methods"
                width={260}
                height={35}
                className="h-7 w-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 duration-300"
              />
            </div>

          </div>
        </Container>
      </div>
    </footer>
  );
}


// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import React, { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import {
//   FaPhone,
//   FaEnvelope,
//   FaFacebookF,
//   FaUserFriends,
//   FaWhatsapp,
//   FaYoutube,
//   FaTelegramPlane,
// } from "react-icons/fa";
// import Image from "next/image";
// import Container from "./Container";
// import Link from "next/link";
// import bg from "@/public/img/bg.webp";
// import { getSiteData } from "@/lib/api";

// export default function Footer() {
//   const pathname = usePathname();
//   const [siteData, setSiteData] = useState<any>(null);

//   // Safely check if the current route is an exclusive page
//   const isExclusive = pathname?.startsWith("/exclusive");

//   // Fetch site data on client side mounting
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await getSiteData();
//         setSiteData(data);
//       } catch (error) {
//         console.error("Failed to fetch site data:", error);
//       }
//     }
//     fetchData();
//   }, []);

//   const socialLinks = [
//     {
//       icon: <FaFacebookF />,
//       label: "Facebook",
//       href: siteData?.facebook,
//       color: isExclusive ? "#F26422" : "#1877F2",
//     },
//     {
//       icon: <FaUserFriends />,
//       label: "Groups",
//       href: siteData?.facebookGroup,
//       color: isExclusive ? "#ffffff" : "#4267B2",
//     },
//     {
//       icon: <FaWhatsapp />,
//       label: "WhatsApp",
//       href: siteData?.whatsapp,
//       color: "#25D366",
//     },
//     {
//       icon: <FaYoutube />,
//       label: "YouTube",
//       href: siteData?.youtube,
//       color: "#FF0000",
//     },
//     {
//       icon: <FaTelegramPlane />,
//       label: "Telegram",
//       href: siteData?.telegram,
//       color: "#0088cc",
//     },
//   ];

//   const theme = {
//     bgClass: isExclusive ? "bg-black" : "bg-black/50",
//     accentText: isExclusive ? "text-[#F26422]" : "text-[#DC25FF]",
//     hoverText: isExclusive ? "hover:text-[#F26422]" : "hover:text-[#DC25FF]",
//     borderClass: isExclusive ? "border-white/[0.05]" : "border-gray-700/50",
//   };

//   return (
//     <footer className={`relative text-white py-12 md:py-16 overflow-hidden ${isExclusive ? "bg-black" : ""}`}>
     
//       {!isExclusive && (
//         <Image
//           src={bg}
//           alt="Footer Background"
//           fill
//           priority
//           placeholder="blur"
//           quality={80}
//           sizes="100vw"
//           className="object-cover"
//         />
//       )}

//       {/* Background Masking Layer Overlay */}
//       <div className={`absolute inset-0 z-0 ${theme.bgClass}`} />

//       <div className="relative z-10">
//         <Container>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
//             {/* Logo */}
//             <div className="flex flex-col items-center md:items-start">
//               <Link href="/">
//                 <Image
//                   src="/img/footerlogo.png"
//                   alt="Craft Institute Logo"
//                   width={180}
//                   height={100}
//                   className="h-12 w-auto object-contain"
//                 />
//               </Link>
//               <p className="text-sm text-white mt-2 text-center md:text-left leading-relaxed">
//                 কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।
//               </p>
//             </div>

//             {/* Contact Info */}
//             <div className="flex flex-col items-center md:items-start">
//               <h3 className={`text-lg font-semibold mb-4 text-[#DC25FF]    ${theme.accentText}`}>
//                 যোগাযোগ করুন
//               </h3>
//               <div className="space-y-3 text-sm font-medium text-gray-300">
//                 {siteData?.phone1 && (
//                   <Link
//                     href={`tel:${siteData.phone1}`}
//                     className={`flex items-center gap-3 ${theme.hoverText} transition-colors duration-300`}
//                   >
//                     <FaPhone className="text-gray-400" />
//                     {siteData.phone1}
//                   </Link>
//                 )}
//                 {siteData?.phone2 && (
//                   <Link
//                     href={`tel:${siteData.phone2}`}
//                     className={`flex items-center gap-3 ${theme.hoverText} transition-colors duration-300`}
//                   >
//                     <FaPhone className="text-gray-400" />
//                     {siteData.phone2}
//                   </Link>
//                 )}
//                 {siteData?.email && (
//                   <Link
//                     href={`mailto:${siteData.email}`}
//                     className={`flex items-center gap-3 ${theme.hoverText} transition-colors duration-300`}
//                   >
//                     <FaEnvelope className="text-gray-400" />
//                     {siteData.email}
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {/* Social Media Links */}
//             <div className="flex flex-col items-center md:items-start">
//               <h3 className={`text-lg font-semibold mb-4 text-[#DC25FF] ${theme.accentText}`}>
//                 সোশ্যাল মিডিয়া
//               </h3>
//               <div className="flex flex-wrap gap-3 mt-1">
//                 {socialLinks.map(
//                   (social, index) =>
//                     social.href && (
//                       <Link
//                         key={index}
//                         href={social.href}
//                         aria-label={social.label}
//                         title={social.label}
//                         className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 shadow-md"
//                         style={{ color: social.color }}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <span className="text-base">{social.icon}</span>
//                       </Link>
//                     )
//                 )}
//               </div>
//             </div>

//             {/* Address Block */}
//             <div className="flex flex-col items-center md:items-start">
//               <h3 className={` text-lg font-semibold mb-4 text-[#DC25FF] ${theme.accentText}`}>
//                 ঠিকানা
//               </h3>
//               <div className="text-sm font-medium leading-relaxed text-white">
//                 <p className="text-center md:text-left">
//                   {siteData?.address}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Footer Sub-Bar */}
//           <div className={`border-t ${theme.borderClass} mt-12 pt-6 text-center md:text-left`}>
//             <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-400 font-medium gap-3">
//               <p>
//                 © {new Date().getFullYear()} ক্রাফট স্কিলস। সর্বস্বত্ব সংরক্ষিত।
//               </p>
//               <Image
//                 src="/img/payment.png"
//                 alt="Payment Methods"
//                 width={300}
//                 height={40}
//                 className="h-8 md:h-10 w-auto object-contain duration-300"
//               />
//             </div>
//           </div>
//         </Container>
//       </div>
//     </footer>
//   );
// }


