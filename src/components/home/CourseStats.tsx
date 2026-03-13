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
import { GraduationCap, Users, Star, UserCheck } from "lucide-react"; // Standard LMS Icons

const stats = [
  { 
    id: 1, 
    value: 36, 
    suffix: "+", 
    label: "মোট আবর্তন", 
    icon: <Users className="w-6 h-6" />,
    borderColor: "border-blue-200",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  { 
    id: 2, 
    value: 2500, 
    suffix: "+", 
    label: "কোর্স সম্পন্ন", 
    icon: <GraduationCap className="w-6 h-6" />,
    borderColor: "border-indigo-200",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600"
  },
  { 
    id: 3, 
    value: 99.9, 
    suffix: "%", 
    label: "সন্তুষ্টির হার", 
    icon: <Star className="w-6 h-6" />,
    borderColor: "border-amber-200",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600"
  },
  { 
    id: 4, 
    value: 15, 
    suffix: "+", 
    label: "প্রশিক্ষক", 
    icon: <UserCheck className="w-6 h-6" />,
    borderColor: "border-emerald-200",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
];

// Smooth Animated Counter
const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { stiffness: 45, damping: 20 });
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
    <section className="py-20 bg-[#F8FAFC]"> {/* Light gray background to make white cards pop */}
      <Container>
        <div className="flex flex-col items-center">
          
          <div className="text-center mb-16">
            <SectionTitle text="আমাদের অর্জিত সাফল্য" />
            
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`bg-white p-8 rounded-2xl border ${stat.borderColor} shadow-sm hover:shadow-md transition-shadow duration-300 relative group`}
              >
                {/* Top Corner Icon */}
                <div className={`inline-flex p-3 rounded-xl ${stat.iconBg} ${stat.iconColor} mb-6 transition-transform group-hover:scale-110 duration-300`}>
                  {stat.icon}
                </div>

                <div className="space-y-1">
                  <h3 className="text-4xl font-extrabold text-slate-800 tracking-tight">
                    <AnimatedNumber value={stat.value} />
                    <span className="text-2xl ml-1 font-bold text-slate-400">{stat.suffix}</span>
                  </h3>
                  <p className="text-slate-600 font-medium text-lg">
                    {stat.label}
                  </p>
                </div>

                {/* Subtle bottom accent line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-current opacity-20 w-full rounded-b-2xl ${stat.iconColor}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CourseStats;