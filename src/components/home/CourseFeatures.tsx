"use client";
import Container from "../shared/Container";
import { motion } from "framer-motion";
import { FaVideo, FaUsers, FaBriefcase, FaHandsHelping } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import SectionTitle from "../shared/SectionTitle";

const features = [
  {
    icon: FaVideo,
    title: "৩০০০ মিনিট ভিডিও প্রেজেন্টেশন",
    color: "#D61C4E",
    bg: "bg-rose-50",
  },
  {
    icon: FaUsers,
    title: "২৪ ঘণ্টা গ্রুপ সাপোর্ট",
    color: "#4F0187",
    bg: "bg-purple-50",
  },
  {
    icon: GrCertificate,
    title: "সার্টিফিকেট প্রদান",
    color: "#D69F1C",
    bg: "bg-amber-50",
  },
  {
    icon: FaBriefcase,
    title: "আমাদের সাথে কাজ করার সুযোগ",
    color: "#16a34a",
    bg: "bg-emerald-50",
  },
  {
    icon: MdSupportAgent,
    title: "কোর্স শেষে সাপোর্ট",
    color: "#7D1CD6",
    bg: "bg-violet-50",
  },
  {
    icon: FaHandsHelping,
    title: "কাজ পাওয়ার ক্ষেত্রে সহযোগিতা",
    color: "#0891b2",
    bg: "bg-cyan-50",
  },
];

const CourseFeatures = () => {
  return (
    <section className="py-7 md:py-20 bg-white overflow-hidden">
      <Container>
        <div className="text-center mb-6 md:mb-20">
          <SectionTitle text="কোর্সের বৈশিষ্ট্য" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-y-16 md:gap-x-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="relative group h-full pt-4" 
              >
                {/* 1. The Glowing Background (Behind everything) */}
                <div
                  className="absolute inset-0 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: feature.color }}
                />

                {/* 2. THE FLOATING ICON (Moved outside the overflow container) */}
                <div
                  className="absolute -top-2 left-8 w-12 md:w-16 h-12 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center z-30 transition-all duration-500 group-hover:-translate-y-4"
                  style={{
                    backgroundColor: feature.color,
                    boxShadow: `0 15px 30px -5px ${feature.color}66`,
                  }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* 3. THE MAIN CARD (Clean, no overflow-hidden here) */}
                <div className="relative h-full bg-white border border-slate-100 rounded-2xl md:rounded-[2rem] p-3 md:p-8 pt-10 md:pt-16 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  {/* 4. INNER WRAPPER (This handles the internal decorative clips) */}
                  <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
                    <div
                      className="absolute top-0 right-0 md:w-32 md:h-32 opacity-[0.05] group-hover:opacity-[0.2] transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at top right, ${feature.color}, transparent 70%)`,
                      }}
                    />
                    <Icon
                      className="absolute -bottom-6 -right-6 md:w-32 md:h-32 opacity-[0.03] -rotate-12 group-hover:rotate-0 transition-all duration-700"
                      style={{ color: feature.color }}
                    />
                  </div>

                  {/* 5. CONTENT */}
                  <div className="relative z-10">
                    <h3 className="text-[#1e293b] font-extrabold md:text-xl leading-snug">
                      {feature.title}
                    </h3>

                    {/* 6. Decorative Modern Bar */}
                    <div className="mt-5 h-1.5 w-12 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        className="h-full w-full"
                        style={{ backgroundColor: feature.color }}
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* 7. Large Background Watermark Icon */}
                  <Icon
                    className="absolute -bottom-4 md:-bottom-6 -right-1 md:-right-6 w-16 md:w-32 h-16 md:h-32 opacity-[0.1] md:opacity-[0.03] -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-700"
                    style={{ color: feature.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CourseFeatures;
