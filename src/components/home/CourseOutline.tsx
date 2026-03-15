"use client";
import Container from "../shared/Container";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Mic2,
  BookOpen,
  Languages,
  MonitorPlay,
} from "lucide-react";

const CourseOutline = () => {
  const courseData = [
    {
      title: "শুদ্ধ উচ্চারণ কোর্স",
      icon: <Languages className="w-8 h-8" />,
      items: [
        "শুদ্ধ উচ্চারণ",
        "আঞ্চলিকতামুক্ত বিশুদ্ধ বাংলা ভাষায় কথা বলা",
        "কণ্ঠস্বর চর্চা ও শ্রুতিমধুর করা",
        "মুখের জড়তা কাটানোর কৌশল",
        "ব্যায়াম ও মেডিটেশন",
        "কণ্ঠ ভরাট কৌশল",
        "আবৃত্তি নির্মাণ ও ভাবের ব্যবহার",
        "মাইক্রোফোন ও সাউন্ড কনসোল ব্যবহার",
        "দক্ষ আলোচক হওয়ার কৌশল",
        "পাবলিক স্পিকিং",
        "ক্যামেরা ও মঞ্চ ভীতি কাটানো",
        "বডি ল্যাঙ্গুয়েজ ও বাচনভঙ্গি",
      ],
    },
    {
      title: "ভয়েস আর্টিস্ট কোর্স",
      icon: <Mic2 className="w-8 h-8" />,
      items: [
        "ভয়েস ওভার টেকনিক",
        "সংবাদ পাঠ, ডকুমেন্টারি, ডাবিং ধারণা",
        "ক্যারেক্টার ও এনিমেশন ভয়েস কৌশল",
        "ভয়েস আর্টিস্ট হওয়ার সঠিক গাইডলাইন",
        "স্ক্রিপ্ট রাইটিং ও এনালাইসিস",
        "রেকর্ডিং ও এডিটিং কাজের প্রক্রিয়া",
        "অডিও ইন্সট্রুমেন্ট ও স্টুডিও সেটআপ",
        "ভয়েস ওভার পোর্টফোলিও মেকিং",
        "মার্কেটিং ও ইনকামের উপায়",
        "ক্লায়েন্ট ওয়ার্ক",
      ],
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#1A0033] py-16 z-10 mt-5 lg:mt-0 ">
      {/* --- PREMIUM GRADIENT LAYERS --- */}
      {/* 1. Base Gradient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4F0187_0%,#1A0033_100%)]"></div>

      {/* 2. Top-Left Light Leak (Cyan) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>

      {/* 3. Bottom-Right Glow (Magenta) */}
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px]"></div>

      {/* 4. Subtle Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
        }}
      ></div>

      <Container>
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-md">
            কোর্সে যা{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
              শেখানো{" "}
            </span>
            হবে
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-[280px] md:w-[900px] mx-auto">
          {courseData.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group h-full"
            >
              {/* Card Background with hover glow */}
              <div className="absolute inset-0 bg-[#4F0187] rounded-3xl translate-x-2 translate-y-2 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

              <div className="relative h-full bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] group-hover:border-purple-200 transition-all duration-300">
                {/* Header with Icon */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-purple-50 text-[#4F0187] rounded-2xl group-hover:bg-[#4F0187] group-hover:text-white transition-all duration-500">
                    {course.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#4F0187]">
                    {course.title}
                  </h3>
                </div>

                {/* List Items */}
                <ul className="space-y-4">
                  {course.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-3 text-slate-700 group/item"
                    >
                      <div className="mt-1.5 shrink-0 transition-transform group-hover/item:scale-110">
                        <CheckCircle2 size={18} className="text-[#4F0187]" />
                      </div>
                      <span className="text-[17px] md:text-[18px] leading-relaxed font-medium">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Decorative Bottom Corner Icon */}
                <div className="absolute bottom-6 right-6 opacity-5 group-hover:opacity-20 transition-opacity text-[#4F0187]">
                  {index === 0 ? (
                    <MonitorPlay size={60} />
                  ) : (
                    <BookOpen size={60} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CourseOutline;
