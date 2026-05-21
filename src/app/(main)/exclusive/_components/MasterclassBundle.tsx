"use client";

import React from "react";
import Container from "@/src/components/shared/Container";
import { Check, Gift, Star, Award, Zap } from "lucide-react";

const items = [
  { text: "শুদ্ধ উচ্চারণের এক্সক্লুসিভ প্র্যাকটিস শিট (PDF)", type: "orange" },
  { text: "উচ্চারণ স্পষ্ট করার টাং টুইস্টার কালেকশন", type: "gray" },
  { text: "উচ্চারণ প্র্যাকটিসের এক্সক্লুসিভ ভিডিও টিউটোরিয়াল", type: "orange" },
  { text: "ভোকাল কেয়ার গাইড ও ওয়ার্মআপ রুটিন", type: "gray" },
  { text: "রেডিমেড ভয়েস ওভার প্র্যাকটিস স্ক্রিপ্ট (নিউজ, অ্যাড ও স্টোরি)", type: "orange" },
  { text: "প্রেজেন্টেশন হ্যাকস ও বডি ল্যাঙ্গুয়েজ শিট", type: "gray" },
  { text: "বাজেট গিয়ার ও রেকর্ডিং সফটওয়্যার গাইড", type: "orange" },
  { text: "৩০ দিনের স্পিকিং চ্যালেঞ্জ ট্র্যাকার", type: "gray" },
  { text: "প্রাইভেট গ্রুপ এক্সেস", type: "orange" },
  { text: "ডিজিটাল সার্টিফিকেট", type: "gray" },
  { text: "অফুরন্ত ভালোবাসা ও গাইডলাইন!", type: "orange" },
];

const MasterclassBundle = () => {
  return (
    <section className="relative py-16 md:py-32 overflow-hidden bg-[#0A0A0B] text-gray-100">

      {/* 🌟 PREMIUM DARK THEME GLOW EFFECTS */}
      {/* Orange Core Glow */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#F26422]/10 blur-[160px] rounded-full pointer-events-none" />
      {/* Secondary Bottom Glow */}
      <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-purple-600/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Subtle Digital Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container className="relative z-10">

        {/* HEADER SECTION */}
        <div className="text-center  md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1E] border border-white/10 mb-5 shadow-inner">
            <Gift className="text-[#F26422]" size={14} />
            <span className="text-[#F26422] text-xs font-black tracking-widest uppercase">
              Premium Bonus Pack
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            মাস্টার ক্লাসটির সাথে <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-[#ff824d] to-[#F26422]">
              যা যা পাচ্ছেন
            </span>
          </h2>          
        </div>

        {/* GRID LAYOUT (Smooth stacking architecture) */}
        <div className="columns-1 md:columns-2 lg:columns-3 md:gap-5 space-y-2 md:space-y-5 ">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex gap-2 break-inside-avoid group relative p-2 md:p-4 sm:p-3 rounded-2xl bg-[#121214] border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-500 hover:border-[#F26422]/30 hover:-translate-y-1 overflow-hidden"
            >
              {/* LEFT SIDE TIMELINE INDICATOR BAR */}
              <div
                className={`absolute top-0 left-0 w-1 h-full transition-colors duration-300 ${
                  item.type === "orange"
                    ? "bg-[#F26422]"
                    : "bg-gray-700 group-hover:bg-purple-500"
                }`}
              />

              {/* ICON BLOCK */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3.5 transition-all duration-300 ${
                  item.type === "orange"
                    ? "bg-[#F26422]/10 text-[#F26422] group-hover:bg-[#F26422] group-hover:text-white"
                    : "bg-white/5 text-gray-400 group-hover:bg-purple-500/20 group-hover:text-purple-400"
                }`}
              >
                {item.type === "orange" ? <Zap size={16} /> : <Award size={16} />}
              </div>

              {/* BONUS CORE TEXT */}
              <p className="text-gray-200 text-base sm:text-lg font-bold leading-snug group-hover:text-white transition-colors">
                {item.text}
              </p>

           

              {/* HOVER GLOW RADIAL SYSTEM */}
              <div
                className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-[0.06] transition-all duration-700 pointer-events-none ${
                  item.type === "orange" ? "bg-[#F26422]" : "bg-purple-500"
                }`}
              />
            </div>
          ))}
        </div>

       


      </Container>
    </section>
  );
};

export default MasterclassBundle;