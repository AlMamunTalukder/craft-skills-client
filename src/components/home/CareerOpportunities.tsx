"use client";

import React from "react";
import { 
  DoorOpen, 
  Briefcase, 
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
  ScrollText
} from "lucide-react";

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
  return (
    <section className="relative py-16 md:py-32 bg-[#361664] overflow-hidden font-sans min-h-screen flex items-center">
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
          <div className="lg:col-span-5 text-center lg:text-left md:space-y-8">
          

            {/* Main Typographic Art */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.2] md:leading-[1.1] tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mb-2 drop-shadow-sm">
                শুধু একটি কোর্স
              </span>
              
              {/* Highlighted text similar to the image's yellow marker */}
              <span className="relative inline-block mt-4 mb-6">
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl transform -skew-x-6 rotate-2 shadow-[0_10px_30px_rgba(245,158,11,0.3)]"></span>
                <span className="relative z-10 px-6 py-2 block text-black text-3xl md:text-5xl lg:text-6xl tracking-tight">
                  খুলে যাবে উপার্জনের
                </span>
              </span>
              
              <br />
              <span className="flex items-center justify-center lg:justify-start gap-4 text-white drop-shadow-xl mt-2">
                অসংখ্য দরজা! <DoorOpen className="text-amber-400 w-10 h-10 md:w-14 md:h-14 animate-bounce" strokeWidth={2} />
              </span>
            </h2>

           
          
          </div>

          {/* --- RIGHT COLUMN: List of Opportunities Grid --- */}
          <div className="lg:col-span-7 relative">
            
            {/* Glassmorphism Container */}
            <div className="relative bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[2.5rem] p-3 md:p-10 shadow-2xl overflow-hidden">
              
              {/* Inner Glow */}
              {/* <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none"></div> */}

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
                        <Icon className="w-5 h-5 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]" strokeWidth={1.5} />
                      </div>
                      
                      {/* Text */}
                      <span className="text-gray-300 font-medium text-sm md:text-[15px] group-hover:text-white transition-colors duration-300 leading-snug">
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