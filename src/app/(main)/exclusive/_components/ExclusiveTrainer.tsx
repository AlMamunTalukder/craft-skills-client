"use client";

import React from "react";
import Image from "next/image";
import Container from "@/src/components/shared/Container";
import { Mic } from "lucide-react";

const ExclusiveTrainer = () => {
  return (
    <section className="relative py-10 md:py-20 overflow-hidden bg-[#F8F6F1]">
{/* Sound Wave Lines */}
<div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
  <div className="w-[1200px] h-[1200px] border border-[#F26422] rounded-full" />
  <div className="absolute w-[1000px] h-[1000px] border border-[#F26422] rounded-full" />
  <div className="absolute w-[800px] h-[800px] border border-[#F26422] rounded-full" />
  <div className="absolute w-[600px] h-[600px] border border-[#F26422] rounded-full" />
</div>

{/* Glow */}
<div className="absolute top-20 left-20 w-96 h-96 bg-orange-200/40 blur-[120px] rounded-full" />

<div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-200/40 blur-[120px] rounded-full" />

      <Container className="relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          
          

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-4">
            নেছার আহমাদ
          </h2>

          <p className="text-xl md:text-2xl font-bold text-[#F26422] mb-3">
            প্রফেশনাল ভয়েস আর্টিস্ট ও ট্রেইনার
          </p>

          <p className="text-slate-500">
            প্রতিষ্ঠাতা,
            <span className="font-semibold text-slate-900 ml-1">
              ক্রাফট স্কিলস
            </span>
          </p>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center max-w-6xl mx-auto">
          
          {/* Trainer Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#F26422]/20 to-transparent rounded-[32px] blur-xl" />

            <div className="relative overflow-hidden rounded-[32px] bg-white border border-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              
              <div className="relative h-[420px] md:h-[380px]">
                <Image
                  src="/img/instructor/nesar.webp"
                  alt="নেছার আহমাদ"
                  fill
                  priority
                  className="object-cover object-top"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-slate-200">
                <div className="flex items-center gap-2">
                  <Mic size={15} className="text-[#F26422]" />
                  <span className="text-sm font-semibold text-slate-800">
                    Voice Studio Expert
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative">
            
            <div className="absolute inset-0 bg-[#F26422]/10 blur-2xl rounded-[32px]" />

            <div className="relative overflow-hidden rounded-[32px] bg-white border border-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              
              <div className="h-1 w-full bg-gradient-to-r from-[#F26422] via-[#FF9A63] to-[#F26422]" />

              <iframe
                className="w-full h-[300px] md:h-[380px]"
                src="https://www.youtube.com/embed/1RxdQgm7-R4?rel=0&modestbranding=1"
                title="নেছার আহমাদ - পোর্টফোলিও ভিডিও"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ExclusiveTrainer;