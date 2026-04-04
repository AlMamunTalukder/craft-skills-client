/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, RefreshCw, BarChart3 } from "lucide-react";
import { studentAttendanceService } from "@/src/services/studentAttendance";
import { Skeleton } from "@/components/ui/skeleton";

// Types
interface MainClass {
  className: string;
  regular: boolean;
  problemSolving: boolean;
  practice: boolean;
}

interface SessionType {
  key: keyof Pick<MainClass, "regular" | "problemSolving" | "practice">;
  label: string;
  color: string;
  iconColor: string;
  borderColor: string;
}

// Constants
const SESSION_TYPES: SessionType[] = [
  {
    key: "regular",
    label: "Main Class",
    color: "bg-green-100 text-green-800",
    iconColor: "text-green-600",
    borderColor: "border-green-500",
  },
  {
    key: "problemSolving",
    label: "Problem Solving",
    color: "bg-green-100 text-green-800",
    iconColor: "text-orange-600",
    borderColor: "border-orange-500",
  },
  {
    key: "practice",
    label: "Practice Class",
    color: "bg-green-100 text-green-800",
    iconColor: "text-green-600",
    borderColor: "border-green-500",
  },
];

const TOTAL_CLASSES = 15;
const SESSIONS_PER_CLASS = 3;
const TOTAL_SESSIONS = TOTAL_CLASSES * SESSIONS_PER_CLASS;

// Components
function ClassItemSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-5 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-7 w-32" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-6 w-16 rounded" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border-2 border-gray-100 rounded-xl p-2 flex justify-between items-center "
          >
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsCardSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-48 bg-white/20 rounded"></div>
      <div className="h-16 w-full bg-white/20 rounded"></div>
    </div>
  );
}

function SessionButton({
  session,
  isAttended,
  onClick,
}: {
  session: SessionType;
  isAttended: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`border-2 rounded-lg p-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${
        isAttended
          ? "border-green-500 bg-green-50 hover:bg-green-100"
          : "border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400"
      }`}
    >
      <div className="text-left">
        <div className="font-medium text-gray-800">{session.label}</div>
      </div>
      <div
        className={`p-2 rounded-full ${isAttended ? "bg-green-100" : "bg-blue-100"}`}
      >
        {isAttended ? (
          <CheckCircle className={session.iconColor} size={20} />
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-blue-500"></div>
        )}
      </div>
    </button>
  );
}

