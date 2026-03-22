"use client";
import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2, MoveRight } from "lucide-react";

const transformations = [
  {
    before:
      "কথা বলতে গেলে জড়তা আসে, মাথায় অনেক কিছু থাকলেও গুছিয়ে বলতে পারেন না।",
    after:
      "পরিষ্কার ও সাবলীল উচ্চারণে অত্যন্ত আত্মবিশ্বাসের সাথে নিজের কথাগুলো গুছিয়ে বলবেন।",
  },
  {
    before: "আঞ্চলিক টানের কারণে হীনম্মন্যতায় ভোগেন এবং আত্মবিশ্বাস কমে যায়।",
    after:
      "আঞ্চলিকতা পুরোপুরি কাটিয়ে উঠে শুদ্ধ ও প্রফেশনাল টোনে নিজেকে প্রকাশ করবেন।",
  },
  {
    before: "কণ্ঠে কোনো গভীরতা নেই, কথা বা ভয়েস ওভার শুনলে একঘেয়ে লাগে।",
    after: "বিশেষ ব্যায়ামের মাধ্যমে কণ্ঠ হবে ভরাট, শ্রুতিমধুর এবং আকর্ষণীয়।",
  },
  {
    before:
      "স্টেজে উঠলেই বুক ধড়ফড় করে, আর ক্যামেরার সামনে এলেই সব কথা ভুলে যান।",
    after:
      "স্টেজ হোক বা ক্যামেরা—সব জায়গায় একদম ন্যাচারাল, ফ্লুয়েন্ট এবং কনফিডেন্ট থাকবেন।",
  },
  {
    before:
      "বডি ল্যাঙ্গুয়েজ ঠিক না থাকায় Awkward লাগে এবং প্রেজেন্টেশন খারাপ হওয়ায় সুযোগ মিস হয়।",
    after:
      "স্মার্ট বডি ল্যাঙ্গুয়েজ দিয়ে প্রেজেন্টেশন, ভাইভা বা মিটিং—সব জায়গায় শক্তিশালী ইমপ্যাক্ট তৈরি করবেন।",
  },
  {
    before:
      "স্ক্রিপ্ট লিখতে গেলে চিন্তা এলোমেলো হয়ে যায় এবং স্টুডিও সেটআপ বা এডিটিং নিয়ে কনফিউশনে থাকেন।",
    after:
      "নিজেই পাওয়ারফুল স্ক্রিপ্ট লিখে ডেলিভারি দেবেন এবং ঘরে বসেই প্রফেশনাল রেকর্ডিং ও এডিটিং করবেন।",
  },
  {
    before:
      "সঠিক গাইডলাইন বা ফিডব্যাক নেই, তাই স্কিল থাকলেও ইনকাম করার ক্লিয়ার পথ জানা নেই।",
    after:
      "এক্সপার্ট ফিডব্যাকে নিজেকে শুধরে পোর্টফোলিও তৈরি করবেন এবং ক্লায়েন্ট পেয়ে ইনকাম শুরু করবেন।",
  },
];

const BeforeAfter = () => {
  return (
    <div className="py-16 md:py-28 relative overflow-hidden bg-[#fafafa]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/40 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-50/40 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <header className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-6xl font-black text-slate-900 leading-[1.15] mb-6">
              কোর্স শেষে আপনার ক্যারিয়ারে <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D223F6] to-[#7e22ce]">
                যে অভাবনীয় পরিবর্তনগুলো আসবে
              </span>
            </h2>
            <div className="h-1.5 w-24 bg-purple-600 mx-auto rounded-full" />
          </motion.div>
        </header>

        {/* Labels - Desktop only */}
        <div className="hidden lg:grid grid-cols-2 gap-20 mb-10 px-10">
          <div className="flex items-center gap-3 text-slate-400 font-bold text-xl tracking-wide uppercase">
            <span className="w-8 h-[2px] bg-red-400" /> কোর্স করার আগে
          </div>
          <div className="flex items-center gap-3 text-purple-600 font-bold text-xl tracking-wide uppercase justify-end">
            কোর্স করার পরে <span className="w-8 h-[2px] bg-purple-600" />
          </div>
        </div>

        {/* Transformation Cards */}
        <div className="space-y-6 md:space-y-8">
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative grid lg:grid-cols-2 gap-0 lg:gap-12 items-center"
            >
              {/* Central Icon (Desktop Only) */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MoveRight className="text-purple-600 w-6 h-6" />
              </div>

              {/* BEFORE CARD */}
              <div className="relative p-6 md:p-8 rounded-t-[2rem] lg:rounded-l-[2.5rem] lg:rounded-tr-none bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:shadow-none">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-red-50 text-red-400 shrink-0">
                    <XCircle size={22} />
                  </div>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    {item.before}
                  </p>
                </div>
              </div>

              {/* AFTER CARD */}
              <div className="relative p-6 md:p-8 rounded-b-[2rem] lg:rounded-r-[2.5rem] lg:rounded-bl-none bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 shadow-[0_15px_35px_-15px_rgba(124,58,237,0.15)] transition-all duration-300 group-hover:scale-[1.02] group-hover:z-10">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-purple-600 text-white shrink-0 shadow-lg shadow-purple-200">
                    <CheckCircle2 size={22} />
                  </div>
                  <p className="text-slate-800 text-lg md:text-xl font-bold leading-relaxed">
                    {item.after}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
