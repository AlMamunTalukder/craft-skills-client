'use client'
import React from 'react';
import { FaCheck, FaCrown } from "react-icons/fa";
import { HiOutlineXCircle } from "react-icons/hi";
import { motion } from "framer-motion";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

const ComparisonTable = () => {
  const features = [
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
  ];

  const ourFeatures = [true, true, true, true, true, true, true, true, true, true, true];
  const othersFeatures = [true, false, false, false, false, false, false, true, false, false, false];

  return (
    <section className="py-24 bg-[#0B001A] overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] -z-10" />

      <Container>
        <div className="text-center mb-16">
          <SectionTitle text="কেন আমরাই সেরা?" />
          <p className="text-purple-200/60 mt-4 max-w-lg mx-auto">
            অন্যান্য কোর্সের সাথে আমাদের পার্থক্য এক নজরে দেখে নিন
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 relative">
          
          {/* OTHERS CARD (Left - Muted) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="w-full lg:w-[32%] bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] lg:rounded-r-none opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <div className="text-center mb-10">
              <h3 className="text-gray-400 text-xl font-bold uppercase tracking-widest">সাধারণ কোর্স</h3>
            </div>
            <ul className="space-y-6">
              {features.map((_, idx) => (
                <li key={idx} className="flex justify-center items-center h-8">
                  {othersFeatures[idx] ? (
                    <FaCheck className="text-gray-500 text-lg" />
                  ) : (
                    <HiOutlineXCircle className="text-rose-500/50 text-2xl" />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* OUR CARD (Center - The Hero) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-[36%] relative z-20"
          >
            {/* Gradient Border Wrapper */}
            <div className="absolute -inset-1 bg-gradient-to-b from-[#F300E7] to-[#4F0187] rounded-[2.5rem] blur-sm opacity-50 animate-pulse" />
            
            <div className="relative bg-[#1A0B2E] border border-white/20 p-8 lg:p-10 rounded-[2.5rem] shadow-2xl">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F300E7] to-[#A855F7] px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <FaCrown className="text-white animate-bounce" />
                <span className="text-white font-bold text-sm tracking-tighter">PREMIUM CHOICE</span>
              </div>

              <div className="text-center mb-10">
                <h3 className="text-white text-2xl md:text-3xl font-black pt-2">আমাদের কোর্স</h3>
                <div className="h-1 w-20 bg-[#F300E7] mx-auto mt-2 rounded-full" />
              </div>

              <ul className="space-y-6">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex flex-col items-center gap-2 group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                        <FaCheck className="text-green-400 text-sm" />
                      </div>
                      <span className="text-purple-50 text-sm md:text-base font-medium text-center">
                        {feature}
                      </span>
                    </div>
                    {idx !== features.length - 1 && (
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mt-2" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* FEATURE LABELS (Overlay for Desktop, Muted Right Card for Mobile logic) */}
          {/* This design uses the labels inside the center card for better readability on mobile, but we can add a visual 'others' column on the right for symmetry */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             className="hidden lg:block w-full lg:w-[32%] bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-l-none rounded-[2rem] opacity-60"
          >
            <div className="text-center mb-10">
              <h3 className="text-gray-400 text-xl font-bold uppercase tracking-widest">সাধারণ কোর্স</h3>
            </div>
             <ul className="space-y-6">
              {features.map((_, idx) => (
                <li key={idx} className="flex justify-center items-center h-8">
                  {othersFeatures[idx] ? (
                    <FaCheck className="text-gray-500 text-lg" />
                  ) : (
                    <HiOutlineXCircle className="text-rose-500/50 text-2xl" />
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom CTA Area */}
        <div className="mt-16 text-center">
           <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-4 rounded-full backdrop-blur-sm"
           >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
              <p className="text-purple-100 font-semibold italic">
                আপনার স্বপ্ন পূরণে আমরাই এক ধাপ এগিয়ে
              </p>
           </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ComparisonTable;