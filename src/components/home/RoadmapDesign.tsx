'use client'
import {
  CheckCircle2,
  XCircle,
  PlayCircle,
  Users,
  MessageSquare,
  Video,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const RoadmapDesign = () => {
  const problems = [
    "উচ্চারণগত",
    "আঞ্চলিকতা",
    "মুখের জড়তা",
    "কণ্ঠ শ্রুতিমধুর না থাকা",
    "বডি ল্যাঙ্গুয়েজ",
    "ক্যামেরা ভীতি",
    "জনসম্মুখে কথা বলা",
  ];

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
    <div className="flex flex-col md:flex-row  gap-8 p-6 bg-purple-50/50 rounded-3xl overflow-hidden shadow-sm border border-purple-100">
      {/* --- PROBLEM SECTION (Purple Tune) --- */}
      <div className="md:w-1/3 bg-gradient-to-br from-[#351081] via-[#230b54] to-[#0B001A] p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-white/10 group">
  {/* Animated Background Blob */}
  <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F300E7]/20 rounded-full blur-[80px] group-hover:bg-[#F300E7]/30 transition-all duration-700" />
  
  <div className="relative z-10">
          <Badge
            variant="outline"
            className="mb-4 border-purple-400 text-purple-200 px-4 py-1 rounded-full text-lg font-bold"
          >
            সমস্যা
          </Badge>
          <ul className="space-y-4 mt-6">
            {problems.map((text, index) => (
              <li
                key={index}
                className="flex items-center gap-3 text-purple-100/90 border-b border-purple-800/50 pb-2 text-md"
              >
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                {/* pt-1 for optical Bengali centering */}
                <span className="leading-relaxed pt-1">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* --- SOLUTION SECTION (Purple Tune) --- */}
    <div className="md:w-2/3 flex flex-col px-2 md:px-6">
  {/* Header with Modern Divider */}
  <div className="flex items-center gap-6 mb-10">
    <h2 className="text-4xl font-black text-[#2e1065] tracking-tight">
      সমাধান
    </h2>
    <div className="h-[3px] flex-1 bg-gradient-to-r from-[#F300E7] via-purple-300 to-transparent rounded-full opacity-50" />
  </div>

  <div className="relative space-y-6">
    {/* The Animated Roadmap Line */}
    <div className="absolute left-[27px] top-10 bottom-10 w-[3px] bg-gradient-to-b from-[#F300E7] via-purple-200 to-purple-100 hidden sm:block opacity-40" />

    {solutions.map((item, index) => (
      <motion.div
        key={index}
        whileHover={{ x: 10 }}
        className="relative group"
      >
        <div className="relative z-10 flex items-start sm:items-center gap-5 p-5 rounded-2xl bg-white border border-transparent shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:border-purple-100 transition-all duration-500">
          
          {/* Step Indicator - High Contrast */}
          <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-white text-purple-700 flex items-center justify-center font-black text-2xl border-2 border-purple-100/50 group-hover:from-[#F300E7] group-hover:to-[#A855F7] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
            <span className="pt-1">{index + 1}</span>
          </div>

          {/* Content Area */}
          <div className="flex flex-col md:flex-row md:items-center flex-1 gap-3 md:gap-8 ml-2">
            <div className="md:w-48 shrink-0">
              <h4 className="text-[#2e1065] font-extrabold text-xl leading-tight group-hover:text-[#F300E7] transition-colors duration-300">
                {item.title}
              </h4>
            </div>

            {/* Vertical Divider (Hidden on Mobile) */}
            <div className="hidden md:block h-10 w-[2px] bg-gradient-to-b from-transparent via-purple-100 to-transparent" />

            <p className="text-slate-600 text-base leading-relaxed flex-1 font-medium italic sm:not-italic">
              {item.desc}
            </p>

            {/* Icon with subtle float animation */}
            <div className="hidden lg:flex text-purple-300 group-hover:text-[#F300E7] group-hover:scale-125 transition-all duration-500 ease-out">
              {item.icon}
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</div>
    </div>
  );
};

export default RoadmapDesign;
