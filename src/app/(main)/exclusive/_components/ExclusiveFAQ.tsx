"use client";

import React from "react";
import { Accordion } from "@/components/ui/accordion";
import Container from "@/src/components/shared/Container";
import { CustomAccordionItem } from "@/src/components/shared/CustomAccordion";
import { GraduationCap, HelpCircle, Sparkles } from "lucide-react";

const admissionFaq = [
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