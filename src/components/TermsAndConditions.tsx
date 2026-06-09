"use client";

import React from "react";
import Container from "@/src/components/shared/Container";
import {
  Scale,
  FileText,
  BadgeDollarSign,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

const TermsAndConditions = () => {
  // const lastUpdated = "জুন ২০২৬";

  return (
    <section className="relative py-20 bg-[#070510] text-white overflow-hidden min-h-screen">
      {/* Premium Purple Ambient Light */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/[0.07] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Scale className="text-[#8B5CF6]" size={16} />
            <span className="text-[#A78BFA] text-xs font-black tracking-widest uppercase">
              Terms & Conditions
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            শর্তাবলী ও নীতিমালা (Terms & Conditions)
          </h1>
          {/* <p className="text-purple-300/60 text-sm">
                        সর্বশেষ আপডেট: {lastUpdated}
                    </p> */}
          <p className="text-purple-100/60 text-base max-w-2xl mx-auto pt-2">
            Craft Skills-এর ওয়েবসাইট এবং সেবাগুলো ব্যবহারের ক্ষেত্রে আপনাকে
            নিম্নলিখিত শর্তাবলি মেনে চলতে হবে। আমাদের ওয়েবসাইট ব্যবহার করার
            মাধ্যমে আপনি এই নীতিমালাগুলোর সাথে সম্মতি প্রকাশ করছেন।
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 bg-white/[0.02] border border-white/5 p-6 md:p-10 rounded-3xl backdrop-blur-md">
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
              <FileText size={20} className="text-[#8B5CF6]" />
              ১. সেবার ব্যবহার:
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-purple-100/70 text-base leading-relaxed">
              <li>
                আমাদের প্ল্যাটফর্মে দেওয়া অনলাইন বা অফলাইন কোর্সের তথ্য, ভিডিও
                এবং অন্যান্য কন্টেন্ট শুধুমাত্র ব্যক্তিগত ও শিক্ষামূলক প্রয়োজনে
                ব্যবহার করা যাবে।
              </li>
              <li>
                অনুমতি ছাড়া আমাদের কোনো কন্টেন্ট কপি, ডিস্ট্রিবিউট বা বাণিজ্যিক
                উদ্দেশ্যে ব্যবহার করা আইনত দণ্ডনীয়।
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
              <BadgeDollarSign size={20} className="text-[#8B5CF6]" />
              ২. ভর্তি ও পেমেন্ট নীতিমালা:
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-purple-100/70 text-base leading-relaxed">
              <li>
                কোর্সে ভর্তি হওয়ার সময় সঠিক তথ্য প্রদান করা ব্যবহারকারীর
                দায়িত্ব।
              </li>
              <li>
                কোর্সের ফি সম্পূর্ণ পরিশোধ করার পরেই কেবল একজন শিক্ষার্থী ক্লাসে
                অংশগ্রহণের চূড়ান্ত অনুমতি পাবেন।
              </li>
              <li>
                একবার ফি প্রদান করার পর কোনো বিশেষ পরিস্থিতি ছাড়া তা ফেরতযোগ্য
                (Refundable) নয়। বিশেষ কোনো সমস্যার ক্ষেত্রে আমাদের সাপোর্ট
                টিমের সাথে যোগাযোগ করতে হবে।
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
              <ShieldCheck size={20} className="text-[#8B5CF6]" />
              ৩. গোপনীয়তা নীতি (Privacy Policy):
            </h2>
            <p className="text-purple-100/70 text-base leading-relaxed pl-2">
              আমরা আপনার ব্যক্তিগত তথ্যের (নাম, ফোন নম্বর, ইমেইল) পূর্ণ
              গোপনীয়তা বজায় রাখি। কোনো তৃতীয় পক্ষের কাছে আপনার তথ্য শেয়ার
              করা হয় না।
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
              <RefreshCw size={20} className="text-[#8B5CF6]" />
              ৪. পরিবর্তন ও পরিমার্জন:
            </h2>
            <p className="text-purple-100/70 text-base leading-relaxed pl-2">
              Craft Skills যেকোনো সময় এই শর্তাবলি পরিবর্তন বা আপডেট করার অধিকার
              রাখে। আপডেট হওয়া শর্তাবলি ওয়েবসাইটে প্রকাশের সাথে সাথেই কার্যকর
              বলে গণ্য হবে।
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
              <AlertTriangle size={20} className="text-[#8B5CF6]" />
              ৫. দায়বদ্ধতা:
            </h2>
            <p className="text-purple-100/70 text-base leading-relaxed pl-2">
              ওয়েবসাইটের তথ্য নিয়মিত আপডেট করা হলেও, কোনো প্রযুক্তিগত ত্রুটির
              কারণে তথ্যে ভুলভ্রান্তি থাকতে পারে। কোনো বড় ধরনের জটিলতার ক্ষেত্রে
              আমাদের অফিসিয়াল নাম্বারে সরাসরি যোগাযোগ করার অনুরোধ রইল।
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TermsAndConditions;
