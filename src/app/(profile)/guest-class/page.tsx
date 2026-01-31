/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle, Users } from "lucide-react";
import { studentAttendanceService } from "@/src/services/studentAttendance";
import { Skeleton } from "@/components/ui/skeleton";

export default function GuestClassAttendance() {
  const [loading, setLoading] = useState(true);
  const [guestClasses, setGuestClasses] = useState<any[]>([]);

  const TOTAL_CLASSES = 5;
  const guestClassList = Array.from(
    { length: TOTAL_CLASSES },
    (_, i) => `Guest Class ${i + 1}`,
  );

  useEffect(() => {
    loadGuestClassData();
  }, []);

  const loadGuestClassData = async () => {
    try {
  
      const sessionsResult = await studentAttendanceService.getAttendanceHistory(100);
      
      if (sessionsResult.success && sessionsResult.data) {
        const guestClassAttendance = guestClassList.map(
          (className) => {
            const attendedRecord = sessionsResult.data.find(
              (record: any) =>
                record.className === className &&
                record.sessionType === "guest",
            );

            return {
              className,
              attended: attendedRecord?.attended || false,
              attendanceId: attendedRecord?._id,
              date: attendedRecord?.date,
            };
          },
        );

        setGuestClasses(guestClassAttendance);
      }
    } catch (error) {
      console.error("Load error:", error);
      toast.error("Failed to load guest classes");
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = async (
    className: string,
    currentStatus: boolean,
  ) => {
    try {
      const result = await studentAttendanceService.updateGuestClass(
        className,
        !currentStatus,
      );

      if (result.success) {
        // Update local state immediately for instant feedback
        setGuestClasses((prev) =>
          prev.map((cls) =>
            cls.className === className
              ? { ...cls, attended: !currentStatus, date: new Date() }
              : cls,
          ),
        );

        toast.success(
          `Guest class ${!currentStatus ? "marked" : "unmarked"} successfully`,
        );
      } else {
        toast.error(result.message || "Failed to update");
      }
    } catch (error) {
      console.error("Toggle error:", error);
      toast.error("Failed to update attendance");
    }
  };

  // Calculate stats locally to ensure they match the UI and avoid NaN
  const calculateGuestClassStats = () => {
    // If loading and no data yet, return defaults
    if (loading && guestClasses.length === 0) {
      return { attended: 0, total: TOTAL_CLASSES, percentage: 0 };
    }

    const attended = guestClasses.filter((cls) => cls.attended).length;
    const percentage = Math.round((attended / TOTAL_CLASSES) * 100);

    return { attended, total: TOTAL_CLASSES, percentage };
  };

  const stats = calculateGuestClassStats();

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-teal-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Guest Class Attendance
              </h1>
              <p className="text-gray-600 mt-2">
                Learn from industry experts and guest speakers
              </p>
            </div>
            
          </div>
        </div>

        {/* Stats Card - Always visible, skeletons inside */}
        <div className="bg-linear-to-r from-green-600 to-teal-700 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Users size={24} />
                Guest Classes Progress
              </h2>
              <p className="text-green-100">
                5 guest lectures with industry professionals
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold">
                {loading && guestClasses.length === 0 ? (
                   <Skeleton className="h-12 w-24 bg-white/20 inline-block rounded-lg" />
                ) : (
                   `${stats.percentage}%`
                )}
              </div>
              <div className="text-lg mt-1">
                {loading && guestClasses.length === 0 ? (
                   <Skeleton className="h-6 w-48 bg-white/20 inline-block rounded-lg" />
                ) : (
                   `${stats.attended}/${stats.total} Classes Attended`
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Guest Classes Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Guest Lecture Sessions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && guestClasses.length === 0 
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
                guestClasses.map((guestClass, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      toggleAttendance(guestClass.className, guestClass.attended)
                    }
                    className={`border-2 rounded-xl p-5 transition-all duration-200 flex items-center justify-between cursor-pointer group text-left h-full ${
                      guestClass.attended
                        ? "border-green-500 bg-green-50 hover:bg-green-100"
                        : "border-teal-300 bg-teal-50 hover:bg-teal-100 hover:border-teal-400"
                    }`}
                  >
                    <div className="flex-1 pr-2">
                      <div className="font-bold text-gray-800 text-lg">
                        {guestClass.className}
                      </div>
                      <div
                        className={`text-sm mt-3 font-medium ${
                          guestClass.attended ? "text-green-600" : "text-teal-600"
                        }`}
                      >
                        {guestClass.attended ? "✓ Attended" : "○ Not Attended"}
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-full shrink-0 ${
                        guestClass.attended ? "bg-green-100" : "bg-teal-100"
                      }`}
                    >
                      {guestClass.attended ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-teal-400"></div>
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
             { label: "Total Guest Classes", value: stats.total }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 flex justify-center">
                  {loading && guestClasses.length === 0 ? (
                    <Skeleton className="h-8 w-8 rounded" />
                  ) : (
                    item.value
                  )}
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