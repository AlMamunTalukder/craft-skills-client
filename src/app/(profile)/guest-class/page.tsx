/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle, Users, RefreshCw, User } from 'lucide-react';
import { studentAttendanceService } from '@/src/services/studentAttendance';
import { Skeleton } from '@/components/ui/skeleton';

function GuestClassAttendanceSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-teal-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>

        {/* Stats Card */}
        <Skeleton className="h-40 w-full rounded-xl" />

        {/* Guest Class Cards */}
        <div className="bg-white rounded-xl p-6 space-y-6">
          <Skeleton className="h-6 w-60" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-44 w-full rounded-xl" />
          ))}
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

export default function GuestClassAttendance() {
  const [loading, setLoading] = useState(true);
  const [guestClasses, setGuestClasses] = useState<any[]>([]);
  const [attendanceStats, setAttendanceStats] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const guestClassList = Array.from({ length: 5 }, (_, i) => `Guest Class ${i + 1}`);
 

  useEffect(() => {
    loadGuestClassData();
  }, []);

  const loadGuestClassData = async () => {
    try {
      setLoading(true);
      
      // Load dashboard data for stats
      const dashboardResult = await studentAttendanceService.getDashboard();
      
      if (dashboardResult.success && dashboardResult.data) {
        const { attendanceStats: stats } = dashboardResult.data;
        setAttendanceStats(stats);
        
        // Load attendance history to check which guest classes are attended
        const sessionsResult = await studentAttendanceService.getAttendanceHistory(100);
        if (sessionsResult.success && sessionsResult.data) {
          const guestClassAttendance = guestClassList.map((className, index) => {
            // Filter for guest classes by checking sessionType
            const attendedRecord = sessionsResult.data.find((record: any) => 
              record.className === className && record.sessionType === 'guest'
            );
            
            return {
              className,
              attended: attendedRecord?.attended || false,
              attendanceId: attendedRecord?._id,
              date: attendedRecord?.date,
              // guestName: guestSpeakers[index] || 'Guest Speaker',
              topic: `Guest Lecture on ${['Web Development', 'Career Growth', 'Industry Trends', 'Project Management', 'Soft Skills'][index] || 'Professional Development'}`
            };
          });
          
          setGuestClasses(guestClassAttendance);
        }
      }
      
      toast.success('Guest class data loaded');
    } catch (error) {
      console.error('Load error:', error);
      toast.error('Failed to load guest classes');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const toggleAttendance = async (className: string, currentStatus: boolean) => {
    try {
      const result = await studentAttendanceService.updateGuestClass(
        className,
        !currentStatus
      );

      if (result.success) {
        // Update local state
        setGuestClasses(prev => prev.map(cls => 
          cls.className === className 
            ? { ...cls, attended: !currentStatus, date: new Date() }
            : cls
        ));
        
        // Update stats if available
        if (result.data) {
          setAttendanceStats(result.data);
        }
        
        toast.success(`Guest class ${!currentStatus ? 'marked' : 'unmarked'} successfully`);
      } else {
        toast.error(result.message || 'Failed to update');
      }
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error('Failed to update attendance');
    }
  };

  const calculateGuestClassStats = () => {
    const attended = guestClasses.filter(cls => cls.attended).length;
    const total = 5;
    const percentage = Math.round((attended / total) * 100);
    
    return { attended, total, percentage };
  };

  if (loading) {
    return (
      <GuestClassAttendanceSkeleton/>
    );
  }

  const stats = calculateGuestClassStats();

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-teal-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Guest Class Attendance</h1>
              <p className="text-gray-600 mt-2">Learn from industry experts and guest speakers</p>
            </div>
            <button
              onClick={() => {
                setRefreshing(true);
                loadGuestClassData();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              disabled={refreshing}
            >
              <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-linear-to-r from-green-600 to-teal-700 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Users size={24} />
                Guest Classes Progress
              </h2>
              <p className="text-green-100">5 guest lectures with industry professionals</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold">{stats.percentage}%</div>
              <div className="text-lg">{stats.attended}/{stats.total} Classes Attended</div>
            </div>
          </div>
        </div>

        {/* Guest Classes List */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Guest Lecture Sessions</h3>
          
          <div className="space-y-6">
            {guestClasses.map((guestClass, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl p-6 transition-all duration-200 ${
                  guestClass.attended
                    ? 'border-green-500 bg-linear-to-br from-green-50 to-emerald-50'
                    : 'border-green-300 bg-green-50 hover:border-green-400 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-800 text-lg">{guestClass.className}</h4>
                      <div className="flex items-center gap-2 text-blue-600">
                        <User size={18} />
                        <span className="text-sm font-medium">{guestClass.guestName}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{guestClass.topic}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      {guestClass.date ? 
                        `Attended on ${new Date(guestClass.date).toLocaleDateString()}` : 
                        'Not attended yet'}
                    </div>
                  </div>
                  <div className={`ml-4 p-3 rounded-full ${guestClass.attended ? 'bg-green-100' : 'bg-green-100'}`}>
                    {guestClass.attended ? (
                      <CheckCircle className="text-green-600" size={24} />
                    ) : (
                      <Users className="text-green-600" size={24} />
                    )}
                  </div>
                </div>

                <button
                  onClick={() => toggleAttendance(guestClass.className, guestClass.attended)}
                  className={`w-full py-3 rounded-lg font-medium transition ${
                    guestClass.attended
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-linear-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                  }`}
                >
                  {guestClass.attended ? '✓ Attended Guest Lecture' : 'Mark Guest Lecture Attendance'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{stats.attended}</div>
              <div className="text-sm text-gray-600">Attended</div>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{stats.total - stats.attended}</div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Guest Classes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}