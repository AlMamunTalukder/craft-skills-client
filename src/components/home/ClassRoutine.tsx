import { Clock, Calendar, Bell, Calendar1 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import Container from "../shared/Container";
import SectionTitle from "../shared/SectionTitle";
import { ScheduleGroup } from "@/types";

type Props = {
  scheduleData: ScheduleGroup[] | ScheduleGroup | null;
};

export const ClassRoutine = ({ scheduleData }: Props) => {
  const dataArray = Array.isArray(scheduleData)
    ? scheduleData
    : scheduleData
      ? [scheduleData]
      : [];

  const displaySchedule =
    dataArray.find((item) => item.isActive) || dataArray[0];

  if (!displaySchedule || !displaySchedule.schedules?.length) {
    return (
      <Container>
        <div className="mt-8 md:mt-20 text-center py-20 bg-purple-50 rounded-3xl border border-dashed border-purple-200">
          <SectionTitle text="ক্লাস শিডিউল" />
          <p className="text-gray-500 mt-4">শীঘ্রই ক্লাস শিডিউল আপডেট করা হবে</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-12 md:mt-24 md:mb-20">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-5 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-4">
            <Calendar1 className="w-4 h-4" />
            <span>সাপ্তাহিক রুটিন</span>
          </div>
          <SectionTitle text="আমাদের ক্লাস শিডিউল" />
        </div>

        {/* Modern Schedule Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1100px] mx-auto">
          {displaySchedule.schedules.map((routine, index) => (
            <div key={routine._id || index} className="group">
              <Card className="h-full border-none shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all duration-500 bg-white rounded-3xl overflow-hidden relative border-b-4 border-transparent hover:border-purple-600">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-full -mr-4 -mt-4 group-hover:bg-purple-600 transition-colors duration-500" />
                
                <CardContent className="p-3 md:p-8 relative z-10 h-full flex flex-col">
                  {/* Class Name */}
                  <div className="mb-3 md:mb-6">
                    <h4 className="md:text-xl font-black text-[#2e1065] leading-tight pt-1 group-hover:text-purple-700 transition-colors">
                      {routine.className}
                    </h4>
                  </div>

                  <div className="space-y-4 mt-auto">
                    {/* Days */}
                    <div className="flex items-start gap-3">
                      <div className="md:p-2 bg-purple-50 text-purple-600 rounded-lg shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">দিন</span>
                        <p className="text-slate-700 text-xs md:text-lg font-bold pt-1">{routine.days}</p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-50 text-orange-600 rounded-lg shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block uppercase font-bold tracking-wider">সময়</span>
                        <p className="text-slate-700 text-xs md:text-base font-bold pt-1">{routine.time}</p>
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
          <div className="max-w-[1100px] mx-auto mt-10">
            <div className="flex items-center justify-center gap-3 p-5 bg-[#2e1065] text-white rounded-2xl shadow-lg shadow-purple-100">
              <Bell className="w-5 h-5 text-purple-300 animate-bounce" />
              <span className="font-bold text-lg pt-1">{displaySchedule.holidays}</span>
            </div>
          </div>
        )}

        <div className="border-b border-gray-100 mt-20" />
      </div>
    </Container>
  );
};