"use client";

import React from "react";
import Image from "next/image";
import Container from "@/src/components/shared/Container";
import { Award, Mic, Radio } from "lucide-react";

const ExclusiveTrainer = () => {
  return (
    <section className="relative py-16 md:py-32 bg-[#0B0B0D] text-white overflow-hidden">

      {/* Controlled ambient lighting (less noisy) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(242,100,34,0.10),transparent_55%)] pointer-events-none" />
      <div className="absolute top-0 right-[-120px] w-[500px] h-[500px] bg-orange-500/10 blur-[140px] rounded-full pointer-events-none" />

      <Container className="relative z-10">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* LEFT IMAGE */}
          <div className="lg:col-span-5 flex justify-center">

            <div className="relative w-full max-w-[360px] aspect-[4/5] group">

              {/* Soft depth shadow layer (cleaned) */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-[28px] translate-x-3 translate-y-3 blur-sm opacity-70" />

              {/* Frame (less aggressive border) */}
              <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-[2px]" />

              {/* Main card */}
              <div className="relative w-full h-full rounded-[28px] overflow-hidden shadow-[0_35px_90px_rgba(0,0,0,0.6)] group">

                <Image
                  src="/img/instructor/nesar.webp"
                  alt="নেছার আহমাদ - ট্রেইনার"
                  fill
                  className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
                  priority
                />

                {/* softer bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent" />

                {/* text overlay */}
                <div className="absolute bottom-0 w-full p-6 text-center">

                  <h2 className="text-3xl font-black tracking-tight text-white">
                    নেছার আহমাদ
                  </h2>

                  <p className="mt-1 text-sm font-semibold text-[#F26422]">
                    প্রফেশনাল ভয়েস আর্টিস্ট ও ট্রেইনার
                  </p>

                  <p className="text-xs text-white/60 mt-2">
                    প্রতিষ্ঠাতা, <span className="text-white font-semibold">ক্রাফট স্কিলস</span>
                  </p>

                </div>
              </div>

              {/* mic badge (cleaner, less “floating noise”) */}
              <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-[#121214] border border-white/10 flex items-center justify-center text-[#F26422] shadow-lg">
                <Mic size={16} />
              </div>

            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="hidden md:block lg:col-span-7 space-y-6">

            {/* badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <Award className="text-[#F26422]" size={14} />
              <span className="text-[#F26422] text-xs font-bold tracking-[0.2em] uppercase">
                Trainer
              </span>
            </div>

            {/* NAME (stronger hierarchy) */}
            <h2 className="text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              নেছার আহমাদ
            </h2>

            {/* ROLE (clean, no gradient chaos) */}
            <p className="text-xl lg:text-2xl font-semibold text-[#F26422]">
              প্রফেশনাল ভয়েস আর্টিস্ট ও ট্রেইনার
            </p>

            {/* supporting */}
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">
              প্রতিষ্ঠাতা,{" "}
              <span className="text-white font-semibold border-b border-white/20">
                ক্রাফট স্কিলস
              </span>
            </p>

            {/* divider (subtle premium line) */}
            <div className="w-24 h-[2px] bg-gradient-to-r from-[#F26422] to-transparent rounded-full" />

            {/* micro icons */}
            <div className="flex items-center gap-5 text-white/40">
              <Mic size={16} className="text-[#F26422]" />
              <Radio size={16} />
            </div>

          </div>
        </div>

      </Container>
    </section>
  );
};

export default ExclusiveTrainer;