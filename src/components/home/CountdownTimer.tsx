/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface CountdownTimerProps {
  targetDate?: string | Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    if (!targetDate) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    const target = new Date(targetDate); // ✅ USE DIRECTLY (NO conversion)
    const now = new Date();

    const difference = target.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0",
      ),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0",
      ),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
        2,
        "0",
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  console.log("TARGET RAW:", targetDate);
console.log("TARGET PARSED:", new Date(targetDate as string));

  // Sub-component for each time block
  const TimeUnit = ({
    value,
    label,
    shortLabel,
  }: {
    value: string;
    label: string;
    shortLabel: string;
  }) => (
    <div className="flex flex-row items-baseline md:flex-col md:items-center gap-0.5 md:gap-0">
      <span className="text-[13px] md:text-xl md:font-bold font-mono tracking-tighter md:tracking-normal leading-none">
        {value}
      </span>
      <span className="text-[10px] md:text-[10px] md:font-semibold opacity-90">
        <span className="md:hidden text-purple-200">{shortLabel}</span>
        <span className="hidden md:inline text-white/80">{label}</span>
      </span>
    </div>
  );

  const Separator = () => (
    <span className="text-white/40 mb-0 -mt-1 md:mb-4 animate-pulse md:font-bold">
      :
    </span>
  );

  return (
    <div className="flex items-center justify-center content-center gap-1 md:gap-2 bg-white/10 md:bg-transparent px-2 md:px-3 py-0 md:p-2 rounded-md md:rounded-lg border border-white/30 md:border-white shadow-inner">
      <TimeUnit value={timeLeft.days} label="DAYS" shortLabel="d" />
      <Separator />
      <TimeUnit value={timeLeft.hours} label="HRS" shortLabel="h" />
      <Separator />
      <TimeUnit value={timeLeft.minutes} label="MINS" shortLabel="m" />
      <Separator />
      <TimeUnit value={timeLeft.seconds} label="SECS" shortLabel="s" />
    </div>
  );
};

export default CountdownTimer;
