"use client";
import React from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";

interface CustomAccordionProps {
  title: string;
  description: string;
  value: string;
  icon: React.ReactNode;
}

export const CustomAccordionItem = ({
  title,
  description,
  value,
  icon,
}: CustomAccordionProps) => {
  return (
    <AccordionItem
      value={value}
      className="border border-white/5 bg-white/[0.03] rounded-lg md:rounded-2xl overflow-hidden px-2 transition-all data-[state=open]:bg-white/10 data-[state=open]:border-purple-500/50 data-[state=open]:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.3)]"
    >
      <AccordionTrigger className="hover:no-underline py-3 md:py-5 px-0 md:px-4 group">
        <div className="flex items-start md:items-center gap-3 md:gap-4 text-left">
          <span className="flex-shrink-0 group-data-[state=open]:scale-110 transition-transform duration-300 mt-0 md:mt-0">
            {icon}
          </span>
          <span className="text-[15px] md:text-[17px] font-bold text-slate-200 group-hover:text-white group-data-[state=open]:text-white transition-colors leading-tight">
            {title}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-6 md:px-10 pb-6 pt-0 ml-4 md:ml-8 border-l border-purple-500/30">
        <div className="text-slate-300 text-[15px] md:text-[16px] leading-relaxed font-medium space-y-2">
          {description.split("\n").map((line, idx) => {
            const parts = line.split(/(https?:\/\/[^\s]+)/g);
            return (
              <p key={idx}>
                {parts.map((part, i) =>
                  part.match(/https?:\/\/[^\s]+/) ? (
                    <Link
                      key={i}
                      href={part}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 break-all transition-colors"
                    >
                      {part}
                    </Link>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </p>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
