"use client";

import React from "react";
import Image from "next/image";
import Container from "@/src/components/shared/Container";
import { Award, Mic, Radio } from "lucide-react";

const ExclusiveTrainer = () => {
  return (
    <section className="relative py-12 md:py-32 bg-[#0A0A0B] text-gray-100 overflow-hidden">
      {/* Premium Dark Tech Background Radial Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(242,100,34,0.12),transparent_60%)] lg:bg-[radial-gradient(circle_at_30%_30%,rgba(242,100,34,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Structural Accent Line for Architectural Feel */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-1/3 bg-gradient-to-b from-[#F26422]/5 to-transparent pointer-events-none hidden lg:block border-r border-white/5" />

      <Container className="relative z-10">
        {/* On mobile, this layout runs as a single column optimized for vertical flow */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-20 items-center">
          {/* MOBILE ONLY: Top Badge Header positioned exactly above the card */}
          <div className="block lg:hidden text-center w-full mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1E] border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <Award className="text-[#F26422]" size={14} />
              <span className="text-[#F26422] text-xs font-black tracking-widest uppercase">
                ট্রেইনার
              </span>
            </div>
          </div>

          {/* LEFT SIDE: CENTRAL CARD FRAME (With overlaid content on mobile) */}
          <div className="w-full lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5]">
              {/* Premium Neon/Orange Glowing Frame Backdrop */}
              <div className="absolute inset-0 border border-[#F26422]/40 bg-gradient-to-br from-[#F26422]/20 to-purple-600/10 rounded-3xl translate-x-2 translate-y-2 sm:translate-x-4 sm:translate-y-4 opacity-80 -z-10 blur-[1px]" />

              {/* Main Image & Card Wrap */}
              <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] bg-[#121214] relative group">
                <Image
                  src="/img/instructor/nesar.webp"
                  alt="নেছার আহমাদ - ট্রেইনার"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-w-7xl) 360px"
                />

                {/* MOBILE ONLY OVERLAY: Beautiful frosted layout covering bottom of image */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0A0B] via-[#121214]/95 to-transparent pt-16 p-6 block lg:hidden text-center backdrop-blur-[2px]">
                  <h2 className="text-3xl font-black text-white tracking-tight mb-1">
                    নেছার আহমাদ
                  </h2>
                  <p className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-[#ff824d] to-purple-400 mb-2">
                    প্রফেশনাল ভয়েস আর্টিস্ট ও ট্রেইনার
                  </p>
                  <p className="text-xs text-gray-400 font-medium">
                    প্রতিষ্ঠাতা,{" "}
                    <span className="text-white font-bold">ক্রাফট স্কিলস</span>
                  </p>
                </div>
              </div>

              {/* Decorative Floating Studio Micro Badge (Stays anchored) */}
              <div className="absolute -top-3 -left-3 w-9 h-9 rounded-xl bg-[#1A1A1E] border border-white/10 shadow-lg flex items-center justify-center text-[#F26422]">
                <Mic size={16} />
              </div>
            </div>
          </div>

          {/* DESKTOP ONLY SIDEBAR: Hidden on mobile, takes over beautifully on large views */}
          <div className="hidden lg:col-span-7 lg:flex flex-col items-start text-left space-y-6">
            {/* Top Premium Badge (Desktop Position) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1A1E] border border-white/10 shadow-inner">
              <Award className="text-[#F26422]" size={14} />
              <span className="text-[#F26422] text-xs font-black tracking-widest uppercase">
                ট্রেইনার
              </span>
            </div>

            {/* Title & Branding */}
            <div className="space-y-3 w-full">
              <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tight leading-none">
                নেছার আহমাদ
              </h2>
              <p className="text-xl lg:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-[#ff824d] to-purple-400">
                প্রফেশনাল ভয়েস আর্টিস্ট ও ট্রেইনার
              </p>
            </div>

            <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-xl">
              প্রতিষ্ঠাতা,{" "}
              <span className="text-white font-bold border-b border-[#F26422]/40 pb-0.5">
                ক্রাফট স্কিলস
              </span>
            </p>

            <div className="w-20 h-[3px] bg-gradient-to-r from-[#F26422] to-purple-500 rounded-full" />
            {/* Visual micro details mimicking high-end apps */}
            <div className="flex justify-center gap-4  text-gray-500">
              <Mic size={14} className="text-[#F26422]/70" />
              <Radio size={14} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExclusiveTrainer;
