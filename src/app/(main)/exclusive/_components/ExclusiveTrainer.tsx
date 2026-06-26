"use client";

import React from "react";
import Image from "next/image";
import Container from "@/src/components/shared/Container";
import { Radio } from "lucide-react";

const ExclusiveTrainer = () => {
  return (
    <section className="py-12 lg:py-24 relative overflow-hidden bg-[#CBD5E1]">

      {/* 🌌 MULTI-TONE AMBIENT ART BACKGROUND (MIXED DARKISH-WHITE, YELLOW & ORANGE) */}
      {/* Darkish-White Deep Contrast Base */}
      <div className="absolute inset-0 bg-slate-900/[0.04] pointer-events-none" />
      {/* Soft Luminous Yellow / Amber Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-400 blur-[140px] rounded-full pointer-events-none opacity-40" />
      {/* Rich Studio Orange Glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#F26422] blur-[130px] rounded-full pointer-events-none opacity-30" />
      {/* Elegant Contrast Darkish Slate Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-slate-400 blur-[160px] rounded-full pointer-events-none opacity-40" />

      <Container className="relative z-10">
        {/* PREMIUM LIGHT-MODE GLASSMORPHIC OUTER CARD */}
        <div className="relative bg-white/40 border border-white/80 rounded-2xl lg:rounded-[3.5rem] p-3 md:p-12 backdrop-blur-xl shadow-[0_30px_70px_rgba(242,100,34,0.04),0_10px_30px_rgba(0,0,0,0.02)] overflow-hidden text-slate-800">

          {/* High-End Technical Dot Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#F26422 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-4 items-stretch max-w-6xl mx-auto">

            {/* LEFT COLUMN: Full Trainer Portrait Display */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-2 md:space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#F26422]/20 bg-[#F26422]/5">
                  <Radio size={14} className="text-[#F26422] animate-pulse" />
                  <span className="text-xs font-bold tracking-widest uppercase text-[#F26422]">
                    Your Mentor
                  </span>
                </div>

                <div className="md:space-y-3">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                    নেছার আহমাদ
                  </h2>
                  <div className="text-lg md:text-xl font-bold text-[#F26422]">
                    প্রফেশনাল ভয়েস আর্টিস্ট ও ট্রেইনার
                  </div>
                </div>

                <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
                  প্রতিষ্ঠাতা, <span className="text-slate-900 font-bold">ক্রাফট স্কিলস</span>। <br />
                </p>
              </div>

              {/* Prominent Vertical Trainer Card */}
              <div className="mt-3 md:mt-8 relative aspect-[4/5] w-full max-w-[480px] mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-slate-100 border border-white shadow-[0_20px_40px_rgba(0,0,0,0.05)] group">
                <Image
                  src="/img/instructor/nesar2.jpeg"
                  alt="নেছার আহমাদ"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: Video Showcase & Expert Bio Details */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-8 lg:pl-6  lg:mt-0">

              {/* Main Video Deck */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <span className="w-2 h-2 rounded-full bg-[#F26422] animate-pulse" />
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                    Mentor Work Portfolio
                  </span>
                </div>

                <div className="relative aspect-video w-full  rounded-2xl overflow-hidden bg-slate-900 border border-white shadow-xl">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/1RxdQgm7-R4?rel=0&modestbranding=1"
                    title="নেছার আহমাদ - পোর্টফোলিও ভিডিও"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExclusiveTrainer;