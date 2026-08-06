"use client";

import React from "react";
import Image from "next/image";
import Container from "@/src/components/shared/Container";
import { Radio } from "lucide-react";

const ExclusiveTrainer = () => {
  return (
    <section className="py-12 lg:py-24 relative overflow-hidden bg-[#CBD5E1]">
      {/* Darkish-White Deep Contrast Base */}
      <div className="absolute inset-0 bg-slate-900/[0.04] pointer-events-none" />
      {/* Soft Luminous Yellow / Amber Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-400 blur-[140px] rounded-full pointer-events-none opacity-40" />
      {/* Rich Studio Orange Glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#F26422] blur-[130px] rounded-full pointer-events-none opacity-30" />
      {/* Elegant Contrast Darkish Slate Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-slate-400 blur-[160px] rounded-full pointer-events-none opacity-40" />

      <Container className="relative z-10">
        {/* LIGHT-MODE GLASSMORPHIC OUTER CARD */}
        <div className="relative bg-white/50 border border-white/80 rounded-2xl lg:rounded-[3.5rem] p-3 md:p-12 backdrop-blur-xl shadow-[0_30px_70px_rgba(242,100,34,0.04),0_10px_30px_rgba(0,0,0,0.02)] overflow-hidden text-slate-800">
          {/* High-End Technical Dot Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#F26422 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto">
            {/* SECTION HEADER */}
            <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14 px-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F26422]/25 bg-[#F26422]/5">
                <Radio size={14} className="text-[#F26422] animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-[#F26422]">
                  Your Mentor
                </span>
              </div>
              {/* <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                আপনার মেন্টরকে{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] to-amber-500">
                  জানুন
                </span>
              </h2> */}
            </div>

            {/* CONTENT GRID */}
            {/* CONTENT GRID */}
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* ================= LEFT ================= */}
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px]">
                  {/* Outer Glow */}
                  {/* <div className="absolute inset-0 rounded-full bg-[#F26422]/15 blur-3xl "></div> */}

                 {/* Ring 2 */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#F26422]/40"></div>

                  {/* Ring 3 */}
                  <div className="absolute inset-2 rounded-full border border-[#F26422]/50"></div>

                  {/* Ring 4 */}
                  <div className="absolute inset-4 rounded-full border border-[#F26422]/70"></div>

                  <div className="absolute inset-6 rounded-full border-2 border-[#F26422] "></div>
                  
                  {/* Image */}
                  <div className="absolute inset-[34px] rounded-full overflow-hidden bg-slate-900 border border-[#F26422]/50">
                    <Image
                      src="/img/instructor/nesar3.jpeg"
                      alt="নেছার আহমাদ"
                      fill
                      priority
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Bottom Equalizer */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-[4px]">
                    {[22, 30, 18, 36, 24].map((h, i) => (
                      <span
                        key={i}
                        className="w-[4px] rounded-full bg-[#F26422] "
                        style={{
                          height: h,
                          // animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="mt-8 text-3xl font-black text-slate-900">
                  নেছার আহমাদ
                </h3>

                <p className="mt-2 font-bold text-lg text-[#F26422]">
                  প্রফেশনাল ভয়েস আর্টিস্ট ও ট্রেইনার
                </p>
              </div>

              {/* ================= RIGHT ================= */}
              <div className="lg:col-span-7">
                <div className="mb-4 flex items-center gap-2 uppercase tracking-[4px] text-sm font-bold text-[#F26422]">
                  <span className="w-2 h-2 rounded-full bg-[#F26422]"></span>
                  Mentor Work Portfolio
                </div>

                <div className="relative overflow-hidden rounded-[30px] border border-[#F26422]/20 bg-black/80 backdrop-blur-xl shadow-[0_20px_80px_rgba(242,100,34,.15)]">
                  {/* Orange Glow */}
                  <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F26422]/20 blur-[120px]" />

                  {/* Badge */}

                  {/* Video */}
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube.com/embed/1RxdQgm7-R4?rel=0&modestbranding=1"
                      title="Portfolio Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
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
