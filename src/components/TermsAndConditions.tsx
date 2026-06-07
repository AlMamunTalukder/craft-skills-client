"use client";

import React from "react";
import Container from "@/src/components/shared/Container";
import { Scale, FileText, ShieldAlert, HelpCircle } from "lucide-react";

const TermsAndConditions = () => {
    const lastUpdated = "জুন ২০২৬";

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
                            Legal Agreement
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                        শর্তাবলী ও নীতিমালা (Terms & Conditions)
                    </h1>
                    <p className="text-purple-300/60 text-sm">
                        সর্বশেষ আপডেট: {lastUpdated}
                    </p>
                </div>

                {/* Content Body */}
                <div className="space-y-8 bg-white/[0.02] border border-white/5 p-6 md:p-10 rounded-3xl backdrop-blur-md">

                    <div className="space-y-3">
                        <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
                            <FileText size={20} className="text-[#8B5CF6]" />
                            ১. সাধারণ নিয়মাবলী
                        </h2>
                        <p className="text-purple-100/70 text-base leading-relaxed">
                            ক্রাফট স্কিলস (Craft Skills) প্ল্যাটফর্মে আপনাকে স্বাগতম। আমাদের লাইভ মাস্টারক্লাস, ডিজিটাল রিসোর্স বা যেকোনো সেবা ব্যবহারের পূর্বে অনুগ্রহ করে শর্তাবলী সাবধানে পড়ুন। আমাদের ওয়েবসাইট ব্রাউজ করা বা কোর্সে এনরোল করার অর্থ হলো আপনি এই শর্তাবলী সম্পূর্ণ মেনে নিয়েছেন।
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
                            <ShieldAlert size={20} className="text-[#8B5CF6]" />
                            ২. অ্যাকাউন্ট এবং মেম্বারশিপ
                        </h2>
                        <p className="text-purple-100/70 text-base leading-relaxed">
                            কোর্সে যুক্ত হওয়ার সময় শিক্ষার্থীদের সঠিক তথ্য (নাম, ইমেইল, মোবাইল নম্বর) প্রদান করতে হবে। ভর্তির পর প্রাপ্ত সিক্রেট হোয়াটসঅ্যাপ গ্রুপ লিংক, গুগল মিট লিংক বা অন্য কোনো মেটেরিয়াল গ্রুপ বা প্ল্যাটফর্মের বাইরে কারো সাথে শেয়ার করা সম্পূর্ণ নিষিদ্ধ। কপিরাইট আইন ভঙ্গের যেকোনো প্রমাণ পাওয়া গেলে তাৎক্ষণিকভাবে মেম্বারশিপ বাতিল করা হবে।
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
                            <HelpCircle size={20} className="text-[#8B5CF6]" />
                            ৩. লাইভ ক্লাস ও রিসোর্স ব্যবহার
                        </h2>
                        <p className="text-purple-100/70 text-base leading-relaxed">
                            আমাদের ১৯৯ টাকার মাস্টারক্লাসটি সম্পূর্ণ লাইভ নেওয়া হবে। নীতিগত কারণে এই লাইভ ক্লাসের কোনো রেকর্ড ফাইল সরবরাহ করা হবে না। তবে লাইভ ক্লাসে অংশ নেওয়া শিক্ষার্থীরা বোনাস হিসেবে প্রোভাইড করা সমস্ত পিডিএফ (PDF) ও গাইডলাইন ফোল্ডার লাইফটাইম ব্যক্তিগত প্র্যাকটিসের জন্য ব্যবহার করতে পারবেন, কিন্তু বাণিজ্যিক উদ্দেশ্যে ব্যবহার করতে পারবেন না।
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
                            <Scale size={20} className="text-[#8B5CF6]" />
                            ৪. নীতিমালার পরিবর্তন
                        </h2>
                        <p className="text-purple-100/70 text-base leading-relaxed">
                            ক্রাফট স্কিলস যেকোনো সময় এই শর্তাবলী পরিবর্তন, পরিবর্ধন বা সংশোধন করার অধিকার সংরক্ষণ করে। যেকোনো বড় পরিবর্তনের ক্ষেত্রে শিক্ষার্থীদের ইমেইল বা অফিশিয়াল গ্রুপের মাধ্যমে জানিয়ে দেওয়া হবে।
                        </p>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default TermsAndConditions;