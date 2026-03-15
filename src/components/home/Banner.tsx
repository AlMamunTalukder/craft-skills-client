"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Globe, 
  Lightbulb, 
  Award, 
  PenTool,
  Video,
  MessageSquare,
  CheckCircle2,
  GraduationCapIcon
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
    { Icon: BookOpen, top: "15%", left: "5%", size: 60, color: "text-white/5", delay: 0 },
    { Icon: GraduationCap, top: "70%", right: "8%", size: 100, color: "text-[#F300E7]/10", delay: 1 },
    { Icon: Globe, top: "10%", right: "20%", size: 50, color: "text-white/5", delay: 2 },
    { Icon: Lightbulb, top: "45%", left: "10%", size: 80, color: "text-yellow-400/10", delay: 1.5 },
    { Icon: Award, top: "80%", left: "20%", size: 60, color: "text-purple-500/10", delay: 0.5 },
    { Icon: PenTool, top: "25%", right: "30%", size: 45, color: "text-white/5", delay: 2.5 },
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
              rotate: [0, 10, -10, 0] 
            }}
            transition={{
              duration: 6 + idx,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay
            }}
            className={`absolute ${item.color}`}
            style={{ 
              top: item.top, 
              left: item.left, 
              right: item.right 
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
              <GraduationCapIcon size={16} className="text-[#F300E7] animate-pulse" />
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
                className="text-xl md:text-2xl font-medium text-purple-200"
              >
                {bannerContent.title}
              </motion.h3>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-7xl font-extrabold leading-tight text-white drop-shadow-2xl"
              >
                {bannerContent.mainTitle} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F300E7] via-purple-400 to-[#A855F7]">
                  {bannerContent.highlight}
                </span>
              </motion.h1>

              {/* <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl md:text-3xl font-bold text-white/90 pt-2"
              >
                বাংলাদেশে আমরাই <span className="relative inline-block text-[#F300E7]">
                  প্রথম...!!
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#F300E7] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>
              </motion.h2> */}
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-gray-300 text-lg md:text-xl max-w-2xl"
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


// "use client";
// import Image from "next/image";
// import Container from "../shared/Container";
// import { usePathname } from "next/navigation";
// import CtaLinkButton from "../CtaLinkButton";
// import leftimg from "../../../public/img/course-logo.webp";
// import bg from "../../../public/img/bg.webp";
// import { SiteContent } from "@/types";
// import { motion } from "framer-motion";
// import { 
//   Calendar, 
//   CheckCircle2, 
//   GraduationCap, 
//   BookOpen, 
//   Video, 
//   PenTool, 
//   Award, 
//   MessageSquare
// } from "lucide-react";

// type Props = {
//   siteData: SiteContent | null;
// };

// const Banner = ({ siteData }: Props) => {
//   const pathname = usePathname();

//   const getBannerContent = () => {
//     if (pathname === "/admission") {
//       return {
//         tag: "Admission Live",
//         title: "বিশেষ ছাড়ে ভর্তি চলছে...!!",
//         mainTitle: "৫০ দিনের চ্যালেঞ্জ",
//         subtitle: "ডিসকাউন্ট পেতে দ্রুত ভর্তি নিশ্চিত করুন",
//         description: siteData?.admissionBannerInfo?.description,
//       };
//     } else {
//       return {
//         tag: "Skill Development",
//         title: "কথার জাদুতে মুগ্ধ করার",
//         mainTitle: "৫০ দিনের চ্যালেঞ্জ",
//         subtitle: "আপনার কথা বলার জড়তা কাটান",
//         description: siteData?.homeBannerInfo?.description,
//       };
//     }
//   };

//   const bannerContent = getBannerContent();

//   // Floating Icons Data
//   const icons = [
//     { Icon: GraduationCap, top: "12%", left: "8%", size: 45, delay: 0 },
//     { Icon: BookOpen, top: "25%", left: "85%", size: 35, delay: 1 },
//     { Icon: Video, top: "70%", left: "12%", size: 40, delay: 2 },
//     { Icon: PenTool, top: "80%", left: "80%", size: 30, delay: 1.5 },
//     { Icon: Award, top: "8%", left: "70%", size: 55, delay: 0.5 },
//     { Icon: MessageSquare, top: "55%", left: "92%", size: 35, delay: 2.5 },
//   ];

//   return (
//     <div className="relative min-h-[600px] lg:min-h-[750px] flex items-center py-12 overflow-hidden bg-slate-950">
      
//       {/* LAYER 1: Background Image & Dark Gradients */}
//       <div className="absolute inset-0 z-0">
//         <Image
//           src={bg}
//           alt="Background"
//           fill
//           priority
//           className="object-cover opacity-30"
//         />
//         <div className="absolute inset-0 bg-slate-950/60" />
//         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
//       </div>

//       {/* LAYER 2: Visible Floating Icons (Fixed disappearance issue) */}
//       <div className="absolute inset-0 z-[5] pointer-events-none">
//         {icons.map((item, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ opacity: 0 }}
//             animate={{ 
//                 opacity: 0.25, // Solid visibility
//                 y: [0, -25, 0],
//                 rotate: [0, 10, -10, 0] 
//             }}
//             transition={{
//               opacity: { duration: 1 },
//               y: { duration: 4 + idx, repeat: Infinity, ease: "easeInOut" },
//               rotate: { duration: 5 + idx, repeat: Infinity, ease: "easeInOut" },
//               delay: item.delay
//             }}
//             className="absolute text-[#DC25FF] filter blur-[0.5px]" // Added subtle glow
//             style={{ top: item.top, left: item.left }}
//           >
//             <item.Icon size={item.size} strokeWidth={1.5} />
//           </motion.div>
//         ))}
//       </div>

//       {/* LAYER 3: Main Content */}
//       <Container className="relative z-20">
//         <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center md:text-left md:w-3/5 order-2 md:order-1"
//           >
//             {/* Tag Badge */}
//             <div className="flex items-center justify-center md:justify-start mb-6">
//               <span className="px-5 py-1.5 rounded-full bg-[#DC25FF]/10 border border-[#DC25FF]/30 text-[#DC25FF] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
//                 <CheckCircle2 size={16} className="animate-pulse" />
//                 {bannerContent.tag}
//               </span>
//             </div>

//             <h3 className="text-2xl md:text-3xl text-gray-200 font-medium mb-2">
//               {bannerContent.title}
//             </h3>

//             <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-[#DC25FF] drop-shadow-xl">
//                 {bannerContent.mainTitle}
//               </span>
//             </h1>

//             {/* Subtitle/Description */}
//             <div className="space-y-4 mb-10">
//               <div className="flex items-start justify-center md:justify-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md max-w-xl">
//                 <div className="p-2 bg-[#DC25FF]/20 rounded-xl text-[#DC25FF]">
//                   <Calendar size={26} />
//                 </div>
//                 <div>
//                   <p className="text-xl md:text-2xl text-yellow-400 font-bold mb-1">
//                     {bannerContent.subtitle}
//                   </p>
//                   <p className="text-gray-300 leading-relaxed font-light">
//                     {bannerContent.description}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* HIGH HIGHLIGHTED BUTTON */}
//             <div className="flex justify-center md:justify-start">
//               <motion.div 
//                 whileHover={{ scale: 1.05 }}
//                 className=""
//               >
//                 <div className="bg-slate-950 px-4 py-1 rounded-[13px]">
//                    <CtaLinkButton />
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>

//           {/* Right Image Section */}
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1 }}
//             className="md:w-2/5 order-1 md:order-2 relative"
//           >
//             {/* Pulsing Glow behind image */}
//             <div className="absolute inset-0 bg-[#DC25FF]/30 blur-[120px] rounded-full animate-pulse" />
            
