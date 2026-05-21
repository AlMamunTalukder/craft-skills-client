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

  // Safely check if the current route is an exclusive page
  const isExclusive = pathname?.startsWith("/exclusive");

  // Fetch site data on client side mounting
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
    <footer className={`relative text-white py-12 md:py-16 overflow-hidden ${isExclusive ? "bg-black" : ""}`}>
     
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Logo */}
            <div className="flex flex-col items-center md:items-start">
              <Link href="/">
                <Image
                  src="/img/footerlogo.png"
                  alt="Craft Institute Logo"
                  width={180}
                  height={100}
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-white/80 mt-2 text-center md:text-left leading-relaxed">
                কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className={`text-lg font-semibold mb-4 text-[#DC25FF]    ${theme.accentText}`}>
                যোগাযোগ করুন
              </h3>
              <div className="space-y-3 text-sm font-medium text-gray-300">
                {siteData?.phone1 && (
                  <Link
                    href={`tel:${siteData.phone1}`}
                    className={`flex items-center gap-3 ${theme.hoverText} transition-colors duration-300`}
                  >
                    <FaPhone className="text-gray-400" />
                    {siteData.phone1}
                  </Link>
                )}
                {siteData?.phone2 && (
                  <Link
                    href={`tel:${siteData.phone2}`}
                    className={`flex items-center gap-3 ${theme.hoverText} transition-colors duration-300`}
                  >
                    <FaPhone className="text-gray-400" />
                    {siteData.phone2}
                  </Link>
                )}
                {siteData?.email && (
                  <Link
                    href={`mailto:${siteData.email}`}
                    className={`flex items-center gap-3 ${theme.hoverText} transition-colors duration-300`}
                  >
                    <FaEnvelope className="text-gray-400" />
                    {siteData.email}
                  </Link>
                )}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className={`text-lg font-semibold mb-4 text-[#DC25FF] ${theme.accentText}`}>
                সোশ্যাল মিডিয়া
              </h3>
              <div className="flex flex-wrap gap-3 mt-1">
                {socialLinks.map(
                  (social, index) =>
                    social.href && (
                      <Link
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        title={social.label}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                        style={{ color: social.color }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-base">{social.icon}</span>
                      </Link>
                    )
                )}
              </div>
            </div>

            {/* Address Block */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className={` text-lg font-semibold mb-4 text-[#DC25FF] ${theme.accentText}`}>
                ঠিকানা
              </h3>
              <div className="text-sm font-medium leading-relaxed text-gray-300">
                <p className="text-center md:text-left">
                  {siteData?.address}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Sub-Bar */}
          <div className={`border-t ${theme.borderClass} mt-12 pt-6 text-center md:text-left`}>
            <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-400 font-medium gap-3">
              <p>
                © {new Date().getFullYear()} ক্রাফট স্কিলস। সর্বস্বত্ব সংরক্ষিত।
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className={`${theme.hoverText} transition-colors`}
                >
                  গোপনীয়তা নীতি
                </Link>
                <span className="opacity-30">|</span>
                <Link
                  href="#"
                  className={`${theme.hoverText} transition-colors`}
                >
                  শর্তাবলী
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}



// import {
//   FaPhone,
//   FaEnvelope,
//   FaFacebookF,
//   FaUserFriends,
//   FaWhatsapp,
//   FaYoutube,
//   FaTelegramPlane,
// } from "react-icons/fa";
// import Image from "next/image";
// import Container from "./Container";
// import Link from "next/link";
// import bg from "@/public/img/bg.webp";
// import { getSiteData } from "@/lib/api";

// export default async function Footer() {
//   
//   const siteData = await getSiteData();

//   const socialLinks = [
//     {
//       icon: <FaFacebookF />,
//       label: "Facebook",
//       href: siteData?.facebook,
//       color: "#1877F2",
//     },
//     {
//       icon: <FaUserFriends />,
//       label: "Groups",
//       href: siteData?.facebookGroup,
//       color: "#4267B2",
//     },
//     {
//       icon: <FaWhatsapp />,
//       label: "WhatsApp",
//       href: siteData?.whatsapp,
//       color: "#25D366",
//     },
//     {
//       icon: <FaYoutube />,
//       label: "YouTube",
//       href: siteData?.youtube,
//       color: "#FF0000",
//     },
//     {
//       icon: <FaTelegramPlane />,
//       label: "Telegram",
//       href: siteData?.telegram,
//       color: "#0088cc",
//     },
//   ];

