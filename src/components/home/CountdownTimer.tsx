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

    const target = targetDate
      ? new Date(targetDate)
      : new Date("2025-04-17T21:00:00");

    const now: Date = new Date();
    const difference: number = target.getTime() - now.getTime();

    let timeLeft: TimeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0",
        ),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24),
        ).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
          2,
          "0",
        ),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="text-sm">
      <div className="flex gap-1 md:gap-2 justify-center font-mono leading-[1]">
        <span>{timeLeft.days}</span> :<span>{timeLeft.hours}</span> :
        <span>{timeLeft.minutes}</span> :<span>{timeLeft.seconds}</span>
      </div>
      <div className="text-[11px] md:text-xs flex gap-3 justify-center md:mt-1 leading-[1]">
        <span>DAYS</span>
        <span>HRS</span>
        <span>MINS</span>
        <span>SECS</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
