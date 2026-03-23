"use client";
import React, { useRef, useEffect, useState } from "react";
import Container from "../shared/Container";
import { GraduationCap, Users, ShieldCheck, UserCheck } from "lucide-react";

const statsData = [
  {
    id: 1,
    value: 36,
    suffix: "+",
    label: "মোট ব্যাচ সম্পন্ন",
    icon: Users,
    color: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    id: 2,
    value: 2500,
    suffix: "+",
    label: "সফল শিক্ষার্থী",
    icon: GraduationCap,
    color: "from-emerald-400 to-cyan-500",
  },
  {
    id: 3,
    value: 99.9,
    suffix: "%",
    label: "সন্তুষ্টির হার",
    icon: ShieldCheck,
    color: "from-blue-500 to-blue-700",
  },
  {
    id: 4,
    value: 15,
    suffix: "+",
    label: "প্রশিক্ষক মণ্ডলী",
    icon: UserCheck,
    color: "from-rose-400 to-orange-500",
  },
];

/**
 * A lightweight counter using requestAnimationFrame for 60fps performance
 */
const PureAnimatedNumber = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let startTimestamp: number | null = null;
          const duration = 2000; // 2 seconds

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min(
              (timestamp - startTimestamp) / duration,
              1
            );

            // Ease-out expo function for a "premium" feel
            const easeProgress =
              progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            setCount(easeProgress * value);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {value % 1 === 0 ? Math.floor(count).toLocaleString() : count.toFixed(1)}
    </span>
  );
};

const CourseStats = () => {
  return (
    <section className="py-12 md:py-24 bg-[#370472] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <Container>
        <div className="relative z-10">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-3xl md:text-6xl font-black text-white leading-tight">
              আমাদের অর্জিত{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
                গৌরবময় মাইলফলক
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {statsData.map((stat) => (
              <div key={stat.id} className="group relative">
                {/* Tailwind transition-all + transform-gpu replaces motion.div 
                  Added transition-delay based on ID for a staggered entrance effect 
                */}
                <div className="h-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[2.5rem] p-4 md:p-8 transition-all duration-500 hover:bg-slate-900/60 hover:border-white/20 hover:-translate-y-2 transform-gpu">
                  {/* CSS-only Floating Icon Animation */}
                  <div
                    className={`w-10 h-10 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 md:mb-10 shadow-lg shadow-black/30 animate-float`}
                  >
                    <stat.icon
                      size={28}
                      strokeWidth={2}
                      className="md:w-8 md:h-8"
                    />
                  </div>

                  <div className="space-y-1 md:space-y-3">
                    <div className="flex items-baseline gap-0.5 md:gap-1">
                      <h3 className="text-2xl md:text-5xl font-black text-white tracking-tight">
                        <PureAnimatedNumber value={stat.value} />
                      </h3>
                      <span
                        className={`text-lg md:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      >
                        {stat.suffix}
                      </span>
                    </div>

                    <p className="text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-widest leading-tight">
                      {stat.label}
                    </p>
                  </div>

                  {/* Corner Accent Detail */}
                  <div
                    className={`absolute bottom-6 right-8 w-1 h-12 bg-gradient-to-b ${stat.color} rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 hidden md:block`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Internal CSS for the Floating Animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CourseStats;
