import Container from "../shared/Container";
import React from "react";
import {
  FaVideo,
  FaUsers,
  FaCertificate,
  FaBriefcase,
  FaHandsHelping,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import SectionTitle from "../shared/SectionTitle";
import { GrCertificate } from "react-icons/gr";

const features = [
  {
    icon: FaVideo,
    title: "৩০০০ মিনিট ভিডিও প্রেজেন্টেশন",
    bgColor: "bg-[#fff6f9]",
    hoverBg: "hover:bg-[#FFD1DE]",
    iconColor: "text-[#D61C4E]",
    hoverIconColor: "group-hover:text-[#a31238]",
  },
  {
    icon: FaUsers,
    title: "২৪ ঘণ্টা গ্রুপ সাপোর্ট",
    bgColor: "bg-[#f3f9ff]",
    hoverBg: "hover:bg-[#cfe5ff]",
    iconColor: "text-[#1C4DD6]",
    hoverIconColor: "group-hover:text-[#1037a4]",
  },
  {
    icon: GrCertificate ,
    title: "সার্টিফিকেট প্রদান",
    bgColor: "bg-[#faf7ed]",
    hoverBg: "hover:bg-[#fcedaa]",
    iconColor: "text-[#D69F1C]",
    hoverIconColor: "group-hover:text-[#a4770d]",
  },
  {
    icon: FaBriefcase,
    title: "আমাদের সাথে কাজ করার সুযোগ",
    bgColor: "bg-[#f7fffb]",
    hoverBg: "hover:bg-[#c3fce3]",
    iconColor: "text-[#1CD675]",
    hoverIconColor: "group-hover:text-[#10a154]",
  },
  {
    icon: MdSupportAgent,
    title: "কোর্স শেষে সাপোর্ট",
    bgColor: "bg-[#fbf8ff]",
    hoverBg: "hover:bg-[#e0c8fc]",
    iconColor: "text-[#7D1CD6]",
    hoverIconColor: "group-hover:text-[#5f0ea2]",
  },
  {
    icon: FaHandsHelping,
    title: "কাজ পাওয়ার ক্ষেত্রে সহযোগিতা",
    bgColor: "bg-[#f6ffff]",
    hoverBg: "hover:bg-[#d0fafa]",
    iconColor: "text-[#1CBAD6]",
    hoverIconColor: "group-hover:text-[#0e93a7]",
  },
];

const CourseFeatures = () => {
  return (
    <Container>
      <div className="mt-8 md:mt-20 ">
        <SectionTitle text="কোর্সের বৈশিষ্ট্য" />
        <div className="md:w-[770px] mx-auto gap-5 grid grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`h-[180px] group transition-all duration-300 rounded-md px-5 py-8 flex flex-col items-center text-center ${feature.bgColor} ${feature.hoverBg}`}
              >
                <Icon
                  className={`w-10 h-10 mb-4 transition-colors duration-300 ${feature.iconColor} ${feature.hoverIconColor}`}
                />
                <p className="text-gray-600 font-[600] text-[16px] md:text-[18px]">{feature.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default CourseFeatures;
