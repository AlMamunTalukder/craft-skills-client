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
    // Changed: bg-white, border-slate-200, and added a subtle shadow-sm
    <div className="inline-flex items-center bg-white border border-slate-200 px-1 md:py-1 rounded-full shadow-sm group">
      <div className="flex items-center gap-1 md:gap-3">
        
        {/* Unit Block */}
        <CompactUnit value={timeLeft.days} label="d" color="text-fuchsia-600" />
        <span className="text-slate-400 font-bold -mt-1">:</span>
        
        <CompactUnit value={timeLeft.hours} label="h" color="text-cyan-600" />
        <span className="text-slate-400 font-bold -mt-1">:</span>
        
        <CompactUnit value={timeLeft.minutes} label="m" color="text-indigo-600" />
        <span className="text-slate-400 font-bold -mt-1">:</span>
        
        <CompactUnit value={timeLeft.seconds} label="s" color="text-fuchsia-600" />
        
      </div>
    </div>
  );
};

const CompactUnit = ({ value, label, color }: { value: string; label: string; color: string }) => (
  <div className="flex items-baseline ">
    <div className="relative h-4 overflow-hidden flex items-center justify-center min-w-[1.2rem]">
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
    {/* Changed: label text color to slate-500 for visibility on white */}
    <span className="text-[10px] md:text-[11px] font-bold uppercase text-slate-500 mb-[1px]">
      {label}
    </span>
  </div>
);

export default CountdownTimer;