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
                            Our Vision & Mission
                        </span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
                        আমরা গড়ছি আগামী দিনের <br />
                        <span className="text-[#A78BFA]">প্রফেশনাল স্পিকার ও ভয়েস আর্টিস্ট</span>
                    </h1>
                    <p className="text-purple-100/60 text-base md:text-lg leading-relaxed">
                        ক্রাফট স্কিলস (Craft Skills) একটি আধুনিক এবং প্র্যাকটিক্যাল স্কিল ডেভেলপমেন্ট ইনস্টিটিউট। আমাদের লক্ষ্য প্রথাগত তত্ত্বীয় শিক্ষার বাইরে গিয়ে প্রত্যেক শিক্ষার্থীকে রিয়েল-লাইফ প্র্যাকটিস ও সঠিক ফিডব্যাকের মাধ্যমে দক্ষ করে তোলা।
                    </p>
                </div>

                {/* SECTION 2: VALUES/GOALS GRID */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl space-y-4">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-[#8B5CF6] border border-purple-500/20">
                            <Target size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white">আমাদের লক্ষ্য (Our Mission)</h3>
                        <p className="text-purple-100/60 text-sm leading-relaxed">
                            বাঙালি তরুণদের মধ্যে কথা বলার জড়তা দূর করা, স্পষ্ট উচ্চারণ উপহার দেওয়া এবং তাদের নিজস্ব কণ্ঠকে একটি মূল্যবান অর্থনৈতিক সম্পদে বা ক্যারিয়ারে রূপান্তর করতে সাহায্য করা।
                        </p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl space-y-4">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-[#A78BFA] border border-indigo-500/20">
                            <Rocket size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white">আমাদের ভিশন (Our Vision)</h3>
                        <p className="text-purple-100/60 text-sm leading-relaxed">
                            একটি এমন কোয়ালিটি এবং সাশ্রয়ী এডুকেশন ইকোসিস্টেম তৈরি করা যেখানে যেকোনো স্তরের মানুষ প্রফেশনাল মেন্টরদের সরাসরি তত্ত্বাবধানে নিজের স্কিল আপগ্রেড করতে পারে।
                        </p>
                    </div>
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
                                ক্রাফট স্কিলস এর সামগ্রিক কারিকুলাম ডিজাইন, অ্যাকাডেমিক কোয়ালিটি কন্ট্রোল এবং স্ট্রাটেজিক ম্যানেজমেন্ট সরাসরি তার তত্ত্বাবধানে পরিচালিত হয়। তিনি দীর্ঘ সময় ধরে ভয়েস ওভার এবং পাবলিক স্পিকিং ইন্ডাস্ট্রিতে কাজ করছেন।
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