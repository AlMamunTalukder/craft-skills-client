"use client";

import React from "react";
import Container from "@/src/components/shared/Container";
import {
  FileText,
  Languages,
  Video,
  Activity,
  ScrollText,
  UserSquare2,
  Sliders,
  CalendarCheck,
  Users,
  Award,
  Heart,
  Gift, // Imported Gift icon
} from "lucide-react";

const items = [
  { text: "শুদ্ধ উচ্চারণের এক্সক্লুসিভ প্র্যাকটিস শিট (PDF)", icon: FileText, color: "#F97316" },
  { text: "উচ্চারণ স্পষ্ট করার টাং টুইস্টার কালেকশন", icon: Languages, color: "#8B5CF6" },
  { text: "উচ্চারণ প্র্যাকটিসের এক্সক্লুসিভ ভিডিও টিউটোরিয়াল", icon: Video, color: "#F59E0B" },
  { text: "ভোকাল কেয়ার গাইড ও ওয়ার্মআপ রুটিন", icon: Activity, color: "#10B981" },
  { text: "রেডিমেড ভয়েস ওভার প্র্যাকটিস স্ক্রিপ্ট", icon: ScrollText, color: "#3B82F6" },
  { text: "প্রেজেন্টেশন হ্যাকস ও বডি ল্যাঙ্গুয়েজ শিট", icon: UserSquare2, color: "#EC4899" },
  { text: "বাজেট গিয়ার ও রেকর্ডিং সফটওয়্যার গাইড", icon: Sliders, color: "#EF4444" },
  { text: "৩০ দিনের স্পিকিং চ্যালেঞ্জ ট্র্যাকার", icon: CalendarCheck, color: "#6366F1" },
  { text: "প্রাইভেট গ্রুপ এক্সেস", icon: Users, color: "#F97316" },
  { text: "ডিজিটাল সার্টিফিকেট", icon: Award, color: "#2563EB" },
  { text: "অফুরন্ত ভালোবাসা ও গাইডলাইন!", icon: Heart, color: "#FB7185" },
];

const MasterclassBundle = () => {
  return (
    <section className="relative py-10 md:py-20 bg-white overflow-hidden">

      {/* soft premium background glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-orange-200/30 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">

        {/* HEADER */}
        <div className="text-center mb-10 md:mb-20 flex flex-col items-center">

          {/* Gift Box Icon Top of Header */}
          <div className="relative mb-4 md:mb-6 p-4 bg-orange-50 rounded-2xl border border-orange-100 ">
            <div className="absolute inset-0 bg-orange-500/10 blur-xl rounded-full" />
            <Gift className="w-20 h-20 text-orange-500 relative z-10" />
          </div>

          {/* Redesigned Title with Slate-900, Orange, and White (on dark badge) */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight max-w-4xl leading-tight md:leading-snug">
            কোর্স এনরোল করলেই পাচ্ছেন{" "}
            <span className="text-orange-500 relative inline-block mx-1">
              ৪,২০০ টাকার
            </span>{" "}
            <span className="inline-block bg-slate-900 text-white px-4 py-1 rounded-xl sm:rounded-2xl shadow-md rotate-[-1deg] ml-1">
              প্রিমিয়াম গিফট বক্স!
            </span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="relative group h-full pt-6"
              >

                {/* glow background (like CourseFeatures) */}
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: item.color }}
                />

                {/* floating icon */}
                <div
                  className="absolute -top-3 left-6 w-12 h-12 rounded-xl flex items-center justify-center z-20 transition-all duration-500 group-hover:-translate-y-2 shadow-lg"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 15px 30px -5px ${item.color}66`,
                  }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* main card */}
                <div className="relative h-full bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-2 md:p-6 pt-10 shadow-sm group-hover:shadow-xl transition-all duration-500">

                  {/* subtle decorative glow */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                    <div
                      className="absolute top-0 right-0 w-32 h-32 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at top right, ${item.color}, transparent 70%)`,
                      }}
                    />
                  </div>

                  {/* text */}
                  <h3 className="text-slate-800 font-extrabold text-base md:text-lg leading-snug relative z-10">
                    {item.text}
                  </h3>

                  {/* bottom accent bar */}
                  <div className="mt-5 h-1.5 w-12 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full w-full transition-transform duration-300 group-hover:translate-x-0 -translate-x-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>

                  {/* watermark icon */}
                  <Icon
                    className="absolute -bottom-4 md:-bottom-6 -right-5 md:-right-6 w-14 md:w-20 h-14 md:h-20 opacity-[0.1] rotate-12 group-hover:rotate-0 transition-all duration-700"
                    style={{ color: item.color }}
                  />

                </div>
              </div>
            );
          })}

        </div>

      </Container>
    </section>
  );
};

export default MasterclassBundle;