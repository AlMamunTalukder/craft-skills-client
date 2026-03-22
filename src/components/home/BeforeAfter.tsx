"use client";
import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

const transformations = [
  {
    before:
      "কথা বলতে গেলে জড়তা আসে, মাথায় অনেক কিছু থাকলেও গুছিয়ে বলতে পারেন না।",
    after:
      "পরিষ্কার ও সাবলীল উচ্চারণে অত্যন্ত আত্মবিশ্বাসের সাথে নিজের কথাগুলো গুছিয়ে বলবেন।",
  },
  {
    before: "আঞ্চলিক টানের কারণে হীনম্মন্যতায় ভোগেন এবং আত্মবিশ্বাস কমে যায়।",
    after:
      "আঞ্চলিকতা পুরোপুরি কাটিয়ে উঠে শুদ্ধ ও প্রফেশনাল টোনে নিজেকে প্রকাশ করবেন।",
  },
  {
    before: "কণ্ঠে কোনো গভীরতা নেই, কথা বা ভয়েস ওভার শুনলে একঘেয়ে লাগে।",
    after: "বিশেষ ব্যায়ামের মাধ্যমে কণ্ঠ হবে ভরাট, শ্রুতিমধুর এবং আকর্ষণীয়।",
  },
  {
    before:
      "স্টেজে উঠলেই বুক ধড়ফড় করে, আর ক্যামেরার সামনে এলেই সব কথা ভুলে যান।",
    after:
      "স্টেজ হোক বা ক্যামেরা—সব জায়গায় একদম ন্যাচারাল, ফ্লুয়েন্ট এবং কনফিডেন্ট থাকবেন।",
  },
  {
    before:
      "বডি ল্যাঙ্গুয়েজ ঠিক না থাকায় Awkward লাগে এবং প্রেজেন্টেশন খারাপ হওয়ায় সুযোগ মিস হয়।",
    after:
      "স্মার্ট বডি ল্যাঙ্গুয়েজ দিয়ে প্রেজেন্টেশন, ভাইভা বা মিটিং—সব জায়গায় শক্তিশালী ইমপ্যাক্ট তৈরি করবেন।",
  },
  {
    before:
      "স্ক্রিপ্ট লিখতে গেলে চিন্তা এলোমেলো হয়ে যায় এবং স্টুডিও সেটআপ বা এডিটিং নিয়ে কনফিউশনে থাকেন।",
    after:
      "নিজেই পাওয়ারফুল স্ক্রিপ্ট লিখে ডেলিভারি দেবেন এবং ঘরে বসেই প্রফেশনাল রেকর্ডিং ও এডিটিং করবেন।",
  },
  {
    before:
      "সঠিক গাইডলাইন বা ফিডব্যাক নেই, তাই স্কিল থাকলেও ইনকাম করার ক্লিয়ার পথ জানা নেই।",
    after:
      "এক্সপার্ট ফিডব্যাকে নিজেকে শুধরে পোর্টফোলিও তৈরি করবেন এবং ক্লায়েন্ট পেয়ে ইনকাম শুরু করবেন।",
  },
];

const BeforeAfter = () => {
  return (
    <div className="py-14 md:py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#F300E7]/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-5xl font-extrabold leading-tight">
            <span className="text-[#2e1065]">কোর্স শেষে আপনার ক্যারিয়ারে</span>
            <br />
            <span className="bg-gradient-to-r from-[#F300E7] to-purple-600 text-transparent bg-clip-text">
              যে অভাবনীয় পরিবর্তনগুলো আসবে
            </span>
          </h2>
        </div>

        {/* Labels */}
        <div className="hidden md:grid grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-2 text-red-500 font-bold text-lg">
            <XCircle /> কোর্স করার আগে
          </div>
          <div className="flex items-center gap-2 text-green-600 font-bold text-lg justify-end">
            কোর্স করার পরে <CheckCircle2 />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5">
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-4 md:gap-6 items-stretch"
            >
              {/* BEFORE */}
              <div className="p-5 rounded-2xl bg-red-50 border border-red-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <XCircle className="text-red-400 mt-1" />
                  <p className="text-gray-700 text-sm md:text-base">
                    {item.before}
                  </p>
                </div>
              </div>

              {/* AFTER */}
              <div className="p-5 rounded-2xl bg-green-50 border border-green-100 shadow-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-500 mt-1" />
                  <p className="text-gray-700 text-sm md:text-base font-medium">
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
