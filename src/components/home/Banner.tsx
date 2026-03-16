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
        title: "ইন্টারভিউ, প্রেজেন্টেশন, ভয়েসওভার, মিডিয়ায়",
        mainTitle: "বিশেষ ছাড়ে ভর্তি চলছে...!!",
        highlight: "৫০ দিনের চ্যালেঞ্জ",
        subtitle: "ডিসকাউন্ট পেতে দ্রুত ভর্তি নিশ্চিত করুন",
        description: siteData?.admissionBannerInfo?.description,
      };
    } else {
      return {
        tag: "Skills Development",
        title: "ইন্টারভিউ, প্রেজেন্টেশন, ভয়েসওভার, মিডিয়ায়",
        mainTitle: "কথার জাদুতে মুগ্ধ করার",
        highlight: "৫০ দিনের চ্যালেঞ্জ",
        subtitle: "",
        description: siteData?.homeBannerInfo?.description,
      };
    }
  };

  const bannerContent = getBannerContent();

  // Floating Icons following the first code's style
  const floatingIcons = [
    {
      Icon: BookOpen,
      top: "15%",
      left: "5%",
      size: 60,
      color: "text-white/5",
      delay: 0,
    },
    {
      Icon: GraduationCap,
      top: "70%",
      right: "8%",
      size: 100,
      color: "text-[#F300E7]/10",
      delay: 1,
    },
    {
      Icon: Globe,
      top: "10%",
      right: "20%",
      size: 50,
      color: "text-white/5",
      delay: 2,
    },
    {
      Icon: Lightbulb,
      top: "45%",
      left: "10%",
      size: 80,
      color: "text-yellow-400/10",
      delay: 1.5,
    },
    {
      Icon: Award,
      top: "80%",
      left: "20%",
      size: 60,
      color: "text-purple-500/10",
      delay: 0.5,
    },
    {
      Icon: PenTool,
      top: "25%",
      right: "30%",
      size: 45,
      color: "text-white/5",
      delay: 2.5,
    },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0B001A]">
      {/* LAYER 1: Background & Deep Gradient Overlay (From Code 1) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bg}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        {/* Deep Purple/Navy Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f012f] via-[#1A0B2E]/95 to-[#4F0187]/70 z-10" />
      </div>

      {/* LAYER 2: Floating Animated Icons (From Code 1 logic) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 6 + idx,
              repeat: Infinity,
              // ease: "easeInOut",
              delay: item.delay,
            }}
            className={`absolute ${item.color}`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
            }}
          >
            <item.Icon size={item.size} strokeWidth={1} />
          </motion.div>
        ))}
        {/* Abstract Glow */}
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* LAYER 3: Main Content */}
      <Container className="relative z-20 w-full py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text Content Area */}
          <div className="w-full md:w-[65%] text-center md:text-left space-y-8">
            {/* Animated Badge (From Code 1) */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/30 bg-white/5 backdrop-blur-md mx-auto md:mx-0 shadow-[0_0_15px_rgba(243,0,231,0.3)]"
            >
              <GraduationCapIcon
                size={16}
                className="text-[#F300E7] animate-pulse"
              />
              <span className="text-xs md:text-sm font-bold tracking-wider text-white uppercase">
                {bannerContent.tag}
              </span>
            </motion.div>

            {/* Headlines */}
            <div className="space-y-4">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-md md:text-2xl font-medium text-purple-200"
              >
                {bannerContent.title}
              </motion.h3>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-2xl"
              >
                {bannerContent.mainTitle} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F300E7] via-purple-400 to-[#A855F7]">
                  {bannerContent.highlight}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-gray-300 text-md md:text-xl max-w-2xl"
              >
                {bannerContent.subtitle}
                {bannerContent.description}
              </motion.p>
            </div>

            {/* Action Buttons (Themed Button Style) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-row gap-3 md:gap-5 py-4 justify-center md:justify-start"
            >
              {/* Primary Button style from first code */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#F300E7] to-[#A855F7] rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                  <CtaLinkButton />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Image Section (Code 2 functionality with Code 1 animation) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="md:w-[35%] relative"
          >
            {/* Pulsing Glow behind image */}
            <div className="absolute inset-0 bg-[#F300E7]/20 blur-[100px] rounded-full animate-pulse" />

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Image
                src={leftimg}
                alt="Academic Representation"
                width={500}
                height={500}
                className="object-contain drop-shadow-[0_20px_60px_rgba(243,0,231,0.4)]"
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
