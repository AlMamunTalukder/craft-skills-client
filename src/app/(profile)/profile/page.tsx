/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  XCircle,
  TrendingUp,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { studentAttendanceService } from "@/src/services/studentAttendance";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardData {
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    batchNumber: string;
    batchId: {
      _id: string;
      name: string;
      code: string;
      description: string;
    };
    admissionId?: {
      paymentMethod: string;
      amount: number;
      discountAmount: number;
      paymentStatus: string;
    };
  };
  attendanceStats: {
    summary: {
      attended: number;
      total: number;
      percentage: number;
    };
    byType: {
      regular: { attended: number; total: number; percentage: number };
      special: { attended: number; total: number; percentage: number };
      guest: { attended: number; total: number; percentage: number };
    };
  };
}

// Constants for total sessions
const TOTAL_MAIN_SESSIONS = 45; // 15 classes × 3 sessions
const TOTAL_SPECIAL_SESSIONS = 5;
const TOTAL_GUEST_SESSIONS = 3;
const TOTAL_ALL_SESSIONS = TOTAL_MAIN_SESSIONS + TOTAL_SPECIAL_SESSIONS + TOTAL_GUEST_SESSIONS;

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rawAttendance, setRawAttendance] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setError("");
      setLoading(true);
      
      // Fetch dashboard data
      const dashboardResult = await studentAttendanceService.getDashboard();
      
      // Also fetch raw attendance records to verify
      const attendanceHistory = await studentAttendanceService.getAttendanceHistory(100);
      
      if (attendanceHistory.success && attendanceHistory.data) {
        console.log('Raw Attendance Records:', attendanceHistory.data);
        setRawAttendance(attendanceHistory.data);
        
        // Calculate actual attendance from raw data
        const regularAttended = attendanceHistory.data.filter(
          (record: any) => record.sessionType === 'regular' && record.attended === true
        ).length;
        
        const specialAttended = attendanceHistory.data.filter(
          (record: any) => record.sessionType === 'special' && record.attended === true
        ).length;
        
        const guestAttended = attendanceHistory.data.filter(
          (record: any) => record.sessionType === 'guest' && record.attended === true
        ).length;
        
        console.log('Calculated from raw data:', {
          regularAttended,
          specialAttended,
          guestAttended,
          total: regularAttended + specialAttended + guestAttended
        });
      }
      
      if (dashboardResult.success && dashboardResult.data) {
        console.log('Dashboard Stats from API:', dashboardResult.data.attendanceStats);
        setDashboardData(dashboardResult.data);
      } else {
        setError(dashboardResult.message || "Failed to load dashboard");
      }
    } catch (err) {
      console.error("Error loading dashboard:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const user = dashboardData?.user;
  const stats = dashboardData?.attendanceStats;

  // Calculate overall stats - using raw data if available, otherwise API data
  const calculateOverallStats = () => {
    if (!stats) {
      return { attended: 0, total: TOTAL_ALL_SESSIONS, percentage: 0 };
    }

    // Use API data
    let attendedMain = stats.byType.regular?.attended || 0;
    let attendedSpecial = stats.byType.special?.attended || 0;
    let attendedGuest = stats.byType.guest?.attended || 0;
    
    // If raw attendance is available, use that for more accurate counting
    if (rawAttendance.length > 0) {
      attendedMain = rawAttendance.filter(
        (record: any) => (record.sessionType === 'regular' || 
                         record.sessionType === 'problemSolving' || 
                         record.sessionType === 'practice') && 
                        record.attended === true
      ).length;
      
      attendedSpecial = rawAttendance.filter(
        (record: any) => record.sessionType === 'special' && record.attended === true
      ).length;
      
      attendedGuest = rawAttendance.filter(
        (record: any) => record.sessionType === 'guest' && record.attended === true
      ).length;
    }
    
    const totalAttended = attendedMain + attendedSpecial + attendedGuest;
    const percentage = Math.round((totalAttended / TOTAL_ALL_SESSIONS) * 100);

    return {
      attended: totalAttended,
      total: TOTAL_ALL_SESSIONS,
      percentage,
      attendedMain,
      attendedSpecial,
      attendedGuest,
    };
  };

  const overallStats = calculateOverallStats();
  // const currentDate = new Date().toLocaleDateString("en-US", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full">
          <XCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            Unable to Load Profile
          </h3>
          <p className="text-slate-500 mb-6">{error}</p>
          <button
            onClick={loadDashboardData}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition font-medium"
          >
            Reload Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Get the correct attendance values
  const regularAttended = rawAttendance.length > 0 
    ? rawAttendance.filter((r: any) => (r.sessionType === 'regular' || r.sessionType === 'problemSolving' || r.sessionType === 'practice') && r.attended === true).length
    : (stats?.byType.regular?.attended || 0);
    
  const specialAttended = rawAttendance.length > 0
    ? rawAttendance.filter((r: any) => r.sessionType === 'special' && r.attended === true).length
    : (stats?.byType.special?.attended || 0);
    
  const guestAttended = rawAttendance.length > 0
    ? rawAttendance.filter((r: any) => r.sessionType === 'guest' && r.attended === true).length
    : (stats?.byType.guest?.attended || 0);

  const regularPercentage = Math.round((regularAttended / TOTAL_MAIN_SESSIONS) * 100);
  const specialPercentage = Math.round((specialAttended / TOTAL_SPECIAL_SESSIONS) * 100);
  const guestPercentage = Math.round((guestAttended / TOTAL_GUEST_SESSIONS) * 100);

  return (
    <div className="min-h-screen bg-slate-50/80 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* LEFT COLUMN: Profile Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="sticky top-8 space-y-6">
              {/* Identity Card */}
              <div className="bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-br from-indigo-600 to-violet-600">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>

                <div className="relative z-10 mt-16 mb-4">
                  {loading ? (
                    <Skeleton className="h-28 w-28 rounded-full border-4 border-white" />
                  ) : (
                    <div className="h-28 w-28 rounded-full border-[6px] border-white bg-slate-50 shadow-lg flex items-center justify-center text-4xl font-black text-indigo-600">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {loading ? (
                  <div className="space-y-2 w-full flex flex-col items-center">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
                    <p className="text-slate-500 text-sm mb-4">{user?.email}</p>
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase">
                        {user?.role}
                      </span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                        Batch {user?.batchNumber}
                      </span>
                    </div>
                  </>
                )}

                {!loading && (
                  <div className="w-full pt-6 border-t border-slate-100 flex justify-between text-sm">
                    <div className="text-center w-1/2 border-r border-slate-100">
                      <p className="text-slate-400 text-xs font-medium uppercase">Phone</p>
                      <p className="font-semibold text-slate-700 mt-1">{user?.phone}</p>
                    </div>
                    <div className="text-center w-1/2">
                      <p className="text-slate-400 text-xs font-medium uppercase">Total Sessions</p>
                      <p className="font-semibold text-slate-700 mt-1">{TOTAL_ALL_SESSIONS}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Course Info Card */}
              {!loading && user?.batchId && (
                <div className="bg-white rounded-4xl shadow-sm border border-slate-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-violet-100 text-violet-600 rounded-xl">
                      <GraduationCap size={20} />
                    </div>
                    <h3 className="font-bold text-slate-800">Course Details</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Batch Name</p>
                      <p className="font-bold text-slate-800">{user.batchId.name}</p>
                    </div>
                    <div className="text-sm text-slate-500 px-2">{user.batchId.description}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Dashboard Stats */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Welcome Header */}
            <div className="relative overflow-hidden rounded-4xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-xl shadow-blue-200/50">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="relative z-10">
                {/* <p className="text-blue-100 font-medium mb-1 text-sm opacity-90">{currentDate}</p> */}
                {loading ? (
                  <Skeleton className="h-10 w-64 bg-white/20 rounded-lg" />
                ) : (
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Welcome back, {user?.name.split(" ")[0]}! 👋
                  </h1>
                )}
                <p className="text-blue-100 mt-2 max-w-md opacity-90">
                  Check your attendance stats and keep up the momentum.
                </p>
              </div>
            </div>

            {/* Overall Attendance Card */}
            <div className="bg-white rounded-4xl p-6 md:p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <TrendingUp size={20} />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Overall Attendance Overview</h2>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <p className="text-slate-600 text-base mb-4">
                    You have attended{" "}
                    <span className="font-bold text-slate-900">
                      {loading ? "-" : overallStats.attended}
                    </span>{" "}
                    out of{" "}
                    <span className="font-bold text-slate-900">{TOTAL_ALL_SESSIONS}</span>{" "}
                    total sessions. Maintain above 80% to be eligible for certification.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="border rounded-lg">
                      <p className="text-slate-500">Main</p>
                      <p className="font-bold text-slate-800">{regularAttended}/{TOTAL_MAIN_SESSIONS}</p>
                    </div>
                    <div className="border rounded-lg">
                      <p className="text-slate-500">Special</p>
                      <p className="font-bold text-slate-800">{specialAttended}/{TOTAL_SPECIAL_SESSIONS}</p>
                    </div>
                    <div className="border rounded-lg">
                      <p className="text-slate-500">Guest</p>
                      <p className="font-bold text-slate-800">{guestAttended}/{TOTAL_GUEST_SESSIONS}</p>
                    </div>
                  </div>
                </div>

                {/* Percentage Circle */}
                <div className="relative">
                  {loading ? (
                    <Skeleton className="h-32 w-32 rounded-full" />
                  ) : (
                    <div className="w-32 h-32 rounded-full flex items-center justify-center relative">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={overallStats.percentage >= 80 ? "#10b981" : "#6366f1"}
                          strokeWidth="8"
                          strokeDasharray="283"
                          strokeDashoffset={283 - (283 * (overallStats.percentage || 0)) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
                        />
                      </svg>
                      <div className="text-center">
                        <span className="text-3xl font-black text-slate-900">{overallStats.percentage}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Session Type Stats - 3 cards with correct calculations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Regular/Main Session Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <BookOpen size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800">Main Classes</h3>
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-slate-800">
                    {loading ? "-" : regularAttended}
                  </span>
                  <span className="text-slate-400 ml-2">/ {TOTAL_MAIN_SESSIONS}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${regularPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">{regularPercentage}% completed</p>
              </div>

              {/* Special Session Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-xl">
                    <Users size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800">Special Classes</h3>
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-slate-800">
                    {loading ? "-" : specialAttended}
                  </span>
                  <span className="text-slate-400 ml-2">/ {TOTAL_SPECIAL_SESSIONS}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-orange-500 transition-all duration-500"
                    style={{ width: `${specialPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">{specialPercentage}% completed</p>
              </div>

              {/* Guest Session Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
                    <Users size={20} />
                  </div>
                  <h3 className="font-bold text-slate-800">Guest Classes</h3>
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-slate-800">
                    {loading ? "-" : guestAttended}
                  </span>
                  <span className="text-slate-400 ml-2">/ {TOTAL_GUEST_SESSIONS}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-teal-500 transition-all duration-500"
                    style={{ width: `${guestPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">{guestPercentage}% completed</p>
              </div>
            </div>

            {/* Success Message */}
            {!loading && overallStats.percentage >= 80 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <p className="text-sm text-emerald-800 font-medium">
                  🎉 Excellent progress! You&apos;re on track for certification. Keep up the great work!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}