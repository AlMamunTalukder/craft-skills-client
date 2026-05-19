"use client";

import React from "react";
import Image from "next/image";
import Container from "@/src/components/shared/Container";
import { Sparkles, Award, CheckCircle2, Play } from "lucide-react";
// import nesar from "../../../public/img/instructor/nesar.webp";

const ExclusiveTrainer = () => {
  return (
    <section className="relative py-20 md:py-32 bg-[#FAFAFA] overflow-hidden">
      {/* Structural Accent Lines matching your layout's architectural feel */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-1/3 bg-[#F26422]/5 pointer-events-none hidden lg:block border-r border-gray-200" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT SIDE: LAYERED IMAGE FRAME (Sits on the warm tinted background) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[4/5]">
              
              {/* Premium Geometric Outer Border Frame (Purple to Orange Accent) */}
              <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-br from-purple-600 to-[#F26422] rounded-3xl translate-x-4 translate-y-4 opacity-20 -z-10" />
              
              {/* Main Image Container */}
              <div className="w-full h-full rounded-3xl overflow-hidden border border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white relative group">
                <Image
                  src="/img/instructor/nesar.webp"
                  alt="নেছার আহমাদ - ট্রেইনার"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-w-7xl) 360px"
                />
                
                {/* Floating Micro Badge for Expertise */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200/50 shadow-lg flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F26422] flex items-center justify-center text-white shrink-0">
                    <Play size={16} fill="currentColor" className="ml-0.5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-[#F26422] uppercase tracking-wider">Voice Artist</p>
                    <p className="text-xs font-black text-[#353535]">10M+ Total Impressions</p>
                  </div>
                </div>
              </div>

              {/* Decorative Sparkle Tag */}
              {/* <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-purple-600 animate-bounce [animation-duration:3s]">
                <Sparkles size={18} />
              </div> */}
            </div>
          </div>

          {/* RIGHT SIDE: PROFILE DETAILS & CREDENTIALS */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Tiny Category Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
              <Award className="text-[#F26422]" size={14} />
              <span className="text-[#353535] text-xs font-black tracking-wide uppercase">
                Meet Your Instructor
              </span>
            </div>

            {/* Trainer Title Tagline */}
            <div className="space-y-2">
              <p className="text-sm font-black tracking-widest text-[#F26422] uppercase">
                ট্রেইনার
              </p>
              <h2 className="text-4xl md:text-5xl font-black text-[#353535] tracking-tight">
                নেছার আহমাদ
              </h2>
              {/* Dynamic Sub-Gradient Title */}
              <p className="text-lg md:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-purple-600 to-[#F26422]">
                প্রফেশনাল ভয়েস আর্টিস্ট ও ট্রেইনার
              </p>
            </div>

            {/* Separator Accent Line */}
            <div className="w-16 h-[3px] bg-gradient-to-r from-[#F26422] to-purple-500 rounded-full mx-auto lg:mx-0" />

            {/* Mini Bio Description Block */}
            <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed max-w-xl">
              প্রতিষ্ঠাতা, <span className="text-black font-bold">ক্রাফট স্কিলস</span>। দীর্ঘ বছর ধরে দেশের নামী ব্র্যান্ডগুলোর ভয়েস ওভার এবং বাচনভঙ্গি নিয়ে কাজ করছেন প্রফেশনাল লেভেলে।
            </p>

            {/* Key Trust Highlights Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl pt-4">
              {[
                "প্রফেশনাল ভয়েস ওভার ইন্ডাস্ট্রি এক্সপার্ট",
                "হাজারো শিক্ষার্থী মেন্টরিংয়ের বাস্তব অভিজ্ঞতা",
                "সহজ ও সম্পূর্ণ প্র্যাক্টিক্যাল লার্নিং মেথড",
                "লাইফটাইম গাইডলাইন ও মেম্বারশিপ সাপোর্ট",
              ].map((feature, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 p-3.5 bg-white border border-gray-200/80 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.01)] hover:border-[#F26422]/20 transition-colors duration-300"
                >
                  <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <span className="text-[#353535] text-sm font-bold text-left leading-tight">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default ExclusiveTrainer;