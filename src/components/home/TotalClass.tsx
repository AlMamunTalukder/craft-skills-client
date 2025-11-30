/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Container from "../shared/Container";
import React from "react";
import Image from "next/image";
import bg50 from "../../../public/img/50.png";
import { useState, useEffect } from 'react';

const TotalClass = ({ totalNumber = 50, duration = 2000 }) => {
  const [mainCount, setMainCount] = useState(0);
  const [problemCount, setProblemCount] = useState(0);
  const [practiceCount, setPracticeCount] = useState(0);
  const [specialCount, setSpecialCount] = useState(0);
  const [presentationCount, setPresentationCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Class counts
  const classData = [
    { name: "মেইন ক্লাস", count: 15, setter: setMainCount },
    { name: "প্রবলেম সলভিং ক্লাস", count: 15, setter: setProblemCount },
    { name: "প্রাকটিস ক্লাস", count: 10, setter: setPracticeCount },
    { name: "স্পেশাল ক্লাস", count: 5, setter: setSpecialCount },
    { name: "প্রেজেন্টেশন রিভিউ ক্লাস", count: 5, setter: setPresentationCount }
  ];

  useEffect(() => {
    // Set up intersection observer to start animation when component is visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });

    // Get the element to observe
    const element = document.getElementById('count-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Reset all counters
    setTotalCount(0);
    classData.forEach(item => item.setter(0));

    // Start the total counter
    const totalIntervalTime = duration / totalNumber;
    let currentTotalCount = 0;
    const totalInterval = setInterval(() => {
      currentTotalCount += 1;
      setTotalCount(currentTotalCount);

      if (currentTotalCount >= totalNumber) {
        clearInterval(totalInterval);
      }
    }, totalIntervalTime);

    // Start individual counters
    classData.forEach(classItem => {
      const intervalTime = duration / classItem.count;
      let currentCount = 0;
      const interval = setInterval(() => {
        currentCount += 1;
        classItem.setter(currentCount);

        if (currentCount >= classItem.count) {
          clearInterval(interval);
        }
      }, intervalTime);
    });

    return () => {
      clearInterval(totalInterval);
      // No need to clear individual intervals as they will be cleared on component unmount
    };
  }, [isVisible, totalNumber, duration]);

  return (
    <Container>
      <div id="count-section" className="mt-8 md:mt-20 border-dashed border-b border-gray-400 pb-10 md:pb-20">
        <div className="relative w-[140px] h-[140px] mx-auto rounded-full overflow-hidden mb-5">
          <div className="absolute inset-0">
            <Image
              src={bg50}
              alt="Count of classes"
              fill
              priority
              className="object-cover scale-150"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white text-[69px] font-bold">
            {totalCount}
          </div>
        </div>
        <h1 className="flex flex-col md:flex-row justify-center gap-2 text-[28px] md:text-[36px] font-[600] md:font-[550] text-center text-[#575757] mb-10 leading-[1]">
          <span>মোট ক্লাস</span>
          <span>সংখ্যা ৫০টি</span>
        </h1>

        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 max-w-4xl mx-auto">
          {classData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg p-1 md:p-2 shadow-md text-center flex flex-col items-center justify-center">
              <div className="md:text-3xl font-[600] text-[#4F0187] mb-2">
                {index === 0 ? mainCount :
                  index === 1 ? problemCount :
                    index === 2 ? practiceCount :
                      index === 3 ? specialCount : presentationCount}
              </div>
              <div className="text-gray-700 text-sm">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default TotalClass;