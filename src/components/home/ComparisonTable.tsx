"use client";
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

  const othersFeatures = [
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
  ];

  return (
    // Lightened Background with Soft Gradient
    <section className="py-8 md:py-24 bg-gradient-to-b from-[#e7e4f0] via-[#9b5fdb] to-[#564097] overflow-hidden relative">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-[100px] -z-10" />

      <Container>
        <div className="text-center mb-16">
          <SectionTitle text="কেন আমরাই সেরা?" />
          <p className="text-slate-500 mt-4 max-w-lg mx-auto font-medium">
            অন্যান্য কোর্সের সাথে আমাদের পার্থক্য এক নজরে দেখে নিন
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-0 relative">
          {/* OTHERS CARD (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="w-full lg:w-[30%] bg-white/90 backdrop-blur-xl border border-white p-8 rounded-[2.5rem] lg:rounded-r-none shadow-2xl z-10"
          >
            <div className="text-center mb-10 h-16 flex items-center justify-center border-b border-purple-400">
              <h3 className="text-slate-600 text-xl font-bold uppercase tracking-widest">
                সাধারণ কোর্স
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

          {/* OUR CARD (Center - The Hero) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-full lg:w-[38%] relative z-20 -my-4 lg:my-[-20px]"
          >
            {/* Glow effect for the hero card */}
            <div className="absolute -inset-1 bg-gradient-to-b from-[#D223F6] to-[#4F0187] rounded-[3rem] blur-md opacity-30" />

            <div className="relative bg-[#2D0B5A] border border-white/10 p-8 lg:p-12 rounded-[3rem] shadow-[0_20px_50px_rgba(79,1,135,0.3)]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F300E7] to-[#A855F7] px-8 py-2 rounded-full flex items-center gap-2 shadow-xl border border-white/20">
                <FaCrown className="text-white animate-bounce text-sm" />
                <span className="text-white font-black text-xs md:text-sm tracking-wider uppercase">
                  Best Choice
                </span>
              </div>

              <div className="text-center mb-10 h-16 flex flex-col items-center justify-center border-b border-white/10">
                <h3 className="text-white text-2xl md:text-3xl font-black">
                  আমাদের কোর্স
                </h3>
                <div className="h-1 w-12 bg-[#F300E7] mt-2 rounded-full" />
              </div>

              <ul className="space-y-4">
                {features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-center h-12 border-b border-white/5 last:border-0 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="hidden md:flex w-6 h-6 rounded-full bg-green-500/20 items-center justify-center border border-green-500/50">
                        <FaCheck className="text-green-400 text-[10px]" />
                      </div>
                      <span className="text-purple-50 text-sm md:text-lg font-bold text-center group-hover:text-[#F300E7] transition-colors">
                        {feature}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* OTHERS CARD (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="hidden lg:block w-full lg:w-[30%] bg-white/90 backdrop-blur-xl border border-white p-8 rounded-l-none rounded-[2.5rem] shadow-2xl z-10"
          >
            <div className="text-center mb-10 h-16 flex items-center justify-center border-b border-purple-400">
              <h3 className="text-slate-600 text-xl font-bold uppercase tracking-widest">
                সাধারণ কোর্স
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

        {/* Bottom CTA Area */}
        <div className="mt-24 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-4 bg-white px-10 py-5 rounded-full shadow-lg border border-purple-100"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
            <p className="text-[#4F0187] font-extrabold text-lg">
              আপনার সফলতার জন্য আমরাই সেরা মাধ্যম
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ComparisonTable;
