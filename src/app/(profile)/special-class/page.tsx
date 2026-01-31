/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle, Star, RefreshCw } from "lucide-react";
import { studentAttendanceService } from "@/src/services/studentAttendance";
import { Skeleton } from "@/components/ui/skeleton";

export default function SpecialClassAttendance() {
  const [loading, setLoading] = useState(true);
  const [specialClasses, setSpecialClasses] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Define the list of classes constant
  const TOTAL_CLASSES = 5;
  const specialClassList = Array.from(
    { length: TOTAL_CLASSES },
    (_, i) => `Special Class ${i + 1}`,
  );

  useEffect(() => {
    loadSpecialClassData();
  }, []);

  const loadSpecialClassData = async () => {
    try {
      if (!refreshing) setLoading(true);

      // We mainly need the attendance history to build our local state
      const sessionsResult = await studentAttendanceService.getAttendanceHistory(100);
      
      if (sessionsResult.success && sessionsResult.data) {
        const specialClassAttendance = specialClassList.map((className) => {
          const attendedRecord = sessionsResult.data.find(
            (record: any) =>
              record.className === className &&
              record.sessionType === "special",
          );

          return {
            className,
            attended: attendedRecord?.attended || false,
            attendanceId: attendedRecord?._id,
            date: attendedRecord?.date
          };
        });

        setSpecialClasses(specialClassAttendance);
      }
    } catch (error) {
      console.error("Load error:", error);
      toast.error("Failed to load special classes");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const toggleAttendance = async (
    className: string,
    currentStatus: boolean,
  ) => {
    try {
      const result = await studentAttendanceService.updateSpecialClass(
        className,
        !currentStatus,
      );

      if (result.success) {
        // Update local state immediately
        setSpecialClasses((prev) =>
          prev.map((cls) =>
            cls.className === className
              ? { ...cls, attended: !currentStatus, date: new Date() }
              : cls,
          ),
        );

        toast.success(
          `Special class ${!currentStatus ? "marked" : "unmarked"} successfully`,
        );
      } else {
        toast.error(result.message || "Failed to update");
      }
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("Failed to update attendance");
    }
  };

  // --- FIX: Calculate Stats Locally ---
  // This ensures the numbers always match the buttons on screen
  const calculateStats = () => {
    // If data is still loading and array is empty, return 0
    if (loading && specialClasses.length === 0) {
      return { attended: 0, total: TOTAL_CLASSES, percentage: 0 };
    }

    const attendedCount = specialClasses.filter(c => c.attended).length;
    const percentage = Math.round((attendedCount / TOTAL_CLASSES) * 100);

    return {
      attended: attendedCount,
      total: TOTAL_CLASSES,
      percentage: percentage
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Special Class Attendance
              </h1>
              <p className="text-gray-600 mt-2">
                Exclusive sessions with expert instructors
              </p>
            </div>
           
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-linear-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Star size={24} />
                Special Classes Progress
              </h2>
              <p className="text-orange-100">
                5 exclusive sessions with industry experts
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold">
                {loading && specialClasses.length === 0 ? (
                  <Skeleton className="h-12 w-24 bg-white/20 inline-block rounded-lg" />
                ) : (
                  `${stats.percentage}%`
                )}
              </div>
              <div className="text-lg mt-1">
                {loading && specialClasses.length === 0 ? (
                   <Skeleton className="h-6 w-48 bg-white/20 inline-block rounded-lg" />
                ) : (
                   `${stats.attended}/${stats.total} Classes Attended`
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Special Classes Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Special Classes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && specialClasses.length === 0
              ? /* SKELETON LOADING STATE */
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="border-2 border-gray-100 rounded-xl p-5">
                    <div className="space-y-3">
                      <Skeleton className="h-6 w-3/4 rounded" />
                      <Skeleton className="h-4 w-1/2 rounded" />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <Skeleton className="h-4 w-24 rounded" />
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                  </div>
                ))
              : /* ACTUAL DATA */
                specialClasses.map((specialClass, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      toggleAttendance(specialClass.className, specialClass.attended)
                    }
                    className={`border-2 rounded-xl p-5 transition-all duration-200 flex items-center justify-between cursor-pointer group text-left ${
                      specialClass.attended
                        ? "border-green-500 bg-green-50 hover:bg-green-100"
                        : "border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400"
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-bold text-gray-800 text-lg">
                        {specialClass.className}
                      </div>
                      
                      <div
                        className={`text-sm mt-2 font-medium ${
                          specialClass.attended ? "text-green-600" : "text-orange-600"
                        }`}
                      >
                        {specialClass.attended ? "✓ Attended" : "○ Not Attended"}
                      </div>
                    </div>
                    
                    <div
                      className={`p-3 rounded-full ${
                        specialClass.attended ? "bg-green-100" : "bg-orange-100"
                      }`}
                    >
                      {specialClass.attended ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-orange-400"></div>
                      )}
                    </div>
                  </button>
              ))}
          </div>
        </div>

        {/* Bottom Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Attended", value: stats.attended },
            { label: "Remaining", value: stats.total - stats.attended },
            { label: "Total Special Classes", value: stats.total }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 flex justify-center">
                   {loading && specialClasses.length === 0 ? <Skeleton className="h-8 w-8 rounded" /> : item.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}