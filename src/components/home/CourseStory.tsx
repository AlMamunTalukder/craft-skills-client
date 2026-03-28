// "use client";

// import Image from "next/image";
// import {
//   CheckCircle2,
//   PlayCircle,
//   Users,
//   MessageSquare,
//   Video,
//   Star,
// } from "lucide-react";
// import Container from "../shared/Container";

// const CourseRoadmap = () => {
//   const steps = [
//     {
//       title: "মেইন ক্লাস",
//       desc: "সিলেবাসের প্রতিটি টপিক নিয়ে বিস্তারিত আলোচনা এবং হাতে-কলমে শেখানো হয়, যাতে বেসিক ফাউন্ডেশন একদম ক্লিয়ার থাকে।      ",
//       icon: <Star size={24} />,
//       gradient: "from-purple-600 to-indigo-600",
//     },
//     {
//       title: "প্রবলেম সলভিং ক্লাস",
//       desc: "আমাদের ডেডিকেটেড ‘সমস্যা সমাধান ক্লাসে’ ওয়ান-টু-ওয়ান (One-to-One) সেশনের মাধ্যমে দুর্বলতাগুলো চিহ্নিত করে, এক্সপার্ট মেন্টরদের সাহায্যে সমাধান করা হয়। ",
//       icon: <MessageSquare size={24} />,
//       gradient: "from-fuchsia-600 to-purple-600",
//     },
//     {
//       title: "প্র্যাক্টিস ক্লাস",
//       desc: "শেখানো বিষয়গুলো সরাসরি চর্চার মাধ্যমে আরও শাণিত ও নিখুঁত করা হয়।      ",
//       icon: <Users size={24} />,
//       gradient: "from-purple-500 to-blue-500",
//     },
//     {
//       title: "স্পেশাল ক্লাস",
//       desc: "এটি মূলত দুর্বল শিক্ষার্থীদের জন্য। মেইন, প্রবলেম সলভিং ও প্র্যাকটিস করার পরও যাদের সমস্যা থাকবে, তাদের জন্য রয়েছে এক্সট্রা কেয়ার ও স্পেশাল সাপোর্টের ব্যবস্থা।",
//       icon: <CheckCircle2 size={24} />,
//       gradient: "from-violet-600 to-purple-700",
//     },
//     {
//       title: "ভিডিও প্রেজেন্টেশন",
//       desc: "৩০০০ মিনিট প্র্যাকটিক্যাল ভিডিও প্রেজেন্টেশনের মাধ্যমে ক্লাসের পড়াগুলোকে সরাসরি প্রয়োগ করানো হয়।      ",
//       icon: <Video size={24} />,
//       gradient: "from-purple-700 to-indigo-800",
//     },
//     {
//       title: "প্রেজেন্টেশন রিভিউ ক্লাস",
//       desc: "সাবমিট করা ভিডিও প্রেজেন্টেশনগুলো মেন্টর নিজে খুঁটিয়ে দেখেন এবং কোথায় কী কী সমস্যা রয়েছে, তা দেখে ভুলগুলো ধরিয়ে দেন।      ",
//       icon: <PlayCircle size={24} />,
//       gradient: "from-fuchsia-500 to-purple-500",
//     },
//   ];

//   return (
//     <section className="py-7 md:py-20 relative overflow-hidden bg-[#1A0033]">
//       {/* --- PREMIUM GRADIENT LAYERS --- */}
//       {/* 1. Base Gradient Mesh */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4F0187_0%,#1A0033_100%)]"></div>

//       {/* 2. Top-Left Light Leak (Cyan) */}
//       <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>

//       {/* 3. Bottom-Right Glow (Magenta) */}
//       <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px]"></div>

//       {/* 4. Subtle Noise Texture Overlay */}
//       <div
//         className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
//         style={{
//           backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
//         }}
//       ></div>

//       <Container>
//         <header className="relative z-10 text-center max-w-4xl mx-auto md:mb-20">
//           <div className="flex justify-center mb-3 md:mb-8">
//             <Image
//               src="/img/award1.png"
//               height={180}
//               width={180}
//               alt="Award"
//               className="w-24 md:w-40 h-auto drop-shadow-[0_0_30px_rgba(210,35,246,0.3)]"
//             />
//           </div>

//           <div className="space-y-3 md:space-y-6">
//             <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight">
//               আমাদের{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D223F6] to-[#7e22ce]">
//                 ৬-স্টেপ
//               </span>{" "}
//               লার্নিং মডেল
//             </h2>

//             {/* Tagline Box - Now Dark Themed */}
//             <p className=" md:text-xl font-bold text-white inline-block px-4 md:px-8 md:py-3 rounded-full bg-white/5 border border-white/30 backdrop-blur-sm shadow-xl">
//               ৫০ দিনের প্র্যাকটিক্যাল চ্যালেঞ্জ
//             </p>

//             <h3 className="text-xl md:text-4xl font-extrabold text-purple-400 md:mt-4 leading-snug mb-4">
//               প্রফেশনাল হওয়ার সবচেয়ে কার্যকর রোডম্যাপ!
//             </h3>
//           </div>
//         </header>

