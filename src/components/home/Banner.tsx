"use client";
import Image from "next/image";
import Container from "../shared/Container";
import { usePathname } from "next/navigation";
import CtaLinkButton from "../CtaLinkButton";
import leftimg from "../../../public/img/course-logo.webp";
import bg from "../../../public/img/bg.webp";
import { SiteContent } from "@/types";
import { motion } from "framer-motion";
import { 
  Calendar, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  Video, 
  PenTool, 
  Award, 
  MessageSquare
} from "lucide-react";

type Props = {
  siteData: SiteContent | null;
};

const Banner = ({ siteData }: Props) => {
  const pathname = usePathname();

  const getBannerContent = () => {
    if (pathname === "/admission") {
      return {
        tag: "Admission Live",
        title: "বিশেষ ছাড়ে ভর্তি চলছে...!!",
        mainTitle: "৫০ দিনের চ্যালেঞ্জ",
        subtitle: "ডিসকাউন্ট পেতে দ্রুত ভর্তি নিশ্চিত করুন",
        description: siteData?.admissionBannerInfo?.description,
      };
    } else {
      return {
        tag: "Skill Development",
        title: "কথার জাদুতে মুগ্ধ করার",
        mainTitle: "৫০ দিনের চ্যালেঞ্জ",
        subtitle: "আপনার কথা বলার জড়তা কাটান",
        description: siteData?.homeBannerInfo?.description,
      };
    }
  };

  const bannerContent = getBannerContent();

  // Floating Icons Data
  const icons = [
    { Icon: GraduationCap, top: "12%", left: "8%", size: 45, delay: 0 },
    { Icon: BookOpen, top: "25%", left: "85%", size: 35, delay: 1 },
    { Icon: Video, top: "70%", left: "12%", size: 40, delay: 2 },
    { Icon: PenTool, top: "80%", left: "80%", size: 30, delay: 1.5 },
    { Icon: Award, top: "8%", left: "70%", size: 55, delay: 0.5 },
    { Icon: MessageSquare, top: "55%", left: "92%", size: 35, delay: 2.5 },
  ];

  return (
    <div className="relative min-h-[600px] lg:min-h-[750px] flex items-center py-12 overflow-hidden bg-slate-950">
      
      {/* LAYER 1: Background Image & Dark Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bg}
          alt="Background"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
      </div>

      {/* LAYER 2: Visible Floating Icons (Fixed disappearance issue) */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {icons.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ 
                opacity: 0.25, // Solid visibility
                y: [0, -25, 0],
                rotate: [0, 10, -10, 0] 
            }}
            transition={{
              opacity: { duration: 1 },
              y: { duration: 4 + idx, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5 + idx, repeat: Infinity, ease: "easeInOut" },
              delay: item.delay
            }}
            className="absolute text-[#DC25FF] filter blur-[0.5px]" // Added subtle glow
            style={{ top: item.top, left: item.left }}
          >
            <item.Icon size={item.size} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      {/* LAYER 3: Main Content */}
      <Container className="relative z-20">
        <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left md:w-3/5 order-2 md:order-1"
          >
            {/* Tag Badge */}
            <div className="flex items-center justify-center md:justify-start mb-6">
              <span className="px-5 py-1.5 rounded-full bg-[#DC25FF]/10 border border-[#DC25FF]/30 text-[#DC25FF] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
                <CheckCircle2 size={16} className="animate-pulse" />
                {bannerContent.tag}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl text-gray-200 font-medium mb-2">
              {bannerContent.title}
            </h3>

            <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-[#DC25FF] drop-shadow-xl">
                {bannerContent.mainTitle}
              </span>
            </h1>

            {/* Subtitle/Description */}
            <div className="space-y-4 mb-10">
              <div className="flex items-start justify-center md:justify-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md max-w-xl">
                <div className="p-2 bg-[#DC25FF]/20 rounded-xl text-[#DC25FF]">
                  <Calendar size={26} />
                </div>
                <div>
                  <p className="text-xl md:text-2xl text-yellow-400 font-bold mb-1">
                    {bannerContent.subtitle}
                  </p>
                  <p className="text-gray-300 leading-relaxed font-light">
                    {bannerContent.description}
                  </p>
                </div>
              </div>
            </div>

            {/* HIGH HIGHLIGHTED BUTTON */}
            <div className="flex justify-center md:justify-start">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className=""
              >
                <div className="bg-slate-950 px-4 py-1 rounded-[13px]">
                   <CtaLinkButton />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="md:w-2/5 order-1 md:order-2 relative"
          >
            {/* Pulsing Glow behind image */}
            <div className="absolute inset-0 bg-[#DC25FF]/30 blur-[120px] rounded-full animate-pulse" />
            
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Image
                src={leftimg}
                alt="Course Logo"
                width={500}
                height={500}
                className="object-contain drop-shadow-[0_20px_60px_rgba(220,37,255,0.4)]"
                priority
              />
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </div>
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
