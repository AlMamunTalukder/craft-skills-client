"use client";

import React from "react";
import Container from "@/src/components/shared/Container";
import { RefreshCw, AlertCircle, Sparkles } from "lucide-react";

const RefundPolicy = () => {
    const lastUpdated = "জুন ২০ ২৬";

    return (
        <section className="relative py-20 bg-[#070510] text-white overflow-hidden min-h-screen">
            {/* Premium Purple Ambient Light */}
            <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-purple-600/[0.08] blur-[130px] rounded-full pointer-events-none" />

            <Container className="relative z-10 max-w-4xl">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                        <RefreshCw className="text-[#8B5CF6]" size={16} />
                        <span className="text-[#A78BFA] text-xs font-black tracking-widest uppercase">
                            Refund Terms
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                        রিফান্ড পলিসি (Refund Policy)
                    </h1>
                    <p className="text-purple-300/60 text-sm">
                        সর্বশেষ আপডেট: {lastUpdated}
                    </p>
                </div>

                {/* Content Body */}
                <div className="space-y-8 bg-white/[0.02] border border-white/5 p-6 md:p-10 rounded-3xl backdrop-blur-md">

                    <div className="space-y-3">
                        <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
                            <AlertCircle size={20} className="text-[#8B5CF6]" />
                            ১. রিফান্ড প্রযোজ্যতার নিয়ম
                        </h2>
                        <p className="text-purple-100/70 text-base leading-relaxed">
                            যেহেতু আমাদের মাস্টারক্লাসটি লাইভ অনুষ্ঠিত হয় এবং এর ফি অত্যন্ত সাশ্রয়ী (মাত্র ১৯৯ টাকা), তাই সফলভাবে পেমেন্ট সম্পূর্ণ হওয়ার পর সাধারণ ক্ষেত্রে কোনো রিফান্ড বা পেমেন্ট ক্যান্সেলেশন দেওয়া সম্ভব নয়। এনরোল করার আগে কোর্স মডিউল এবং ডিটেইলস ভালোভাবে দেখে নেওয়ার অনুরোধ রইলো।
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
                            <Sparkles size={20} className="text-[#8B5CF6]" />
                            ২. ক্লাস মিসিং ও অল্টারনেটিভ ব্যাকআপ পলিসি
                        </h2>
                        <p className="text-purple-100/70 text-base leading-relaxed">
                            কোনো শিক্ষার্থী যদি জরুরি বা অনিবার্য ব্যক্তিগত সমস্যার কারণে নির্ধারিত লাইভ মাস্টারক্লাসটিতে উপস্থিত হতে না পারেন, তবে কোনো টাকা রিফান্ড করা হবে না। কিন্তু আমরা শিক্ষার্থীর শেখার আগ্রহকে সম্মান করি—তাই আপনি আমাদের পরবর্তী যেকোনো লাইভ সেমিনারে বা ব্যাচে সম্পূর্ণ বিনামূল্যে (Free of Cost) যুক্ত হওয়ার শতভাগ সুযোগ পাবেন।
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl md:text-2xl font-bold text-[#A78BFA] flex items-center gap-2">
                            <RefreshCw size={20} className="text-[#8B5CF6]" />
                            ৩. ডাবল পেমেন্ট ইস্যু সমাধান
                        </h2>
                        <p className="text-purple-100/70 text-base leading-relaxed">
                            টেকনিক্যাল ত্রুটির কারণে যদি আপনার অ্যাকাউন্ট থেকে ভুলবশত একাধিকবার টাকা কেটে নেওয়া হয়, তবে উপযুক্ত প্রমাণসহ (ট্রানজেকশন স্ক্রিনশট ও আইডি) আমাদের হোয়াটসঅ্যাপ সাপোর্টে যোগাযোগ করার ২৪ থেকে ৪৮ ঘণ্টার মধ্যে অতিরিক্ত কেটে নেওয়া সম্পূর্ণ অর্থ রিফান্ড বা ফেরত দেওয়া হবে।
                        </p>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default RefundPolicy;