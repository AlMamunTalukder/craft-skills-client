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



/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Container from "../shared/Container";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import bg50 from "../../../public/img/50.png";
import { motion, useInView } from "framer-motion";
import { Layers, HelpCircle, Dumbbell, Star, Video, Layout } from "lucide-react";

const TotalClass = ({ totalNumber = 50, duration = 2000 }) => {
  const [counts, setCounts] = useState({
    total: 0,
    main: 0,
    problem: 0,
    practice: 0,
    special: 0,
    presentation: 0
  });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const classData = [
    { name: "মেইন ক্লাস", key: "main", count: 15, icon: <Layers size={20} /> },
    { name: "প্রবলেম সলভিং", key: "problem", count: 15, icon: <HelpCircle size={20} /> },
    { name: "প্রাক্টিস ক্লাস", key: "practice", count: 10, icon: <Dumbbell size={20} /> },
    { name: "স্পেশাল ক্লাস", key: "special", count: 5, icon: <Star size={20} /> },
    { name: "রিভিউ ক্লাস", key: "presentation", count: 5, icon: <Video size={20} /> }
  ];

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();

    const updateCounters = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      setCounts({
        total: Math.floor(progress * totalNumber),
        main: Math.floor(progress * 15),
        problem: Math.floor(progress * 15),
        practice: Math.floor(progress * 10),
        special: Math.floor(progress * 5),
        presentation: Math.floor(progress * 5)
      });

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      }
    };

    requestAnimationFrame(updateCounters);
  }, [isInView, totalNumber, duration]);

  return (
    <div className="relative overflow-hidden bg-slate-50/50 py-16 md:py-24">
      

      <Container>
        <div ref={sectionRef} className="relative z-10">
          
          {/* Main 50 Badge with Pulse Effect */}
          <div className="relative w-[180px] h-[180px] mx-auto mb-8">
            <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-purple-600/10 blur-xl" 
            />
            <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl bg-purple-600 flex items-center justify-center">
              <Image
                src={bg50}
                alt="50 background"
                fill
                className="object-cover opacity-40 scale-125"
              />
              <span className="relative z-10 text-white text-[75px] font-black tracking-tighter">
                {counts.total}
              </span>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-2">
              মোট ক্লাস সংখ্যা <span className="text-[#4F0187]">৫০টি</span>
            </h2>
            <div className="h-1.5 w-24 bg-[#4F0187] mx-auto rounded-full" />
          </motion.div>

          {/* Individual Counter Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
            {classData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(79,1,135,0.05)] border border-slate-100 flex flex-col items-center group hover:border-purple-200 transition-all"
              >
                <div className="p-3 bg-purple-50 text-[#4F0187] rounded-2xl mb-4 group-hover:bg-[#4F0187] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div className="text-4xl font-black text-[#4F0187] mb-1">
                  {counts[item.key as keyof typeof counts]}
                </div>
                <div className="text-slate-600 font-bold text-sm text-center">
                  {item.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TotalClass;