//         {/* --- BENTO GRID (Dark Glass Style) --- */}
//         <div className="relative z-10 grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-6xl mx-auto">
//           {steps.map((step, index) => (
//             <div
//               key={index}
//               /* Glass Card: Semi-transparent background with border highlight */
//               className="group relative md:h-[280px] w-full bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-xl rounded-xl md:rounded-[2.5rem] p-3 md:p-8 border border-white/10 hover:border-purple-500/50 shadow-2xl transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2"
//             >
//               {/* Decorative Step Number - Faded into background */}
//               <div className="absolute -top-2 -right-0 text-6xl md:text-8xl font-black text-white/[0.1] group-hover:text-purple-500/[1] transition-colors duration-500 select-none">
//                 {index + 1}
//               </div>

//               {/* Icon Container - High Contrast */}
//               <div
//                 className={`shrink-0 w-9 md:w-14 h-9 md:h-14 rounded-lg md:rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center mb-2 md:mb-6`}
//               >
//                 {step.icon}
//               </div>

//               {/* Text Content - Changed to White/Grey for contrast */}
//               <div className="flex-grow">
//                 <h4 className="text-lg md:text-xl font-extrabold text-white mb-1 md:mb-3 group-hover:text-purple-400 transition-colors">
//                   {step.title}
//                 </h4>
//                 <p className="text-slate-300 text-xs md:text-[15px] leading-relaxed group-hover:text-white transition-colors">
//                   {step.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default CourseRoadmap;
"use client";

import Image from "next/image";
import {
  CheckCircle2,
  PlayCircle,
  Users,
  MessageSquare,
  Video,
  Star,
} from "lucide-react";
import Container from "../shared/Container";

const steps = [
  {
    title: "মেইন ক্লাস",
    desc: "সিলেবাসের প্রতিটি টপিক নিয়ে বিস্তারিত আলোচনা এবং হাতে-কলমে শেখানো হয়।",
    icon: <Star size={20} />,
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    title: "প্রবলেম সলভিং ক্লাস",
    desc: "ওয়ান-টু-ওয়ান সেশনের মাধ্যমে দুর্বলতা চিহ্নিত করে সমাধান করা হয়।",
    icon: <MessageSquare size={20} />,
    gradient: "from-fuchsia-600 to-purple-600",
  },
  {
    title: "প্র্যাক্টিস ক্লাস",
    desc: "শেখানো বিষয়গুলো সরাসরি চর্চার মাধ্যমে আরও শাণিত ও নিখুঁত করা হয়।",
    icon: <Users size={20} />,
    gradient: "from-purple-500 to-blue-500",
  },
  {
    title: "স্পেশাল ক্লাস",
    desc: "দুর্বল শিক্ষার্থীদের জন্য রয়েছে এক্সট্রা কেয়ার ও স্পেশাল সাপোর্ট।",
    icon: <CheckCircle2 size={20} />,
    gradient: "from-violet-600 to-purple-700",
  },
  {
    title: "ভিডিও প্রেজেন্টেশন",
    desc: "৩০০০ মিনিট প্র্যাকটিক্যাল ভিডিওর মাধ্যমে পড়াগুলোকে সরাসরি প্রয়োগ করানো হয়।",
    icon: <Video size={20} />,
    gradient: "from-purple-700 to-indigo-800",
  },
  {
    title: "প্রেজেন্টেশন রিভিউ ক্লাস",
    desc: "মেন্টর নিজে প্রেজেন্টেশন দেখে ভুলগুলো ধরিয়ে দেন।",
    icon: <PlayCircle size={20} />,
    gradient: "from-fuchsia-500 to-purple-500",
  },
];

const CourseRoadmap = () => {
  return (
    <section className="py-12 md:py-20 relative overflow-hidden bg-[#1A0033]">
      {/* Optimized Background - Removed heavy blur/noise on mobile */}
      <div className="absolute inset-0 bg-[#1A0033] md:bg-[radial-gradient(circle_at_50%_50%,#4F0187_0%,#1A0033_100%)]"></div>

      <Container className="relative z-10">
        <header className="text-center max-w-4xl mx-auto mb-10 md:mb-20">
          <div className="flex justify-center mb-6">
            <Image
              src="/img/award1.png"
              height={120}
              width={120}
              alt="Award"
              className="w-20 md:w-32 h-auto"
              priority // High priority for LCP
            />
          </div>

          <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight mb-4">
            আমাদের{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D223F6] to-[#7e22ce]">
              ৬-স্টেপ
            </span>{" "}
            লার্নিং মডেল
          </h2>

          <p className="text-sm md:text-xl font-bold text-white inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
            ৫০ দিনের প্র্যাকটিক্যাল চ্যালেঞ্জ
          </p>

          <h3 className="text-xl md:text-4xl font-extrabold text-purple-400 md:mt-4 leading-snug mb-4">
            প্রফেশনাল হওয়ার সবচেয়ে কার্যকর রোডম্যাপ!
          </h3>
        </header>

        {/* Optimized Bento Grid - Use grid-cols-1 for very small devices if needed */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white/5 rounded-2xl p-2 md:p-6 border border-white/10 transition-all duration-300 hover:bg-white/10 active:scale-95 touch-manipulation"
            >
              <div className="absolute top-2 right-4 text-5xl md:text-7xl font-black text-white/5 group-hover:text-purple-400  select-none">
                {index + 1}
              </div>

              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center mb-4 shadow-lg`}
              >
                {step.icon}
              </div>

              <h4 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-purple-400">
                {step.title}
              </h4>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CourseRoadmap;