//             <motion.div
//               animate={{ y: [0, -20, 0] }}
//               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//               className="relative z-10"
//             >
//               <Image
//                 src={leftimg}
//                 alt="Course Logo"
//                 width={500}
//                 height={500}
//                 className="object-contain drop-shadow-[0_20px_60px_rgba(220,37,255,0.4)]"
//                 priority
//               />
//             </motion.div>
//           </motion.div>

//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Banner;

// "use client";
// import Image from "next/image";
// import Container from "../shared/Container";
// import { usePathname } from "next/navigation";
// import CtaLinkButton from "../CtaLinkButton";
// import leftimg from "../../../public/img/course-logo.webp";
// import bg from "../../../public/img/bg.webp";
// import { SiteContent } from "@/types";

// type Props = {
//   siteData: SiteContent | null;
// };

// const Banner = ({ siteData }: Props) => {
//   const pathname = usePathname();

//   // পাথ অনুযায়ী বিভিন্ন টেক্সট
//   const getBannerContent = () => {
//     if (pathname === "/admission") {
//       return {
//         title: "বিশেষ ছাড়ে ভর্তি চলছে...!!",
//         mainTitle: "৫০ দিনের চ্যালেঞ্জ",
//         subtitle: "ডিসকাউন্ট পেতে দ্রুত ভর্তি নিশ্চিত করুন",
//         description: siteData?.admissionBannerInfo?.description,
//       };
//     } else {
//       return {
//         title: "কথার জাদুতে মুগ্ধ করার",
//         mainTitle: "৫০ দিনের চ্যালেঞ্জ",
//         description: siteData?.homeBannerInfo?.description,
//       };
//     }
//   };

