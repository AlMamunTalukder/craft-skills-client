"use client";
import Container from "../shared/Container";
import React, { useRef, useMemo } from "react";
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import { Layers, HelpCircle, Dumbbell, Star, Video } from "lucide-react";

// Optimized Counter Component to prevent parent re-renders
const Counter = ({ value }: { value: number }) => {
  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });
  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest)
  );
  const ref = useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const TotalClass = ({ totalNumber = 50 }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const classData = useMemo(
    () => [
      {
        name: "মেইন ক্লাস",
        key: "main",
        count: 15,
        icon: <Layers size={22} />,
        color: "#60A5FA",
      },
      {
        name: "প্রবলেম সলভিং",
        key: "problem",
        count: 15,
        icon: <HelpCircle size={22} />,
        color: "#818CF8",
      },
      {
        name: "প্রাক্টিস ক্লাস",
        key: "practice",
        count: 10,
        icon: <Dumbbell size={22} />,
        color: "#A78BFA",
      },
      {
        name: "স্পেশাল ক্লাস",
        key: "special",
        count: 5,
        icon: <Star size={22} />,
        color: "#FBBF24",
      },
      {
        name: "রিভিউ ক্লাস",
        key: "presentation",
        count: 5,
        icon: <Video size={22} />,
        color: "#34D399",
      },
    ],
    []
  );

  return (
    <div className="relative overflow-hidden bg-[#1A0033] py-10 md:py-40">
      {/* --- PREMIUM GRADIENT LAYERS (Untouched Design) --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#4F0187_0%,#1A0033_100%)]"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px]"></div>
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
        }}
      ></div>

      <Container>
        <div
          ref={sectionRef}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-[34px] md:text-6xl font-black text-white tracking-tight drop-shadow-md">
              আমাদের মোট ক্লাস{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
                বিন্যাস
              </span>
            </h2>
          </div>

          <div className="relative w-full max-w-[250px] h-[250px] md:max-w-[650px] md:h-[650px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.95] md:scale-100 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]" />

            {/* --- CENTER CORE --- */}
            <div className="relative z-20">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                className="relative w-32 h-32 md:w-72 md:h-72 rounded-full bg-white/[0.03] backdrop-blur-2xl flex flex-col items-center justify-center border border-white/10 shadow-2xl"
              >
                <h1 className="text-white text-5xl md:text-[150px] font-black tracking-tighter leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {isInView ? <Counter value={totalNumber} /> : "0"}
                </h1>
                <p className="font-black text-cyan-400 text-[10px] md:text-sm tracking-[0.4em] uppercase opacity-80">
                  Classes
                </p>
              </motion.div>
            </div>

            {/* --- ORBITING ELEMENTS --- */}
            <div className="absolute inset-0 w-full h-full">
              {classData.map((item, idx) => {
                const angle = idx * 72 - 90;
                // Simplified radius logic for performance
                const radius =
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? 140
                    : 300;
                const x = radius * Math.cos(angle * (Math.PI / 180));
                const y = radius * Math.sin(angle * (Math.PI / 180));

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1, x, y } : {}}
                    transition={{
                      delay: idx * 0.1,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 50,
                    }}
                    className="absolute left-1/2 top-1/2 -ml-[45px] -mt-[15px] md:-ml-[85px] md:-mt-[55px]"
                  >
                    <div className="flex flex-row items-center gap-1 md:gap-4 bg-white/[0.07] backdrop-blur-xl p-2 md:p-3 rounded-xl md:rounded-[1rem] border border-white/10 hover:border-white/30 transition-all group shadow-xl">
                      <div
                        className="w-6 h-6 md:w-14 md:h-14 shrink-0 rounded-md md:rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${item.color} 0%, #000 150%)`,
                          boxShadow: `0 0 15px ${item.color}33`,
                        }}
                      >
                        {item.icon}
                      </div>

                      <div className="text-center md:text-left">
                        <div className="text-xl md:text-4xl font-black text-white leading-none">
                          {isInView ? <Counter value={item.count} /> : "0"}
                        </div>
                        <h4 className="text-slate-300 md:font-bold uppercase tracking-tight text-[9px] md:text-[10px] whitespace-nowrap group-hover:text-white transition-colors">
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
