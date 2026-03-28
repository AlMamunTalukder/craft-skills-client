"use client";
import React, { useMemo } from "react";
import { Clock, Calendar, Bell, Calendar1 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import { ScheduleGroup } from "@/types";

type Props = {
  scheduleData: ScheduleGroup[] | ScheduleGroup | null;
};

export const ClassRoutine = ({ scheduleData }: Props) => {
  const displaySchedule = useMemo(() => {
    const dataArray = Array.isArray(scheduleData)
      ? scheduleData
      : scheduleData
      ? [scheduleData]
      : [];
    return dataArray.find((item) => item.isActive) || dataArray[0];
  }, [scheduleData]);

  if (!displaySchedule || !displaySchedule.schedules?.length) {
    return (
      <Container>
        <div className="mt-8 md:mt-20 text-center py-20 bg-purple-50 rounded-3xl border border-dashed border-purple-200">
          <SectionTitle text="ক্লাস শিডিউল" />
          <p className="text-gray-500 mt-4 font-medium">
            শীঘ্রই ক্লাস শিডিউল আপডেট করা হবে
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-8 md:mt-24 md:mb-20">
        {/* Header Section - Static for performance */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
         
          <SectionTitle text="আমাদের ক্লাস শিডিউল" />
        </div>

        {/* Modern Schedule Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 ">
          {displaySchedule.schedules.map((routine, index) => (
            <div key={routine._id || index} className="group">
              <Card className="h-full border-none shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all duration-300 bg-white rounded-3xl overflow-hidden relative border-b-4 border-transparent hover:border-purple-600 hover:-translate-y-1 transform-gpu">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-purple-50 rounded-bl-full -mr-4 -mt-4 group-hover:bg-purple-600 transition-colors duration-300" />

                <CardContent className="p-2 md:p-8 relative z-10 h-full flex flex-col">
                  {/* Class Name */}
                  <div className="mb-4 md:mb-6">
                    <h4 className="text-sm md:text-xl font-black text-[#2e1065] leading-tight pt-1 group-hover:text-purple-700 transition-colors">
                      {routine.className}
                    </h4>
                  </div>

                  <div className="space-y-3 md:space-y-4 mt-auto">
                    {/* Days */}
                    <div className="flex items-start gap-2 md:gap-3">
                      <div className="p-1.5 md:p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                        <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                          দিন
                        </span>
                        <p className="text-slate-700 text-[11px] md:text-base font-bold leading-tight pt-0.5 md:pt-1">
                          {routine.days}
                        </p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-2 md:gap-3">
                      <div className="p-1.5 md:p-2 bg-orange-50 text-orange-600 rounded-lg shrink-0">
                        <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                          সময়
                        </span>
                        <p className="text-slate-700 text-[11px] md:text-base font-bold leading-tight pt-0.5 md:pt-1">
                          {routine.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Holiday / Footer Info */}
        {displaySchedule.holidays && (
          <div className="max-w-[1100px] mx-auto mt-8 md:mt-10 px-2">
            <div className="flex items-center justify-center gap-3 p-4 md:p-5 bg-[#2e1065] text-white rounded-2xl shadow-lg border border-white/10">
              <Bell className="w-5 h-5 text-purple-300" />
              <span className="font-bold text-sm md:text-lg">
                {displaySchedule.holidays}
              </span>
            </div>
          </div>
        )}

        <div className="border-b border-gray-100 mt-16 md:mt-20" />
      </div>
    </Container>
  );
};
