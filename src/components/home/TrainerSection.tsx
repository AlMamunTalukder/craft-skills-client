"use client";
import React from "react";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";

const TrainerSection = () => {
  return (
    <section className="bg-[#FAF9FF] py-8 md:py-24 overflow-hidden">
      {/* We use a custom padding strategy here to maximize width on mobile */}
      <div className="px-2 md:px-4 max-w-7xl mx-auto">
        <div className="md:max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 md:mb-12">
            <SectionTitle text="প্রশিক্ষকদের কাজ" />
          </div>

          {/* Main Feature Video */}
          <div className="relative group mb-4 md:mb-16">
            <div className="relative bg-black rounded-xl md:rounded-[2.5rem] overflow-hidden shadow-2xl aspect-video border border-white/10 transform-gpu">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Xqclr2dhrSE?si=Mcp-QuWtT3Tlu2gZ"
                title="Featured Trainer Work"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* 2-Column Grid: Maximized for Mobile */}
          <div className="grid grid-cols-2 gap-2 md:gap-10">
            {/* Video 1 */}
            <div className="group">
              <div className="bg-white md:p-3 rounded-lg md:rounded-3xl shadow-md md:shadow-xl shadow-purple-100/50 border border-purple-50 transition-transform duration-300 transform-gpu">
                <div className="relative aspect-video rounded-md md:rounded-2xl overflow-hidden bg-slate-200">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/qLNxu8IFsiQ?si=i5YBVQtbCgKYNOTt"
                    title="Trainer Portfolio 1"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Video 2 */}
            <div className="group">
              <div className="bg-white md:p-3 rounded-lg md:rounded-3xl shadow-md md:shadow-xl shadow-purple-100/50 border border-purple-50 transition-transform duration-300 transform-gpu">
                <div className="relative aspect-video rounded-md md:rounded-2xl overflow-hidden bg-slate-200">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/1RxdQgm7-R4?si=ph1pbz4BPLtcgbzb"
                    title="Trainer Portfolio 2"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerSection;
