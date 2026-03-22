// "use client";
// import React, { useState } from "react";
// import {
//   CheckCircle2,
//   XCircle,
//   PlayCircle,
//   Users,
//   MessageSquare,
//   Video,
//   Star,
//   AlertCircle,
//   Lightbulb,
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { motion } from "framer-motion";
// import Container from "../shared/Container";

// const RoadmapDesign = () => {
//   const [activeTab, setActiveTab] = useState<"problem" | "solution">("problem");

//   // const problems = [
//   //   "উচ্চারণগত",
//   //   "আঞ্চলিকতা",
//   //   "মুখের জড়তা",
//   //   "কণ্ঠ শ্রুতিমধুর না থাকা",
//   //   "বডি ল্যাঙ্গুয়েজ",
//   //   "ক্যামেরা ভীতি",
//   //   "জনসম্মুখে কথা বলা",
//   // ];

//   const solutions = [
//     {
//       title: "মেইন ক্লাস",
//       desc: "কোর্সে উল্লেখিত সিলেবাসের প্রতিটি বিষয় নিয়ে বিস্তারিত আলোচনাসহ পাঠ দান করানো হয়।",
//       icon: <Star className="w-5 h-5" />,
//     },
//     {
//       title: "প্রবলেম সলভিং ক্লাস",
//       desc: "সমস্যা সমাধান ক্লাস। যেখানে শিক্ষার্থীর সমস্যা চিহ্নিত করে তা সমাধানের মাধ্যমে পড়া আদায় করা হয়।",
//       icon: <MessageSquare className="w-5 h-5" />,
//     },
//     {
//       title: "প্র্যাক্টিস ক্লাস",
//       desc: "যেখানে শিক্ষার্থীদের ক্লাসের পড়াগুলো চর্চার মাধ্যমে বাস্তব প্রয়োগ করানো হয়।",
//       icon: <Users className="w-5 h-5" />,
//     },
//     {
//       title: "স্পেশাল ক্লাস",
//       desc: "দুর্বলদের আলাদা করে শেখানো হয়। তিনটি ক্যাটাগরিতে ক্লাস করার পরেও সমস্যা থাকলে তাদের জন্য এই ব্যবস্থা।",
//       icon: <CheckCircle2 className="w-5 h-5" />,
//     },
//     {
//       title: "ভিডিও প্রেজেন্টেশন",
//       desc: "৩০০০ মিনিট ভিডিও প্রেজেন্টেশনের মাধ্যমে ক্লাসে শেখানো বিষয়গুলো সরাসরি প্রয়োগ করানো হয়।",
//       icon: <Video className="w-5 h-5" />,
//     },
//     {
//       title: "প্রেজেন্টেশন রিভিউ ক্লাস",
//       desc: "ভিডিও প্রেজেন্টেশনের ক্ষেত্রে কোথায় কী কী সমস্যা রয়েছে তা পর্যালোচনার মাধ্যমে সমাধান করা হয়।",
//       icon: <PlayCircle className="w-5 h-5" />,
//     },
//   ];

//   return (
//     <div className="py-8 md:py-12">
//       {/* --- MOBILE TAB SWITCHER --- */}
//       <div className="flex md:hidden bg-purple-100/50 p-1.5 rounded-2xl mb-6 border border-purple-200">
//         {/* <button
//             onClick={() => setActiveTab("problem")}
//             className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 ${
//               activeTab === "problem"
//               ? "bg-[#351081] text-white shadow-lg"
//               : "text-purple-700"
//             }`}
//           >
//             <AlertCircle size={18} /> সমস্যা
//           </button> */}
//         <button
//           onClick={() => setActiveTab("solution")}
//           className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 ${
//             activeTab === "solution"
//               ? "bg-[#F300E7] text-white shadow-lg"
//               : "text-purple-700"
//           }`}
//         >
//           <Lightbulb size={18} /> সমাধান
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* --- PROBLEM SECTION --- */}
//         {/* <div className={`${activeTab === "problem" ? "block" : "hidden"} md:block md:w-1/3`}>
//             <div className="bg-gradient-to-br from-[#351081] via-[#230b54] to-[#0B001A] p-3 md:p-8 rounded-3xl md:rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-white/10 sticky top-10">

//               <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#F300E7]/20 rounded-full blur-[60px]" />

//               <div className="relative z-10">
//                 <Badge variant="outline" className="mb-6 border-purple-400 text-purple-200 px-4 py-1 rounded-full text-lg font-bold">
//                   সমস্যা
//                 </Badge>
//                 <ul className="space-y-4">
//                   {problems.map((text, index) => (
//                     <motion.li
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       key={index}
//                       className="flex items-center gap-3 text-purple-100/90 border-b border-purple-800/50 pb-3"
//                     >
//                       <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
//                       <span className="leading-relaxed pt-1 text-base">{text}</span>
//                     </motion.li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div> */}

//         {/* --- SOLUTION SECTION --- */}
//         <div
//           className={`${
//             activeTab === "solution" ? "block" : "hidden"
//           } md:block md:w-2/3`}
//         >
//           <div className="hidden md:flex items-center gap-6 mb-10">
//             <h2 className="text-4xl font-black text-[#2e1065] tracking-tight">
//               সমাধান
//             </h2>
//             <div className="h-[3px] flex-1 bg-gradient-to-r from-[#F300E7] via-purple-300 to-transparent rounded-full opacity-50" />
//           </div>

