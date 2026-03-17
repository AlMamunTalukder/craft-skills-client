"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Globe,
  Lightbulb,
  Award,
  PenTool,
  GraduationCapIcon,
} from "lucide-react";

import Container from "../shared/Container";
import CtaLinkButton from "../CtaLinkButton";
import leftimg from "../../../public/img/course-logo.webp";
import bg from "../../../public/img/bg.webp";
import { SiteContent } from "@/types";

type Props = {
  siteData: SiteContent | null;
};

const Banner = ({ siteData }: Props) => {
  const pathname = usePathname();

  const getBannerContent = () => {
    if (pathname === "/admission") {
      return {
        tag: "Skills Development",
        topTitle: "৫০ দিনে চ্যালেঞ্জে",
        mainTitle: "কথার ভয় জয় করুন",
        skills: "ইন্টারভিউ, * প্রেজেন্টেশন, * ভয়েসওভার, *মিডিয়া",
        highlight: "সবখানে হয়ে উঠুন কথার জাদুকর",
        subtitle: "ডিসকাউন্ট পেতে দ্রুত ভর্তি নিশ্চিত করুন",
        description: siteData?.admissionBannerInfo?.description,
      };
    } else {
      return {
        tag: "Skills Development",
        topTitle: "৫০ দিনে চ্যালেঞ্জে",
        mainTitle: "কথার ভয় জয় করুন",
        skills: "ইন্টারভিউ, * প্রেজেন্টেশন, * ভয়েসওভার, *মিডিয়া",
        highlight: "সবখানে হয়ে উঠুন কথার জাদুকর",
        subtitle: "",
        description: siteData?.homeBannerInfo?.description,
      };
    }
  };

  const bannerContent = getBannerContent();

  const floatingIcons = [
    { Icon: BookOpen, top: "15%", left: "5%", size: 60, color: "text-white/5", delay: 0 },
    { Icon: GraduationCap, top: "70%", right: "8%", size: 100, color: "text-[#F300E7]/10", delay: 1 },
    { Icon: Globe, top: "10%", right: "20%", size: 50, color: "text-white/5", delay: 2 },
    { Icon: Lightbulb, top: "45%", left: "10%", size: 80, color: "text-yellow-400/10", delay: 1.5 },
    { Icon: Award, top: "80%", left: "20%", size: 60, color: "text-purple-500/10", delay: 0.5 },
    { Icon: PenTool, top: "25%", right: "30%", size: 45, color: "text-white/5", delay: 2.5 },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0B001A]">
      <div className="absolute inset-0 z-0">
        <Image src={bg} alt="Background" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f012f] via-[#1A0B2E]/95 to-[#4F0187]/70 z-10" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 6 + idx, repeat: Infinity, delay: item.delay }}
            className={`absolute ${item.color}`}
            style={{ top: item.top, left: item.left, right: item.right }}
          >
            <item.Icon size={item.size} strokeWidth={1} />
          </motion.div>
        ))}
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      </div>

      <Container className="relative z-20 w-full py-6 md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-[65%] text-center md:text-left space-y-6">
  {/* Top Badge: 50 Days Challenge */}
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-3 md:gap-4 justify-center md:justify-start"
  >
    <div className="relative">
      <div className="absolute -inset-1 bg-[#F300E7] blur-sm opacity-50 rounded-full animate-pulse"></div>
      {/* Trophy Icon matches the visual in your image */}
      <div className="relative bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
        <Award size={24} className="text-white" />
      </div>
    </div>
    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
      {bannerContent.topTitle}
    </h3>
  </motion.div>

  <div className="space-y-4">
    {/* Main Title: কথার ভয় জয় করুন */}
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-5xl md:text-7xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-b from-[#F300E7] to-[#8B5CF6] drop-shadow-[0_5px_15px_rgba(243,0,231,0.4)]"
    >
      {bannerContent.mainTitle}
    </motion.h1>

    {/* Skills List with Bullets */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-lg md:text-2xl font-bold text-purple-200"
    >
      {bannerContent.skills.split(",").map((skill, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-[#F300E7] text-2xl">•</span>
          <span>{skill.replace("*", "").trim()}</span>
        </div>
      ))}
    </motion.div>

    {/* Highlight: সবখানে হয়ে উঠুন কথার জাদুকর */}
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-2xl md:text-4xl font-extrabold text-white"
    >
      {bannerContent.highlight}
    </motion.h2>

    {/* Seminar Time / Subtitle */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="text-gray-400 text-sm md:text-xl font-medium"
    >
       ফ্রি সেমিনারের সময়ঃ ০১ জানুয়ারি - শুক্রবার - রাত ৯টা
    </motion.p>
  </div>

  {/* CTA Button */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.7 }}
    className="flex flex-row justify-center md:justify-start pt-4"
  >
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#F300E7] to-[#A855F7] rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative">
        <CtaLinkButton />
      </div>
    </div>
  </motion.div>
</div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-full md:w-[40%] lg:w-[35%] relative flex justify-center"
          >
            <div className="absolute inset-0 bg-[#F300E7]/20 blur-[80px] md:blur-[100px] rounded-full animate-pulse" />
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-[80%] sm:w-[70%] md:w-full aspect-square"
            >
              <Image
                src={leftimg}
                alt="Academic Representation"
                fill
                className="object-contain drop-shadow-[0_20px_60px_rgba(243,0,231,0.4)]"
                sizes="(max-width: 768px) 80vw, 35vw"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;