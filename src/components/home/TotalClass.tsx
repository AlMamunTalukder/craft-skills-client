/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/exhaustive-deps */
// "use client"
// import Container from "../shared/Container";
// import React from "react";
// import Image from "next/image";
// import bg50 from "../../../public/img/50.png";
// import { useState, useEffect } from 'react';

// const TotalClass = ({ totalNumber = 50, duration = 2000 }) => {
//   const [mainCount, setMainCount] = useState(0);
//   const [problemCount, setProblemCount] = useState(0);
//   const [practiceCount, setPracticeCount] = useState(0);
//   const [specialCount, setSpecialCount] = useState(0);
//   const [presentationCount, setPresentationCount] = useState(0);
//   const [totalCount, setTotalCount] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);

//   // Class counts
//   const classData = [
//     { name: "মেইন ক্লাস", count: 15, setter: setMainCount },
//     { name: "প্রবলেম সলভিং ক্লাস", count: 15, setter: setProblemCount },
//     { name: "প্রাকটিস ক্লাস", count: 10, setter: setPracticeCount },
//     { name: "স্পেশাল ক্লাস", count: 5, setter: setSpecialCount },
//     { name: "প্রেজেন্টেশন রিভিউ ক্লাস", count: 5, setter: setPresentationCount }
//   ];

//   useEffect(() => {
//     // Set up intersection observer to start animation when component is visible
//     const observer = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         setIsVisible(true);
//       }
//     }, { threshold: 0.1 });

//     // Get the element to observe
//     const element = document.getElementById('count-section');
//     if (element) {
//       observer.observe(element);
//     }

//     return () => {
//       if (element) {
//         observer.unobserve(element);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!isVisible) return;

//     // Reset all counters
//     setTotalCount(0);
//     classData.forEach(item => item.setter(0));

//     // Start the total counter
//     const totalIntervalTime = duration / totalNumber;
//     let currentTotalCount = 0;
//     const totalInterval = setInterval(() => {
//       currentTotalCount += 1;
//       setTotalCount(currentTotalCount);

//       if (currentTotalCount >= totalNumber) {
//         clearInterval(totalInterval);
//       }
//     }, totalIntervalTime);

//     // Start individual counters
//     classData.forEach(classItem => {
//       const intervalTime = duration / classItem.count;
//       let currentCount = 0;
//       const interval = setInterval(() => {
//         currentCount += 1;
//         classItem.setter(currentCount);

//         if (currentCount >= classItem.count) {
//           clearInterval(interval);
//         }
//       }, intervalTime);
//     });

//     return () => {
//       clearInterval(totalInterval);
//       // No need to clear individual intervals as they will be cleared on component unmount
//     };
//   }, [isVisible, totalNumber, duration]);

//   return (
//     <Container>
//       <div id="count-section" className="mt-8 md:mt-20 border-dashed border-b border-gray-400 pb-10 md:pb-20">
//         <div className="relative w-[140px] h-[140px] mx-auto rounded-full overflow-hidden mb-5">
//           <div className="absolute inset-0">
//             <Image
//               src={bg50}
//               alt="Count of classes"
//               fill
//               priority
//               className="object-cover scale-150"
//             />
//           </div>
//           <div className="absolute inset-0 flex items-center justify-center text-white text-[69px] font-bold">
//             {totalCount}
//           </div>
//         </div>
//         <h1 className="flex flex-col md:flex-row justify-center gap-2 text-[28px] md:text-[36px] font-[600] md:font-[550] text-center text-[#575757] mb-10 leading-[1]">
//           <span>মোট ক্লাস</span>
//           <span>সংখ্যা ৫০টি</span>
//         </h1>

//         <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 max-w-4xl mx-auto">
//           {classData.map((item, index) => (
//             <div key={index} className="bg-white rounded-lg p-1 md:p-2 shadow-md text-center flex flex-col items-center justify-center">
//               <div className="md:text-3xl font-[600] text-[#4F0187] mb-2">
//                 {index === 0 ? mainCount :
//                   index === 1 ? problemCount :
//                     index === 2 ? practiceCount :
//                       index === 3 ? specialCount : presentationCount}
//               </div>
//               <div className="text-gray-700 text-sm">
//                 {item.name}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default TotalClass;
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
    <div className="relative overflow-hidden bg-[#1A0033] py-24 md:py-40">
      
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
          
          <div className="text-center mb-20">
            
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-md">
               আমাদের মোট ক্লাস <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">বিন্যাস</span>
             </h2>
          </div>

          <div className="relative w-full max-w-[320px] h-[320px] md:max-w-[650px] md:h-[650px] flex items-center justify-center">
            
            {/* 1. Orbital Ring Glow */}
            <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.95] md:scale-100 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]" />
            <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/10 scale-[1.1] md:scale-[1.15] animate-[spin_120s_linear_infinite]" />

            {/* 2. CENTER CORE (Glassmorphism) */}
            <div className="relative z-20">
               <motion.div 
                 initial={{ scale: 0.8 }}
                 whileInView={{ scale: 1 }}
                 className="relative w-44 h-44 md:w-72 md:h-72 rounded-full bg-white/[0.03] backdrop-blur-2xl flex flex-col items-center justify-center border border-white/10 shadow-2xl"
               >
                  <h1 className="text-white text-7xl md:text-[150px] font-black tracking-tighter leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
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
                    className="absolute left-1/2 top-1/2 -ml-[60px] -mt-[40px] md:-ml-[85px] md:-mt-[55px] w-auto h-auto"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 bg-white/[0.07] backdrop-blur-xl p-2 md:p-3 rounded-[1rem] border border-white/10 hover:border-white/30 transition-all group shadow-xl">
                      <div 
                        className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
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