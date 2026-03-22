"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  PlayCircle,
  Users,
  MessageSquare,
  Video,
  Star,
} from "lucide-react";
import Container from "../shared/Container";

const CourseRoadmap = () => {
  const steps = [
    {
      title: "মেইন ক্লাস",
      desc: "কোর্সে উল্লেখিত সিলেবাসের প্রতিটি বিষয় নিয়ে বিস্তারিত আলোচনাসহ পাঠ দান করানো হয়।",
      icon: <Star />,
      gradient: "from-purple-600 to-indigo-600",
    },
    {
      title: "প্রবলেম সলভিং ক্লাস",
      desc: "সমস্যা সমাধান ক্লাস। যেখানে শিক্ষার্থীর সমস্যা চিহ্নিত করে তা সমাধানের মাধ্যমে পড়া আদায় করা হয়।",
      icon: <MessageSquare />,
      gradient: "from-fuchsia-600 to-purple-600",
    },
    {
      title: "প্র্যাক্টিস ক্লাস",
      desc: "যেখানে শিক্ষার্থীদের ক্লাসের পড়াগুলো চর্চার মাধ্যমে বাস্তব প্রয়োগ করানো হয়।",
      icon: <Users />,
      gradient: "from-purple-500 to-blue-500",
    },
    {
      title: "স্পেশাল ক্লাস",
      desc: "দুর্বলদের আলাদা করে শেখানো হয়। তিনটি ক্যাটাগরিতে ক্লাস করার পরেও সমস্যা থাকলে তাদের জন্য এই ব্যবস্থা।",
      icon: <CheckCircle2 />,
      gradient: "from-violet-600 to-purple-700",
    },
    {
      title: "ভিডিও প্রেজেন্টেশন",
      desc: "৩০০০ মিনিট ভিডিও প্রেজেন্টেশনের মাধ্যমে ক্লাসে শেখানো বিষয়গুলো সরাসরি প্রয়োগ করানো হয়।",
      icon: <Video />,
      gradient: "from-purple-700 to-indigo-800",
    },
    {
      title: "প্রেজেন্টেশন রিভিউ ক্লাস",
      desc: "ভিডিও প্রেজেন্টেশনের ক্ষেত্রে কোথায় কী কী সমস্যা রয়েছে তা পর্যালোচনার মাধ্যমে সমাধান করা হয়।",
      icon: <PlayCircle />,
      gradient: "from-fuchsia-500 to-purple-500",
    },
  ];

  return (
    // THE BACKGROUND: Deep Purple Theme with Mesh Gradient
    <section className="relative py-16 md:py-24 overflow-hidden bg-[#faf8ff]">
      {/* Dynamic Purple Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-purple-200/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[5%] -left-[10%] w-[600px] h-[600px] bg-indigo-100/60 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      <Container>
        <header className="relative z-10 text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="relative group">
              <Image
                src="/img/cup.webp"
                height={220}
                width={220}
                alt="Award"
                className="relative w-32 md:w-44 h-auto  transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
              আমাদের{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D223F6] to-[#7e22ce]">
                ৬-স্টেপ
              </span>{" "}
              লার্নিং মডেল
            </h2>
            <p className="text-xl md:text-2xl font-bold text-slate-500 inline-block px-6 py-2 rounded-full bg-white border border-slate-100 shadow-sm">
              ৫০ দিনের প্র্যাকটিক্যাল চ্যালেঞ্জ
            </p>
            <h3 className="text-2xl md:text-4xl font-extrabold text-[#4F0187] mt-4">
              প্রফেশনাল হওয়ার সবচেয়ে কার্যকর রোডম্যাপ!
            </h3>
          </motion.div>
        </header>

        {/* --- FIXED SECTION (Bento Grid) --- */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              // FIXED HEIGHT & WIDTH BOX
              className="group relative h-[280px] w-full bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-purple-100/50 
                         shadow-[0_15px_35px_-15px_rgba(124,58,237,0.1)] hover:shadow-[0_25px_50px_-12px_rgba(124,58,237,0.25)] 
                         transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2 cursor-default"
            >
              {/* Decorative Step Background Number */}
              <div className="absolute -top-4 -right-2 text-8xl font-black text-purple-600/5 transition-colors duration-500 group-hover:text-purple-600/10 select-none">
                {index + 1}
              </div>

              {/* Icon Section */}
              <div
                className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center shadow-lg mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
              >
                {step.icon}
              </div>

              {/* Content Section (Using flex-grow to push bar to bottom) */}
              <div className="flex-grow">
                <h4 className="text-xl font-extrabold text-[#2e1065] mb-3 group-hover:text-purple-700 transition-colors">
                  {step.title}
                </h4>
                <p className="text-slate-600 text-[15px] leading-relaxed line-clamp-4">
                  {step.desc}
                </p>
              </div>

              {/* Fixed Bottom Border Accent */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-slate-50">
                <div
                  className={`h-full w-0 group-hover:w-full bg-gradient-to-r ${step.gradient} transition-all duration-700 ease-in-out`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CourseRoadmap;
