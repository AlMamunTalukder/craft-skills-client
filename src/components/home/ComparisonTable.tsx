"use client";
import { useMemo } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

const ComparisonTable = () => {
  const features = useMemo(
    () => [
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
    ],
    [],
  );

  const othersFeatures = useMemo(
    () => [
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
    ],
    [],
  );

  return (
    <section className="py-12 md:py-40 bg-[#1A0033] overflow-hidden relative">

      {/* --- PREMIUM GRADIENT LAYERS (Untouched Design) --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4F0187_0%,#1A0033_100%)]"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px]"></div>
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
        }}
      ></div>


      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300/20 rounded-full blur-[100px] -z-10" />

      <Container>

        <div className="text-center mb-10 md:mb-20">
            <h2 className="text-[28px] md:text-6xl font-black text-white tracking-tight drop-shadow-md">
               অন্যান্য কোর্সের সাথে<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                আমাদের পার্থক্য
              </span>
            </h2>
          </div>


        {/* <div className="text-center mb-8 md:mb-12">
          <SectionTitle
            text={
              <>
                অন্যান্য কোর্সের সাথে <br />
                আমাদের পার্থক্য
              </>
            }
            className="text-white"
          />
        </div> */}

        {/* Unified Table for All Devices */}
        <div className="px-2 md:px-0">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border-2 border-purple-400 overflow-hidden text-start md:text-center">
            {/* Header */}
            <div className="flex items-center bg-purple-50/50 p-3 border-b border-purple-300">
              <div className="flex-[2] text-[#2D0B5A] font-black text-md uppercase tracking-wider">
                বৈশিষ্ঠ্য
              </div>
              <div className="flex-1 text-center text-purple-600 font-bold text-xs md:text-sm uppercase">
                আমাদের কোর্স
              </div>
              <div className="flex-1 text-center text-slate-400 font-bold text-xs md:text-sm uppercase">
                অন্যান্য কোর্স
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y-2 divide-white">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center p-3 md:p-4 hover:bg-purple-50/30 transition-colors"
                >
                  {/* Feature Name */}
                  <div className="flex-[2] text-[#2D0B5A] font-bold text-sm md:text-base leading-tight">
                    {feature}
                  </div>

                  {/* Our Course */}
                  <div className="flex-1 flex justify-center">
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-500 flex items-center justify-center shadow-sm">
                      <FaCheck className="text-white text-xs md:text-sm" />
                    </div>
                  </div>

                  {/* Others */}
                  <div className="flex-1 flex justify-center">
                    {othersFeatures[idx] ? (
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-slate-100 flex items-center justify-center">
                        <FaCheck className="text-slate-400 text-xs md:text-sm" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-rose-50 flex items-center justify-center">
                        <FaTimes className="text-rose-400 text-xs md:text-sm" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ComparisonTable;
