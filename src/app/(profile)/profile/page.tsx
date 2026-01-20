// src/app/(profile)/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import { BookOpen, Star, Users, RefreshCw, XCircle } from "lucide-react";
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

interface TodaySession {
  className: string;
  sessionType: "regular" | "problemSolving" | "practice";
  time: string;
  topic: string;
  attended: boolean;
  attendanceId?: string;
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Overall Attendance Card */}
        <Skeleton className="h-32 w-full rounded-xl" />

        {/* Student Info */}
        <div className="bg-white rounded-xl p-6 space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </div>

        {/* Attendance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [todaySessions, setTodaySessions] = useState<TodaySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Load dashboard data
      const dashboardResult = await studentAttendanceService.getDashboard();
      if (dashboardResult.success) {
        setDashboardData(dashboardResult.data);

        // Load today's sessions
        const sessionsResult =
          await studentAttendanceService.getTodaySessions();
        if (sessionsResult.success) {
          setTodaySessions(sessionsResult.data || []);
        }
      } else {
        setError(dashboardResult.message || "Failed to load dashboard");
      }
    } catch (err) {
      console.error("Error loading dashboard:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Failed to load data
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No data found
          </h3>
          <p className="text-gray-600 mb-4">
            Please contact support if this continues.
          </p>
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const { user, attendanceStats } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-2">
                Batch {user.batchNumber} •{" "}
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            </div>
            <button
              onClick={() => {
                setRefreshing(true);
                loadDashboardData();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
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

        {/* Overall Stats */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Overall Attendance</h2>
              <p className="text-blue-100">Your attendance summary</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold">
                {attendanceStats.summary.percentage}%
              </div>
              <div className="text-lg">
                {attendanceStats.summary.attended}/
                {attendanceStats.summary.total} Sessions
              </div>
            </div>
          </div>
        </div>

        {/* Student Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Student Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Name</div>
              <div className="font-semibold text-gray-800">{user.name}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Batch</div>
              <div className="font-semibold text-gray-800">
                #{user.batchNumber}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Email</div>
              <div className="font-semibold text-gray-800 truncate">
                {user.email}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Phone</div>
              <div className="font-semibold text-gray-800">{user.phone}</div>
            </div>
          </div>

          {user.batchId && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-3">
                Batch Information
              </h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-medium text-blue-800">
                  {user.batchId.name}
                </div>
                <p className="text-sm text-blue-600 mt-1">
                  {user.batchId.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Attendance Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BookOpen className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Regular Classes</h3>
                <p className="text-sm text-gray-600">
                  {attendanceStats.byType.regular.percentage}% attended
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Star className="text-orange-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Problem Solving</h3>
                <p className="text-sm text-gray-600">
                  {attendanceStats.byType.problemSolving.percentage}% attended
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  Practice Sessions
                </h3>
                <p className="text-sm text-gray-600">
                  {attendanceStats.byType.practice.percentage}% attended
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
