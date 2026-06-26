"use client";

import React, { useMemo } from "react";
import { Accordion } from "@/components/ui/accordion";
import { AlertCircle, Mic2, AudioLines, Trophy, Sparkles } from "lucide-react";
import Container from "@/src/components/shared/Container";
import { CustomAccordionItem } from "@/src/components/shared/CustomAccordion";

const ExclusiveWhyCourse = () => {
  const problems = useMemo(
    () => [
      {
        title: "কথা বলার জড়তা ও আঞ্চলিকতা?",
        desc: "মাথায় অনেক কিছু থাকলেও গুছিয়ে বলতে পারেন না? আঞ্চলিক টানের কারণে মানুষ হাসাহাসি করবে—এই ভয়ে কি নিজেকে গুটিয়ে রাখছেন?",
      },
      {
        title: "উচ্চারণ ও কণ্ঠস্বরের দুর্বলতা?",
        desc: "শুদ্ধ উচ্চারণে কথা বলতে গিয়ে কি আটকে যান? কণ্ঠে গভীরতা (Base) না থাকায় কথায় কি কোনো আকর্ষণ থাকে না? শুধু \"গলা ভালো না\" —এই ভয়ে কি মিডিয়া বা কনটেন্ট ক্রিয়েশনের স্বপ্ন বারবার পিছিয়ে দিচ্ছেন?",
      },
      {
        title: "স্টেজে গেলেই কি বুক ধড়ফড় করে?",
        desc: "মঞ্চে বা অনেক মানুষের সামনে কথা বলতে গেলেই কি হাত-পা কাঁপে আর গলা শুকিয়ে আসে? আত্মবিশ্বাসের অভাবে কি আপনার মেধা চাপা পড়ে থাকছে?",
      },
      {
        title: "আপনার বডি ল্যাঙ্গুয়েজ কি রোবটের মতো?",
        desc: "কথা বলার সময় হাত কীভাবে রাখবেন বা শ্রোতার চোখের দিকে কীভাবে তাকাবেন তা কি বুঝতে পারেন না? বডি ল্যাঙ্গুয়েজের জড়তার কারণে কি আপনাকে ব্যক্তিত্বহীন মনে হয়?",
      },
      {
        title: "ক্যামেরার সামনে এলেই কি সব ভুলে যান?",
        desc: "ভিডিও বানাতে চাইলে লেন্সের দিকে তাকালেই কি সব কথা গুলিয়ে যায়? নিজের রেকর্ড করা ভয়েস শুনে কি লজ্জা পান এবং তা আপলোড করার সাহস পান না?",
      },
      {
        title: "স্মার্টলি কথা বলতে না পারায় কি ক্যারিয়ার পিছিয়ে যাচ্ছে?",
        desc: "সব যোগ্যতা থাকা সত্ত্বেও শুধু সুন্দরভাবে প্রেজেন্ট করতে না পারায় কি স্বপ্নের চাকরি বা প্রোমোশন হাতছাড়া হয়ে যাচ্ছে? ভাইভা বোর্ডে কি নিজেকে প্রমাণ করতে পারছেন না?",
      },

      {
        title: "ভয়েস ওভার কি প্রাণহীন ও একঘেয়ে শোনায়?",
        desc: "নিউজ বা স্টোরি টেলিংয়ের সময় গলার সঠিক ওঠানামা (Modulation) ধরে রাখতে পারেন না? ইমোশন অনুযায়ী কণ্ঠ পরিবর্তন করতে কষ্ট হয়, নাকি কোথায় থামতে আর কোথায় জোর দিতে হবে (Pause & Punch) তা না জানায় আপনার কথা বিরক্তকর শোনাচ্ছে?",
      },
      {
        title: "সঠিক গাইডলাইন না পেয়ে ক্যারিয়ারে আটকে আছেন ?",
        desc: "ভয়েস আর্টিস্ট হওয়ার স্বপ্ন আছে, কিন্তু কোথা থেকে শুরু করবেন বুঝতে পারছেন না? ইউটিউব টিউটোরিয়াল দেখে দেখে ক্লান্ত? সঠিক কোনো গাইডেড স্ট্রাকচার না থাকায় ভয়েস আর্টিস্ট বা ডাবিংয়ের স্বপ্নগুলো কি শুধু স্বপ্নই থেকে যাচ্ছে?",
      },

      {
        title: "আয়ের পথ কি খুঁজে পাচ্ছেন না?",
        desc: "ভয়েস ওভার বা ডাবিংয়ের কাজ শিখলেও তা দিয়ে কীভাবে ইনকাম করবেন তা বুঝতে পারছেন না? দক্ষতা থাকলেও প্রফেশনাল পোর্টফোলিও কীভাবে বানাতে হয় বা মার্কেটপ্লেস থেকে কীভাবে ক্লায়েন্ট পেতে হয়, তা কি জানেন না? সঠিক গাইডলাইনের অভাবে কি আপনার স্বপ্ন অপূর্ণ থেকে যাচ্ছে?",
      },
    ],
    [],
  );


  const middleIndex = Math.ceil(problems.length / 2);
  const columns = [problems.slice(0, middleIndex), problems.slice(middleIndex)];

  return (
    <section className="py-12 lg:py-24 relative overflow-hidden ">

      {/* 🌌 OUTSIDE SECTION AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-purple-600/[0.02] blur-[180px] rounded-full pointer-events-none" />

      <Container className="relative z-10 ">

        {/* MAIN GLASSMORPHIC OUTER WRAPPER CARD */}
        <div className="relative bg-black border border-white/[0.06] rounded-2xl lg:rounded-[3.5rem] p-4 sm:p-6 md:p-12 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden">

          {/* INTERNAL VECTOR RADIAL BLOBS */}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#F26422]/10 opacity-70 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-100px] -left-40 w-[500px] h-[500px] bg-[#F26422]/5 opacity-40 blur-[130px] rounded-full pointer-events-none" />

          {/* High-End Technical Dot Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* WATERMARK BRANDING BACKINGS */}
          <Mic2 className="absolute -top-12 -right-12 w-72 h-72 text-white/[0.02] -rotate-12 pointer-events-none hidden md:block" />
          <AudioLines className="absolute bottom-16 -left-12 w-60 h-60 text-white/[0.02] rotate-45 pointer-events-none hidden md:block" />

          <div className="relative z-10 flex flex-col items-center">

            {/* BADGE COMPONENT */}


            {/* SECTION HEADING TITLE */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight text-center max-w-3xl mb-5 md:mb-16">
              আপনিও কি এই{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-[#ff8855] to-[#F26422]">
                সমস্যাগুলোতে ভুগছেন?
              </span>
            </h2>

            {/* ACCORDION BALANCED DOUBLE COLUMNS MATRIX */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 w-full text-left">
              {columns.map((column, colIdx) => (
                <Accordion
                  key={colIdx}
                  type="single"
                  collapsible
                  className="w-full space-y-4"
                >
                  {column.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl md:rounded-2xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-md transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.02]"
                    >
                      <CustomAccordionItem
                        value={`why-${colIdx}-${index}`}
                        title={item.title}
                        description={item.desc}
                        icon={
                          <AlertCircle size={18} className="text-[#F26422] shrink-0" />
                        }
                      />
                    </div>
                  ))}
                </Accordion>
              ))}
            </div>

            {/* EXCLUSIVE CALL-TO-ACTION INFOBAR RING */}
            <div className="mt-14 w-full p-[1px] rounded-2xl md:rounded-[2rem] bg-gradient-to-r from-[#F26422]/30 via-white/[0.05] to-[#F26422]/30 shadow-2xl">
              <div className="bg-[#0D0D11]/90 backdrop-blur-2xl px-3 py-4 md:px-12 md:py-6 rounded-[calc(1rem-1px)] md:rounded-[2rem] flex flex-col md:flex-row items-center gap-5 md:gap-8 border border-white/[0.05] relative overflow-hidden">

                {/* TROPHY BRAND EMBLEM INSIDE CARD */}
                <div className="shrink-0">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#F26422] to-[#ff7d44] flex items-center justify-center shadow-[0_8px_25px_rgba(242,100,34,0.3)]">
                    <Trophy className="text-white w-6 h-6 md:w-7 md:h-7" />
                  </div>
                </div>

                {/* CALL TO ACTION TEXT LAYOUT */}
                <div className="text-center md:text-left flex-1 text-white">
                  <h3 className="text-xl md:text-2xl font-black mb-1.5 text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] to-white tracking-tight">
                    একদিনের পাওয়ারফুল মাস্টারক্লাস
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm md:text-base font-semibold leading-relaxed">
                    এই সকল সমস্যা দূর করার প্র্যাকটিক্যাল সিক্রেট টেকনিক শিখুন। কোনো পূর্ব অভিজ্ঞতা ছাড়াই!
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExclusiveWhyCourse;