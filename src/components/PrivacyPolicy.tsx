"use client";

import React from "react";
import Container from "@/src/components/shared/Container";
import { ShieldCheck, Eye, Database, Lock } from "lucide-react";

const PrivacyPolicy = () => {
  // const lastUpdated = "জুন ২০২৬";

  return (
    <section className="relative py-20 bg-[#070510] text-white overflow-hidden min-h-screen">
      {/* Premium Purple Ambient Light */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/[0.07] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/[0.06] blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
            <ShieldCheck className="text-[#8B5CF6]" size={16} />
            <span className="text-[#A78BFA] text-xs font-black tracking-widest uppercase">
              Data Protection
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            প্রাইভেসি পলিসি (Privacy Policy)
          </h1>
          <p className="text-purple-300/60 text-sm">
            {/* সর্বশেষ আপডেট: {lastUpdated} */}
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 bg-white/[0.02] border border-white/5 p-6 md:p-10 rounded-3xl backdrop-blur-md">
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
              <Eye size={20} className="text-[#8B5CF6]" />
              ১. তথ্য সংগ্রহ ও উদ্দেশ্য
            </h2>
            <p className="text-purple-100/70 text-base leading-relaxed">
              আমাদের কোর্সে এনরোল করার সময় আমরা আপনার নাম, ইমেইল এড্রেস, মোবাইল
              নম্বর এবং পেমেন্ট ট্রানজেকশন ডেটা সংগ্রহ করে থাকি। এই তথ্যগুলো
              শুধুমাত্র আপনার পেমেন্ট ভেরিফিকেশন, সিক্রেট গ্রুপ এক্সেস প্রদান
              এবং আপনার সাথে সরাসরি যোগাযোগের মাধ্যম হিসেবে ব্যবহার করা হয়।
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
              <Lock size={20} className="text-[#8B5CF6]" />
              ২. তথ্যের নিরাপত্তা নিশ্চিতকরণ
            </h2>
            <p className="text-purple-100/70 text-base leading-relaxed">
              আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষা করা আমাদের প্রথম দায়িত্ব।
              আমরা আধুনিক এনক্রিপশন এবং নিরাপদ ডেটা ম্যানেজমেন্ট সিস্টেম ব্যবহার
              করি যাতে অননুমোদিত কেউ আপনার তথ্যে এক্সেস না পায়।
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
              <Database size={20} className="text-[#8B5CF6]" />
              ৩. তৃতীয় পক্ষের সাথে তথ্য শেয়ারিং নীতি
            </h2>
            <p className="text-purple-100/70 text-base leading-relaxed">
              আমরা আপনার ব্যক্তিগত তথ্যের (নাম, ফোন নম্বর, ইমেইল) পূর্ণ গোপনীয়তা
              বজায় রাখি। কোনো তৃতীয় পক্ষের কাছে আপনার তথ্য শেয়ার করা হয় না।
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PrivacyPolicy;
