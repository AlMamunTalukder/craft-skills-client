"use client";

import {
  Mic2,
  Mic,
  Headphones,
  Clapperboard,
  Newspaper,
  Radio,
  Tv,
  Video,
  Megaphone,
  Headset,
  Presentation,
  Users,
  Podcast,
  Film,
  BookOpen,
  Smile,
  ScrollText,
  CircleDollarSign,
} from "lucide-react";
import { usePathname } from "next/navigation";

const opportunities = [
  { title: "ভয়েস ওভার ", icon: Mic },
  { title: "ডাবিং ", icon: Headphones },
  { title: "অ্যানিমেশন ভয়েস অ্যাক্টিং", icon: Clapperboard },
  { title: "সংবাদ পাঠ ও রিপোটিং", icon: Newspaper },
  { title: "রেডিও জকি (RJ)", icon: Radio },
  { title: "টিভি ও রেডিও উপস্থাপনা", icon: Tv },
  { title: "ভিডিও প্রেজেন্টেশন", icon: Video },
  { title: "আবৃত্তি", icon: BookOpen },
  { title: "পাপেট্রি", icon: Smile },
  { title: "স্ক্রিপ্ট রাইটিং", icon: ScrollText },
  { title: "কমেন্ট্রি", icon: Mic2 },
  { title: "কন্টেন্ট ক্রিয়েশন", icon: Film },
  { title: "পডকাস্ট/ইভেন্ট হোস্টিং", icon: Podcast },
  { title: "পাবলিক স্পিকিং", icon: Users },
  { title: "কর্পোরেট ট্রেইনিং", icon: Presentation },
  { title: "কল সেন্টার ও টেলিমার্কেটিং", icon: Headset },
];

