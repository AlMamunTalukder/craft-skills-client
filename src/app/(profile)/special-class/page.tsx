/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle, Star, RefreshCw } from "lucide-react";
import { studentAttendanceService } from "@/src/services/studentAttendance";
import { Skeleton } from "@/components/ui/skeleton";

function SpecialClassAttendanceSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 to-red-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-8 w-72" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        {/* Stats Card */}
        <Skeleton className="h-40 w-full rounded-xl" />

        {/* Special Class Grid */}
        <div className="bg-white rounded-xl p-6 space-y-6">
          <Skeleton className="h-6 w-56" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-56 w-full rounded-xl" />
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SpecialClassAttendance() {
  const [loading, setLoading] = useState(true);
  const [specialClasses, setSpecialClasses] = useState<any[]>([]);
  const [attendanceStats, setAttendanceStats] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const specialClassList = Array.from(
    { length: 5 },
    (_, i) => `Special Class ${i + 1}`,
  );

  useEffect(() => {
    loadSpecialClassData();
  }, []);

  const loadSpecialClassData = async () => {
    try {
      setLoading(true);

      // Load dashboard data for stats
      const dashboardResult = await studentAttendanceService.getDashboard();

      if (dashboardResult.success && dashboardResult.data) {
        const { attendanceStats: stats } = dashboardResult.data;
        setAttendanceStats(stats);

        // Load attendance history to check which special classes are attended
        const sessionsResult =
          await studentAttendanceService.getAttendanceHistory(100);
        if (sessionsResult.success && sessionsResult.data) {
          const specialClassAttendance = specialClassList.map((className) => {
            // Filter for special classes by checking sessionType
            const attendedRecord = sessionsResult.data.find(
              (record: any) =>
                record.className === className &&
                record.sessionType === "special",
            );

            return {
              className,
              attended: attendedRecord?.attended || false,
              attendanceId: attendedRecord?._id,
              date: attendedRecord?.date,
              guestName: "Special Instructor",
            };
          });

          setSpecialClasses(specialClassAttendance);
        }
      }

      toast.success("Special class data loaded");
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
        // Update local state
        setSpecialClasses((prev) =>
          prev.map((cls) =>
            cls.className === className
              ? { ...cls, attended: !currentStatus, date: new Date() }
              : cls,
          ),
        );

        // Update stats if available
        if (result.data) {
          setAttendanceStats(result.data);
        }

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

  const calculateSpecialClassStats = () => {
    const attended = specialClasses.filter((cls) => cls.attended).length;
    const total = 5;
    const percentage = Math.round((attended / total) * 100);

    return { attended, total, percentage };
  };

  if (loading) {
    return <SpecialClassAttendanceSkeleton />;
  }

  const stats = calculateSpecialClassStats();

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
            <button
              onClick={() => {
                setRefreshing(true);
                loadSpecialClassData();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:opacity-50"
              disabled={refreshing}
            >
              <RefreshCw
                size={18}
                className={refreshing ? "animate-spin" : ""}
              />
              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
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
                {stats.percentage}%
              </div>
              <div className="text-lg">
                {stats.attended}/{stats.total} Classes Attended
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
            {specialClasses.map((specialClass, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl p-6 transition-all duration-200 ${
                  specialClass.attended
                    ? "border-green-500 bg-linear-to-br from-green-50 to-emerald-50"
                    : "border-orange-300 bg-orange-50 hover:border-orange-400 hover:shadow-lg"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">
                      {specialClass.className}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      With {specialClass.guestName}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      {specialClass.date
                        ? new Date(specialClass.date).toLocaleDateString()
                        : "Not attended yet"}
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-full ${specialClass.attended ? "bg-green-100" : "bg-orange-100"}`}
                  >
                    {specialClass.attended ? (
                      <CheckCircle className="text-green-600" size={24} />
                    ) : (
                      <Star className="text-orange-600" size={24} />
                    )}
                  </div>
                </div>

                <button
                  onClick={() =>
                    toggleAttendance(
                      specialClass.className,
                      specialClass.attended,
                    )
                  }
                  className={`w-full py-3 rounded-lg font-medium transition ${
                    specialClass.attended
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-linear-to-r from-orange-600 to-orange-700 text-white hover:from-orange-700 hover:to-orange-800"
                  }`}
                >
                  {specialClass.attended ? "✓ Attended" : "Mark as Attended"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {stats.attended}
              </div>
              <div className="text-sm text-gray-600">Attended</div>
            </div>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {stats.total - stats.attended}
              </div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
          </div>

          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">Total Special Classes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
