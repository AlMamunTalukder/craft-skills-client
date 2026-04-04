/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState } from "react";
import { Users, RefreshCw } from "lucide-react";
import { studentAttendanceService } from "@/src/services/studentAttendance";
import { useAttendanceData } from "@/src/hooks/useAttendanceData";
import { AttendanceStatsCard } from "@/src/components/common/AttendanceStatsCard";
import { AttendanceButton } from "@/src/components/common/AttendanceButton";
import { AttendanceCardSkeleton } from "@/src/components/common/AttendanceCardSkeleton";
import { BottomStats } from "@/src/components/common/BottomStats";

const TOTAL_CLASSES = 3;
const GUEST_CLASSES = Array.from({ length: TOTAL_CLASSES }, (_, i) => `Guest Class ${i + 1}`);

export default function GuestClassAttendance() {
  const [refreshing, setRefreshing] = useState(false);
  
  const {
    loading,
    classes: guestClasses,
    loadData,
    toggleAttendance,
    calculateStats,
  } = useAttendanceData(GUEST_CLASSES, "guest");

  const handleToggle = async (className: string, currentStatus: boolean) => {
    await toggleAttendance(className, currentStatus, studentAttendanceService.updateGuestClass);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const stats = calculateStats();
  const isLoading = loading || refreshing;

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-teal-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Guest Class Attendance</h1>
              <p className="text-gray-600 mt-2">Learn from industry experts and guest speakers</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
              {isLoading ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <AttendanceStatsCard
          icon={<Users size={24} />}
          title="Guest Classes Progress"
          subtitle="3 guest lectures with industry professionals"
          percentage={stats.percentage}
          attended={stats.attended}
          total={stats.total}
          loading={isLoading}
          gradientFrom="from-green-600"
          gradientTo="to-teal-700"
          textColor="text-green-100"
        />

        {/* Guest Classes Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Guest Lecture Sessions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: TOTAL_CLASSES }).map((_, i) => <AttendanceCardSkeleton key={i} />)
            ) : (
              guestClasses.map((cls, index) => (
                <AttendanceButton
                  key={index}
                  label={cls.className}
                  attended={cls.attended}
                  onClick={() => handleToggle(cls.className, cls.attended)}
                  attendedClass="border-green-500 bg-green-50 hover:bg-green-100"
                  notAttendedClass="border-red-300 bg-teal-50 hover:bg-red-100 hover:border-red-400"
                />
              ))
            )}
          </div>
        </div>

        {/* Bottom Stats */}
        <BottomStats
          attended={stats.attended}
          remaining={stats.total - stats.attended}
          total={stats.total}
          totalLabel="Total Guest Classes"
          loading={isLoading}
        />
      </div>
    </div>
  );
}