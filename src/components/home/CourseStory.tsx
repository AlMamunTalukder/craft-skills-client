"use client";

import Image from "next/image";
import {
  CheckCircle2,
  PlayCircle,
  Users,
  MessageSquare,
  Video,
  Star,
} from "lucide-react";
import Container from "../shared/Container";

const steps = [
  {
    title: "মেইন ক্লাস",
    desc: "সিলেবাসের প্রতিটি টপিক নিয়ে বিস্তারিত আলোচনা এবং হাতে-কলমে শেখানো হয়।",
    icon: <Star size={20} />,
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    title: "প্রবলেম সলভিং ক্লাস",
    desc: "ওয়ান-টু-ওয়ান সেশনের মাধ্যমে দুর্বলতা চিহ্নিত করে সমাধান করা হয়।",
    icon: <MessageSquare size={20} />,
    gradient: "from-fuchsia-600 to-purple-600",
  },
  {
    title: "প্র্যাক্টিস ক্লাস",
    desc: "শেখানো বিষয়গুলো সরাসরি চর্চার মাধ্যমে আরও শাণিত ও নিখুঁত করা হয়।",
    icon: <Users size={20} />,
    gradient: "from-purple-500 to-blue-500",
  },
  {
    title: "স্পেশাল ক্লাস",
    desc: "দুর্বল শিক্ষার্থীদের জন্য রয়েছে এক্সট্রা কেয়ার ও স্পেশাল সাপোর্ট।",
    icon: <CheckCircle2 size={20} />,
    gradient: "from-violet-600 to-purple-700",
  },
  {
    title: "ভিডিও প্রেজেন্টেশন",
    desc: "৩০০০ মিনিট প্র্যাকটিক্যাল ভিডিওর মাধ্যমে পড়াগুলোকে সরাসরি প্রয়োগ করানো হয়।",
    icon: <Video size={20} />,
    gradient: "from-purple-700 to-indigo-800",
  },
  {
    title: "প্রেজেন্টেশন রিভিউ ক্লাস",
    desc: "মেন্টর নিজে প্রেজেন্টেশন দেখে ভুলগুলো ধরিয়ে দেন।",
    icon: <PlayCircle size={20} />,
    gradient: "from-fuchsia-500 to-purple-500",
  },
];

const CourseRoadmap = () => {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden bg-[#1A0033]">
      {/* Optimized Background - Removed heavy blur/noise on mobile */}
      <div className="absolute inset-0 bg-[#1A0033] md:bg-[radial-gradient(circle_at_50%_50%,#4F0187_0%,#1A0033_100%)]"></div>

      <Container className="relative z-10">
        <header className="text-center max-w-4xl mx-auto mb-10 md:mb-20">
          <div className="flex justify-center mb-6">
            <Image
              src="/img/award1.png"
              height={120}
              width={120}
              alt="Award"
              className="w-32 h-auto"
              priority
            />
          </div>

          <p className="text-sm md:text-xl font-bold text-white inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
            ৫০ দিনের প্র্যাকটিক্যাল চ্যালেঞ্জ
          </p>
          <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight mb-2 md:mb-4">
            আমাদের{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D223F6] to-[#7e22ce]">
              ৬-স্টেপ
            </span>{" "}
            লার্নিং মডেল
          </h2>

          <h3 className=" md:text-4xl md:font-bold text-purple-400 md:mt-4 leading-snug mb-4">
            প্রফেশনাল হওয়ার সবচেয়ে কার্যকর রোডম্যাপ!
          </h3>
        </header>

        {/* Optimized Bento Grid - Use grid-cols-1 for very small devices if needed */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white/5 rounded-2xl p-2 md:p-6 border border-white/10 transition-all duration-300 hover:bg-white/10 active:scale-95 touch-manipulation"
            >
              <div className="absolute top-2 right-4 text-5xl md:text-7xl font-black text-white/5 group-hover:text-purple-400  select-none">
                {index + 1}
              </div>

              <div
                className={`w-12 h-12 rounded-xl bg-linear-to-br ${step.gradient} text-white flex items-center justify-center mb-4 shadow-lg`}
              >
                {step.icon}
              </div>

              <h4 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-purple-400">
                {step.title}
              </h4>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CourseRoadmap;
