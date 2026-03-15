// /* eslint-disable react-hooks/exhaustive-deps */
// "use client";

// import React, { useEffect, useState } from "react";

// interface TimeLeft {
//   days: string;
//   hours: string;
//   minutes: string;
//   seconds: string;
// }

// interface CountdownTimerProps {
//   targetDate?: string | Date;
// }

// const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
//   const calculateTimeLeft = (): TimeLeft => {

//     const target = targetDate
//       ? new Date(targetDate)
//       : new Date("2025-04-17T21:00:00");

//     const now: Date = new Date();
//     const difference: number = target.getTime() - now.getTime();

//     let timeLeft: TimeLeft = {
//       days: "00",
//       hours: "00",
//       minutes: "00",
//       seconds: "00",
//     };

//     if (difference > 0) {
//       timeLeft = {
//         days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
//           2,
//           "0",
//         ),
//         hours: String(
//           Math.floor((difference / (1000 * 60 * 60)) % 24),
//         ).padStart(2, "0"),
//         minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
//           2,
//           "0",
//         ),
//         seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
//       };
//     }

//     return timeLeft;
//   };

//   const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [targetDate]);

//   return (
//     <div className="text-sm">
//       <div className="flex gap-1 md:gap-2 justify-center font-mono leading-[1]">
//         <span>{timeLeft.days}</span> :<span>{timeLeft.hours}</span> :
//         <span>{timeLeft.minutes}</span> :<span>{timeLeft.seconds}</span>
//       </div>
//       <div className="text-[11px] md:text-xs flex gap-3 justify-center md:mt-1 leading-[1]">
//         <span>DAYS</span>
//         <span>HRS</span>
//         <span>MINS</span>
//         <span>SECS</span>
//       </div>
//     </div>
//   );
// };

// export default CountdownTimer;
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const CountdownTimer: React.FC<{ targetDate?: string | Date }> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const target = targetDate ? new Date(targetDate) : new Date("2026-12-31T23:59:59");
    const now = new Date();
    const difference = target.getTime() - now.getTime();

    let timeLeft: TimeLeft = { days: "00", hours: "00", minutes: "00", seconds: "00" };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="inline-flex items-center bg-white/5 backdrop-blur-md border border-white/50 px-3 py-1.5 rounded-full shadow-inner group">
      <div className="flex items-center gap-1.5 md:gap-3">
        
        {/* Unit Block */}
        <CompactUnit value={timeLeft.days} label="d" color="text-purple-400" />
        <span className="text-white/20 font-light -mt-1">:</span>
        
        <CompactUnit value={timeLeft.hours} label="h" color="text-cyan-400" />
        <span className="text-white/20 font-light -mt-1">:</span>
        
        <CompactUnit value={timeLeft.minutes} label="m" color="text-indigo-400" />
        <span className="text-white/20 font-light -mt-1">:</span>
        
        <CompactUnit value={timeLeft.seconds} label="s" color="text-fuchsia-400" />
        
      </div>
    </div>
  );
};

const CompactUnit = ({ value, label, color }: { value: string; label: string; color: string }) => (
  <div className="flex items-baseline gap-0.5">
    <div className="relative h-6 overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`text-sm md:text-base font-black font-mono tracking-tight ${color}`}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
    <span className="text-[9px] md:text-[10px] font-bold uppercase text-slate-500 mb-[1px]">
      {label}
    </span>
  </div>
);

export default CountdownTimer;