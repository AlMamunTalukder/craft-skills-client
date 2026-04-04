/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState } from "react";
import { BarChart3, RefreshCw } from "lucide-react";
import { studentAttendanceService } from "@/src/services/studentAttendance";
import { useMainClassData } from "@/src/hooks/useMainClassData";
import { AttendanceStatsCard } from "@/src/components/common/AttendanceStatsCard";
import { MainClassCard } from "@/src/components/common/MainClassCard";
import { MainClassSkeleton } from "@/src/components/common/MainClassSkeleton";
import { BottomStats } from "@/src/components/common/BottomStats";

const TOTAL_CLASSES = 15;
const SESSIONS_PER_CLASS = 3;
const TOTAL_SESSIONS = TOTAL_CLASSES * SESSIONS_PER_CLASS;
const MAIN_CLASSES = Array.from({ length: TOTAL_CLASSES }, (_, i) => `Class ${i + 1}`);

export default function MainClassAttendancePage() {
  const [refreshing, setRefreshing] = useState(false);
  
  const {
    loading,
    classes: mainClasses,
    loadData,
    toggleAttendance,
    calculateStats,
  } = useMainClassData(MAIN_CLASSES);

  const handleToggle = async (
    className: string,
    sessionType: 'regular' | 'problemSolving' | 'practice'
  ) => {
    const currentClass = mainClasses.find(c => c.className === className);
    if (currentClass) {
      await toggleAttendance(className, sessionType, currentClass[sessionType]);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const stats = calculateStats();
  const isLoading = loading || refreshing;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Class Attendance</h1>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
              {isLoading ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <AttendanceStatsCard
          icon={<BarChart3 size={24} />}
          title="Main Class Progress"
          subtitle={`${TOTAL_CLASSES} Classes × ${SESSIONS_PER_CLASS} Sessions Each = ${TOTAL_SESSIONS} Total Sessions`}
          percentage={stats.percentage}
          attended={stats.attended}
          total={stats.total}
          loading={isLoading}
          gradientFrom="from-indigo-600"
          gradientTo="to-purple-700"
          textColor="text-indigo-200"
        />

        {/* Main Classes Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Main Classes Attendance</h3>
          <div className="space-y-6">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <MainClassSkeleton key={i} />)
            ) : (
              mainClasses.map((cls, index) => (
                <MainClassCard
                  key={index}
                  className={cls.className}
                  sessions={{
                    regular: cls.regular,
                    problemSolving: cls.problemSolving,
                    practice: cls.practice,
                  }}
                  onToggle={handleToggle}
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
          totalLabel="Total Sessions"
          loading={isLoading}
        />
      </div>
    </div>
  );
}