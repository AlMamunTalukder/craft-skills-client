// src/app/(profile)/profile/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { BookOpen, Star, Users, RefreshCw, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { studentAttendanceService } from '@/src/services/studentAttendance';

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
  sessionType: 'regular' | 'problemSolving' | 'practice';
  time: string;
  topic: string;
  attended: boolean;
  attendanceId?: string;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [todaySessions, setTodaySessions] = useState<TodaySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Load dashboard data
      const dashboardResult = await studentAttendanceService.getDashboard();
      if (dashboardResult.success) {
        setDashboardData(dashboardResult.data);
        
        // Load today's sessions
        const sessionsResult = await studentAttendanceService.getTodaySessions();
        if (sessionsResult.success) {
          setTodaySessions(sessionsResult.data || []);
        }
      } else {
        setError(dashboardResult.message || 'Failed to load dashboard');
      }
    } catch (err) {
      console.error('Error loading dashboard:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleMarkAttendance = async (session: TodaySession) => {
    try {
      const result = await studentAttendanceService.markAttendance({
        className: session.className,
        sessionType: session.sessionType,
        attended: !session.attended,
      });

      if (result.success) {
        // Update local state
        const updatedSessions = todaySessions.map(s =>
          s.className === session.className && s.sessionType === session.sessionType
            ? { ...s, attended: !s.attended }
            : s
        );
        setTodaySessions(updatedSessions);

        // Update dashboard stats if available
        if (result.data && dashboardData) {
          setDashboardData({
            ...dashboardData,
            attendanceStats: result.data,
          });
        }

        alert(`Attendance ${!session.attended ? 'marked' : 'unmarked'} successfully!`);
      } else {
        alert(result.message || 'Failed to update attendance');
      }
    } catch (err) {
      console.error('Error marking attendance:', err);
      alert('Failed to update attendance');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Failed to load data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No data found</h3>
          <p className="text-gray-600 mb-4">Please contact support if this continues.</p>
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
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
                Batch {user.batchNumber} • {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
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
              <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Overall Attendance</h2>
              <p className="text-blue-100">Your attendance summary</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold">{attendanceStats.summary.percentage}%</div>
              <div className="text-lg">{attendanceStats.summary.attended}/{attendanceStats.summary.total} Sessions</div>
            </div>
          </div>
        </div>

        {/* Student Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Student Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Name</div>
              <div className="font-semibold text-gray-800">{user.name}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Batch</div>
              <div className="font-semibold text-gray-800">#{user.batchNumber}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Email</div>
              <div className="font-semibold text-gray-800 truncate">{user.email}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500 mb-1">Phone</div>
              <div className="font-semibold text-gray-800">{user.phone}</div>
            </div>
          </div>

          {user.batchId && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-3">Batch Information</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-medium text-blue-800">{user.batchId.name}</div>
                <p className="text-sm text-blue-600 mt-1">{user.batchId.description}</p>
              </div>
            </div>
          )}

          {user.admissionId && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-3">Payment Information</h4>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Payment Method</div>
                    <div className="font-medium">{user.admissionId.paymentMethod}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Payment Status</div>
                    <div className={`px-2 py-1 rounded text-sm font-medium inline-block ${
                      user.admissionId.paymentStatus === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.admissionId.paymentStatus}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Today's Sessions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar size={24} />
              Todays Sessions ({today})
            </h2>
            <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {todaySessions.filter(s => s.attended).length} of {todaySessions.length} marked
            </div>
          </div>

          {todaySessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todaySessions.map((session, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-xl p-5 transition-all ${
                    session.attended
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-white hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{session.className}</h3>
                      <p className="text-gray-600 capitalize">{session.sessionType}</p>
                      <p className="text-sm text-gray-500 mt-2">{session.topic}</p>
                    </div>
                    <div className={`p-2 rounded-full ${session.attended ? 'bg-green-100' : 'bg-gray-100'}`}>
                      {session.attended ? (
                        <CheckCircle className="text-green-600" size={20} />
                      ) : (
                        <XCircle className="text-gray-400" size={20} />
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      <span className="text-sm">{session.time}</span>
                    </div>
                    <button
                      onClick={() => handleMarkAttendance(session)}
                      className={`px-3 py-1.5 rounded text-sm font-medium ${
                        session.attended
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {session.attended ? '✓ Attended' : 'Mark Attendance'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
              <Calendar size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No sessions today</h3>
              <p className="text-gray-600">Check back tomorrow for scheduled sessions.</p>
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
                <p className="text-sm text-gray-600">{attendanceStats.byType.regular.percentage}% attended</p>
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
                <p className="text-sm text-gray-600">{attendanceStats.byType.problemSolving.percentage}% attended</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="text-green-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Practice Sessions</h3>
                <p className="text-sm text-gray-600">{attendanceStats.byType.practice.percentage}% attended</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}