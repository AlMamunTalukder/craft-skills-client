"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import {
  BookOpen,
  GraduationCap,
  Lightbulb,
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
    size: 60,
    color: "text-white/15",
    animation: "animate-float-slow",
  },
  {
    Icon: GraduationCap,
    top: "70%",
    right: "8%",
    size: 60,
    color: "text-[#F300E7]/10",
    animation: "animate-float-delayed",
  },
  {
    Icon: Lightbulb,
    top: "45%",
    left: "10%",
    size: 50,
    color: "text-yellow-400/30",
    animation: "animate-float-reverse",
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
      {/* Background Section */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bg}
          alt="bg"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f012f] via-[#1A0B2E]/95 to-[#4F0187]/70 z-10" />
      </div>

      {/* Floating Icons - Pure CSS Animation */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {floatingIcons.map((item, idx) => (
          <div
            key={idx}
            className={`absolute ${item.color} md:${item.animation}`}
            style={{ top: item.top, left: item.left, right: item.right }}
          >
            <item.Icon size={item.size} strokeWidth={1} />
          </div>
        ))}
      </div>

      <Container className="relative z-20 w-full py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-[65%] text-center md:text-left space-y-3 md:space-y-8">
            {/* Top Title Section */}
            <div className="flex items-center gap-3 justify-center md:justify-start opacity-0 animate-fade-in-up">
              <div className="relative bg-white/10 p-2 rounded-lg border border-white/20">
                <Trophy size={24} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white">
                {content.topTitle}
              </h3>
            </div>

            <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F300E7] to-[#8B5CF6] opacity-0 animate-fade-in-up [animation-delay:200ms]">
              {content.mainTitle}
            </h1>

            {/* Skill Tags */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 opacity-0 animate-fade-in-up ">
              {skillIcons.map((skill, i) => (
                 <div
                  key={i}
                  className="flex items-center content-center justify-center gap-2 px-4 py-2 rounded-md md:rounded-xl bg-white/5 backdrop-blur-md border border-white/10 w-[130px]">
                  {skill.icon}
                  <span className="text-white text-sm md:text-lg font-bold">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold text-white opacity-0 animate-fade-in-up [animation-delay:600ms]">
              {content.highlight}
            </h2>

            <div className="pt-4 opacity-0 animate-fade-in-up [animation-delay:800ms]">
              <CtaLinkButton />
            </div>
          </div>

          {/* Hero Image Section with CSS Floating Animation */}
          <div className="w-full md:w-[40%] relative flex justify-center">
            <div className="absolute inset-0 bg-[#F300E7]/20 blur-[50px] rounded-full " />
            <div className="relative z-10 w-[80%] sm:w-[70%] md:w-full aspect-square animate-hero-float">
              <Image
                src={leftimg}
                alt="Hero"
                width={500}
                height={500}
                priority
                className="relative z-10 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </Container>     
    </section>
  );
};

export default Banner;
