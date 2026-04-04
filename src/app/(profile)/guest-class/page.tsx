/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle, Users } from "lucide-react";
import { studentAttendanceService } from "@/src/services/studentAttendance";
import { Skeleton } from "@/components/ui/skeleton";

// Constants
const TOTAL_CLASSES = 3;
const GUEST_CLASSES = Array.from({ length: TOTAL_CLASSES }, (_, i) => `Guest Class ${i + 1}`);

// Components
function StatCard({ label, value, loading }: { label: string; value: number; loading: boolean }) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800 flex justify-center">
          {loading ? <Skeleton className="h-8 w-8 rounded" /> : value}
        </div>
        <div className="text-sm text-gray-600 mt-1">{label}</div>
      </div>
    </div>
  );
}

function GuestClassCard({ 
  classItem, 
  onToggle 
}: { 
  classItem: any; 
  onToggle: (className: string, attended: boolean) => void;
}) {
  return (
    <button
      onClick={() => onToggle(classItem.className, classItem.attended)}
      className={`border-2 rounded-lg p-2 transition-all duration-200 flex items-center justify-between cursor-pointer group text-left h-full ${
        classItem.attended
          ? "border-green-500 bg-green-50 hover:bg-green-100"
          : "border-red-300 bg-teal-50 hover:bg-red-100 hover:border-red-400"
      }`}
    >
      <div className="flex-1 pr-2">
        <div className="font-bold text-gray-800 text-lg">{classItem.className}</div>
      </div>
      <div className={`p-2 rounded-full shrink-0 ${classItem.attended ? "bg-green-100" : "bg-red-100"}`}>
        {classItem.attended ? (
          <CheckCircle className="text-green-600" size={20} />
        ) : (
          <div className="w-5 h-5 rounded-full border border-red-400"></div>
        )}
      </div>
    </button>
  );
}

function GuestClassSkeleton() {
  return (
     <div className="border-2 border-gray-100 rounded-xl p-2 flex justify-between items-center ">
      <Skeleton className="h-6 w-3/4 rounded" />
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  );
}

// Main Component
export default function GuestClassAttendance() {
  const [loading, setLoading] = useState(true);
  const [guestClasses, setGuestClasses] = useState<any[]>([]);

  useEffect(() => {
    loadGuestClassData();
  }, []);

  const loadGuestClassData = async () => {
    try {
      setLoading(true);
      const sessionsResult = await studentAttendanceService.getAttendanceHistory(100);
      
      if (sessionsResult.success && sessionsResult.data) {
        const guestClassAttendance = GUEST_CLASSES.map((className) => {
          const attendedRecord = sessionsResult.data.find(
            (record: any) => record.className === className && record.sessionType === "guest"
          );
          
          return {
            className,
            attended: attendedRecord?.attended || false,
            attendanceId: attendedRecord?._id,
            date: attendedRecord?.date,
          };
        });
        
        setGuestClasses(guestClassAttendance);
      } else {
        toast.error("Failed to load guest classes");
      }
    } catch (error) {
      console.error("Load error:", error);
      toast.error("Failed to load guest classes");
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = async (className: string, currentStatus: boolean) => {
    try {
      const result = await studentAttendanceService.updateGuestClass(className, !currentStatus);
      
      if (result.success) {
        setGuestClasses((prev) =>
          prev.map((cls) =>
            cls.className === className ? { ...cls, attended: !currentStatus, date: new Date() } : cls
          )
        );
        toast.success(`Guest class ${!currentStatus ? "marked" : "unmarked"} successfully`);
      } else {
        toast.error(result.message || "Failed to update");
      }
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("Failed to update attendance");
    }
  };

  const calculateStats = () => {
    if (loading && guestClasses.length === 0) {
      return { attended: 0, total: TOTAL_CLASSES, percentage: 0 };
    }
    
    const attended = guestClasses.filter((cls) => cls.attended).length;
    return {
      attended,
      total: TOTAL_CLASSES,
      percentage: Math.round((attended / TOTAL_CLASSES) * 100)
    };
  };

  const stats = calculateStats();
  const isLoading = loading && guestClasses.length === 0;

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
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-linear-to-r from-green-600 to-teal-700 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Users size={24} />
                Guest Classes Progress
              </h2>
              <p className="text-green-100">3 guest lectures with industry professionals</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold">
                {isLoading ? <Skeleton className="h-12 w-24 bg-white/20 inline-block rounded-lg" /> : `${stats.percentage}%`}
              </div>
              <div className="text-lg mt-1">
                {isLoading ? (
                  <Skeleton className="h-6 w-48 bg-white/20 inline-block rounded-lg" />
                ) : (
                  `${stats.attended}/${stats.total} Classes Attended`
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Guest Classes Grid */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Guest Lecture Sessions</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: TOTAL_CLASSES }).map((_, i) => <GuestClassSkeleton key={i} />)
            ) : (
              guestClasses.map((guestClass, index) => (
                <GuestClassCard
                  key={index}
                  classItem={guestClass}
                  onToggle={toggleAttendance}
                />
              ))
            )}
          </div>
        </div>

        {/* Bottom Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard label="Attended" value={stats.attended} loading={isLoading} />
          <StatCard label="Remaining" value={stats.total - stats.attended} loading={isLoading} />
          <StatCard label="Total Guest Classes" value={stats.total} loading={isLoading} />
        </div>
      </div>
    </div>
  );
}