"use client";

import React from "react";
import { Accordion } from "@/components/ui/accordion";
import Container from "@/src/components/shared/Container";
import { CustomAccordionItem } from "@/src/components/shared/CustomAccordion";
import { GraduationCap, HelpCircle, Sparkles } from "lucide-react";



const admissionFaq = [
  // --- প্রথম অংশ (আপনাদের দেওয়া হুবহু স্ট্রাকচার ও কনটেন্ট) ---
  {
    question: "ক্লাসটি কীভাবে এবং কোথায় হবে?",
    answer:
      "এটি একটি সম্পূর্ণ লাইভ মাস্টারক্লাস, যা Google Meet অ্যাপের মাধ্যমে সরাসরি নেওয়া হবে। ভর্তির পর আমাদের সিক্রেট হোয়াটসঅ্যাপ গ্রুপে লাইভ ক্লাসের লিংক দিয়ে দেওয়া হবে, যেখানে ক্লিক করে আপনি সরাসরি ক্লাসে যুক্ত হতে পারবেন।",
  },
  {
    question: "আমি কি লাইভ ক্লাসের রেকর্ড ভিডিও পাব?",
    answer:
      "না, এই লাইভ ক্লাসের কোনো রেকর্ড ভিডিও দেওয়া হবে না। তবে লাইভ ক্লাসে অংশ নিলে আপনার জন্য থাকছে দারুণ সব স্পেশাল গিফট! আর কোনো কারণে যদি এই ক্লাসটি মিস হয়ে যায়, তবে আপনি আমাদের পরবর্তী লাইভ সেমিনারে সম্পূর্ণ ফ্রিতে যুক্ত হওয়ার সুযোগ পাবেন।",
  },
  {
    question: "মাত্র 199 টাকায় কি সত্যিই লাইভ ক্লাস এবং সব বোনাস পাব?",
    answer:
      "হ্যাঁ! সীমিত সময়ের জন্য এই বিশেষ অফারে মাত্র 199 টাকায় আপনি ৪ ঘণ্টার লাইভ মাস্টারক্লাসে অংশ নেওয়ার সুযোগ পাচ্ছেন। সেই সাথে সবগুলো এক্সক্লুসিভ বোনাস রিসোর্স (PDF, ভিডিও টিউটোরিয়াল, ট্র্যাকার) একদম ফ্রি পাবেন।",
  },
  {
    question: "লাইভ ক্লাসের সময় ট্রেইনারকে সরাসরি প্রশ্ন করা যাবে?",
    answer:
      "অবশ্যই! এটি একটি সম্পূর্ণ ইন্টারেক্টিভ লাইভ সেশন। ক্লাস চলাকালীন আপনার উচ্চারণ বা কথা বলার যেকোনো সমস্যা নিয়ে ট্রেইনারকে সরাসরি প্রশ্ন করে তাৎক্ষণিক সমাধান ও গাইডলাইন পেয়ে যাবেন।",
  },
  {
    question: "পেমেন্ট করার পর লাইভ ক্লাসের লিংক ও বোনাস কীভাবে পাব?",
    answer:
      "পেমেন্ট কমপ্লিট করার সাথে সাথেই আপনাকে আমাদের একটি সিক্রেট হোয়াটসঅ্যাপ গ্রুপে (WhatsApp Secret Group) যুক্ত করে নেওয়া হবে। এই গ্রুপেই লাইভ ক্লাসের গুগল মিট লিংক, ক্লাসের শিডিউল এবং সমস্ত ফ্রি বোনাস রিসোর্স শেয়ার করা হবে।",
  },
  // --- দ্বিতীয় অংশ (বাকি FAQ কনটেন্টসমূহ) ---
  {
    question: "এই মাস্টারক্লাসটি কাদের জন্য?",
    answer: "যারা কথা বলার জড়তা কাটাতে চান, পাবলিক স্পিকিংয়ে আত্মবিশ্বাসী হতে চান এবং নিজের কণ্ঠকে প্রফেশনাল লেভেলে নিয়ে যেতে চান, তাদের জন্য এই কোর্সটি বিশেষভাবে ডিজাইন করা হয়েছে।"
  },
  {
    question: "কোর্সের মেয়াদ কতদিন?",
    answer: "এটি একটি নিবিড় ৪ ঘণ্টার লাইভ ইন্টারেক্টিভ মাস্টারক্লাস। তবে ক্লাস শেষ হলেও বোনাস রিসোর্স এবং প্রাইভেট গ্রুপ সাপোর্ট লাইফটাইম এক্সেস পাবেন।"
  },
  {
    question: "পেমেন্ট করার পর আমি কীভাবে কোর্সটি শুরু করব?",
    answer: "পেমেন্ট সফলভাবে সম্পন্ন হওয়ার সাথে সাথেই স্ক্রিনে আপনি আমাদের সিক্রেট হোয়াটসঅ্যাপ গ্রুপের লিংক পেয়ে যাবেন। সেই গ্রুপে যুক্ত হলেই আপনি পরবর্তী সমস্ত নির্দেশনা ও ক্লাসের লিংক পেয়ে যাবেন।"
  },
  {
    question: "কোর্স ফি কি কিস্তিতে দেওয়া যাবে?",
    answer: "আমাদের কোর্স ফি খুবই সাশ্রয়ী (১৯৯ টাকা), তাই এটি এককালীন পেমেন্টেই সম্পন্ন করতে হয়।"
  },
  {
    question: "পেমেন্ট করার পর যদি কোনো সমস্যা হয়, কার সাথে যোগাযোগ করব?",
    answer: "পেমেন্ট বা টেকনিক্যাল যেকোনো সমস্যার জন্য আমাদের সাপোর্ট টিমের হোয়াটসঅ্যাপ নম্বরে (+৮৮০ ১XXX-XXXXXX) যোগাযোগ করুন।"
  },
  {
    question: "কোর্স শেষে কি কোনো সার্টিফিকেট দেওয়া হবে?",
    answer: "হ্যাঁ, কোর্সটি সফলভাবে সম্পন্ন করার পর আপনি আমাদের পক্ষ থেকে একটি ডিজিটাল সার্টিফিকেট পাবেন।"
  },
  {
    question: "কোর্স করার পর কি কোনো প্রাইভেট সাপোর্ট গ্রুপ আছে?",
    answer: "হ্যাঁ, আমাদের একটি এক্সক্লুসিভ স্টুডেন্ট গ্রুপ আছে যেখানে আপনি আপনার প্র্যাকটিস ভিডিও শেয়ার করে ফিডব্যাক পেতে পারবেন।"
  },
  {
    question: "আমি কি ট্রেইনারের সাথে সরাসরি কথা বলতে পারব?",
    answer: "আমাদের সাপোর্ট টিম এবং প্র্যাকটিস সেশনের মাধ্যমে আপনি মেন্টরশিপ ও ফিডব্যাকের সুযোগ পাবেন।"
  },
  {
    question: "আমি কি মোবাইল দিয়ে কোর্সটি করতে পারব?",
    answer: "অবশ্যই! আমাদের ওয়েবসাইটটি মোবাইল ফ্রেন্ডলি, তাই আপনি যেকোনো স্মার্টফোন বা ল্যাপটপ থেকে কোর্সটি করতে পারবেন।"
  },
  {
    question: "আমি যদি কোর্স করার পরেও ভালো ফলাফল না পাই?",
    answer: "আমরা শুধুমাত্র কোর্স করাই না, আমরা আপনার প্র্যাকটিসের ওপর ফিডব্যাক দিই। আপনি যদি নিয়মিত আমাদের গাইডলাইন অনুসরণ করেন এবং অ্যাসাইনমেন্টগুলো সম্পন্ন করেন, তবে আপনার জড়তা কাটতে বাধ্য। আপনি একা নন, আমাদের পুরো টিমের সাপোর্ট সবসময় আপনার সাথে থাকবে।"
  },
  {
    question: "এত কম দামে এত কিছু কীভাবে সম্ভব? কোনো লুকানো খরচ আছে কি?",
    answer: "আমাদের উদ্দেশ্য আপনার ক্যারিয়ারে ভ্যালু অ্যাড করা, লাভ করা নয়। এই ১৯৯ টাকা আমাদের একটি ফিল্টার হিসেবে কাজ করে—যাতে শুধু সিরিয়াস শিক্ষার্থীরাই জয়েন করে। এর বাইরে কোনো হিডেন চার্জ নেই।"
  },
  {
    question: "এই কোর্সটি করার পর আমি কীভাবে ইনকাম করতে পারব?",
    answer: "কোর্সটি করার পর আপনি পাবলিক স্পিকিং, প্রেজেন্টেশন এবং ভয়েস ওভারের মতো জায়গাগুলোতে প্রফেশনাল কাজ পাওয়ার যোগ্যতা অর্জন করবেন। আমাদের স্কিল-বেসড কারিকুলাম আপনাকে সেই কনফিডেন্স দেবে যাতে আপনি মার্কেটপ্লেসে কাজ খুঁজতে পারেন।"
  }
];

