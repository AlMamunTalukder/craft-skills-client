"use client";
import React, { useMemo } from "react";
import { Accordion } from "@/components/ui/accordion";
import { AlertCircle, Mic2, AudioLines, Trophy } from "lucide-react";
import Container from "@/src/components/shared/Container";
import SectionTitle from "@/src/components/shared/SectionTitle";
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
        title: "স্ক্রিপ্ট লিখতে গেলেই কি কলম আটকে যায়?",
        desc: "মাথায় চমৎকার সব পরিকল্পনা থাকলেও কাগজে-কলমে সেগুলো সাজাতে গিয়ে কি সব গুলিয়ে ফেলছেন? নিউজ, বিজ্ঞাপন, ইউটিউব কন্টেন্ট নাকি ডাবিং কোনটির জন্য স্ক্রিপ্ট কেমন হবে তা কি বুঝতে পারছেন না?",
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
    <section className="py-10 lg:py-32 relative overflow-hidden ">
      <Container className="relative z-10">
        

        <div className="relative bg-[#353535] border border-white/10 rounded-2xl lg:rounded-[4rem] p-3 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden mt-5 md:mt-12">
          {/* BACKGROUND LAYERS */}
          <div className="absolute inset-0 bg-[#353535]" />

          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#F26422] opacity-25 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 -left-40 w-[450px] h-[450px] bg-white/10 opacity-20 blur-[120px] rounded-full" />

          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />

          <Mic2 className="absolute -top-10 -right-10 w-64 h-64 text-white/5 -rotate-12 pointer-events-none hidden md:block" />
          <AudioLines className="absolute bottom-10 -left-10 w-48 h-48 text-white/10 rotate-45 pointer-events-none hidden md:block" />

          <div className="relative z-10 text-center">
            {/* TITLE */}
            <h2 className="text-3xl md:text-[51px] font-black text-white leading-tight my-10 md:pb-3 max-w-3xl mx-auto">
              আপনিও কি এই <br className="lg:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-white to-[#F26422]">
                সমস্যাগুলোতে ভুগছেন?
              </span>
            </h2>

            {/* ACCORDION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2">
              {columns.map((column, colIdx) => (
                <Accordion
                  key={colIdx}
                  type="single"
                  collapsible
                  className="w-full space-y-3"
                >
                  {column.map((item, index) => (
                    <CustomAccordionItem
                      key={index}
                      value={`why-${colIdx}-${index}`}
                      title={item.title}
                      description={item.desc}
                      icon={
                        <AlertCircle size={20} className="text-[#F26422]" />
                      }
                    />
                  ))}
                </Accordion>
              ))}
            </div>

            {/* CTA CARD */}
            <div className="mt-12 p-0.5 rounded-2xl md:rounded-4xl bg-gradient-to-r from-[#F26422]/30 via-white/10 to-[#F26422]/30 shadow-2xl">
              <div className="bg-[#353535]/80 backdrop-blur-xl px-2 py-3 md:px-12 md:py-5 rounded-[calc(1rem-1px)] md:rounded-4xl flex flex-col md:flex-row items-center gap-4 md:gap-8 border border-white/10 relative overflow-hidden">
                {/* ICON BOX */}
                <div className="shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr from-[#F26422] to-white/20 flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <Trophy className="text-white w-8 h-8 md:w-10 md:h-10" />
                  </div>
                </div>

                {/* TEXT */}
                <div className="text-center md:text-left flex-1 text-white">
                  <h3 className="text-2xl md:text-4xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] via-white to-[#F26422]">
                    মাত্র ৪ ঘণ্টার মাস্টার ক্লাসেই
                  </h3>

                  <p className="text-white/70 text-sm md:text-xl font-medium">
                    এই সকল সমস্যা দূর করার প্র্যাকটিক্যাল সিক্রেট টেকনিক শিখুন।
                    কোনো পূর্ব অভিজ্ঞতা ছাড়াই!
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