//   const bannerContent = getBannerContent();
//   // console.log("banner content", bannerContent);

//   return (
//     <div className="relative min-h-[500px] lg:min-h-[600px] flex items-center py-16 md:py-20 lg:py-28 overflow-hidden">
//       <Image
//         src={bg}
//         alt="Banner Background"
//         fill
//         priority
//         placeholder="blur"
//         quality={80}
//         sizes="100vw"
//         className="object-cover"
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/50 z-0" />

//       {/* Content */}
//       <div className="relative z-10 w-full">
//         <Container>
//           <div className="flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-12">
//             <div className="text-center md:text-left text-white md:w-1/2 order-2 md:order-1">
//               <div className="animate-fade-in-up">
//                 {/* টাইটেল */}
//                 <h3 className="text-[23px] md:text-[31px] font-semibold leading-[1]">
//                   {bannerContent.title}
//                 </h3>

//                 {/* মেইন টাইটেল */}
//                 <h1 className="text-[35px] md:text-[50px] font-bold text-[#DC25FF] drop-shadow-md">
//                   {bannerContent.mainTitle}
//                 </h1>

//                 {/* ডেসক্রিপশন */}
//                 <div className="space-y-2 text-[17px] md:text-[20px] font-[400] mt-4">
//                   <p className="md:drop-shadow leading-[1]">
//                     {bannerContent.subtitle}
//                   </p>
//                   <p className="md:drop-shadow leading-[1]">
//                     {bannerContent.description}
//                   </p>
//                   {/* Banner-specific description যদি থাকে */}
//                   {/* {bannerData?.description && (
//                     <p className="md:drop-shadow leading-[1]">
//                       {bannerData.description}
//                     </p>
//                   )} */}
//                 </div>

//                 {/* CTA বাটন */}
//                 <div className="flex justify-center md:justify-start pt-6">
//                   <CtaLinkButton />
//                 </div>
//               </div>
//             </div>

//             <div className="order-1 md:order-2 md:w-1/2 flex justify-center md:justify-end">
//               <div className="relative w-64 md:w-96 h-64 md:h-96">
//                 {/* Banner-specific image অথবা default image */}
//                 <Image
//                   src={leftimg}
//                   alt="Banner logo"
//                   height={400}
//                   width={400}
//                   className="object-contain drop-shadow-2xl animate-float"
//                   priority
//                 />
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Banner;
