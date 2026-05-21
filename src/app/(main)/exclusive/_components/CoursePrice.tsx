"use client";

import React from "react";
import Container from "@/src/components/shared/Container";
import { Clock, GraduationCap, Tag, Zap } from "lucide-react";

const CoursePricing = () => {
  return (
    <section className="relative py-12 md:py-24 bg-[#0A0A0B] text-gray-100 overflow-hidden">
      
      {/* Subtle Background Glows (No heavy asset weights) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#F26422]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      <Container>
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">

          {/* HEADER BADGE */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1E] border border-white/10 mb-4 sm:mb-6">
            <Tag className="text-[#F26422]" size={13} />
            <span className="text-[#F26422] text-[10px] sm:text-xs font-black tracking-widest uppercase">
              Course Pricing
            </span>
          </div>

          {/* TITLE (Compact line heights for mobile screen estates) */}
          <h2 className="text-center text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] to-[#ff824d]">
            কোর্সের {" "}
            </span>
               বিস্তারিত          </h2>

          {/* MAIN CARD */}
          <div className="mt-6 sm:mt-10 w-full max-w-md relative group">
            
            {/* Outer Subtle Edge Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#F26422]/20 to-transparent blur-[1px] -z-10" />

            <div className="relative bg-[#121214] border border-white/5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Top Accent Orange Bar */}
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#F26422] to-transparent" />

              {/* Internal Content (Compressed padding for low scrolling layout) */}
              <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">

                {/* COURSE TIME */}
                <div className="flex items-center gap-3.5 bg-[#1A1A1E]/50 p-3 rounded-xl border border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-[#F26422]/10 flex items-center justify-center shrink-0">
                    <Clock className="text-[#F26422]" size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      কোর্সের সময়কাল
                    </h3>
                    <p className="text-white text-sm sm:text-base font-bold mt-0.5">
                      ৪ ঘণ্টার পাওয়ারফুল প্র্যাকটিক্যাল সেশন
                    </p>
                  </div>
                </div>

                {/* PRICE SECTION */}
                <div className="text-center space-y-2 sm:space-y-3 pt-4 border-t border-white/5">
                  
                  <div className="flex items-center justify-between text-left bg-[#1A1A1E]/30 px-4 py-2 rounded-lg border border-white/5">
                    <span className="text-xs font-medium text-gray-400">রেগুলার প্রাইস</span>
                    <span className="text-base sm:text-lg font-bold text-gray-500 line-through">
                      ৫,৫০০ টাকা
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 pt-2">
                    <GraduationCap className="text-[#F26422] animate-pulse" size={14} />
                    <span className="text-[#F26422] font-black text-[10px] sm:text-xs uppercase tracking-widest">
                      বিশেষ অফার
                    </span>
                  </div>

                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    199 <span className="text-[#F26422] text-2xl sm:text-3xl font-black">টাকা</span>
                  </div>

                  {/* <p className="text-gray-500 text-xs font-medium">
                    (সীমিত সময়ের জন্য)
                  </p> */}
                </div>

              </div>
            </div>
          </div>

         

        </div>
      </Container>
    </section>
  );
};

export default CoursePricing;