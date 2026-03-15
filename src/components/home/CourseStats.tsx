"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import Container from "../shared/Container";
import { GraduationCap, Users, ShieldCheck, UserCheck, Activity } from "lucide-react";

const stats = [
  { id: 1, value: 36, suffix: "+", label: "মোট ব্যাচ সম্পন্ন", icon: <Users />, color: "from-indigo-500 via-purple-500 to-pink-500" },
  { id: 2, value: 2500, suffix: "+", label: "সফল শিক্ষার্থী", icon: <GraduationCap />, color: "from-emerald-400 to-cyan-500" },
  { id: 3, value: 99.9, suffix: "%", label: "সন্তুষ্টির হার", icon: <ShieldCheck />, color: "from-blue-500 to-blue-700" }, // Replaced Yellow with Royal Blue
  { id: 4, value: 15, suffix: "+", label: "প্রশিক্ষক মণ্ডলী", icon: <UserCheck />, color: "from-rose-400 to-orange-500" },
];

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 25, damping: 15 });
  const display = useTransform(spring, (current) =>
    value % 1 === 0 ? Math.floor(current).toLocaleString() : current.toFixed(1)
  );

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const CourseStats = () => {
  return (
    // Background: Dark-Light Slate (Not pure black)
    <section className="py-24 bg-[#370472] relative overflow-hidden">
      {/* Focusing System 1: Ambient Mesh Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-0" />

      <Container>
        <div className="relative z-10">
          <div className="text-center mb-16">
            
            <h2 className="text-4xl md:text-6xl font-black text-white">
               আমাদের অর্জিত <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">গৌরবময় মাইলফলক</span> 
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                // Focusing System 2: Hover Lift & Border Glow
                className="group relative"
              >
                <div className="h-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 transition-all duration-500 group-hover:bg-slate-900/60 group-hover:border-white/20 group-hover:-translate-y-2">
                  
                  {/* Focusing System 3: Floating Icon Logic */}
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-10 shadow-lg shadow-black/20`}
                  >
                    {stat.icon}
                    {/* {React.cloneElement(stat.icon as React.ReactElement, { size: 32, strokeWidth: 1.5 })} */}
                  </motion.div>

                  <div className="space-y-3">
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        <AnimatedNumber value={stat.value} />
                      </h3>
                      <span className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.suffix}
                      </span>
                    </div>
                    
                    <p className="text-slate-400 text-sm md:text-base font-bold uppercase tracking-wider leading-relaxed">
                      {stat.label}
                    </p>
                  </div>

                  {/* Corner Accent Detail */}
                  <div className={`absolute bottom-6 right-8 w-1 h-12 bg-gradient-to-b ${stat.color} rounded-full opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>

          
        </div>
      </Container>
    </section>
  );
};

export default CourseStats;