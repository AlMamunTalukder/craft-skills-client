"use client";

import {
  DoorOpen,
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
  DollarSign,
  GraduationCap,
  CircleDollarSign,
} from "lucide-react";
import { usePathname } from "next/navigation";

// --- Data with specific icons for each career ---
const opportunities = [
  { title: "ভয়েস ওভার আর্টিস্ট", icon: Mic },
  { title: "ডাবিং আর্টিস্ট", icon: Headphones },
  { title: "অ্যানিমেশন ভয়েস অ্যাক্টর", icon: Clapperboard },
  { title: "সংবাদ পাঠক/নিউজ রিপোর্টার", icon: Newspaper },
  { title: "রেডিও জকি (RJ)", icon: Radio },
  { title: "টিভি ও রেডিও উপস্থাপক", icon: Tv },
  { title: "ভিডিও প্রেজেন্টার", icon: Video },
  { title: "ব্র্যান্ড প্রমোটার", icon: Megaphone },
  { title: "কল সেন্টার এক্সিকিউটিভ/টেলিমার্কেটার", icon: Headset },
  { title: "কর্পোরেট ট্রেইনার", icon: Presentation },
  { title: "পাবলিক স্পিকার", icon: Users },
  { title: "পডকাস্ট/ইভেন্ট হোস্ট", icon: Podcast },
  { title: "কন্টেন্ট ক্রিয়েটর", icon: Film },
  { title: "কমেন্টেটর", icon: Mic2 },
  { title: "আবৃত্তিকার", icon: BookOpen },
  { title: "পাপেটার", icon: Smile },
  { title: "স্ক্রিপ্ট রাইটার", icon: ScrollText },
];

export default function CareerOpportunities() {
  const pathname = usePathname();
  return (
    <section
      className={`relative py-12 md:py-16 overflow-hidden font-sans min-h-screen flex items-center ${
        pathname.startsWith("/exclusive") ? "bg-black" : "bg-[#361664]"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#4F0187] opacity-10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-900/20 blur-[120px] rounded-full"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          {/* --- LEFT COLUMN: Catchy Heading --- */}
           <div className="lg:col-span-5 text-center lg:text-left flex flex-col justify-center items-center lg:items-start space-y-6 md:space-y-8">
            
            {/* Minimal Upper Attention Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 shadow-inner">
              <GraduationCap className="text-[#F26422]" size={13} />
              <span className="text-white/60 text-[11px] font-black tracking-widest uppercase">
                Career Scope
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.15] tracking-tight">
              <span className="block text-gray-400 mb-3 text-2xl sm:text-3xl md:text-4xl font-bold">
                শুধু একটি কোর্স,
              </span>
              
              {/* Premium Floating Core Highlight Card */}
              <span className="relative inline-flex items-center my-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl px-5 py-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F26422] to-[#ff844f] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  খুলে যাবে উপার্জনের
                </span>
              </span>

              <br />
              <span className="flex items-center justify-center lg:justify-start gap-3 text-white drop-shadow-xl mt-3">
                অসংখ্য দরজা!{" "}
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#F26422]/10 border border-[#F26422]/30 animate-pulse shadow-[0_0_20px_rgba(242,100,34,0.2)]">
                  <CircleDollarSign
                    className="text-[#F26422] w-7 h-7 md:w-8 md:h-8"
                    strokeWidth={2}
                  />
                </div>
              </span>
            </h2>

            
          </div>

          {/* --- RIGHT COLUMN: List of Opportunities Grid --- */}
          <div className="lg:col-span-7 relative">
            {/* Glassmorphism Container */}
            <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[2.5rem] p-3 md:p-10 shadow-2xl overflow-hidden">
              {/* Inner Glow */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-4 relative z-10">
                {opportunities.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="group flex items-center gap-3 md:gap-4 p-1.5 md:p-4 rounded-lg md:rounded-2xl bg-[#0F0518]/50 border border-white/5 hover:bg-white/[0.05] hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 cursor-default"
                    >
                      {/* Purple Bullet Icon Container */}
                      <div className="w-6 md:w-10 h-6 md:h-10 rounded-md md:rounded-xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/5 flex items-center justify-center shrink-0 border border-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                        <Icon
                          className="w-5 h-5 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]"
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Text */}
                      <span className=" font-medium text-sm md:text-[15px] text-white transition-colors duration-300 leading-snug">
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
