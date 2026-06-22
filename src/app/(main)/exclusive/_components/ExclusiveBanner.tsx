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
  Radio
} from "lucide-react";

import { MdArrowForward } from "react-icons/md";
import { pushEvent } from "@/src/utils/dataLayer";
import Container from "@/src/components/shared/Container";
import { Button } from "@/components/ui/button";

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
    <section className="relative md:min-h-screen flex items-center overflow-hidden bg-black">

      <div className="absolute inset-0 z-0">
        <Image
          src={"/img/bgexclu.png"}
          alt="bg"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={75}
        />
       <div className="absolute inset-0 bg-gradient-to-r from-black via-[#120600]/95 to-[#2a0f00]/70 z-10" />
      </div>
      
 

     

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
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 opacity-0 animate-fade-in-up ">
              {skillIcons.map((skill, i) => (
                  <div
                  key={i}
                  className="flex items-center content-center justify-center gap-2 px-4 py-2 rounded-md md:rounded-xl bg-white/5 backdrop-blur-md border border-white/10 w-[130px]">
                  <span className="text-[#F26422] flex items-center justify-center">{skill.icon}</span>
                   <span className="text-white text-sm md:text-lg font-bold">
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
            <Button
              onClick={handleCTA}
              className="group relative flex items-center gap-4 bg-gradient-to-r from-[#fc8e5b] via-[#ff783e] to-[#ff5100] px-6 md:px-8 py-4 md:py-10 rounded-full text-white transition-all duration-500 hover:scale-[1.02] active:scale-98 cursor-pointer shadow-[0_15px_40px_rgba(242,100,34,0.25)] hover:shadow-[0_20px_50px_rgba(242,100,34,0.4)]"
            >
              <span className="text-base md:text-lg font-black tracking-wide">
                মাত্র 199 টাকায় এখনই জয়েন করুন
              </span>

              <div className="bg-white/15 rounded-full p-1.5 group-hover:bg-white/25 transition-colors duration-300">
                <MdArrowForward className="text-lg md:text-xl group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Button>
          </div>

          {/* RIGHT SIDE: PREMIUM HERO FRAMED MEDIA */}
          <div className="w-full md:w-[42%] flex justify-center items-center relative">
            {/* Soft Ambient Inner Glow Backing layer */}
            {/* <div className="absolute w-[70%] h-[70%] bg-[#F26422]/10 blur-[80px] rounded-full pointer-events-none" /> */}
            
            {/* HER0 FLOAT WRAPPER CONTAINER */}
            <div className="relative z-10 w-[85%] sm:w-[65%] md:w-full aspect-square flex items-center justify-center rounded-[2.5rem]  p-4   group animate-hero-float">
              
              {/* Decorative Frame Overlays */}
              {/* <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/10 rounded-tl-xl transition-all group-hover:border-[#F26422]/40" /> */}
              {/* <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/10 rounded-br-xl transition-all group-hover:border-[#F26422]/40" /> */}
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
                <Image
                  src="/img/exclu.png"
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