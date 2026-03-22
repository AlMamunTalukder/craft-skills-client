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
      desc: "সিলেবাসের প্রতিটি টপিক নিয়ে বিস্তারিত আলোচনা এবং হাতে-কলমে শেখানো হয়, যাতে বেসিক ফাউন্ডেশন একদম ক্লিয়ার থাকে।      ",
      icon: <Star size={24} />,
      gradient: "from-purple-600 to-indigo-600",
    },
    {
      title: "প্রবলেম সলভিং ক্লাস",
      desc: "আমাদের ডেডিকেটেড ‘সমস্যা সমাধান ক্লাসে’ প্রত্যেক শিক্ষার্থীকে আলাদাভাবে সময় দেওয়া হয়। ওয়ান-টু-ওয়ান (One-to-One) সেশনের মাধ্যমে তাদের দুর্বলতাগুলো চিহ্নিত করে, এক্সপার্ট মেন্টরদের সাহায্যে তা সমাধান করা হয়।      ",
      icon: <MessageSquare size={24} />,
      gradient: "from-fuchsia-600 to-purple-600",
    },
    {
      title: "প্র্যাক্টিস ক্লাস",
      desc: "শেখানো বিষয়গুলো সরাসরি চর্চার মাধ্যমে আরও শাণিত ও নিখুঁত করা হয়।      ",
      icon: <Users size={24} />,
      gradient: "from-purple-500 to-blue-500",
    },
    {
      title: "স্পেশাল ক্লাস",
      desc: "এটি মূলত দুর্বল শিক্ষার্থীদের জন্য। মেইন, প্রবলেম সলভিং ও প্র্যাকটিস করার পরও যাদের সমস্যা থাকবে, তাদের জন্য রয়েছে এক্সট্রা কেয়ার ও স্পেশাল সাপোর্টের ব্যবস্থা।",
      icon: <CheckCircle2 size={24} />,
      gradient: "from-violet-600 to-purple-700",
    },
    {
      title: "ভিডিও প্রেজেন্টেশন",
      desc: "৩০০০ মিনিট প্র্যাকটিক্যাল ভিডিও প্রেজেন্টেশনের মাধ্যমে ক্লাসের পড়াগুলোকে সরাসরি প্রয়োগ করানো হয়।      ",
      icon: <Video size={24} />,
      gradient: "from-purple-700 to-indigo-800",
    },
    {
      title: "প্রেজেন্টেশন রিভিউ ক্লাস",
      desc: "সাবমিট করা ভিডিও প্রেজেন্টেশনগুলো মেন্টর নিজে খুঁটিয়ে দেখেন এবং কোথায় কী কী সমস্যা রয়েছে, তা দেখে ভুলগুলো ধরিয়ে দেন।      ",
      icon: <PlayCircle size={24} />,
      gradient: "from-fuchsia-500 to-purple-500",
    },
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-[#0a0118]">
      {/* --- ELITE MESH BACKGROUND --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#F300E7]/15 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      </div>

      <Container>
        <header className="relative z-10 text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <Image
              src="/img/award1.png"
              height={180}
              width={180}
              alt="Award"
              className="w-32 md:w-40 h-auto drop-shadow-[0_0_30px_rgba(210,35,246,0.3)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              আমাদের{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D223F6] to-[#7e22ce]">
                ৬-স্টেপ
              </span>{" "}
              লার্নিং মডেল
            </h2>

            {/* Tagline Box - Now Dark Themed */}
            <p className="text-lg md:text-xl font-bold text-purple-200 inline-block px-8 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl">
              ৫০ দিনের প্র্যাকটিক্যাল চ্যালেঞ্জ
            </p>

            <h3 className="text-2xl md:text-4xl font-extrabold text-purple-400 mt-4 leading-snug">
              প্রফেশনাল হওয়ার সবচেয়ে কার্যকর রোডম্যাপ!
            </h3>
          </motion.div>
        </header>

        {/* --- BENTO GRID (Dark Glass Style) --- */}
        <div className="relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              /* Glass Card: Semi-transparent background with border highlight */
              className="group relative h-[280px] w-full bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 hover:border-purple-500/50 shadow-2xl transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2"
            >
              {/* Decorative Step Number - Faded into background */}
              <div className="absolute -top-2 -right-0 text-8xl font-black text-white/[0.03] group-hover:text-purple-500/[0.08] transition-colors duration-500 select-none">
                {index + 1}
              </div>

              {/* Icon Container - High Contrast */}
              <div
                className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
              >
                {step.icon}
              </div>

              {/* Text Content - Changed to White/Grey for contrast */}
              <div className="flex-grow">
                <h4 className="text-xl font-extrabold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {step.title}
                </h4>
                <p className="text-slate-300 text-[15px] leading-relaxed line-clamp-4 group-hover:text-white transition-colors">
                  {step.desc}
                </p>
              </div>

              {/* Animated Progress Line */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/5">
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
