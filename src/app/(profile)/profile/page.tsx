"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Star,
  Users,
  XCircle,
  Calendar,
  TrendingUp,
  GraduationCap,
  Download,
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
      regular: { attended: number; percentage: number };
      problemSolving: { attended: number; percentage: number };
      practice: { attended: number; percentage: number };
    };
  };
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setError("");
      setLoading(true);
      const dashboardResult = await studentAttendanceService.getDashboard();
      if (dashboardResult.success && dashboardResult.data) {
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
  const payment = dashboardData?.user?.admissionId;

  // Helper for progress bar color
  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-emerald-500 shadow-emerald-200";
    if (percentage >= 60) return "bg-amber-500 shadow-amber-200";
    return "bg-rose-500 shadow-rose-200";
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

  return (
    <div className="min-h-screen bg-slate-50/80 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* LEFT COLUMN: Profile Sidebar (Sticky) */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="sticky top-8 space-y-6">
              {/* Identity Card */}
              <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 flex flex-col items-center text-center relative overflow-hidden group">
                {/* Decorative Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-indigo-600 to-violet-600">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
                </div>

                <div className="relative z-10 mt-16 mb-4">
                  {loading ? (
                    <Skeleton className="h-28 w-28 rounded-full border-4 border-white" />
                  ) : (
                    <div className="h-28 w-28 rounded-full border-[6px] border-white bg-slate-50 shadow-lg flex items-center justify-center text-4xl font-black text-indigo-600 select-none">
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
                    <h2 className="text-xl font-bold text-slate-900">
                      {user?.name}
                    </h2>
                    <p className="text-slate-500 text-sm mb-4">{user?.email}</p>

                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wide border border-indigo-100">
                        {user?.role}
                      </span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
                        Batch {user?.batchNumber}
                      </span>
                    </div>
                  </>
                )}

                {/* Contact Quick Info */}
                {!loading && payment && (
                  <div className="w-full pt-6 border-t border-slate-100 flex justify-between text-sm">
                    <div className="text-center w-1/2 border-r border-slate-100">
                      <p className="text-slate-400 text-xs font-medium uppercase">
                        Phone
                      </p>
                      <p className="font-semibold text-slate-700 mt-1">
                        {user?.phone}
                      </p>
                    </div>
                    <div className="text-center w-1/2 border-r border-slate-100">
                      <p className="text-slate-400 text-xs font-medium uppercase">
                        Amount Paid
                      </p>
                      <p className="font-semibold text-slate-700 mt-1">
                        ৳{payment.amount}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Course Info Card */}
              {!loading && user?.batchId && (
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-violet-100 text-violet-600 rounded-xl">
                      <GraduationCap size={20} />
                    </div>
                    <h3 className="font-bold text-slate-800">Course Details</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p className="text-xs text-slate-400 font-semibold uppercase mb-1">
                        Batch Name
                      </p>
                      <p className="font-bold text-slate-800">
                        {user.batchId.name}
                      </p>
                    </div>
                    <div className="text-sm text-slate-500 px-2">
                      {user.batchId.description}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Dashboard & Stats */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* 1. Welcome Header Banner */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div>
                    <p className="text-indigo-200 font-medium mb-1">
                      {currentDate}
                    </p>
                    {loading ? (
                      <Skeleton className="h-10 w-64 bg-white/10" />
                    ) : (
                      <h1 className="text-3xl md:text-4xl font-bold">
                        Welcome back, {user?.name.split(" ")[0]}! 👋
                      </h1>
                    )}
                    <p className="text-slate-400 mt-2 max-w-md">
                      Check your latest attendance stats and keep up the
                      momentum for your upcoming sessions.
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl text-sm font-medium transition border border-white/5">
                      <Calendar size={16} />
                      Schedule
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-medium transition shadow-lg shadow-indigo-900/20">
                      <Download size={16} />
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Primary Stat Card (Full Width) */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <TrendingUp size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">
                    Attendance Overview
                  </h2>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  You have attended{" "}
                  <span className="font-bold text-slate-900">
                    {stats?.summary.attended}
                  </span>{" "}
                  out of{" "}
                  <span className="font-bold text-slate-900">
                    {stats?.summary.total}
                  </span>{" "}
                  total sessions. Maintain above 80% to be eligible for the
                  final certification.
                </p>

                {/* Mini Legend */}
                <div className="flex gap-4 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                    Regular
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>{" "}
                    Problem Solving
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                    Practice
                  </div>
                </div>
              </div>

              {/* Large Percentage Indicator */}
              <div className="relative group cursor-default">
                {loading ? (
                  <Skeleton className="h-32 w-32 rounded-full" />
                ) : (
                  <div className="w-40 h-40 rounded-full border-8 border-slate-50 flex items-center justify-center relative">
                    {/* SVG Circle for visual flair */}
                    <svg
                      className="absolute inset-0 w-full h-full -rotate-90"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={
                          stats?.summary.percentage &&
                          stats.summary.percentage >= 80
                            ? "#10b981"
                            : "#6366f1"
                        }
                        strokeWidth="8"
                        strokeDasharray="283"
                        strokeDashoffset={
                          283 - (283 * (stats?.summary.percentage || 0)) / 100
                        }
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="text-center">
                      <span className="text-4xl font-black text-slate-900 tracking-tight block">
                        {stats?.summary.percentage}%
                      </span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Score
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Detailed Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Regular Class",
                  icon: BookOpen,
                  color: "blue",
                  data: stats?.byType.regular,
                },
                {
                  title: "Problem Solving",
                  icon: Star,
                  color: "purple",
                  data: stats?.byType.problemSolving,
                },
                {
                  title: "Practice Session",
                  icon: Users,
                  color: "emerald",
                  data: stats?.byType.practice,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition duration-300 group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`p-3 rounded-2xl bg-${item.color}-50 text-${item.color}-600 group-hover:bg-${item.color}-100 transition`}
                    >
                      <item.icon size={24} />
                    </div>
                    {!loading && (
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-xs font-bold text-slate-600">
                          {item.data?.percentage}%
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-2xl font-bold text-slate-700">
                      {loading ? "-" : item.data?.attended}
                    </span>
                    <span className="text-sm text-slate-400 mb-1">
                      sessions
                    </span>
                  </div>

                  {loading ? (
                    <Skeleton className="h-2 w-full" />
                  ) : (
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(item.data?.percentage || 0)}`}
                        style={{ width: `${item.data?.percentage}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