//   return (
//     <footer className="relative text-white py-12 md:py-16 overflow-hidden">
//       <Image
//         src={bg}
//         alt="Footer Background"
//         fill
//         priority
//         placeholder="blur"
//         quality={80}
//         sizes="100vw"
//         className="object-cover"
//       />

//       <div className="absolute inset-0 bg-black/50 z-0" />

//       <div className="relative z-10">
//         <Container>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
//             {/* Logo */}
//             <div className="flex flex-col items-center md:items-start">
//               <Link href="/">
//                 <Image
//                   src="/img/footerlogo.png"
//                   alt="Craft Institute Logo"
//                   width={180}
//                   height={100}
//                   className="h-12 w-auto object-contain"
//                 />
//               </Link>
//               <p className="text-sm text-gray-300 mt-3 text-center md:text-left">
//                 কথার জাদুতে মুগ্ধ করুন ক্রাফট স্কিলসের সাথে।
//               </p>
//             </div>

//             {/* Contact Info */}
//             <div className="flex flex-col items-center md:items-start">
//               <h3 className="text-lg font-semibold mb-4 text-[#DC25FF]">
//                 যোগাযোগ করুন
//               </h3>
//               <div className="space-y-3 text-sm">
//                 <Link
//                   href={`tel:${siteData?.phone1}`}
//                   className="flex items-center gap-3 hover:text-[#DC25FF] transition-colors duration-300"
//                 >
//                   <FaPhone className="text-gray-300" />
//                   {siteData?.phone1}
//                 </Link>
//                 {siteData?.phone2 && (
//                   <Link
//                     href={`tel:${siteData?.phone2}`}
//                     className="flex items-center gap-3 hover:text-[#DC25FF] transition-colors duration-300"
//                   >
//                     <FaPhone className="text-gray-300" />
//                     {siteData?.phone2}
//                   </Link>
//                 )}
//                 <Link
//                   href={`mailto:${siteData?.email}`}
//                   className="flex items-center gap-3 hover:text-[#DC25FF] transition-colors duration-300"
//                 >
//                   <FaEnvelope className="text-gray-300" />
//                   {siteData?.email}
//                 </Link>
//               </div>
//             </div>

//             {/* Social Media */}
//             <div className="flex flex-col items-center md:items-start">
//               <h3 className="text-lg font-semibold mb-4 text-[#DC25FF]">
//                 সোশ্যাল মিডিয়া
//               </h3>
//               <div className="flex flex-wrap gap-4 mt-2">
//                 {socialLinks.map(
//                   (social, index) =>
//                     social.href && (
//                       <Link
//                         key={index}
//                         href={social.href}
//                         aria-label={social.label}
//                         title={social.label}
//                         className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-md"
//                         style={{ color: social.color }}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         <span className="text-lg">{social.icon}</span>
//                       </Link>
//                     ),
//                 )}
//               </div>
//             </div>

//             {/* Address */}
//             <div className="flex flex-col items-center md:items-start">
//               <h3 className="text-lg font-semibold mb-4 text-[#DC25FF]">
//                 ঠিকানা
//               </h3>
//               <div className="text-sm leading-relaxed flex items-start gap-3">
//                 <p className="text-gray-200 text-center md:text-left">
//                   {siteData?.address}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Footer Bottom */}
//           <div className="border-t border-gray-700/50 mt-10 pt-6 text-center md:text-left">
//             <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
//               <p>
//                 © {new Date().getFullYear()} ক্রাফট স্কিলস। সর্বস্বত্ব
//                 সংরক্ষিত।
//               </p>
//               <div className="flex gap-4 mt-2 md:mt-0">
//                 <Link
//                   href="#"
//                   className="hover:text-[#DC25FF] transition-colors"
//                 >
//                   গোপনীয়তা নীতি
//                 </Link>
//                 <span>|</span>
//                 <Link
//                   href="#"
//                   className="hover:text-[#DC25FF] transition-colors"
//                 >
//                   শর্তাবলী
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     </footer>
//   );
// }
 
