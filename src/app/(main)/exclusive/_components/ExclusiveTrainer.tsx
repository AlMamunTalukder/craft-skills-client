"use client";

import React from "react";
import Image from "next/image";
import Container from "@/src/components/shared/Container";
import { Award, Mic, Radio } from "lucide-react";

const ExclusiveTrainer = () => {
  return (
    <section className="relative py-20 md:py-28 bg-[#090A0F] text-white overflow-hidden">
      
      {/* Deep crisp ambient studio lights (No blurry overlays on top of content) */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/[0.07] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-900/50 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* TOP PROFILE INFO ROW */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
          
          
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-3">
            নেছার আহমাদ
          </h2>
          
          <p className="text-lg sm:text-xl font-bold text-[#F26422] mb-2">
            প্রফেশনাল ভয়েস আর্টিস্ট ও ট্রেইনার
          </p>
          
          <p className="text-white/50 text-sm">
            প্রতিষ্ঠাতা, <span className="text-white font-medium">ক্রাফট স্কিলস</span>
          </p>
        </div>

        {/* BOTTOM SHOWCASE GRID: IMAGE LEFT, VIDEO RIGHT */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto items-stretch">
          
          {/* LEFT: CRISP PORTRAIT CARD */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-[340px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-[#111218]">
            <Image
              src="/img/instructor/nesar.webp"
              alt="নেছার আহমাদ - ট্রেইনার"
              fill
              className="object-cover object-top" // Kept scale standard at 100 to eliminate rendering pixelation blur
              sizes="(max-w-768px) 100vw, 50vw"
              priority
            />
            {/* Dark contrast gradient only at the absolute base */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-5 left-5 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/5">
              <Mic size={14} className="text-[#F26422]" />
              <span className="text-xs text-white/90 font-medium tracking-wide">Voice Studio</span>
            </div>
          </div>

          {/* RIGHT: PREMIUM PORTFOLIO VIDEO FRAME */}
          <div className="relative aspect-video md:aspect-auto md:h-[340px] rounded-2xl overflow-hidden border border-white/5 bg-[#111218] shadow-2xl group">
            <iframe
              className="w-full h-full border-0"
              src="https://www.youtube.com/embed/1RxdQgm7-R4?rel=0&modestbranding=1"
              title="নেছার আহমাদ - পোর্টফোলিও ভিডিও"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

        </div>

      </Container>
    </section>
  );
};

export default ExclusiveTrainer;