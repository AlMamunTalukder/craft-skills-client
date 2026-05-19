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


import { SiteContent } from "@/types";
import { MdArrowForward } from "react-icons/md";
import { pushEvent } from "@/src/utils/dataLayer";
import Container from "@/src/components/shared/Container";


const skillIcons = [
  { name: "ইন্টারভিউ", icon: <UserCheck size={18} /> },
  { name: "প্রেজেন্টেশন", icon: <Presentation size={18} /> },
  { name: "ভয়েসওভার", icon: <Mic2 size={18} /> },
  { name: "মিডিয়া", icon: <Radio size={18} /> },
];

const floatingIcons = [
  { Icon: BookOpen, top: "12%", left: "6%", size: 40 },
  { Icon: GraduationCap, top: "70%", right: "8%", size: 60 },
  { Icon: Lightbulb, top: "45%", left: "10%", size: 50 },
];

const ExclusiveBanner = ({ siteData }: { siteData: SiteContent | null }) => {
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

  const handleCTA = () => {
    const isMobile = window.innerWidth < 768;

    pushEvent(pathname === "/admission" ? "begin_checkout" : "add_to_cart", {
      ecommerce: {
        currency: "BDT",
        items: [
          {
            item_id: "banner_join_btn",
            item_name: "Skill Course Join",
            item_category: "course",
            quantity: 1,
          },
        ],
      },
    });

    const targetId =
      pathname === "/admission" ? "admission" : "registration-form";

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({
        behavior: isMobile ? "auto" : "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#353535]">

      {/* BASE LAYER */}
      <div className="absolute inset-0 bg-[#353535]" />

      {/* ORANGE GLOW BLOBS */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#F26422] rounded-full blur-[140px] opacity-40" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#F26422] rounded-full blur-[140px] opacity-30" />

      {/* GRID OVERLAY */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_rgba(255,255,255,0.2)_1px,_transparent_1px)] [background-size:20px_20px]" />

      {/* FLOATING ICONS */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, idx) => (
          <div
            key={idx}
            className="absolute text-white/10"
            style={{ top: item.top, left: item.left, right: item.right }}
          >
            <item.Icon size={item.size} strokeWidth={1} />
          </div>
        ))}
      </div>

      <Container className="relative z-10 w-full py-14 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* LEFT CONTENT */}
          <div className="w-full md:w-[60%] space-y-6 text-center md:text-left">

            {/* TOP TAG */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20">
              <Trophy className="text-[#F26422]" size={18} />
              <span className="text-white text-sm font-semibold">
                {content.topTitle}
              </span>
            </div>

            {/* MAIN TITLE */}
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {content.mainTitle}
            </h1>

            {/* SKILLS */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {skillIcons.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                >
                  <span className="text-[#F26422]">{skill.icon}</span>
                  <span className="text-white text-sm font-medium">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            {/* HIGHLIGHT */}
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#F26422]">
              {content.highlight}
            </h2>

            {/* CTA BUTTON */}
            <button
              onClick={handleCTA}
              className="group relative flex items-center gap-3 bg-gradient-to-r from-[#F26422] to-[#FF7A45] px-6 md:px-8 py-4 md:py-5 rounded-full text-white shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <span className="text-base md:text-lg font-bold">
                মাত্র ১৯০ টাকায় এখনই জয়েন করুন
              </span>

              <div className="bg-white/20 rounded-full p-1.5 group-hover:bg-white/30 transition">
                <MdArrowForward className="text-xl group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* RIGHT VISUAL BLOCK */}
          <div className="w-full md:w-[40%] relative flex justify-center">
            <div className="absolute inset-0 bg-[#F26422]/20 blur-[60px] rounded-full " />
            <div className="relative z-10 w-[80%] sm:w-[70%] md:w-full aspect-square animate-hero-float">
              <Image
                src="/img/course-logo.webp"
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
export default ExclusiveBanner;