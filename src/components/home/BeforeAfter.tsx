"use client";
import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2, Sparkles } from "lucide-react";

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

const Transformation = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF9FF] overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-200/30 blur-[100px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-100/40 blur-[100px] -z-10 rounded-full" />

      <div className="max-w-6xl mx-auto px-4">
        {/* --- HEADER --- */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-slate-950 leading-tight">
            কোর্স শেষে আপনার{" "}
            <span className="text-purple-600">ক্যারিয়ারে</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              যে অভাবনীয় পরিবর্তনগুলো আসবে
            </span>
          </h2>
        </div>

        {/* --- TRANSFORMATION LIST --- */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative flex flex-col md:flex-row items-stretch rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-purple-100 bg-white shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500"
            >
              {/* BEFORE SECTION (LEFT/TOP) */}
              <div className="flex-1 p-6 md:p-10 flex items-start gap-4 bg-red-50/40 border-b md:border-b-0 md:border-r border-slate-100 transition-colors group-hover:bg-red-50/60">
                <div className="shrink-0 p-2 rounded-full bg-red-100 text-red-500">
                  <XCircle size={20} />
                </div>
                <div>
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">
                    ❌ কোর্স করার আগে
                  </span>
                  <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                    {item.before}
                  </p>
                </div>
              </div>

              {/* AFTER SECTION (RIGHT/BOTTOM) */}
              <div className="flex-1 p-6 md:p-10 flex items-start gap-4 bg-gradient-to-br from-white to-purple-50/50 transition-all group-hover:to-purple-100/40">
                <div className="shrink-0 p-2 rounded-full bg-purple-600 text-white shadow-lg shadow-purple-200">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <span className="text-purple-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">
                    ✅ কোর্স করার পরে
                  </span>
                  <p className="text-slate-900 text-lg md:text-xl font-extrabold leading-snug group-hover:text-purple-900 transition-colors">
                    {item.after}
                  </p>
                </div>
              </div>

              {/* Animated Progress Accent Line */}
              <div className="absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 transition-all duration-700 ease-in-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Transformation;