export default function CareerOpportunities() {
  const pathname = usePathname();
  const isExclusive = pathname?.startsWith("/exclusive");

  // ✅ Dynamic content based on route
  const content = {
    subtitle: isExclusive ? "শুধু একটি মাস্টারক্লাস," : "শুধু একটি কোর্স,",
    highlightedText: isExclusive ? "জেনে নিন ক্যারিয়ার গড়ার" : "খুলে যাবে উপার্জনের",
    footerText: isExclusive ? "সঠিক গাইডলাইন!" : "অসংখ্য দরজা!",
    showDollarIcon: !isExclusive, // ✅ Only show on non-exclusive pages
  };

  // Theme configuration
  const theme = {
    sectionBg: isExclusive ? "bg-[#050507]" : "bg-[#361664]",
    glowCore: isExclusive ? "bg-[#F26422]/10" : "bg-[#4F0187] opacity-10",
    glowSecondary: isExclusive ? "bg-red-600/[0.04]" : "bg-blue-900/20",
    glowTertiary: isExclusive ? "bg-amber-600/[0.03]" : "bg-fuchsia-900/20",
    glassBox: isExclusive ? "bg-black/40 border-white/[0.05]" : "bg-white/[0.02] border-white/10",
    cardBg: isExclusive ? "bg-white/[0.02] border-white/[0.04]" : "bg-[#0F0518]/50 border-white/5",
    cardHover: isExclusive ? "hover:bg-[#F26422]/5 hover:border-[#F26422]/40 hover:shadow-[#F26422]/10" : "hover:bg-white/[0.05] hover:border-purple-500/40 hover:shadow-purple-500/10",
    iconContainer: isExclusive ? "from-[#F26422]/20 to-orange-500/5 border-[#F26422]/30" : "from-purple-500/20 to-fuchsia-500/5 border-purple-500/30",
    iconColor: isExclusive ? "text-[#F26422] drop-shadow-[0_0_8px_rgba(242,100,34,0.6)]" : "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]",
  };

  return (
    <section
      className={`relative py-12 md:py-16 overflow-hidden font-sans min-h-screen flex items-center transition-colors duration-500 ${theme.sectionBg}`}
    >
      {/* Ambient Glow Systems */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] blur-[150px] rounded-full transition-all duration-500 ${theme.glowCore}`}></div>
        <div className={`absolute bottom-0 left-0 w-125 h-125 blur-[120px] rounded-full transition-all duration-500 ${theme.glowSecondary}`}></div>
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full transition-all duration-500 ${theme.glowTertiary}`}></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">

          {/* --- LEFT COLUMN: CATCHY HEADING --- */}
          <div className="lg:col-span-5 text-center lg:text-left flex flex-col justify-center items-center lg:items-start space-y-6 md:space-y-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.15] tracking-tight">
              <span className="block text-gray-400 md:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold">
                {content.subtitle}
              </span>

              <span className="relative inline-flex items-center my-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl px-5 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] to-[#ff844f] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  {content.highlightedText}
                </span>
              </span>

              <br />
              <span className="flex items-center justify-center lg:justify-start gap-3 text-white drop-shadow-xl mt-3">
                {content.footerText}
                {/* ✅ Only show Dollar Icon on non-exclusive pages */}
                {content.showDollarIcon && (
                  <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#F26422]/10 border border-[#F26422]/30 animate-pulse shadow-[0_0_20px_rgba(242,100,34,0.2)]">
                    <CircleDollarSign
                      className="text-[#F26422] w-7 h-7 md:w-8 md:h-8"
                      strokeWidth={2}
                    />
                  </div>
                )}
              </span>
            </h2>
          </div>

          {/* --- RIGHT COLUMN: LIST OF OPPORTUNITIES --- */}
          <div className="lg:col-span-7 relative">
            <div className={`relative backdrop-blur-xl rounded-2xl md:rounded-[2.5rem] p-3 md:p-10 shadow-2xl overflow-hidden transition-all duration-500 border ${theme.glassBox}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 relative z-10">
                {opportunities.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className={`group flex items-center gap-3 md:gap-4 p-2 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default border ${theme.cardBg} ${theme.cardHover}`}
                    >
                      <div className={`w-7 md:w-10 h-7 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 border group-hover:scale-110 transition-transform duration-300 ${theme.iconContainer}`}>
                        <Icon
                          className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${theme.iconColor}`}
                          strokeWidth={1.5}
                        />
                      </div>
                      <span className="font-bold text-xs md:text-[15px] text-white transition-colors duration-300 leading-snug">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


// "use client";

// import {
//   Mic2,
//   Mic,
//   Headphones,
//   Clapperboard,
//   Newspaper,
//   Radio,
//   Tv,
//   Video,
//   Megaphone,
//   Headset,
//   Presentation,
//   Users,
//   Podcast,
//   Film,
//   BookOpen,
//   Smile,
//   ScrollText,
//   CircleDollarSign,
// } from "lucide-react";
// import { usePathname } from "next/navigation";

// const opportunities = [
//   { title: "ভয়েস ওভার ", icon: Mic },
//   { title: "ডাবিং ", icon: Headphones },
//   { title: "অ্যানিমেশন ভয়েস অ্যাক্টিং", icon: Clapperboard },
//   { title: "সংবাদ পাঠ ও রিপোটিং", icon: Newspaper },
//   { title: "রেডিও জকি (RJ)", icon: Radio },
//   { title: "টিভি ও রেডিও উপস্থাপনা", icon: Tv },
//   { title: "ভিডিও প্রেজেন্টেশন", icon: Video },
//   // { title: "ব্র্যান্ড প্রমোটার", icon: Megaphone },
//   { title: "আবৃত্তি", icon: BookOpen },
//   { title: "পাপেট্রি", icon: Smile },
//   { title: "স্ক্রিপ্ট রাইটিং", icon: ScrollText },
//   { title: "কমেন্ট্রি", icon: Mic2 },
//   { title: "কন্টেন্ট ক্রিয়েশন", icon: Film },
//   { title: "পডকাস্ট/ইভেন্ট হোস্টিং", icon: Podcast },
//   { title: "পাবলিক স্পিকিং", icon: Users },
//   { title: "কর্পোরেট ট্রেইনিং", icon: Presentation },
//   { title: "কল সেন্টার ও টেলিমার্কেটিং", icon: Headset },
// ];
// // const opportunities = [
// //   { title: "ভয়েস ওভার আর্টিস্ট", icon: Mic },
// //   { title: "ডাবিং আর্টিস্ট", icon: Headphones },
// //   { title: "অ্যানিমেশন ভয়েস অ্যাক্টর", icon: Clapperboard },
// //   { title: "সংবাদ পাঠক/নিউজ রিপোর্টার", icon: Newspaper },
// //   { title: "রেডিও জকি (RJ)", icon: Radio },
// //   { title: "টিভি ও রেডিও উপস্থাপক", icon: Tv },
// //   { title: "ভিডিও প্রেজেন্টার", icon: Video },
// //   { title: "ব্র্যান্ড প্রমোটার", icon: Megaphone },
// //   { title: "কল সেন্টার এক্সিকিউটিভ/টেলিমার্কেটার", icon: Headset },
// //   { title: "কর্পোরেট ট্রেইনার", icon: Presentation },
// //   { title: "পাবলিক স্পিকার", icon: Users },
// //   { title: "পডকাস্ট/ইভেন্ট হোস্ট", icon: Podcast },
// //   { title: "কন্টেন্ট ক্রিয়েটর", icon: Film },
// //   { title: "কমেন্টেটর", icon: Mic2 },
// //   { title: "আবৃত্তিকার", icon: BookOpen },
// //   { title: "পাপেটার", icon: Smile },
// //   { title: "স্ক্রিপ্ট রাইটার", icon: ScrollText },
// // ];

// export default function CareerOpportunities() {
//   const pathname = usePathname();
//   const isExclusive = pathname?.startsWith("/exclusive");

//   // ডাইনামিক থিম কনফিগারেশন সিস্টেম
//   const theme = {
//     sectionBg: isExclusive ? "bg-[#050507]" : "bg-[#361664]",
//     glowCore: isExclusive ? "bg-[#F26422]/10" : "bg-[#4F0187] opacity-10",
//     glowSecondary: isExclusive ? "bg-red-600/[0.04]" : "bg-blue-900/20",
//     glowTertiary: isExclusive ? "bg-amber-600/[0.03]" : "bg-fuchsia-900/20",
//     glassBox: isExclusive ? "bg-black/40 border-white/[0.05]" : "bg-white/[0.02] border-white/10",
//     cardBg: isExclusive ? "bg-white/[0.02] border-white/[0.04]" : "bg-[#0F0518]/50 border-white/5",
//     cardHover: isExclusive ? "hover:bg-[#F26422]/5 hover:border-[#F26422]/40 hover:shadow-[#F26422]/10" : "hover:bg-white/[0.05] hover:border-purple-500/40 hover:shadow-purple-500/10",
//     iconContainer: isExclusive ? "from-[#F26422]/20 to-orange-500/5 border-[#F26422]/30" : "from-purple-500/20 to-fuchsia-500/5 border-purple-500/30",
//     iconColor: isExclusive ? "text-[#F26422] drop-shadow-[0_0_8px_rgba(242,100,34,0.6)]" : "text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]",
//   };

//   return (
//     <section
//       className={`relative py-12 md:py-16 overflow-hidden font-sans min-h-screen flex items-center transition-colors duration-500 ${theme.sectionBg}`}
//     >
//       {/* 🌌 AMBIENT BRIGHT GLOW SYSTEMS & GRID LAYOUT */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] blur-[150px] rounded-full transition-all duration-500 ${theme.glowCore}`}></div>
//         <div className={`absolute bottom-0 left-0 w-125 h-125 blur-[120px] rounded-full transition-all duration-500 ${theme.glowSecondary}`}></div>
//         <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full transition-all duration-500 ${theme.glowTertiary}`}></div>

//         {/* Grid Pattern */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">

//           {/* --- LEFT COLUMN: CATCHY HEADING --- */}
//           <div className="lg:col-span-5 text-center lg:text-left flex flex-col justify-center items-center lg:items-start space-y-6 md:space-y-8">
//             <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.15] tracking-tight">
//               <span className="block text-gray-400 md:mb-3 text-2xl sm:text-3xl md:text-4xl font-bold">
                
//                 শুধু একটি কোর্স,
//               </span>

//               {/* Premium Floating Core Highlight Card */}
//               <span className="relative inline-flex items-center my-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl px-5 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] to-[#ff844f] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
//                   খুলে যাবে উপার্জনের
//                 </span>
//               </span>

//               <br />
//               <span className="flex items-center justify-center lg:justify-start gap-3 text-white drop-shadow-xl mt-3">
//                 অসংখ্য দরজা!{" "}
//                 <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#F26422]/10 border border-[#F26422]/30 animate-pulse shadow-[0_0_20px_rgba(242,100,34,0.2)]">
//                   <CircleDollarSign
//                     className="text-[#F26422] w-7 h-7 md:w-8 md:h-8"
//                     strokeWidth={2}
//                   />
//                 </div>
//               </span>
//             </h2>
//           </div>

//           {/* --- RIGHT COLUMN: LIST OF OPPORTUNITIES MATRIX GRID --- */}
//           <div className="lg:col-span-7 relative">
//             {/* Glassmorphism Dynamic Main Block Container */}
//             <div className={`relative backdrop-blur-xl rounded-2xl md:rounded-[2.5rem] p-3 md:p-10 shadow-2xl overflow-hidden transition-all duration-500 border ${theme.glassBox}`}>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 relative z-10">
//                 {opportunities.map((item, index) => {
//                   const Icon = item.icon;
//                   return (
//                     <div
//                       key={index}
//                       className={`group flex items-center gap-3 md:gap-4 p-2 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default border ${theme.cardBg} ${theme.cardHover}`}
//                     >
//                       {/* Bullet Icon Shape Wrapper */}
//                       <div className={`w-7 md:w-10 h-7 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 border group-hover:scale-110 transition-transform duration-300 ${theme.iconContainer}`}>
//                         <Icon
//                           className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${theme.iconColor}`}
//                           strokeWidth={1.5}
//                         />
//                       </div>

//                       {/* Main Dynamic Opportunity String Text */}
//                       <span className="font-bold text-xs md:text-[15px] text-white transition-colors duration-300 leading-snug">
//                         {item.title}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }