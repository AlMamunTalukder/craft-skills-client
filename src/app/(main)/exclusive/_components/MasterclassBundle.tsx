"use client";

import React from "react";
import Container from "@/src/components/shared/Container";
import { Check, Gift, Star, Award, Zap } from "lucide-react";

const items = [
  { text: "শুদ্ধ উচ্চারণের এক্সক্লুসিভ প্র্যাকটিস শিট (PDF)", type: "orange" },
  { text: "উচ্চারণ স্পষ্ট করার টাং টুইস্টার কালেকশন", type: "gray" },
  { text: "উচ্চারণ প্র্যাকটিসের এক্সক্লুসিভ ভিডিও টিউটোরিয়াল", type: "orange" },
  { text: "ভোকাল কেয়ার গাইড ও ওয়ার্মআপ রুটিন", type: "gray" },
  { text: "রেডিমেড ভয়েস ওভার প্র্যাকটিস স্ক্রিপ্ট (নিউজ, অ্যাড ও স্টোরি)", type: "orange" },
  { text: "প্রেজেন্টেশন হ্যাকস ও বডি ল্যাঙ্গুয়েজ শিট", type: "gray" },
  { text: "বাজেট গিয়ার ও রেকর্ডিং সফটওয়্যার গাইড", type: "orange" },
  { text: "৩০ দিনের স্পিকিং চ্যালেঞ্জ ট্র্যাকার", type: "gray" },
  { text: "প্রাইভেট গ্রুপ এক্সেস", type: "orange" },
  { text: "ডিজিটাল সার্টিফিকেট", type: "gray" },
  { text: "অফুরন্ত ভালোবাসা ও গাইডলাইন!", type: "orange" },
];

const MasterclassBundle = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-white">

      {/* 🌟 VIBRANT PREMIUM BACKGROUND SYSTEM */}

      {/* ORANGE ENERGY CORE */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#F26422]/10 blur-[180px] rounded-full" />

      {/* SECONDARY LIGHT LAYER */}
      <div className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-[#F26422]/5 blur-[140px] rounded-full" />

      {/* DEPTH SHADOW FIELD */}
      <div className="absolute top-1/2 left-[-200px] -translate-y-1/2 w-[500px] h-[500px] bg-black/[0.03] blur-[140px] rounded-full" />

      {/* PREMIUM CENTER LIGHT FOCUS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(255,255,255,0.85)_50%,rgba(255,255,255,1)_100%)]" />

      {/* SUBTLE GRID TEXTURE */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-50 border border-orange-100 mb-6 shadow-sm">
            <Gift className="text-[#F26422]" size={16} />
            <span className="text-[#F26422] text-xs font-bold uppercase tracking-widest">
              Premium Bonus Pack
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] leading-[1.1] mb-6">
            মাস্টার ক্লাসটির সাথে <br />
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-[#FF7A45] to-[#F26422]">
              যা যা পাচ্ছেন
            </span>
          </h2>

          <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
            আপনার কমিউনিকেশন স্কিলকে প্রফেশনাল লেভেলে নিতে সম্পূর্ণ প্রিমিয়াম লার্নিং প্যাকেজ।
          </p>
        </div>

        {/* GRID */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

          {items.map((item, i) => (
            <div
              key={i}
              className="break-inside-avoid group relative p-6 rounded-3xl bg-white border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_25px_60px_rgba(242,100,34,0.12)] hover:-translate-y-1 overflow-hidden"
            >

              {/* LEFT ACCENT BAR */}
              <div
                className={`absolute top-0 left-0 w-1.5 h-full ${
                  item.type === "orange"
                    ? "bg-[#F26422]"
                    : "bg-gray-300"
                }`}
              />

              {/* ICON */}
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${
                  item.type === "orange"
                    ? "bg-orange-50 text-[#F26422]"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {item.type === "orange" ? <Zap size={20} /> : <Award size={20} />}
              </div>

              {/* TEXT */}
              <p className="text-[#353535] text-lg font-extrabold leading-tight group-hover:text-black transition-colors">
                {item.text}
              </p>

              {/* FOOTER */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                  Included
                </span>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    item.type === "orange"
                      ? "bg-orange-50 text-[#F26422] group-hover:bg-[#F26422] group-hover:text-white"
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-500 group-hover:text-white"
                  }`}
                >
                  <Check size={14} strokeWidth={3} />
                </div>
              </div>

              {/* SOFT INTERACTION GLOW */}
              <div
                className={`absolute -bottom-10 -right-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-700 ${
                  item.type === "orange"
                    ? "bg-[#F26422]"
                    : "bg-gray-500"
                }`}
              />
            </div>
          ))}

        </div>

        {/* TRUST STRIP */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-16 text-gray-600">

          <div className="flex items-center gap-2 font-bold">
            <Star size={16} className="text-[#F26422]" />
            Trusted by 5000+
          </div>

          <div className="flex items-center gap-2 font-bold">
            <Award size={16} className="text-[#F26422]" />
            Certified Course
          </div>

          <div className="flex items-center gap-2 font-bold">
            <Zap size={16} className="text-[#F26422]" />
            Lifetime Access
          </div>

        </div>

      </Container>
    </section>
  );
};

export default MasterclassBundle;