function ClassCard({
  classItem,
  onMarkAttendance,
}: {
  classItem: MainClass;
  onMarkAttendance: (
    className: string,
    sessionType: SessionType["key"],
  ) => void;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-lg font-bold text-gray-800">
          {classItem.className}
        </h4>
        <div className="flex gap-2">
          {SESSION_TYPES.map((session) => (
            <span
              key={session.key}
              className={`text-xs px-2 py-1 rounded ${
                classItem[session.key]
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {session.key === "regular"
                ? "Main"
                : session.key === "problemSolving"
                  ? "Problem"
                  : "Practice"}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SESSION_TYPES.map((session) => (
          <SessionButton
            key={session.key}
            session={session}
            isAttended={classItem[session.key]}
            onClick={() => onMarkAttendance(classItem.className, session.key)}
          />
        ))}
      </div>
    </div>
  );
}

// Main Component
export default function MainClassAttendancePage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [mainClasses, setMainClasses] = useState<MainClass[]>([]);

  // Generate main classes
  const generateMainClasses = (): MainClass[] => {
    return Array.from({ length: TOTAL_CLASSES }, (_, i) => ({
      className: `Class ${i + 1}`,
      regular: false,
      problemSolving: false,
      practice: false,
    }));
  };

  // Load all data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);

      const currentBatchNumber = localStorage.getItem("selectedBatchNumber");

      if (!currentBatchNumber) {
        toast.error("No batch selected. Please select a batch first.");
        setLoading(false);
        return;
      }

      // Load dashboard data
      const dashboardResult = await studentAttendanceService.getDashboard();

      if (!dashboardResult.success || !dashboardResult.data) {
        toast.error(dashboardResult.message || "Failed to load dashboard data");
        setLoading(false);
        return;
      }

      setDashboardData(dashboardResult.data);

      // Load attendance history
      const historyResult =
        await studentAttendanceService.getAttendanceHistory(100);
      const generatedClasses = generateMainClasses();

      if (historyResult.success && historyResult.data) {
        const batchHistory = historyResult.data.filter(
          (record: any) => record.batchId === currentBatchNumber,
        );

        const updatedClasses = generatedClasses.map((cls) => {
          const updatedClass = { ...cls };

          SESSION_TYPES.forEach((session) => {
            const records = batchHistory.filter(
              (record: any) =>
                record.className === cls.className &&
                record.sessionType === session.key,
            );

            const latestRecord = records.sort(
              (a: any, b: any) =>
                new Date(b.markedAt).getTime() - new Date(a.markedAt).getTime(),
            )[0];

            updatedClass[session.key] = latestRecord?.attended || false;
          });

          return updatedClass;
        });

        setMainClasses(updatedClasses);
      } else {
        setMainClasses(generatedClasses);
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
    sessionType: SessionType["key"],
  ) => {
    try {
      const currentClass = mainClasses.find(
        (cls) => cls.className === className,
      );
      if (!currentClass) return;

      const newStatus = !currentClass[sessionType];

      const result = await studentAttendanceService.markAttendance({
        className,
        sessionType,
        attended: newStatus,
      });

      if (result.success) {
        // Update local state
        setMainClasses((prev) =>
          prev.map((cls) =>
            cls.className === className
              ? { ...cls, [sessionType]: newStatus }
              : cls,
          ),
        );

        // Update dashboard stats if available
        if (result.data && dashboardData) {
          setDashboardData({
            ...dashboardData,
            attendanceStats: result.data,
          });
        }

        toast.success(
          `Attendance ${newStatus ? "marked" : "unmarked"} for ${className}`,
        );
      } else {
        toast.error(result.message || "Failed to mark attendance");
        await loadAllData();
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Failed to mark attendance");
      await loadAllData();
    }
  };

  const calculateMainClassStats = () => {
    const attendedSessions = mainClasses.reduce((total, cls) => {
      return total + SESSION_TYPES.filter((session) => cls[session.key]).length;
    }, 0);

    const percentage =
      TOTAL_SESSIONS > 0
        ? Math.round((attendedSessions / TOTAL_SESSIONS) * 100)
        : 0;

    return {
      attended: attendedSessions,
      total: TOTAL_SESSIONS,
      percentage,
      completed: attendedSessions,
      remaining: TOTAL_SESSIONS - attendedSessions,
    };
  };

  // Error state
  if (!dashboardData && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Failed to load data
          </h3>
          <button
            onClick={loadAllData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
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
                Class Attendance
              </h1>
            </div>
            <button
              onClick={loadAllData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              {loading ? "Refreshing..." : "Refresh Data"}
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white mb-6 shadow-lg">
          {loading ? (
            <StatsCardSkeleton />
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <BarChart3 size={24} />
                    Class Progress
                  </h2>
                  <p className="text-indigo-200">
                    {TOTAL_CLASSES} Classes × {SESSIONS_PER_CLASS} Sessions Each
                    = {TOTAL_SESSIONS} Total Sessions
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
                  <div className="text-2xl font-bold">{TOTAL_CLASSES}</div>
                  <div className="text-indigo-200 text-sm">Total Classes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{TOTAL_SESSIONS}</div>
                  <div className="text-indigo-200 text-sm">Total Sessions</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Main Classes Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Class Attendance
          </h3>

          <div className="space-y-6">
            {loading
              ? Array.from({ length: 5 }, (_, i) => (
                  <ClassItemSkeleton key={i} />
                ))
              : mainClasses.map((cls, index) => (
                  <ClassCard
                    key={index}
                    classItem={cls}
                    onMarkAttendance={markAttendance}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { CheckCircle, XCircle, RefreshCw, BarChart3 } from "lucide-react";
// import { studentAttendanceService } from "@/src/services/studentAttendance";
// import { Skeleton } from "@/components/ui/skeleton";

// interface MainClass {
//   className: string;
//   regular: boolean;
//   problemSolving: boolean;
//   practice: boolean;
// }

// // 1. New Component: Skeleton specific to a single Class Item Row
// function ClassItemSkeleton() {
//   return (
//     <div className="border border-gray-200 rounded-lg p-5 space-y-4">
//       {/* Header Skeleton */}
//       <div className="flex justify-between items-center">
//         <Skeleton className="h-7 w-32" />
//         <div className="flex gap-2">
//           <Skeleton className="h-6 w-16 rounded" />
//           <Skeleton className="h-6 w-16 rounded" />
//           <Skeleton className="h-6 w-16 rounded" />
//         </div>
//       </div>

//       {/* Grid Buttons Skeleton */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {[1, 2, 3].map((i) => (
//           <div key={i} className="border-2 border-gray-100 rounded-lg p-4 flex items-center justify-between">
//             <div className="space-y-2">
//               <Skeleton className="h-4 w-24" />
//               <Skeleton className="h-3 w-20" />
//             </div>
//             <Skeleton className="h-10 w-10 rounded-full" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function MainClassAttendancePage() {
//   const [loading, setLoading] = useState(true);
//   const [dashboardData, setDashboardData] = useState<any>(null);
//   const [mainClasses, setMainClasses] = useState<MainClass[]>([]);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);

//   // Generate 15 main classes
//   const generateMainClasses = () => {
//     const classes: MainClass[] = [];
//     for (let i = 1; i <= 15; i++) {
//       classes.push({
//         className: `Class ${i}`,
//         regular: false,
//         problemSolving: false,
//         practice: false,
//       });
//     }
//     return classes;
//   };

//   // Load all data on component mount
//   useEffect(() => {
//     loadAllData();
//   }, []);

//   const loadAllData = async () => {
//     try {
//       setLoading(true);

//       const currentBatchNumber = localStorage.getItem("selectedBatchNumber");

//       if (!currentBatchNumber) {
//         toast.error("No batch selected. Please select a batch first.");
//         setLoading(false);
//         return;
//       }

//       // 1. Load dashboard data
//       const dashboardResult = await studentAttendanceService.getDashboard();

//       if (dashboardResult.success && dashboardResult.data) {
//         setDashboardData(dashboardResult.data);

//         // 2. Initialize main classes
//         const generatedClasses = generateMainClasses();

//         // 3. Load attendance history for current batch
//         const historyResult = await studentAttendanceService.getAttendanceHistory(100);

//         if (historyResult.success && historyResult.data) {
//           const batchHistory = historyResult.data.filter(
//             (record: any) => record.batchId === currentBatchNumber
//           );

//           setAttendanceHistory(batchHistory);

//           const updatedClasses = generatedClasses.map((cls) => {
//             const classHistory = batchHistory.filter(
//               (record: any) =>
//                 record.className === cls.className &&
//                 (record.sessionType === "regular" ||
//                   record.sessionType === "problemSolving" ||
//                   record.sessionType === "practice")
//             );

//             // Find the latest record for each session type
//             const getLatest = (type: string) => {
//                return classHistory
//                 .filter((r: any) => r.sessionType === type)
//                 .sort((a: any, b: any) => new Date(b.markedAt).getTime() - new Date(a.markedAt).getTime())[0];
//             }

//             const regularRecord = getLatest("regular");
//             const problemSolvingRecord = getLatest("problemSolving");
//             const practiceRecord = getLatest("practice");

//             return {
//               ...cls,
//               regular: regularRecord?.attended || false,
//               problemSolving: problemSolvingRecord?.attended || false,
//               practice: practiceRecord?.attended || false,
//             };
//           });

//           setMainClasses(updatedClasses);
//         } else {
//           setMainClasses(generatedClasses);
//         }
//       } else {
//         toast.error(dashboardResult.message || "Failed to load dashboard data");
//       }
//     } catch (error) {
//       console.error("Error loading data:", error);
//       toast.error("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const markAttendance = async (
//     className: string,
//     sessionType: "regular" | "problemSolving" | "practice"
//   ) => {
//     try {
//       const currentClass = mainClasses.find((cls) => cls.className === className);
//       if (!currentClass) return;

//       const currentStatus = currentClass[sessionType];
//       const newStatus = !currentStatus;

//       const result = await studentAttendanceService.markAttendance({
//         className: className,
//         sessionType: sessionType,
//         attended: newStatus,
//       });

//       if (result.success) {
//         setMainClasses((prev) =>
//           prev.map((cls) =>
//             cls.className === className
//               ? { ...cls, [sessionType]: newStatus }
//               : cls
//           )
//         );

//         if (result.data && dashboardData) {
//           setDashboardData({
//             ...dashboardData,
//             attendanceStats: result.data,
//           });
//         }

//         // Optimistic update, no need to reload full history immediately for UI toggle
//         toast.success(`Attendance ${newStatus ? "marked" : "unmarked"} for ${className}`);
//       } else {
//         toast.error(result.message || "Failed to mark attendance");
//         await loadAllData();
//       }
//     } catch (error) {
//       console.error("Error marking attendance:", error);
//       toast.error("Failed to mark attendance");
//       await loadAllData();
//     }
//   };

//   const calculateMainClassStats = () => {
//     let attendedSessions = 0;

//     mainClasses.forEach((cls) => {
//       if (cls.regular) attendedSessions++;
//       if (cls.problemSolving) attendedSessions++;
//       if (cls.practice) attendedSessions++;
//     });

//     const totalPossibleSessions = 45;
//     const percentage =
//       totalPossibleSessions > 0
//         ? Math.round((attendedSessions / totalPossibleSessions) * 100)
//         : 0;

//     return {
//       attended: attendedSessions,
//       total: totalPossibleSessions,
//       percentage,
//       completed: attendedSessions,
//       remaining: totalPossibleSessions - attendedSessions,
//     };
//   };

//   // Only show full page error if we are NOT loading and still have no data
//   if (!dashboardData && !loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center p-8 bg-white rounded-xl shadow-lg">
//           <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             Failed to load data
//           </h3>
//           <button
//             onClick={loadAllData}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const mainClassStats = calculateMainClassStats();

//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex justify-between items-start flex-wrap gap-4">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//                 Class Attendance
//               </h1>
//             </div>
//             <button
//               onClick={loadAllData}
//               disabled={loading}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
//             >
//               <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
//               {loading ? "Refreshing..." : "Refresh Data"}
//             </button>
//           </div>
//         </div>

//         {/* Main Class Stats Card */}
//         <div className="bg-linear-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white mb-6 shadow-lg">
//           {loading ? (
//              // Simple Skeleton for the Stats Card Area
//              <div className="animate-pulse space-y-4">
//                <div className="h-8 w-48 bg-white/20 rounded"></div>
//                <div className="h-16 w-full bg-white/20 rounded"></div>
//              </div>
//           ) : (
//             <>
//               <div className="flex flex-col md:flex-row items-center justify-between">
//                 <div>
//                   <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
//                     <BarChart3 size={24} />
//                     Main Class Progress
//                   </h2>
//                   <p className="text-indigo-200">
//                     15 Classes × 3 Sessions Each = 45 Total Sessions
//                   </p>
//                 </div>
//                 <div className="mt-4 md:mt-0 text-center md:text-right">
//                   <div className="text-4xl md:text-5xl font-bold">
//                     {mainClassStats.percentage}%
//                   </div>
//                   <div className="text-lg">
//                     {mainClassStats.attended}/{mainClassStats.total} Sessions
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold">{mainClassStats.completed}</div>
//                   <div className="text-indigo-200 text-sm">Completed</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold">{mainClassStats.remaining}</div>
//                   <div className="text-indigo-200 text-sm">Remaining</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold">15</div>
//                   <div className="text-indigo-200 text-sm">Total Classes</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold">45</div>
//                   <div className="text-indigo-200 text-sm">Total Sessions</div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Main Classes Grid - Dynamic Section */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
//           <h3 className="text-xl font-bold text-gray-800 mb-6">
//             Main Classes Attendance
//           </h3>

//           <div className="space-y-6">
//             {loading ? (
//               // 2. RENDER SKELETONS WHEN LOADING
//               <>
//                 <ClassItemSkeleton />
//                 <ClassItemSkeleton />
//                 <ClassItemSkeleton />
//                 <ClassItemSkeleton />
//                 <ClassItemSkeleton />
//               </>
//             ) : (
//               // 3. RENDER REAL DATA WHEN LOADED
//               mainClasses.map((cls, index) => (
//                 <div
//                   key={index}
//                   className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition "
//                 >
//                   <div className="flex items-center justify-between mb-2 ">
//                     <h4 className="text-lg font-bold text-gray-800">
//                       {cls.className}
//                     </h4>
//                     <div className="flex gap-2">
//                       <span className={`text-xs px-2 py-1 rounded ${cls.regular ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>Main</span>
//                       <span className={`text-xs px-2 py-1 rounded ${cls.problemSolving ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>Problem</span>
//                       <span className={`text-xs px-2 py-1 rounded ${cls.practice ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>Practice</span>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {/* Regular Session */}
//                     <button
//                       onClick={() => markAttendance(cls.className, "regular")}
//                       className={`border-2 rounded-lg p-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${
//                         cls.regular
//                           ? "border-green-500 bg-green-50 hover:bg-green-100"
//                           : "border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400"
//                       }`}
//                     >
//                       <div className="text-left">
//                         <div className="font-medium text-gray-800">Main Class</div>
//                       </div>
//                       <div className={`p-2 rounded-full ${cls.regular ? "bg-green-100" : "bg-blue-100"}`}>
//                         {cls.regular ? (
//                           <CheckCircle className="text-green-600" size={20} />
//                         ) : (
//                           <div className="w-6 h-6 rounded-full border-2 border-blue-500"></div>
//                         )}
//                       </div>
//                     </button>

//                     {/* Problem Solving Session */}
//                     <button
//                       onClick={() => markAttendance(cls.className, "problemSolving")}
//                       className={`border-2 rounded-lg p-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${
//                         cls.problemSolving
//                           ? "border-green-500 bg-green-50 hover:bg-green-100"
//                           : "border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400"
//                       }`}
//                     >
//                       <div className="text-left">
//                         <div className="font-medium text-gray-800">Problem Solving</div>
//                       </div>
//                       <div className={`p-2 rounded-full ${cls.problemSolving ? "bg-green-100" : "bg-orange-100"}`}>
//                         {cls.problemSolving ? (
//                           <CheckCircle className="text-green-600" size={20} />
//                         ) : (
//                           <div className="w-6 h-6 rounded-full border-2 border-orange-500"></div>
//                         )}
//                       </div>
//                     </button>

//                     {/* Practice Session */}
//                     <button
//                       onClick={() => markAttendance(cls.className, "practice")}
//                       className={`border-2 rounded-lg p-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${
//                         cls.practice
//                           ? "border-green-500 bg-green-50 hover:bg-green-100"
//                           : "border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400"
//                       }`}
//                     >
//                       <div className="text-left">
//                         <div className="font-medium text-gray-800">Practice Class</div>
//                       </div>
//                       <div className={`p-2 rounded-full ${cls.practice ? "bg-green-100" : "bg-green-100"}`}>
//                         {cls.practice ? (
//                           <CheckCircle className="text-green-600" size={20} />
//                         ) : (
//                           <div className="w-5 h-5 rounded-full border-2 border-green-500"></div>
//                         )}
//                       </div>
//                     </button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
