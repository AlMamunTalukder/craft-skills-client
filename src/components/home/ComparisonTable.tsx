"use client";
import React, { useMemo } from "react";
import { FaCheck, FaCrown, FaTimes } from "react-icons/fa";
import { HiOutlineXCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

const ComparisonTable = () => {
  // We move the arrays outside or memoize them so React doesn't "re-think" the data on every scroll
  const features = useMemo(
    () => [
      "মেইন ক্লাস",
      "প্রব্লেম সলভিং ক্লাস",
      "প্র্যাক্টিস ক্লাস",
      "স্পেশাল ক্লাস",
      "প্রেজেন্টেশন রিভিউ ক্লাস",
      "৩০০০ মিনিট ভিডিও প্রেজেন্টেশন",
      "২৪ ঘন্টা গ্রুপ সাপোর্ট",
      "সার্টিফিকেট প্রদান",
      "আমাদের সাথে কাজ করার সুযোগ",
      "ইনকামের ক্ষেত্রে সহযোগিতা",
      "কোর্স শেষে লাইফটাইম সাপোর্ট",
    ],
    []
  );

  const othersFeatures = useMemo(
    () => [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
    ],
    []
  );

  // Standard animation variants to reuse memory
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
  };

  return (
    <section className="py-6 md:py-24 bg-gradient-to-b from-[#f8f7ff] via-[#9b5fdb] to-[#2D0B5A] overflow-hidden relative">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300/20 rounded-full blur-[100px] -z-10" />

      <Container>
        <div className="text-center mb-8 md:mb-12">
          <SectionTitle text="অন্যান্য কোর্সের সাথে আমাদের পার্থক্য" />
          <p className="text-slate-600 md:text-white/80 mt-2 max-w-lg mx-auto font-medium px-4">
            এক নজরে দেখে নিন কেন আমরা সেরা
          </p>
        </div>

        {/* --- MOBILE VIEW: Same Design, Optimized Rendering --- */}
        <div className="lg:hidden px-0">
          <motion.div
            {...fadeInUp}
            className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-2 border-purple-400 overflow-hidden"
          >
            <div className="flex items-center bg-purple-50/50 p-3 border-b border-purple-100">
              <div className="flex-[2] text-[#2D0B5A] font-black text-sm uppercase tracking-wider">
                Features
              </div>
              <div className="flex-1 text-center text-purple-600 font-bold text-[10px] leading-tight uppercase">
                আমাদের কোর্স
              </div>
              <div className="flex-1 text-center text-slate-400 font-bold text-[10px] leading-tight uppercase">
                অন্যান্য কোর্স
              </div>
            </div>

            <div className="divide-y divide-purple-50">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center p-3 hover:bg-purple-50/30 transition-colors"
                >
                  <div className="flex-[2] text-[#2D0B5A] font-bold text-[13px] leading-tight">
                    {feature}
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
                      <FaCheck className="text-white text-xs" />
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    {othersFeatures[idx] ? (
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                        <FaCheck className="text-slate-400 text-xs" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center">
                        <FaTimes className="text-rose-400 text-xs" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- DESKTOP VIEW: Same Triple-Column Design --- */}
        <div className="hidden lg:flex items-stretch justify-center gap-0 relative">
          {/* OTHERS CARD (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-[30%] bg-white/90 backdrop-blur-xl border border-white p-8 rounded-l-[2.5rem] shadow-2xl z-10"
          >
            <div className="text-center mb-10 h-16 flex items-center justify-center border-b border-purple-400">
              <h3 className="text-slate-600 text-xl font-bold uppercase tracking-widest">
                অন্যান্য কোর্স
              </h3>
            </div>
            <ul className="space-y-4">
              {features.map((_, idx) => (
                <li
                  key={idx}
                  className="flex justify-center items-center h-12 border-b border-purple-300 last:border-0"
                >
                  {othersFeatures[idx] ? (
                    <FaCheck className="text-slate-400 text-lg" />
                  ) : (
                    <HiOutlineXCircle className="text-rose-400 text-2xl" />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* OUR CARD (Center - Hero) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-[38%] relative z-20 my-[-20px]"
          >
            <div className="absolute -inset-1 bg-gradient-to-b from-[#D223F6] to-[#4F0187] rounded-[3rem] blur-md opacity-30" />
            <div className="relative bg-[#2D0B5A] border border-white/10 p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(79,1,135,0.3)]">
              <div className="text-center mb-10 h-16 flex flex-col items-center justify-center border-b border-white/10">
                <h3 className="text-white text-3xl font-black">আমাদের কোর্স</h3>
                <div className="h-1 w-12 bg-[#F300E7] mt-2 rounded-full" />
              </div>
              <ul className="space-y-4">
                {features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-center h-12 border-b border-white/5 last:border-0 group"
                  >
                    <span className="text-purple-50 text-lg font-bold text-center group-hover:text-[#F300E7] transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* OTHERS CARD (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-[30%] bg-white/90 backdrop-blur-xl border border-white p-8 rounded-r-[2.5rem] shadow-2xl z-10"
          >
            <div className="text-center mb-10 h-16 flex items-center justify-center border-b border-purple-400">
              <h3 className="text-slate-600 text-xl font-bold uppercase tracking-widest">
                অন্যান্য কোর্স
              </h3>
            </div>
            <ul className="space-y-4">
              {features.map((_, idx) => (
                <li
                  key={idx}
                  className="flex justify-center items-center h-12 border-b border-purple-300 last:border-0"
                >
                  {othersFeatures[idx] ? (
                    <FaCheck className="text-slate-400 text-lg" />
                  ) : (
                    <HiOutlineXCircle className="text-rose-400 text-2xl" />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ComparisonTable;
