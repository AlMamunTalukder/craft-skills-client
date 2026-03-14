// "use client";
// import { useEffect, useState, useMemo } from "react";
// import Container from "../shared/Container";
// import { motion } from "framer-motion";

// const duration = 1500;

// const CourseStats = () => {
//   // Static stats (NO dynamic props, NO SiteContent)
//   const stats = useMemo(
//     () => [
//       {
//         value: 36,
//         suffix: "+",
//         label: "মোট আবর্তন",
//         color: "text-teal-500",
//       },
//       {
//         value: 2500,
//         suffix: "+",
//         label: "কোর্স সম্পন্ন করেছে",
//         color: "text-rose-500",
//       },
//       {
//         value: 99.9,
//         suffix: "%",
//         label: "শিক্ষার্থীদের সন্তুষ্টির হার",
//         color: "text-purple-500",
//       },
//       {
//         value: 15,
//         suffix: "+",
//         label: "প্রশিক্ষক",
//         color: "text-yellow-500",
//       },
//     ],
//     [],
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

//     if (el) observer.observe(el);

//     return () => {
//       if (el) observer.unobserve(el);
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
"use client";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import { GraduationCap, Users, Star, UserCheck } from "lucide-react";

const stats = [
  { 
    id: 1, 
    value: 36, 
    suffix: "+", 
    label: "মোট ব্যাচ সম্পন্ন", 
    icon: <Users className="w-6 h-6" />,
    theme: "indigo"
  },
  { 
    id: 2, 
    value: 2500, 
    suffix: "+", 
    label: "সফল শিক্ষার্থী", 
    icon: <GraduationCap className="w-6 h-6" />,
    theme: "purple"
  },
  { 
    id: 3, 
    value: 99.9, 
    suffix: "%", 
    label: "সন্তুষ্টির হার", 
    icon: <Star className="w-6 h-6" />,
    theme: "amber"
  },
  { 
    id: 4, 
    value: 15, 
    suffix: "+", 
    label: "প্রশিক্ষক মণ্ডলী", 
    icon: <UserCheck className="w-6 h-6" />,
    theme: "emerald"
  },
];

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
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
    <section className="py-20 bg-slate-50"> 
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header with Academic Alignment */}
              <SectionTitle text="আমাদের অর্জিত সাফল্য" />
         

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-[#4F0187]/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 group"
              >
                {/* Icon with Professional LMS Framing */}
                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-[#4F0187] group-hover:text-white transition-colors duration-500 mb-6">
                  {stat.icon}
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 flex items-baseline gap-1">
                    <AnimatedNumber value={stat.value} />
                    <span className="text-xl font-bold text-[#4F0187]">{stat.suffix}</span>
                  </h3>
                  
                  <p className="text-slate-500 font-semibold text-sm md:text-base tracking-tight uppercase">
                    {stat.label}
                  </p>
                </div>

                {/* Subtle Modern Accent */}
                <div className="mt-6 w-full h-[2px] bg-slate-100 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-[#4F0187]"
                  />
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