const ExclusiveFAQ = () => {
  // SPLIT ACCORDION DATA INTO TWO BALANCED VERTICAL COLUMNS
  const midPoint = Math.ceil(admissionFaq.length / 2);
  const leftColumnFaq = admissionFaq.slice(0, midPoint);
  const rightColumnFaq = admissionFaq.slice(midPoint);

  return (
    <section className="relative overflow-hidden py-10 md:py-32 bg-black">
      
      {/* =========================
          🌌 DEEP ULTRA DARK AMBIENT GLOW SYSTEM
         ========================= */}
      {/* Center Top Radial Spotlight */}
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[850px] h-[850px] bg-[#F26422]/10 blur-[150px] rounded-full pointer-events-none" />
      {/* Bottom Right Complementary Glow */}
      <div className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-[#F26422]/5 blur-[130px] rounded-full pointer-events-none" />

      {/* Modern High-End Digital Matrix Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-0">

          {/* HEADER LAYER */}
          <div className="text-center mb-5 md:mb-24">
            

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              সচরাচর জিজ্ঞাসিত{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-[#ff8855] to-[#F26422]">
                প্রশ্নাবলী (FAQ)
              </span>
            </h2>

          </div>

          {/* TWO COLUMN LOGICAL ACCORDION MAPPING GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 items-start">
            
            {/* LEFT ACCORDION CONTEXT STREAM */}
            <Accordion type="single" collapsible className="w-full space-y-4">
              {leftColumnFaq.map((item, index) => (
                <div 
                  key={`left-${index}`} 
                  className="rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-md transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.02]"
                >
                  <CustomAccordionItem
                    value={`left-item-${index}`}
                    title={item.question}
                    description={item.answer}
                    icon={
                      <HelpCircle size={18} className="text-[#F26422] shrink-0" />
                    }
                  />
                </div>
              ))}
            </Accordion>

            {/* RIGHT ACCORDION CONTEXT STREAM */}
            <Accordion type="single" collapsible className="w-full space-y-4">
              {rightColumnFaq.map((item, index) => (
                <div 
                  key={`right-${index}`}
                  className="rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-md transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.02]"
                >
                  <CustomAccordionItem
                    value={`right-item-${index}`}
                    title={item.question}
                    description={item.answer}
                    icon={
                      <HelpCircle size={18} className="text-[#F26422] shrink-0" />
                    }
                  />
                </div>
              ))}
            </Accordion>

          </div>

        </div>
      </Container>
    </section>
  );
};

export default ExclusiveFAQ;