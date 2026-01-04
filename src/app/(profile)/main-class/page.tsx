/* eslint-disable @typescript-eslint/no-explicit-any */
// app/main-class/page.tsx
"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Save, Clock, RefreshCw, User } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Configuration
const BATCH_ID = "36";
const ATTENDANCE_ROUTINE_ID = "694ea462045fcf9aeda56247";

export default function MainClassAttendance() {
  const router = useRouter();
  const [attendance, setAttendance] = useState([
    {
      className: "Main Class 1",
      sessions: [
        { type: "Main Class Session", attended: false },
        { type: "Problem Solving Session", attended: false },
        { type: "Practice Session", attended: false },
      ],
    },
    {
      className: "Main Class 2",
      sessions: [
        { type: "Main Class Session", attended: false },
        { type: "Problem Solving Session", attended: false },
        { type: "Practice Session", attended: false },
      ],
    },
    {
      className: "Main Class 3",
      sessions: [
        { type: "Main Class Session", attended: false },
        { type: "Problem Solving Session", attended: false },
        { type: "Practice Session", attended: false },
      ],
    },
 
  ]);
  
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; phone: string } | null>(null);

  // Load saved attendance on mount
  useEffect(() => {
    loadSavedAttendance();
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
        credentials: 'include', 
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setUserInfo({
            name: data.data.name,
            email: data.data.email,
            phone: data.data.phone
          });
        }
      } else if (response.status === 401) {
        // Not logged in, redirect to login
        toast.error('Please login to view attendance');
        router.push('/login');
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
    }
  };

  const loadSavedAttendance = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/student-attendance/my-attendance?batchId=${BATCH_ID}`,
        {
          method: 'GET',
          credentials: 'include', // Send cookies for authentication
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 401) {
        toast.error('Session expired. Please login again.');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Loaded attendance:', data);

      if (data.success && data.data && data.data.length > 0) {
        const latestAttendance = data.data[0];
        if (latestAttendance.attendanceData?.mainClasses) {
          setAttendance(latestAttendance.attendanceData.mainClasses);
          toast.success('Loaded saved attendance');
        }
      } else {
        toast.error(data.message || 'No saved attendance found');
      }

    } catch (error: any) {
      console.error('Failed to load attendance:', error);
      
      if (error.message?.includes('401')) {
        toast.error('Please login first');
        router.push('/login');
      } else {
        toast.error(`Failed to load: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = (classIndex: number, sessionIndex: number) => {
    const newAttendance = [...attendance];
    newAttendance[classIndex].sessions[sessionIndex].attended =
      !newAttendance[classIndex].sessions[sessionIndex].attended;
    setAttendance(newAttendance);
    setHasUnsavedChanges(true);
    toast.success('Attendance updated!', { duration: 1000 });
  };

  const saveAttendance = async () => {
    setSaving(true);
    try {
      console.log('Saving main class attendance...');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/student-attendance/save`,
        {
          method: 'POST',
          credentials: 'include', // Send cookies for authentication
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            attendanceRoutineId: ATTENDANCE_ROUTINE_ID,
            attendanceData: attendance,
            batchId: BATCH_ID,
            attendanceType: 'mainClasses'
          }),
        }
      );

      if (response.status === 401) {
        toast.error('Session expired. Please login again.');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Save response:', result);

      if (result.success) {
        toast.success('Attendance saved to database!');
        setHasUnsavedChanges(false);
        // Refresh data
        loadSavedAttendance();
      } else {
        toast.error(result.message || 'Failed to save');
      }

    } catch (error: any) {
      console.error('Save error:', error);
      toast.error(`Failed to save: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('Logged out successfully');
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const totalSessions = attendance.reduce(
    (total, cls) => total + cls.sessions.length,
    0
  );
  const attendedSessions = attendance.reduce(
    (total, cls) => total + cls.sessions.filter((s) => s.attended).length,
    0
  );
  const percentage =
    totalSessions > 0
      ? Math.round((attendedSessions / totalSessions) * 100)
      : 0;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
              Main Class Attendance
            </h1>
            <p className="text-gray-600 mt-2">
              Track your regular class attendance • Batch {BATCH_ID}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* User Info */}
            {userInfo && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{userInfo.name}</p>
                  <p className="text-xs text-gray-500">{userInfo.email || userInfo.phone}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-800 ml-2"
                >
                  Logout
                </button>
              </div>
            )}
            
            <button
              onClick={loadSavedAttendance}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg"
            >
              <RefreshCw size={18} />
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl lg:rounded-2xl shadow-lg p-6 lg:p-8 text-white mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-2">
              Attendance Summary
            </h2>
            <p className="text-blue-100">Your main class attendance record</p>
          </div>
          <div className="mt-4 lg:mt-0 text-center lg:text-right">
            <div className="text-4xl lg:text-5xl font-bold">{percentage}%</div>
            <div className="text-lg">
              {attendedSessions}/{totalSessions} Sessions
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
        <div className="space-y-6">
          {attendance.map((cls, classIndex) => (
            <div
              key={cls.className}
              className="border-b border-gray-200 pb-6 last:border-0 last:pb-0"
            >
              <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">
                {cls.className}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cls.sessions.map((session, sessionIndex) => (
                  <div
                    key={session.type}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      session.attended
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                    onClick={() => toggleAttendance(classIndex, sessionIndex)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium text-gray-800">
                        {session.type}
                      </div>

                      <div
                        className={`text-sm font-medium ${
                          session.attended ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {session.attended ? "Attended" : "Not Attended"}
                      </div>

                      {session.attended ? (
                        <CheckCircle className="text-green-500" size={24} />
                      ) : (
                        <XCircle className="text-gray-400" size={24} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className={`font-medium ${hasUnsavedChanges ? 'text-blue-600' : 'text-green-600'}`}>
                {hasUnsavedChanges ? '⚠️ Unsaved changes' : '✓ All changes saved'}
              </p>
              <p className="text-sm text-gray-500">
                {hasUnsavedChanges ? 'Click save to store in database' : 'Your attendance is saved'}
              </p>
            </div>
            
            <div className="flex gap-3">
              {hasUnsavedChanges && (
                <button
                  onClick={() => {
                    setAttendance(prev => prev.map(cls => ({
                      ...cls,
                      sessions: cls.sessions.map(s => ({ ...s, attended: false }))
                    })));
                    setHasUnsavedChanges(true);
                    toast.success('All attendance reset');
                  }}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                >
                  Reset All
                </button>
              )}
              
              <button
                onClick={saveAttendance}
                disabled={saving || !hasUnsavedChanges}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  hasUnsavedChanges && !saving
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {saving ? (
                  <>
                    <Clock className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Save Attendance
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Debug Info (remove in production) */}
          <div className="mt-4 text-xs text-gray-500 space-y-1">
            <p>Batch: {BATCH_ID} | Routine ID: {ATTENDANCE_ROUTINE_ID}</p>
            <p>User: {userInfo?.name || 'Not loaded'}</p>
            <button
              onClick={() => {
                console.log('User info:', userInfo);
                console.log('Attendance data:', attendance);
                console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
              }}
              className="text-blue-600 hover:text-blue-800 text-xs"
            >
              Show Debug Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}