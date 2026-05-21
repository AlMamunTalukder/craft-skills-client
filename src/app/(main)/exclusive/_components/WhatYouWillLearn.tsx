"use client";

import React from "react";
import Container from "@/src/components/shared/Container";
import { CheckCircle2 } from "lucide-react";

const learnings = [
  "শুদ্ধ উচ্চারণ",
  "আঞ্চলিকতামুক্ত বিশুদ্ধ বাংলা ভাষায় কথা বলা",
  "উচ্চারণ স্পষ্ট করার জন্য বিশেষ ব্যায়াম",
  "মুখের জড়তা কাটানোর সিক্রেট",
  "কণ্ঠকে শ্রুতিমধুর ও আকর্ষণীয় করার জাদুকরী কৌশল",
  "সাধারণ কণ্ঠকে প্রফেশনাল ও ভরাট করার সিক্রেট",
  "ভোকাল হাইজিন (কণ্ঠের যত্ন ও স্বাস্থ্য)",
  "স্মার্ট বডি ল্যাঙ্গুয়েজ হ্যাকস",
  "দক্ষ আলোচক হওয়ার কৌশল",
  "পাবলিক স্পিকিং",
  "মঞ্চ ভীতি দূর করার কৌশল",
  "ক্যামেরা ভীতি কাটানো",
  "ভয়েস ওভার সিক্রেট",
  "স্ক্রিপ্ট রাইটিং",
  "অডিও ইন্সট্রুমেন্ট ও স্টুডিও সেটআপ",
  "ভয়েস ওভার মার্কেটপ্লেস",
  "ইনকামের সিক্রেট রোডম্যাপ",
];

const WhatYouWillLearn = () => {
  return (
    <section className="relative py-16 md:py-28 bg-black overflow-hidden">
      {/* BASE DARK LAYER */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#2f2f2f] via-[#353535] to-[#2a2a2a]" /> */}

      {/* ORANGE FOCUS LIGHT (MAIN HERO SPOTLIGHT) */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#F26422] opacity-35 blur-[160px] rounded-full" />

      {/* SECONDARY WHITE DEPTH LIGHT */}
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-white/10 opacity-25 blur-[140px] rounded-full" />

      {/* SOFT CENTER VIGNETTE (FOCUS EFFECT) */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40" />

      {/* GRID TEXTURE (VERY SUBTLE BUT PREMIUM) */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
        }}
      />

      <Container className="relative z-10">
        {/* HEADER */}
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            টানা ৪ ঘণ্টার এই{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-white to-[#F26422]">
              পাওয়ারফুল মাস্টারক্লাসে
            </span>{" "}
            আপনি যা শিখবেন
          </h2>

          <p className="text-white/60 mt-4 text-sm md:text-lg max-w-2xl mx-auto">
            আধুনিক কমিউনিকেশন, ভয়েস এবং পার্সোনালিটি ডেভেলপমেন্টের পূর্ণ
            রোডম্যাপ
          </p>
        </div>

        {/* GRID CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
          {learnings.map((item, i) => (
            <div
              key={i}
              className="group relative p-[1px] rounded-md md:rounded-2xl bg-gradient-to-r from-[#F26422]/40 via-white/10 to-[#F26422]/40"
            >
              <div className="h-full rounded-md md:rounded-2xl bg-[#353535]/80 backdrop-blur-xl p-2 md:p-6 border border-white/10 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-[#F26422]/40">
                <div className="flex items-start gap-3">
                  {/* ICON */}
                  <div className="mt-1">
                    <CheckCircle2 className="text-[#F26422] w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  {/* TEXT */}
                  <p className="text-white text-sm md:text-base font-medium leading-relaxed">
                    {item}
                  </p>
                </div>

                {/* HOVER GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-tr from-[#F26422]/10 to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER CTA STRIP */}
        <div className="mt-8 md:mt-20 text-center">
          <div className="inline-block px-6 md:px-3 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
            <p className="text-white/80 text-sm md:text-base">
              বাস্তব দক্ষতা + প্র্যাকটিক্যাল ট্রেনিং + ইনকাম গাইডলাইন
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhatYouWillLearn;
