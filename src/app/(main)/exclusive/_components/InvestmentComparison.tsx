"use client";


import Container from "@/src/components/shared/Container";
import { GraduationCap, Hamburger, Mic, Shirt,  Sparkles } from "lucide-react";

const InvestmentComparison = () => {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#1E1B4B] text-white overflow-hidden">
      
      {/* Premium ambient top-right orange background glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-500/10 blur-[130px] rounded-full pointer-events-none" />
      {/* Subtle bottom-left soft blue lighting aura */}
      <div className="absolute bottom-[-10%] left-[-15%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        
        {/* HEADER TEXT */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            ২৯৯ টাকা দিয়ে আর কী হয়?
          </h2>
        </div>

        {/* COMPARISON CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          
          {/* OPTION 1: BURGER */}
          <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center transition-all duration-300 hover:border-white/20 shadow-xl h-[380px] flex flex-col justify-between order-2 md:order-1">
            <div>
              <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-6">
                বিকল্প ১
              </p>
              
              {/* Replacing emoji with a highly scalable clean lucide graphic icon */}
              <div className="w-16 h-16 mx-auto bg-amber-500/15 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20">
                <Hamburger className="w-8 h-8 text-amber-500" />
              </div>

              <h3 className="text-xl font-black text-white mb-2">
                একটা বার্গার মিল
              </h3>
              <p className="text-white/50 text-sm">
                ৩০ মিনিটে শেষ
              </p>
            </div>

            <div className="text-3xl font-black text-white/40 line-through tracking-wider mt-6">
              ৳৫০০
            </div>
          </div>

          {/* OPTION 2: PUBLIC SPEAKING COURSE (MAIN FOCUS CARD) */}
          <div className="relative bg-[#0A0E1A] border-2 border-orange-500/80 rounded-3xl p-8 text-center shadow-[0_0_50px_-5px_rgba(242,100,34,0.3)] h-[420px] flex flex-col justify-between z-20 order-1 md:order-2 scale-100 md:scale-105">
            
            {/* Top Premium Badge Header */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-1.5 rounded-full text-xs font-black tracking-wide flex items-center gap-1.5 shadow-md">
              <GraduationCap className="w-3.5 h-3.5 animate-pulse" />
              <span>সেরা বিনিয়োগ</span>
            </div>

            <div className="pt-4">
              {/* Microphone Asset Frame */}
              <div className="w-20 h-20 mx-auto bg-gradient-to-b from-orange-500/20 to-orange-500/5 rounded-2xl flex items-center justify-center mb-6 border border-orange-500/30 shadow-[0_8px_20px_rgba(242,100,34,0.15)]">
                <Mic className="w-10 h-10 text-orange-500" />
              </div>

              <h3 className="text-2xl font-black text-white mb-2 tracking-wide">
                পাবলিক স্পিকিং স্কিল
              </h3>
              <p className="text-orange-400 font-extrabold text-sm tracking-wide">
                সারাজীবনের সম্পদ
              </p>
            </div>

            {/* Glowing Big Callout Price Segment */}
            <div className="text-4xl sm:text-5xl font-black text-orange-500 tracking-wider drop-shadow-[0_2px_10px_rgba(242,100,34,0.3)] mt-6">
              ৳২৯৯
            </div>
          </div>

          {/* OPTION 3: T-SHIRT */}
          <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center transition-all duration-300 hover:border-white/20 shadow-xl h-[380px] flex flex-col justify-between order-3">
            <div>
              <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-6">
                বিকল্প ২
              </p>
              
              <div className="w-16 h-16 mx-auto bg-emerald-500/15 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                <Shirt className="w-8 h-8 text-emerald-500" />
              </div>

              <h3 className="text-xl font-black text-white mb-2">
                একটা সাধারণ টি-শার্ট
              </h3>
              <p className="text-white/50 text-sm">
                কিছুদিন পরে পুরনো
              </p>
            </div>

            <div className="text-3xl font-black text-white/40 line-through tracking-wider mt-6">
              ৳৫০০
            </div>
          </div>

        </div>

        {/* BOTTOM MOTIVATIONAL STATEMENT COPY */}
        <div className="text-center mt-16 md:mt-24 max-w-2xl mx-auto px-4">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-white/90 leading-relaxed">
            আপনি কি সাময়িক আরামে টাকা খরচ করবেন, <br className="hidden sm:block" />
            নাকি{" "}
            <span className="text-orange-500 font-black border-b-2 border-orange-500/40 pb-0.5">
              নিজের ক্যারিয়ারে বিনিয়োগ করবেন?
            </span>
          </p>
        </div>

      </Container>
    </section>
  );
};

export default InvestmentComparison;