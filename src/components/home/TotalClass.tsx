"use client";
import Container from "../shared/Container";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, HelpCircle, Dumbbell, Star, Video } from "lucide-react";

const TotalClass = ({ totalNumber = 50, duration = 2500 }) => {
  const [counts, setCounts] = useState({
    total: 0, main: 0, problem: 0, practice: 0, special: 0, presentation: 0
  });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const classData = [
    { name: "মেইন ক্লাস", key: "main", count: 15, icon: <Layers size={22} />, color: "#60A5FA" },
    { name: "প্রবলেম সলভিং", key: "problem", count: 15, icon: <HelpCircle size={22} />, color: "#818CF8" },
    { name: "প্রাক্টিস ক্লাস", key: "practice", count: 10, icon: <Dumbbell size={22} />, color: "#A78BFA" },
    { name: "স্পেশাল ক্লাস", key: "special", count: 5, icon: <Star size={22} />, color: "#FBBF24" },
    { name: "রিভিউ ক্লাস", key: "presentation", count: 5, icon: <Video size={22} />, color: "#34D399" }
  ];

  useEffect(() => {
    if (!isInView) return;
    const startTime = Date.now();
    const updateCounters = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCounts({
        total: Math.floor(easeOut * totalNumber),
        main: Math.floor(easeOut * 15),
        problem: Math.floor(easeOut * 15),
        practice: Math.floor(easeOut * 10),
        special: Math.floor(easeOut * 5),
        presentation: Math.floor(easeOut * 5)
      });
      if (progress < 1) requestAnimationFrame(updateCounters);
    };
    requestAnimationFrame(updateCounters);
  }, [isInView, totalNumber, duration]);

  return (
    <div className="relative overflow-hidden bg-[#1A0033] py-7 md:py-40">
       
      {/* --- PREMIUM GRADIENT LAYERS --- */}
      {/* 1. Base Gradient Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4F0187_0%,#1A0033_100%)]"></div>
      
      {/* 2. Top-Left Light Leak (Cyan) */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
      
      {/* 3. Bottom-Right Glow (Magenta) */}
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px]"></div>

      {/* 4. Subtle Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}></div>

      <Container>
        <div ref={sectionRef} className="relative z-10 flex flex-col items-center">
          
          <div className="text-center mb-6 md:mb-20">
            
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-md">
               আমাদের মোট ক্লাস <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">বিন্যাস</span>
             </h2>
          </div>

          <div className="relative w-full max-w-[250px] h-[250px] md:max-w-[650px] md:h-[650px] flex items-center justify-center">
            
            {/* 1. Orbital Ring Glow */}
            <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.95] md:scale-100 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]" />
            {/* <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/10 scale-[1.1] md:scale-[1.15] animate-[spin_120s_linear_infinite]" /> */}

            {/* 2. CENTER CORE (Glassmorphism) */}
            <div className="relative z-20">
               <motion.div 
                 initial={{ scale: 0.8 }}
                 whileInView={{ scale: 1 }}
                 className="relative w-32 h-32 md:w-72 md:h-72 rounded-full bg-white/[0.03] backdrop-blur-2xl flex flex-col items-center justify-center border border-white/10 shadow-2xl"
               >
                  <h1 className="text-white text-5xl md:text-[150px] font-black tracking-tighter leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                    {counts.total}
                  </h1>
                  <p className="font-black text-cyan-400 text-[10px] md:text-sm tracking-[0.4em] uppercase opacity-80">Classes</p>
               </motion.div>
            </div>

            {/* 3. ORBITING ELEMENTS */}
            <div className="absolute inset-0 w-full h-full">
              {classData.map((item, idx) => {
                const angle = (idx * 72) - 90;
                const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 145 : 300; 
                
                const x = radius * Math.cos(angle * (Math.PI / 180));
                const y = radius * Math.sin(angle * (Math.PI / 180));

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1, x, y }}
                    transition={{ delay: idx * 0.1, duration: 1, type: "spring", stiffness: 40 }}
                    className="absolute left-1/2 top-1/2 -ml-[30px] -mt-[40px] md:-ml-[85px] md:-mt-[55px] w-auto h-auto"
                  >
                    <div className="flex flex-row items-center gap-2 md:gap-4 bg-white/[0.07] backdrop-blur-xl p-2 md:p-3 rounded-xl md:rounded-[1rem] border border-white/10 hover:border-white/30 transition-all group shadow-xl">
                      <div 
                        className="w-6 h-6 md:w-14 md:h-14 shrink-0 rounded-md md:rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                        style={{ background: `linear-gradient(135deg, ${item.color} 0%, #000 150%)`, boxShadow: `0 0 20px ${item.color}44` }}
                      >
                        {item.icon}
                      </div>

                      <div className="text-center md:text-left">
                        <div className="text-xl md:text-4xl font-black text-white leading-none">
                          {counts[item.key as keyof typeof counts]}
                        </div>
                        <h4 className="text-slate-400 font-bold uppercase tracking-tight text-[8px] md:text-[10px] whitespace-nowrap group-hover:text-white transition-colors">
                          {item.name}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
};

export default TotalClass;