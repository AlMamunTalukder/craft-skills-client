"use client";
import React, { useMemo } from "react";
import { Accordion } from "@/components/ui/accordion";
import { AlertCircle, Mic2, AudioLines, Trophy } from "lucide-react";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import { CustomAccordionItem } from "../shared/CustomAccordion"; // Import the shared component

const WhyCourse = () => {
  const problems = useMemo(
    () => [
      {
        title: "কথা বলার জড়তা ও আঞ্চলিকতা?",
        desc: "মাথায় অনেক কিছু থাকলেও গুছিয়ে বলতে পারেন না? আঞ্চলিক টানের কারণে মানুষ হাসাহাসি করবে—এই ভয়ে কি নিজেকে গুটিয়ে রাখছেন?",
      },
      {
        title: "উচ্চারণ ও কণ্ঠস্বরের দুর্বলতা?",
        desc: "শুদ্ধ উচ্চারণে কথা বলতে গিয়ে কি আটকে যান? কণ্ঠে গভীরতা (Base) না থাকায় কথায় কি কোনো আকর্ষণ থাকে না?",
      },
      {
        title: "স্টেজে গেলেই কি বুক ধড়ফড় করে?",
        desc: "মঞ্চে বা অনেক মানুষের সামনে কথা বলতে গেলেই কি হাত-পা কাঁপে আর গলা শুকিয়ে আসে? আত্মবিশ্বাসের অভাবে কি আপনার মেধা চাপা পড়ে থাকছে?",
      },
      {
        title: "আপনার বডি ল্যাঙ্গুয়েজ কি রোবটের মতো?",
        desc: "কথা বলার সময় হাত কীভাবে রাখবেন বা শ্রোতার চোখের দিকে কীভাবে তাকাবেন তা কি বুঝতে পারেন না?",
      },
      {
        title: "ক্যামেরার সামনে এলেই কি সব ভুলে যান?",
        desc: "ভিডিও বানাতে চাইলে লেন্সের দিকে তাকালেই কি সব কথা গুলিয়ে যায়? নিজের রেকর্ড করা ভয়েস শুনে কি লজ্জা পান?",
      },
      {
        title: "স্মার্টলি কথা বলতে না পারায় কি ক্যারিয়ার পিছিয়ে যাচ্ছে?",
        desc: "সব যোগ্যতা থাকা সত্ত্বেও শুধু সুন্দরভাবে প্রেজেন্ট করতে না পারায় কি স্বপ্নের চাকরি বা প্রোমোশন হাতছাড়া হয়ে যাচ্ছে?",
      },
      {
        title: "স্ক্রিপ্ট লিখতে গেলেই কি কলম আটকে যায়?",
        desc: "মাথায় চমৎকার সব পরিকল্পনা থাকলেও কাগজে-কলমে সেগুলো সাজাতে গিয়ে কি সব গুলিয়ে ফেলছেন?",
      },
      {
        title: "ভয়েস ওভার কি প্রাণহীন ও একঘেয়ে শোনায়?",
        desc: "নিউজ বা স্টোরি টেলিংয়ের সময় গলার সঠিক ওঠানামা (Modulation) ধরে রাখতে পারেন না?",
      },
      {
        title: "দামী স্টুডিও নেই বলে কি রেকর্ডিং শুরু করতে পারছেন না?",
        desc: "কোন গ্যাজেটটি বাজেটের মধ্যে সেরা আউটপুট দেবে বা কীভাবে সাধারণ ঘরেই স্টুডিওর মতো সাউন্ড পাওয়া যায়—সেই কৌশল জানেন না?",
      },
      {
        title: "সঠিক গাইডলাইন না পেয়ে ক্যারিয়ারে আটকে আছেন ?",
        desc: "ভয়েস আর্টিস্ট হওয়ার স্বপ্ন আছে, কিন্তু কোথা থেকে শুরু করবেন বুঝতে পারছেন না? ইউটিউব টিউটোরিয়াল দেখে দেখে ক্লান্ত?",
      },
      {
        title: "ভুল ধরিয়ে দেওয়ার মতো কেউ নেই বলে কি হতাশ হচ্ছেন?",
        desc: "সঠিক প্র্যাকটিসের পরিবেশ এবং প্রেজেন্টেশন রিভিউ করার মতো এক্সপার্ট না থাকায় কি আপনার উন্নতি থমকে আছে?",
      },
      {
        title: "আয়ের পথ কি খুঁজে পাচ্ছেন না?",
        desc: "দক্ষতা থাকলেও প্রফেশনাল পোর্টফোলিও কীভাবে বানাতে হয় বা মার্কেটপ্লেস থেকে কীভাবে ক্লায়েন্ট পেতে হয়, তা কি জানেন না?",
      },
    ],
    []
  );

  const middleIndex = Math.ceil(problems.length / 2);
  const columns = [problems.slice(0, middleIndex), problems.slice(middleIndex)];

  return (
    <section className="py-10 lg:py-32 relative overflow-hidden ">
      <Container className="relative z-10">
        <div className="text-center mb-10 md:mb-24">
          <SectionTitle
            text="শিক্ষার্থীদের কাজের পোর্টফোলিও"
            lineWidth="lg"
            hasLineBreak={true}
          />
          <div className="mt-5 md:mt-12 w-full rounded-xl md:rounded-[2.5rem] overflow-hidden shadow-2xl bg-black/40 backdrop-blur-xl ring-1 ring-purple-500/20">
            <iframe
              className="w-full aspect-video"
              src="https://www.youtube-nocookie.com/embed/9hZ7-LXGhZo?rel=0"
              title="Student Success"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        <div className="relative bg-[#130129] border border-white/10 rounded-2xl lg:rounded-[4rem] p-4 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Background Decorations */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
          <Mic2 className="absolute -top-10 -right-10 w-64 h-64 text-white/[0.05] -rotate-12 pointer-events-none hidden md:block" />
          <AudioLines className="absolute bottom-10 -left-10 w-48 h-48 text-white/[0.05] rotate-45 pointer-events-none hidden md:block" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-[51px] font-black text-white leading-tight mb-10 max-w-3xl">
              আপনিও কি এই সমস্যাগুলোতে{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F300E7] to-purple-400">
                ভুগছেন?
              </span>
            </h2>

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
                        <AlertCircle size={20} className="text-purple-400" />
                      }
                    />
                  ))}
                </Accordion>
              ))}
            </div>

            {/* CTA Card */}
            <div className="mt-12 p-[1px] rounded-2xl md:rounded-[2.5rem] bg-gradient-to-r from-purple-600/20 via-[#F300E7] to-cyan-500/20 shadow-2xl transition-all duration-700 hover:scale-[1.01]">
              <div className="bg-[#0F0121] px-6 py-8 md:px-12 md:py-10 rounded-[calc(1rem-1px)] md:rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 md:gap-12 border border-white/5 relative overflow-hidden">
                <div className="shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr from-[#F300E7] to-purple-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
                    <Trophy className="text-white w-8 h-8 md:w-10 md:h-10" />
                  </div>
                </div>
                <div className="text-center md:text-left flex-1 text-white">
                  <h3 className="text-2xl md:text-4xl font-black block mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#F300E7] via-white to-purple-400">
                    মাত্র ৫০ দিনে এই সকল সমস্যা দূর করুন
                  </h3>
                  <p className="text-slate-300 text-sm md:text-xl font-medium">
                    প্র্যাকটিক্যাল চ্যালেঞ্জে হয়ে উঠুন প্রফেশনাল পাবলিক স্পিকার
                    ও ভয়েস আর্টিস্ট।
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

export default WhyCourse;
