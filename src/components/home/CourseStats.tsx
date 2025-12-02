// "use client";
// import { useEffect, useState, useMemo } from "react";
// import Container from "../shared/Container";
// import { motion } from "framer-motion";
// import { SiteContent } from "@prisma/client";

// const duration = 1500;

// const CourseStats = ({ data }: { data: SiteContent }) => {
//   // Memoize the stats array to prevent recreating on every render
//   const stats = useMemo(
//     () => [
//       {
//         value: data.totalBatches || 25,
//         suffix: "+",
//         label: "মোট আবর্তন",
//         color: "text-teal-500",
//       },
//       {
//         value: data.totalCourses || 1500,
//         suffix: "+",
//         label: "কোর্স সম্পন্ন করেছে",
//         color: "text-rose-500",
//       },
//       {
//         value: data.successRate || 99.9,
//         suffix: "%",
//         label: "শিক্ষার্থীদের সন্তুষ্টির হার",
//         color: "text-purple-500",
//       },
//       {
//         value: data.totalsTeachers || 15,
//         suffix: "+",
//         label: "প্রশিক্ষক",
//         color: "text-yellow-500",
//       },
//     ],
//     [
//       data.totalBatches,
//       data.totalCourses,
//       data.successRate,
//       data.totalsTeachers,
//     ],
//   );

//   const columns = 2;
//   const [counts, setCounts] = useState(() => stats.map(() => 0));
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const el = document.getElementById("stats-section");
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.2 },
//     );

//     if (el) {
//       observer.observe(el);
//     }

//     return () => {
//       if (el) {
//         observer.unobserve(el);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!isVisible) return;

//     const intervals = stats.map((stat, i) => {
//       const step = stat.value / (duration / 30);
//       let current = 0;

//       return setInterval(() => {
//         current += step;
//         setCounts((prev) => {
//           const updated = [...prev];
//           updated[i] = current >= stat.value ? stat.value : current;
//           return updated;
//         });

//         if (current >= stat.value) {
//           clearInterval(intervals[i]);
//         }
//       }, 30);
//     });

//     return () => intervals.forEach(clearInterval);
//   }, [isVisible, stats]);

//   return (
//     <Container>
//       <section id="stats-section" className="relative mt-20">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
//           className="hidden md:block absolute z-20 top-0 left-28 w-40 h-40 rounded-full border-8 border-dashed border-[#D423F7] transform -translate-x-1/2 -translate-y-1/2"
//         />

//         {/* Stats Grid */}
//         <div className="max-w-3xl mx-auto bg-white rounded-md p-2 md:p-10 grid grid-cols-2 gap-0 text-center z-10 relative border border-dashed border-gray-200 overflow-hidden">
//           {stats.map((stat, index) => {
//             const isRightCol = (index + 1) % columns !== 0;
//             const isBottomRow = index < stats.length - columns;

//             return (
//               <motion.div
//                 key={index}
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 whileInView={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.4, delay: index * 0.2 }}
//                 viewport={{ once: true }}
//               >
//                 <div
//                   className={`p-2 md:p-6 border-gray-300
//                     ${isBottomRow ? "md:border-b" : ""}
//                     ${isRightCol ? "md:border-r" : ""}
//                   `}
//                 >
//                   <h3 className={`text-4xl font-bold ${stat.color}`}>
//                     {Math.floor(counts[index])}
//                     {stat.suffix}
//                   </h3>
//                   <p className="mt-1 text-gray-800 md:text-[22px] font-[500]">
//                     {stat.label}
//                   </p>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </section>
//     </Container>
//   );
// };

// export default CourseStats;
import React from 'react';

const CourseStats = () => {
  return (
    <div>
      course state
    </div>
  );
};

export default CourseStats;
