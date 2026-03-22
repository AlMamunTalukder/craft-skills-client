"use client";
import Container from "../shared/Container";
import Image from "next/image";
import RoadmapDesign from "./RoadmapDesign";
import { motion } from "framer-motion";

const CourseStory = () => {
  return (
    <div className="relative mt-10 md:mt-16 overflow-hidden">
      {/* Background Glow */}

      <Container>
        {/* Top Divider */}
        <div className="border-dashed border-b border-purple-200 mb-8 md:mb-12" />

        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-[180px] md:w-[260px] mx-auto mb-6 md:mb-8"
          >
            <Image
              src="/img/cup.webp"
              height={300}
              width={400}
              alt="cup"
              className="w-full h-auto"
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[26px] md:text-[48px] font-extrabold leading-tight"
          >
            <span className="text-[#D223F6]">আমাদের ৬স্টেপ লার্নিং মডেল</span>
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[22px] md:text-[42px] font-bold text-[#4F0187] leading-tight mt-2"
          >
            ৫০ দিনের প্র্যাকটিক্যাল চ্যালেঞ্জের মাধ্যমে
          </motion.h3>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[22px] md:text-[42px] font-bold leading-tight mt-2"
          >
            <span className="bg-gradient-to-r from-[#F300E7] to-[#7e22ce] bg-clip-text text-transparent">
              প্রফেশনাল হওয়ার সবচেয়ে কার্যকর রোডম্যাপ!
            </span>
          </motion.h3>

          {/* Small subtitle */}
          {/* <p className="text-sm md:text-base text-gray-500 mt-4 max-w-xl mx-auto">
            ধাপে ধাপে গাইডলাইন, প্র্যাকটিস এবং ফিডব্যাকের মাধ্যমে সম্পূর্ণ স্কিল
            ডেভেলপমেন্ট
          </p> */}
        </div>

        {/* Roadmap */}
        <div className="mt-10 md:mt-16">
          <RoadmapDesign />
        </div>
      </Container>
    </div>
  );
};

export default CourseStory;
