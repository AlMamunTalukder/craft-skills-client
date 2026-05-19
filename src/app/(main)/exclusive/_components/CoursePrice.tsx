"use client";

import React from "react";
import Container from "@/src/components/shared/Container";
import { Clock, Tag, Zap } from "lucide-react";

const CoursePricing = () => {
  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">

      {/* BACKGROUND FOCUS SYSTEM */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFF7F3] to-white" />

      {/* STRONG FOCAL ORANGE SPOT */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-[#F26422]/10 blur-[180px] rounded-full" />

      {/* SIDE DEPTH BALANCE */}
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-black/5 blur-[140px] rounded-full" />

      <Container>
        <div className="relative z-10 max-w-3xl mx-auto">

          {/* HEADER BADGE */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-50 border border-orange-100">
              <Tag className="text-[#F26422]" size={16} />
              <span className="text-[#F26422] text-xs font-bold tracking-widest uppercase">
                Course Pricing
              </span>
            </div>
          </div>

          {/* TITLE */}
          <h2 className="text-center text-3xl md:text-5xl font-black text-[#1A1A1A] leading-tight">
            কোর্স ডিটেইলস ও <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] to-[#FF7A45]">
              মূল্য তথ্য
            </span>
          </h2>

          {/* MAIN CARD */}
          <div className="mt-12 relative group">

            {/* OUTER GLOW BORDER */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#F26422]/30 via-white to-[#F26422]/30 blur-[2px]" />

            <div className="relative bg-white border border-gray-100 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.08)] overflow-hidden">

              {/* TOP ACCENT BAR */}
              <div className="h-1 w-full bg-gradient-to-r from-[#F26422] via-[#FF8A50] to-[#F26422]" />

              <div className="p-8 md:p-12 space-y-8">

                {/* COURSE TIME */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                    <Clock className="text-[#F26422]" size={22} />
                  </div>

                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-[#1A1A1A]">
                      কোর্সের সময়কাল
                    </h3>
                    <p className="text-gray-600 mt-1 text-base md:text-lg">
                      টানা ৪ ঘণ্টা (পাওয়ারফুল প্র্যাকটিক্যাল সেশন)
                    </p>
                  </div>
                </div>

                {/* PRICE SECTION */}
                <div className="text-center space-y-3 pt-6 border-t border-gray-100">

                  <p className="text-gray-500 text-sm font-medium">
                    রেগুলার প্রাইস
                  </p>

                  <div className="text-2xl md:text-3xl font-bold text-gray-400 line-through">
                    ৫,৫০০ টাকা
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Zap className="text-[#F26422]" size={20} />
                    <span className="text-[#F26422] font-bold text-sm uppercase tracking-widest">
                      আজকের বিশেষ অফার
                    </span>
                  </div>

                  <div className="text-4xl md:text-6xl font-black text-[#F26422]">
                    ১৯০ টাকা
                  </div>

                  <p className="text-gray-500 text-sm md:text-base">
                    (সীমিত সময়ের জন্য)
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* IMPACT MESSAGE */}
          <p className="text-center mt-10 text-gray-500 text-sm md:text-base">
            এই অফারটি খুবই সীমিত সময়ের জন্য প্রযোজ্য — এখনই সুযোগটি গ্রহণ করুন
          </p>

        </div>
      </Container>
    </section>
  );
};

export default CoursePricing;