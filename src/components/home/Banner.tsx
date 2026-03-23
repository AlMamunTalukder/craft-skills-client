"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import {
  BookOpen,
  GraduationCap,
  Globe,
  Lightbulb,
  Award,
  PenTool,
  Trophy,
  Mic2,
  Presentation,
  UserCheck,
  Radio,
} from "lucide-react";

import Container from "../shared/Container";
import CtaLinkButton from "../CtaLinkButton";
import leftimg from "../../../public/img/course-logo.webp";
import bg from "../../../public/img/bg.webp";
import { SiteContent } from "@/types";

const skillIcons = [
  {
    name: "ইন্টারভিউ",
    icon: <UserCheck size={18} className="text-[#F300E7]" />,
  },
  {
    name: "প্রেজেন্টেশন",
    icon: <Presentation size={18} className="text-[#F300E7]" />,
  },
  { name: "ভয়েসওভার", icon: <Mic2 size={18} className="text-[#F300E7]" /> },
  { name: "মিডিয়া", icon: <Radio size={18} className="text-[#F300E7]" /> },
];

const floatingIcons = [
  {
    Icon: BookOpen,
    top: "15%",
    left: "5%",
    size: 40,
    color: "text-white/5",
    delay: 0,
  },
  {
    Icon: GraduationCap,
    top: "70%",
    right: "8%",
    size: 60,
    color: "text-[#F300E7]/10",
    delay: 1,
  },
  {
    Icon: Lightbulb,
    top: "45%",
    left: "10%",
    size: 50,
    color: "text-yellow-400/10",
    delay: 1.5,
  },
];

const Banner = ({ siteData }: { siteData: SiteContent | null }) => {
  const pathname = usePathname();

  const content = useMemo(() => {
    const common = {
      tag: "Skills Development",
      topTitle: "৫০ দিনে চ্যালেঞ্জে",
      mainTitle: "কথার ভয় জয় করুন",
      highlight: "সবখানে হয়ে উঠুন কথার জাদুকর",
    };
    return pathname === "/admission"
      ? { ...common, description: siteData?.admissionBannerInfo?.description }
      : { ...common, description: siteData?.homeBannerInfo?.description };
  }, [pathname, siteData]);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0B001A]">
      <div className="absolute inset-0 z-0">
        <Image
          src={bg}
          alt="bg"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={75} // Reduced quality for faster loading
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f012f] via-[#1A0B2E]/95 to-[#4F0187]/70 z-10" />
      </div>

      {/* Optimized Floating Icons - Only show 3 on mobile to save CPU */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 5 + idx, repeat: Infinity, ease: "linear" }}
            className={`absolute ${item.color}`}
            style={{ top: item.top, left: item.left, right: item.right }}
          >
            <item.Icon size={item.size} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

      <Container className="relative z-20 w-full py-10 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-[65%] text-center md:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <div className="relative bg-white/10 p-2 rounded-lg border border-white/20">
                <Trophy size={24} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white">
                {content.topTitle}
              </h3>
            </motion.div>

            <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F300E7] to-[#8B5CF6]">
              {content.mainTitle}
            </h1>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {skillIcons.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
                >
                  {skill.icon}
                  <span className="text-white text-sm md:text-lg font-bold">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-white">
              {content.highlight}
            </h2>

            <div className="pt-4">
              <CtaLinkButton />
            </div>
          </div>

          <div className="w-full md:w-[40%] relative flex justify-center">
            <div className="absolute inset-0 bg-[#F300E7]/20 blur-[80px] rounded-full" />
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-[80%] sm:w-[70%] md:w-full aspect-square"
            >
              <Image
                src={leftimg}
                alt="Hero"
                width={500}
                height={500}
                priority
                className="relative z-10 object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Banner;
