// import Container from "../shared/Container";
// import React from "react";
// import {
//   FaVideo,
//   FaUsers,
//   FaCertificate,
//   FaBriefcase,
//   FaHandsHelping,
// } from "react-icons/fa";
// import { MdSupportAgent } from "react-icons/md";
// import SectionTitle from "../shared/SectionTitle";
// import { GrCertificate } from "react-icons/gr";

// const features = [
//   {
//     icon: FaVideo,
//     title: "৩০০০ মিনিট ভিডিও প্রেজেন্টেশন",
//     bgColor: "bg-[#fff6f9]",
//     hoverBg: "hover:bg-[#FFD1DE]",
//     iconColor: "text-[#D61C4E]",
//     hoverIconColor: "group-hover:text-[#a31238]",
//   },
//   {
//     icon: FaUsers,
//     title: "২৪ ঘণ্টা গ্রুপ সাপোর্ট",
//     bgColor: "bg-[#f3f9ff]",
//     hoverBg: "hover:bg-[#cfe5ff]",
//     iconColor: "text-[#1C4DD6]",
//     hoverIconColor: "group-hover:text-[#1037a4]",
//   },
//   {
//     icon: GrCertificate ,
//     title: "সার্টিফিকেট প্রদান",
//     bgColor: "bg-[#faf7ed]",
//     hoverBg: "hover:bg-[#fcedaa]",
//     iconColor: "text-[#D69F1C]",
//     hoverIconColor: "group-hover:text-[#a4770d]",
//   },
//   {
//     icon: FaBriefcase,
//     title: "আমাদের সাথে কাজ করার সুযোগ",
//     bgColor: "bg-[#f7fffb]",
//     hoverBg: "hover:bg-[#c3fce3]",
//     iconColor: "text-[#1CD675]",
//     hoverIconColor: "group-hover:text-[#10a154]",
//   },
//   {
//     icon: MdSupportAgent,
//     title: "কোর্স শেষে সাপোর্ট",
//     bgColor: "bg-[#fbf8ff]",
//     hoverBg: "hover:bg-[#e0c8fc]",
//     iconColor: "text-[#7D1CD6]",
//     hoverIconColor: "group-hover:text-[#5f0ea2]",
//   },
//   {
//     icon: FaHandsHelping,
//     title: "কাজ পাওয়ার ক্ষেত্রে সহযোগিতা",
//     bgColor: "bg-[#f6ffff]",
//     hoverBg: "hover:bg-[#d0fafa]",
//     iconColor: "text-[#1CBAD6]",
//     hoverIconColor: "group-hover:text-[#0e93a7]",
//   },
// ];

// const CourseFeatures = () => {
//   return (
//     <Container>
//       <div className="mt-8 md:mt-20 ">
//         <SectionTitle text="কোর্সের বৈশিষ্ট্য" />
//         <div className="md:w-[770px] mx-auto gap-5 grid grid-cols-2 md:grid-cols-3">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;
//             return (
//               <div
//                 key={index}
//                 className={`h-[180px] group transition-all duration-300 rounded-md px-5 py-8 flex flex-col items-center text-center ${feature.bgColor} ${feature.hoverBg}`}
//               >
//                 <Icon
//                   className={`w-10 h-10 mb-4 transition-colors duration-300 ${feature.iconColor} ${feature.hoverIconColor}`}
//                 />
//                 <p className="text-gray-600 font-[600] text-[16px] md:text-[18px]">{feature.title}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default CourseFeatures;


'use client'
import Container from "../shared/Container";
import React from "react";
import { motion } from "framer-motion";
import {
  FaVideo,
  FaUsers,
  FaBriefcase,
  FaHandsHelping,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { GrCertificate } from "react-icons/gr";
import SectionTitle from "../shared/SectionTitle";

const features = [
  {
    icon: FaVideo,
    title: "৩০০০ মিনিট ভিডিও প্রেজেন্টেশন",
    color: "#D61C4E",
    bg: "bg-rose-50",
  },
  {
    icon: FaUsers,
    title: "২৪ ঘণ্টা গ্রুপ সাপোর্ট",
    color: "#4F0187",
    bg: "bg-purple-50",
  },
  {
    icon: GrCertificate,
    title: "সার্টিফিকেট প্রদান",
    color: "#D69F1C",
    bg: "bg-amber-50",
  },
  {
    icon: FaBriefcase,
    title: "আমাদের সাথে কাজ করার সুযোগ",
    color: "#16a34a",
    bg: "bg-emerald-50",
  },
  {
    icon: MdSupportAgent,
    title: "কোর্স শেষে সাপোর্ট",
    color: "#7D1CD6",
    bg: "bg-violet-50",
  },
  {
    icon: FaHandsHelping,
    title: "কাজ পাওয়ার ক্ষেত্রে সহযোগিতা",
    color: "#0891b2",
    bg: "bg-cyan-50",
  },
];

const CourseFeatures = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <Container>
        <div className="text-center mb-20">
          <SectionTitle text="কোর্সের বৈশিষ্ট্য" />
          <p className="text-slate-500 mt-4 font-medium">কেন আমাদের কোর্সটি অন্যদের থেকে আলাদা?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative group pt-10"
              >
                {/* Unique Card Shape */}
                <div className="h-full bg-white border border-purple-200 rounded-tr-[60px] rounded-bl-[60px] rounded-tl-2xl rounded-br-2xl p-8 pt-12 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_50px_-10px_rgba(79,1,135,0.15)] transition-all duration-500 group-hover:border-purple-200">
                  
                  {/* Floating Icon Hexagon/Circle */}
                  <div 
                    className={`absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl rotate-12 group-hover:rotate-0 transition-all duration-500 flex items-center justify-center shadow-lg shadow-purple-100 z-10`}
                    style={{ backgroundColor: feature.color }}
                  >
                    <Icon className="w-10 h-10 text-white -rotate-12 group-hover:rotate-0 transition-all duration-500" />
                  </div>

                  {/* Content Area */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-slate-800 font-bold text-lg md:text-xl text-center leading-relaxed pt-4">
                      {feature.title}
                    </h3>
                    
                    {/* Unique Bottom Element */}
                    <div className="mt-6 flex gap-1">
                      <div className="w-8 h-1 rounded-full bg-slate-100 group-hover:bg-purple-600 transition-all" />
                      <div className="w-2 h-1 rounded-full bg-slate-100 group-hover:bg-purple-400 transition-all" />
                      <div className="w-1 h-1 rounded-full bg-slate-100 group-hover:bg-purple-200 transition-all" />
                    </div>
                  </div>

                  {/* Decorative Background Texture (Soft inside the card) */}
                  <div className="absolute bottom-4 right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <Icon className="w-24 h-24" style={{ color: feature.color }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CourseFeatures;