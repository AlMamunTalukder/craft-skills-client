/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import { BookOpen, Star, Users, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { studentAttendanceService } from '@/src/services/studentAttendance';
import { currentUser } from '@/src/lib/currentUser';

export default function Dashboard() {
  const [stats, setStats] = useState({
    main: { attended: 0, total: 45, percentage: 0 },
    special: { attended: 0, total: 5, percentage: 0 },
    guest: { attended: 0, total: 5, percentage: 0 },
    overall: { attended: 0, total: 55, percentage: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [batchId, setBatchId] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadUserAndStatistics();
  }, []);

  const loadUserAndStatistics = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Load user data
      const userData = await currentUser();
      
      if (!userData) {
        setError('Please log in to view dashboard');
        window.location.href = '/login';
        return;
      }
      
      setUser(userData);
      
      // Get batch number from user data
      const userBatchId = userData?.batchNumber || '36';
      setBatchId(userBatchId);
      
      // Load attendance statistics
      const result = await studentAttendanceService.getStatistics(userBatchId);
      
      if (result.success) {
        setStats(result.data);
      } else {
        setError(result.message || 'Failed to load statistics');
        // Set default stats
        setStats({
          main: { attended: 0, total: 45, percentage: 0 },
          special: { attended: 0, total: 5, percentage: 0 },
          guest: { attended: 0, total: 5, percentage: 0 },
          overall: { attended: 0, total: 55, percentage: 0 }
        });
      }
    } catch (error: any) {
      console.error('Load error:', error);
      setError(error.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                Welcome back, {user?.name || 'Student'}!
              </h1>
              <p className="text-gray-600 mt-2">
                Batch {batchId} • Track your attendance progress
              </p>
            </div>
            <button
              onClick={loadUserAndStatistics}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          </div>
          
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Overall Stats */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Overall Attendance</h2>
              <p className="text-indigo-100">Your combined attendance across all classes</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold">{stats.overall.percentage}%</div>
              <div className="text-lg">{stats.overall.attended}/{stats.overall.total} Total Sessions</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard
            title="Main Classes"
            value={`${stats.main.attended}/${stats.main.total}`}
            percentage={stats.main.percentage}
            icon={BookOpen}
            color="blue"
            href="/main-class"
          />
          <StatCard
            title="Special Classes"
            value={`${stats.special.attended}/${stats.special.total}`}
            percentage={stats.special.percentage}
            icon={Star}
            color="orange"
            href="/special-class"
          />
          <StatCard
            title="Guest Classes"
            value={`${stats.guest.attended}/${stats.guest.total}`}
            percentage={stats.guest.percentage}
            icon={Users}
            color="green"
            href="/guest-class"
          />
        </div>

        {/* Student Information Section */}
        {user && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Student Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Name</div>
                <div className="font-semibold text-gray-800">{user.name || '-'}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Batch</div>
                <div className="font-semibold text-gray-800">#{batchId}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Email</div>
                <div className="font-semibold text-gray-800 truncate">{user.email || '-'}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Phone</div>
                <div className="font-semibold text-gray-800">{user.phone || '-'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, percentage, icon: Icon, color, href }: any) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200'
  };

  const colorKey = color as keyof typeof colorClasses;

  return (
    <Link href={href}>
      <div className={`${colorClasses[colorKey]} border rounded-xl p-6 hover:shadow-md transition-all duration-300 cursor-pointer`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`${colorClasses[colorKey].split(' ')[0]} p-3 rounded-lg`}>
            <Icon size={24} />
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm">{title}</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">{percentage}% attended</div>
          <div className="text-sm font-medium">{percentage}%</div>
        </div>
      </div>
    </Link>
  );
}