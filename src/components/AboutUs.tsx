"use client";

import React from "react";
import Image from "next/image";
import Container from "@/src/components/shared/Container";
import { Users, Target, Rocket, Award, Linkedin, Mail } from "lucide-react";

const AboutUs = () => {
    return (
        <section className="relative py-20 bg-[#070510] text-white overflow-hidden">
            {/* Decorative Grid & Glow Ambiance */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/[0.08] blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-indigo-600/[0.06] blur-[130px] rounded-full pointer-events-none" />

            <Container className="relative z-10 space-y-24">

                {/* SECTION 1: HERO COMPANY CONTEXT */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                        <Users className="text-[#8B5CF6]" size={14} />
                        <span className="text-[#A78BFA] text-[10px] font-black tracking-[0.25em] uppercase">
                            আমাদের সম্পর্কে (About Us)
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
                        আমরা গড়ছি আগামী দিনের <br />
                        <span className="text-[#A78BFA]">প্রফেশনাল স্পিকার ও ভয়েস আর্টিস্ট</span>
                    </h1>
                    <p className="text-purple-100/60 text-base md:text-lg leading-relaxed">
                        Craft Skills একটি আধুনিক দক্ষতা-ভিত্তিক ট্রেনিং প্ল্যাটফর্ম, যেখানে আমরা অনলাইন ও অফলাইন—উভয় মাধ্যমেই ক্যারিয়ার গড়ার উপযোগী প্রশিক্ষণ প্রদান করি। দ্রুত পরিবর্তনশীল কর্মবাজারের চাহিদাকে মাথায় রেখে আমরা মূলত নিচের বিষয়গুলো নিয়ে কাজ করছি:
                    </p>
                </div>

                {/* SECTION 2: VALUES/GOALS GRID */}
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl space-y-3 text-center hover:border-purple-500/30 transition-colors">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-[#8B5CF6] border border-purple-500/20 mx-auto">
                            <Target size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white">ভাষা দক্ষতা</h3>
                        <p className="text-purple-100/50 text-xs">(Language)</p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl space-y-3 text-center hover:border-indigo-500/30 transition-colors">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-[#A78BFA] border border-indigo-500/20 mx-auto">
                            <Rocket size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white">তথ্যপ্রযুক্তি</h3>
                        <p className="text-purple-100/50 text-xs">(IT)</p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl space-y-3 text-center hover:border-purple-500/30 transition-colors">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-[#8B5CF6] border border-purple-500/20 mx-auto">
                            <Award size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white">সফট স্কিলস</h3>
                        <p className="text-purple-100/50 text-xs">(Soft Skills)</p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl space-y-3 text-center hover:border-indigo-500/30 transition-colors">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-[#A78BFA] border border-indigo-500/20 mx-auto">
                            <Users size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-white">মিডিয়া স্কিলস</h3>
                        <p className="text-purple-100/50 text-xs">(Media Skills)</p>
                    </div>
                </div>

                {/* FOOTER CALLOUT FOR HERO */}
                <div className="text-center max-w-xl mx-auto !mt-10">
                    <p className="text-base font-semibold text-[#A78BFA] bg-purple-500/5 border border-purple-500/10 py-3 px-6 rounded-2xl inline-block">
                        আপনার ক্যারিয়ারের নতুন পথচলা শুরু হোক Craft Skills-এর সাথে।
                    </p>
                </div>

                {/* SECTION 3: MANAGEMENT / FOUNDER LEADERSHIP */}
                <div className="max-w-5xl mx-auto space-y-12">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            আমাদের ম্যানেজমেন্ট ও নেতৃত্ব (Management & Leadership)
                        </h2>
                        <p className="text-purple-300/50 text-sm mt-2">
                            দক্ষ গাইডলাইন ও শিক্ষার্থীদের সামগ্রিক সাপোর্টের পেছনে যারা নিরলস কাজ করে যাচ্ছেন
                        </p>
                    </div>

                    {/* Core Founder Card */}
                    <div className="bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 rounded-3xl p-6 md:p-10 max-w-3xl mx-auto grid md:grid-cols-12 gap-8 items-center shadow-2xl">
                        <div className="md:col-span-5 flex justify-center">
                            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border border-purple-500/30 bg-[#161426]">
                                <Image
                                    src="/img/instructor/nesar.webp"
                                    alt="নেছার আহমাদ - প্রতিষ্ঠাতা"
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-w-768px) 100vw, 30vw"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="md:col-span-7 space-y-4 text-center md:text-left">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-[#A78BFA] bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full uppercase tracking-wider">
                                    Founder & CEO
                                </span>
                                <h3 className="text-2xl md:text-3xl font-black text-white pt-2">
                                    নেছার আহমাদ
                                </h3>
                                <p className="text-purple-300 font-medium text-sm">
                                    প্রফেশনাল ভয়েস আর্টিস্ট ও ম্যানেজিং ডিরেক্টর
                                </p>
                            </div>
                            <p className="text-purple-100/60 text-sm leading-relaxed">
                                ক্রাফট স্কিলস এর সামগ্রিক কারিকুলাম ডিজাইন, অ্যাকাডেমিক কোয়ালিটি কন্ট্রোল এবং স্ট্রাটেজিক ম্যানেজমেন্ট সরাসরি তার তত্ত্বাবধানে পরিচালিত হয়। তিনি দীর্ঘ সময় ধরে ভয়েস ওভার এবং পাবলিক স্পিকিং ইন্ডাস্ট্রিতে কাজ করছেন।
                            </p>

                            {/* Media links */}
                            <div className="flex items-center justify-center md:justify-start gap-4 text-purple-300/40 pt-2">
                                <a href="#" className="hover:text-[#A78BFA] transition-colors">
                                    <Linkedin size={18} />
                                </a>
                                <a href="mailto:info@craftskills.com" className="hover:text-[#A78BFA] transition-colors">
                                    <Mail size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </Container>
        </section>
    );
};

export default AboutUs;