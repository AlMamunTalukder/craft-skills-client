import React from 'react';
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

const ComparisonTable = () => {
  const data = [
    { feature: "মেইন ক্লাস", our: true, others: true },
    { feature: "প্রব্লেম সলভিং ক্লাস", our: true, others: false },
    { feature: "প্র্যাক্টিস ক্লাস", our: true, others: false },
    { feature: "স্পেশাল ক্লাস", our: true, others: false },
    { feature: "প্রেজেন্টেশন রিভিউ ক্লাস", our: true, others: false },
    { feature: "৩০০০ মিনিট ভিডিও প্রেজেন্টেশন", our: true, others: false },
    { feature: "২৪ ঘন্টা গ্রুপ সাপোর্ট", our: true, others: false },
    { feature: "সার্টিফিকেট প্রদান", our: true, others: true },
    { feature: "আমাদের সাথে কাজ করার সুযোগ", our: true, others: false },
    { feature: "ইনকামের ক্ষেত্রে সহযোগিতা", our: true, others: false },
    { feature: "কোর্স শেষে লাইফটাইম সাপোর্ট", our: true, others: false },
  ];

  return (
    <div className="bg-[#fcfaff] py-16 my-5">
      <Container>
        <div className="text-center mb-12">
          <SectionTitle
            text="আমাদের সাথে অন্যান্য কোর্সের পার্থক্য"
            lineWidth="lg"
            hasLineBreak={true}
          />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-12 items-stretch text-center">
            <div className="col-span-6 md:col-span-5 bg-white p-5 md:p-8 rounded-tl-3xl border-b border-r border-slate-100 flex items-center justify-start">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-xs md:text-sm">কোর্সের সুবিধাসমূহ</span>
            </div>
            
            {/* Focal Point: Our Course Header */}
            <div className="col-span-3 md:col-span-2.5 bg-[#4F0187] text-white p-5 md:p-8 rounded-t-3xl shadow-[0_-10px_25px_-5px_rgba(79,1,135,0.2)]">
              <span className="font-bold text-sm md:text-lg block pt-1">আমাদের কোর্স</span>
            </div>

            <div className="col-span-3 md:col-span-4 bg-white p-5 md:p-8 rounded-tr-3xl border-b border-slate-100 flex items-center justify-center">
              <span className="text-slate-400 font-bold text-sm md:text-lg pt-1">অন্যান্য</span>
            </div>
          </div>

          {/* Table Body */}
          <div className="bg-white shadow-xl shadow-purple-100/20 rounded-b-3xl overflow-hidden border border-slate-100">
            {data.map((row, i) => (
              <div key={i} className="grid grid-cols-12 items-center group">
                
                {/* Feature Name */}
                <div className="col-span-6 md:col-span-5 p-4 md:p-6 border-b border-slate-50 flex items-center">
                  <span className="text-slate-700 font-semibold text-sm md:text-lg leading-tight pt-1 group-hover:text-[#4F0187] transition-colors">
                    {row.feature}
                  </span>
                </div>

                {/* Our Column (Highlighted) */}
                <div className="col-span-3 md:col-span-2.5 bg-purple-50/30 border-x border-purple-100/50 p-4 md:p-6 flex justify-center items-center border-b border-purple-50">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-100">
                    <FaCheck className="text-xs md:text-sm" />
                  </div>
                </div>

                {/* Others Column */}
                <div className="col-span-3 md:col-span-2.5 p-4 md:p-6 flex justify-center items-center border-b border-slate-50">
                  {row.others ? (
                    <div className="w-8 h-8 rounded-full border border-slate-200 text-slate-400 flex items-center justify-center">
                      <FaCheck className="text-[10px]" />
                    </div>
                  ) : (
                    <div className="text-rose-300">
                      <RxCross2 className="text-xl md:text-2xl" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Branding Badge */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white px-6 py-3 rounded-full border border-purple-100 shadow-sm flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[#4F0187] font-bold text-sm md:text-base pt-1">আপনার সফলতার জন্য আমরাই সেরা মাধ্যম</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ComparisonTable;