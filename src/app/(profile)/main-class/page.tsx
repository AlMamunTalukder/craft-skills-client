/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, RefreshCw, BarChart3 } from "lucide-react";
import { studentAttendanceService } from "@/src/services/studentAttendance";

interface MainClass {
  className: string;
  regular: boolean;
  problemSolving: boolean;
  practice: boolean;
}

export default function MainClassAttendancePage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [mainClasses, setMainClasses] = useState<MainClass[]>([]);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
  

  // Generate 15 main classes
  const generateMainClasses = () => {
    const classes: MainClass[] = [];
    for (let i = 1; i <= 15; i++) {
      classes.push({
        className: `Class ${i}`,
        regular: false,
        problemSolving: false,
        practice: false,
      });
    }
    return classes;
  };

  // Load all data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);

      // 1. Load dashboard data
      const dashboardResult = await studentAttendanceService.getDashboard();

      if (dashboardResult.success && dashboardResult.data) {
        setDashboardData(dashboardResult.data);

        // 2. Initialize main classes
        const generatedClasses = generateMainClasses();

        // 3. Load attendance history and update class status
        const historyResult =
          await studentAttendanceService.getAttendanceHistory(100);
        if (historyResult.success && historyResult.data) {
          setAttendanceHistory(historyResult.data || []);

          // Update class attendance status based on history
          // IMPORTANT: Only consider records where attended === true
          const updatedClasses = generatedClasses.map((cls) => {
            const classHistory = historyResult.data.filter(
              (record: any) =>
                record.className === cls.className &&
                (record.sessionType === "regular" ||
                  record.sessionType === "problemSolving" ||
                  record.sessionType === "practice")
            );

            // Find the latest record for each session type
            const regularRecord = classHistory
              .filter((r: any) => r.sessionType === "regular")
              .sort(
                (a: any, b: any) =>
                  new Date(b.markedAt).getTime() -
                  new Date(a.markedAt).getTime()
              )[0];

            const problemSolvingRecord = classHistory
              .filter((r: any) => r.sessionType === "problemSolving")
              .sort(
                (a: any, b: any) =>
                  new Date(b.markedAt).getTime() -
                  new Date(a.markedAt).getTime()
              )[0];

            const practiceRecord = classHistory
              .filter((r: any) => r.sessionType === "practice")
              .sort(
                (a: any, b: any) =>
                  new Date(b.markedAt).getTime() -
                  new Date(a.markedAt).getTime()
              )[0];

            return {
              ...cls,
              regular: regularRecord?.attended || false,
              problemSolving: problemSolvingRecord?.attended || false,
              practice: practiceRecord?.attended || false,
            };
          });

          setMainClasses(updatedClasses);
        } else {
          setMainClasses(generatedClasses);
        }

        // toast.success("All data loaded successfully");
      } else {
        toast.error(dashboardResult.message || "Failed to load dashboard data");
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (
    className: string,
    sessionType: "regular" | "problemSolving" | "practice"
  ) => {
    try {
      // Find current attendance status
      const currentClass = mainClasses.find(
        (cls) => cls.className === className
      );
      if (!currentClass) return;

      const currentStatus = currentClass[sessionType];
      const newStatus = !currentStatus;

      // console.log("Marking attendance:", {
      //   className,
      //   sessionType,
      //   currentStatus,
      //   newStatus,
      // });

      const result = await studentAttendanceService.markAttendance({
        className: className,
        sessionType: sessionType,
        attended: newStatus,
      });

      // console.log("Mark attendance result:", result);

      if (result.success) {
        // Update main classes state immediately
        setMainClasses((prev) =>
          prev.map((cls) =>
            cls.className === className
              ? { ...cls, [sessionType]: newStatus }
              : cls
          )
        );

        // Update dashboard stats if available
        if (result.data && dashboardData) {
          setDashboardData({
            ...dashboardData,
            attendanceStats: result.data,
          });
        }

        // Reload history to get updated records
        const historyResult =
          await studentAttendanceService.getAttendanceHistory(100);
        if (historyResult.success) {
          setAttendanceHistory(historyResult.data || []);
        }

        toast.success(
          `Attendance ${
            newStatus ? "marked" : "unmarked"
          } for ${className} - ${sessionType}`
        );
      } else {
        toast.error(result.message || "Failed to mark attendance");
        // Reload data to ensure UI is in sync
        await loadAllData();
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance");
      // Reload data to ensure UI is in sync
      await loadAllData();
    }
  };

  const calculateMainClassStats = () => {
    let attendedSessions = 0;

    mainClasses.forEach((cls) => {
      if (cls.regular) attendedSessions++;
      if (cls.problemSolving) attendedSessions++;
      if (cls.practice) attendedSessions++;
    });

    const totalPossibleSessions = 45;
    const percentage =
      totalPossibleSessions > 0
        ? Math.round((attendedSessions / totalPossibleSessions) * 100)
        : 0;

    return {
      attended: attendedSessions,
      total: totalPossibleSessions,
      percentage,
      completed: attendedSessions,
      remaining: totalPossibleSessions - attendedSessions,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading your attendance...
          </p>
          <p className="text-sm text-gray-500">
            Fetching your profile and attendance data
          </p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Failed to load data
          </h3>
          <p className="text-gray-600 mb-4">
            Please try refreshing the page or contact support.
          </p>
          <button
            onClick={loadAllData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const mainClassStats = calculateMainClassStats();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Main Class Attendance
              </h1>
              
            </div>
            <button
              onClick={loadAllData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              <RefreshCw size={18} />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Main Class Stats */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <BarChart3 size={24} />
                Main Class Progress
              </h2>
              <p className="text-indigo-200">
                15 Classes × 3 Sessions Each = 45 Total Sessions
              </p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold">
                {mainClassStats.percentage}%
              </div>
              <div className="text-lg">
                {mainClassStats.attended}/{mainClassStats.total} Sessions
              </div>
            </div>
          </div>

          {/* Progress breakdown */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {mainClassStats.completed}
              </div>
              <div className="text-indigo-200 text-sm">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {mainClassStats.remaining}
              </div>
              <div className="text-indigo-200 text-sm">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">15</div>
              <div className="text-indigo-200 text-sm">Total Classes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">45</div>
              <div className="text-indigo-200 text-sm">Total Sessions</div>
            </div>
          </div>
        </div>

        {/* Main Classes Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Main Classes Attendance
          </h3>

          <div className="space-y-6">
            {mainClasses.map((cls, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-800">
                    {cls.className}
                  </h4>
                  <div className="flex gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        cls.regular
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      Regular
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        cls.problemSolving
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      Problem
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        cls.practice
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      Practice
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Regular Session */}
                  <button
                    onClick={() => markAttendance(cls.className, "regular")}
                    className={`border-2 rounded-lg p-4 transition-all duration-200 flex items-center justify-between ${
                      cls.regular
                        ? "border-green-500 bg-green-50 hover:bg-green-100"
                        : "border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400"
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-gray-800">
                        Regular Class
                      </div>
                      <div
                        className={`text-sm mt-1 font-medium ${
                          cls.regular ? "text-green-600" : "text-blue-600"
                        }`}
                      >
                        {cls.regular ? "✓ Attended" : "○ Not Attended"}
                      </div>
                    </div>
                    <div
                      className={`p-2 rounded-full ${
                        cls.regular ? "bg-green-100" : "bg-blue-100"
                      }`}
                    >
                      {cls.regular ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-blue-500"></div>
                      )}
                    </div>
                  </button>

                  {/* Problem Solving Session */}
                  <button
                    onClick={() =>
                      markAttendance(cls.className, "problemSolving")
                    }
                    className={`border-2 rounded-lg p-4 transition-all duration-200 flex items-center justify-between ${
                      cls.problemSolving
                        ? "border-green-500 bg-green-50 hover:bg-green-100"
                        : "border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400"
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-gray-800">
                        Problem Solving
                      </div>
                      <div
                        className={`text-sm mt-1 font-medium ${
                          cls.problemSolving
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {cls.problemSolving ? "✓ Attended" : "○ Not Attended"}
                      </div>
                    </div>
                    <div
                      className={`p-2 rounded-full ${
                        cls.problemSolving ? "bg-green-100" : "bg-orange-100"
                      }`}
                    >
                      {cls.problemSolving ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-orange-500"></div>
                      )}
                    </div>
                  </button>

                  {/* Practice Session */}
                  <button
                    onClick={() => markAttendance(cls.className, "practice")}
                    className={`border-2 rounded-lg p-4 transition-all duration-200 flex items-center justify-between ${
                      cls.practice
                        ? "border-green-500 bg-green-50 hover:bg-green-100"
                        : "border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400"
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-gray-800">
                        Practice Session
                      </div>
                      <div
                        className={`text-sm mt-1 font-medium ${
                          cls.practice ? "text-green-600" : "text-green-600"
                        }`}
                      >
                        {cls.practice ? "✓ Attended" : "○ Not Attended"}
                      </div>
                    </div>
                    <div
                      className={`p-2 rounded-full ${
                        cls.practice ? "bg-green-100" : "bg-green-100"
                      }`}
                    >
                      {cls.practice ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-green-500"></div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
