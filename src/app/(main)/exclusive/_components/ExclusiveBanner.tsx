"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import {
  BookOpen,
  GraduationCap,
  Lightbulb,
  Mic2,
  Presentation,
  UserCheck,
  Radio,
  Sparkles
} from "lucide-react";

import { MdArrowForward } from "react-icons/md";
import { pushEvent } from "@/src/utils/dataLayer";
import Container from "@/src/components/shared/Container";

const skillIcons = [
  { name: "ইন্টারভিউ", icon: <UserCheck size={16} /> },
  { name: "প্রেজেন্টেশন", icon: <Presentation size={16} /> },
  { name: "ভয়েসওভার", icon: <Mic2 size={16} /> },
  { name: "মিডিয়া", icon: <Radio size={16} /> },
];

const floatingIcons = [
  { Icon: BookOpen, top: "12%", left: "6%", size: 40 },
  { Icon: GraduationCap, top: "72%", right: "8%", size: 55 },
  { Icon: Lightbulb, top: "45%", left: "4%", size: 45 },
];

const ExclusiveBanner = () => {
  const pathname = usePathname();

  const handleCTA = () => {
    const isMobile = window.innerWidth < 768;

    // =========================
    // GTM EVENT
    // =========================
    pushEvent("exclusive_offer_banner_click", {
      button_name: "মাত্র 199 টাকায় এখনই জয়েন করুন",
      page_path: pathname,
      section: "exclusive_banner",
      course_name: "Voice & Public Speaking Masterclass",
      offer_price: 199,
      regular_price: 5500,
    });

    // =========================
    // SCROLL TO FORM
    // =========================
    const el = document.getElementById("registration-form");
    if (el) {
      el.scrollIntoView({
        behavior: isMobile ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden bg-black">
      
      {/* =========================
          🌌 DEEP ULTRA DARK AMBIENT GLOW SYSTEM
         ========================= */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#F26422]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] bg-[#F26422]/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/[0.03] blur-[160px] rounded-full pointer-events-none" />

      {/* Modern High-End Digital Matrix Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* FLOATING DECORATIVE BACKGROUND ICONS */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {floatingIcons.map((item, idx) => (
          <div
            key={idx}
            className="absolute text-white/[0.03] hidden sm:block"
            style={{ top: item.top, left: item.left, right: item.right }}
          >
            <item.Icon size={item.size} strokeWidth={1} />
          </div>
        ))}
      </div>

      <Container className="relative z-10 w-full py-16 md:py-24 px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* LEFT SIDE: INFORMATIVE CONTROLS */}
          <div className="w-full md:w-[58%] space-y-6 md:space-y-7 text-center md:text-left flex flex-col justify-center items-center md:items-start">

           

            {/* MAIN TITLE H1 */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
              কথার ভয় জয় করুন
            </h1>

            {/* HORIZONTAL SKILLS PILLS STREAM */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2.5 max-w-lg md:max-w-none">
              {skillIcons.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.02] border border-white/[0.05] shadow-sm backdrop-blur-md transition-colors hover:border-white/10"
                >
                  <span className="text-[#F26422] flex items-center justify-center">{skill.icon}</span>
                  <span className="text-gray-300 text-xs sm:text-sm font-semibold">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            {/* HIGHLIGHT COMPONENT STRIP */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-[#ff8855] to-[#F26422] tracking-tight">
              সবখানে হয়ে উঠুন কথার জাদুকর
            </h2>

            {/* HIGH-END METALLIC GLOW CALL-TO-ACTION BUTTON */}
            <button
              onClick={handleCTA}
              className="group relative flex items-center gap-4 bg-gradient-to-r from-[#F26422] via-[#ff783e] to-[#F26422] px-6 md:px-8 py-4 md:py-5 rounded-full text-white transition-all duration-500 hover:scale-[1.02] active:scale-98 cursor-pointer shadow-[0_15px_40px_rgba(242,100,34,0.25)] hover:shadow-[0_20px_50px_rgba(242,100,34,0.4)]"
            >
              <span className="text-base md:text-lg font-black tracking-wide">
                মাত্র 199 টাকায় এখনই জয়েন করুন
              </span>

              <div className="bg-white/15 rounded-full p-1.5 group-hover:bg-white/25 transition-colors duration-300">
                <MdArrowForward className="text-lg md:text-xl group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>

          {/* RIGHT SIDE: PREMIUM HERO FRAMED MEDIA */}
          <div className="w-full md:w-[42%] flex justify-center items-center relative">
            {/* Soft Ambient Inner Glow Backing layer */}
            <div className="absolute w-[70%] h-[70%] bg-[#F26422]/10 blur-[80px] rounded-full pointer-events-none" />
            
            {/* HER0 FLOAT WRAPPER CONTAINER */}
            <div className="relative z-10 w-[85%] sm:w-[65%] md:w-full aspect-square flex items-center justify-center rounded-[2.5rem] border border-white/[0.03] bg-white/[0.01] p-4 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] group animate-hero-float">
              
              {/* Decorative Frame Overlays */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/10 rounded-tl-xl transition-all group-hover:border-[#F26422]/40" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/10 rounded-br-xl transition-all group-hover:border-[#F26422]/40" />
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
                <Image
                  src="/img/exclusive.jpeg"
                  alt="Voice & Public Speaking Masterclass Exclusive Cover Asset"
                  width={480}
                  height={480}
                  priority
                  className="object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

        </div>
      </Container>     
    </section>
  );
};

export default ExclusiveBanner;