//           <div className="relative space-y-4 md:space-y-6">
//             {/* Desktop Roadmap Line */}
//             <div className="absolute left-[27px] top-10 bottom-10 w-[3px] bg-gradient-to-b from-[#F300E7] via-purple-200 to-purple-100 hidden md:block opacity-40" />

//             {solutions.map((item, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ x: 10 }}
//                 className="relative group"
//               >
//                 <div className="relative z-10 flex items-start gap-4 md:gap-5 p-4 md:p-5 rounded-2xl bg-white border border-purple-50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:border-purple-100 transition-all duration-500">
//                   {/* Step Indicator */}
//                   <div className="shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-50 to-white text-purple-700 flex items-center justify-center font-black text-lg md:text-2xl border-2 border-purple-100/50 group-hover:from-[#F300E7] group-hover:to-[#A855F7] group-hover:text-white transition-all duration-500 shadow-sm">
//                     <span className="pt-1">{index + 1}</span>
//                   </div>

//                   <div className="flex flex-col md:flex-row md:items-center flex-1 gap-1 md:gap-8">
//                     <div className="md:w-48 shrink-0">
//                       <h4 className="text-[#2e1065] font-extrabold text-lg md:text-xl leading-tight group-hover:text-[#F300E7] transition-colors duration-300">
//                         {item.title}
//                       </h4>
//                     </div>

//                     <div className="hidden md:block h-10 w-[2px] bg-purple-100/50" />

//                     <p className="text-slate-600 text-sm md:text-base leading-relaxed flex-1 font-medium">
//                       {item.desc}
//                     </p>

//                     <div className="hidden lg:flex text-purple-300 group-hover:text-[#F300E7] group-hover:scale-125 transition-all duration-500">
//                       {item.icon}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoadmapDesign;
"use client";
import React from "react";
import {
  CheckCircle2,
  PlayCircle,
  Users,
  MessageSquare,
  Video,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

const RoadmapDesign = () => {
  const solutions = [
    {
      title: "মেইন ক্লাস",
      desc: "কোর্সে উল্লেখিত সিলেবাসের প্রতিটি বিষয় নিয়ে বিস্তারিত আলোচনাসহ পাঠ দান করানো হয়।",
      icon: <Star className="w-5 h-5" />,
    },
    {
      title: "প্রবলেম সলভিং ক্লাস",
      desc: "সমস্যা সমাধান ক্লাস। যেখানে শিক্ষার্থীর সমস্যা চিহ্নিত করে তা সমাধানের মাধ্যমে পড়া আদায় করা হয়।",
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      title: "প্র্যাক্টিস ক্লাস",
      desc: "যেখানে শিক্ষার্থীদের ক্লাসের পড়াগুলো চর্চার মাধ্যমে বাস্তব প্রয়োগ করানো হয়।",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "স্পেশাল ক্লাস",
      desc: "দুর্বলদের আলাদা করে শেখানো হয়। তিনটি ক্যাটাগরিতে ক্লাস করার পরেও সমস্যা থাকলে তাদের জন্য এই ব্যবস্থা।",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
    {
      title: "ভিডিও প্রেজেন্টেশন",
      desc: "৩০০০ মিনিট ভিডিও প্রেজেন্টেশনের মাধ্যমে ক্লাসে শেখানো বিষয়গুলো সরাসরি প্রয়োগ করানো হয়।",
      icon: <Video className="w-5 h-5" />,
    },
    {
      title: "প্রেজেন্টেশন রিভিউ ক্লাস",
      desc: "ভিডিও প্রেজেন্টেশনের ক্ষেত্রে কোথায় কী কী সমস্যা রয়েছে তা পর্যালোচনার মাধ্যমে সমাধান করা হয়।",
      icon: <PlayCircle className="w-5 h-5" />,
    },
  ];

  return (
    <div className="py-10 md:py-16">
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Center Line */}
        <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#F300E7] via-purple-200 to-purple-100 opacity-40" />

        <div className="space-y-8 md:space-y-14">
          {solutions.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Mobile Layout */}
                <div className="flex md:hidden items-start gap-4">
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#F300E7] to-[#A855F7] text-white">
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <div className="p-4 rounded-xl bg-white shadow-sm border border-purple-50">
                      <h4 className="text-base font-bold text-[#2e1065] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between">
                  {/* Left side */}
                  <div className={`w-1/2 ${isLeft ? "pr-10" : "opacity-0"}`}>
                    {isLeft && (
                      <div className="p-5 rounded-2xl bg-white shadow-md border border-purple-50 text-right">
                        <h4 className="text-xl font-extrabold text-[#2e1065] mb-2">
                          {item.title}
                        </h4>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    )}
                  </div>

                  {/* Center Icon */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#F300E7] to-[#A855F7] text-white shadow-lg">
                    {item.icon}
                  </div>

                  {/* Right side */}
                  <div className={`w-1/2 ${!isLeft ? "pl-10" : "opacity-0"}`}>
                    {!isLeft && (
                      <div className="p-5 rounded-2xl bg-white shadow-md border border-purple-50 text-left">
                        <h4 className="text-xl font-extrabold text-[#2e1065] mb-2">
                          {item.title}
                        </h4>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoadmapDesign;
