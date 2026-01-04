// app/guest-class/page.tsx
"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, User, Save, Clock } from "lucide-react";
import toast from "react-hot-toast";

const studentId = "your-student-id";
const batchId = "36";

// Use the actual attendance routine ID from your database
const ATTENDANCE_ROUTINE_ID = "694ea462045fcf9aeda56247";

export default function GuestClassAttendance() {
  const [attendance, setAttendance] = useState([
    {
      className: "Guest Class 1",
      guestName: "Guest Speaker 1",
      sessions: [
        { type: "Guest Lecture Session", attended: false },
        { type: "Q&A Session", attended: false },
        { type: "Networking Session", attended: false },
      ],
    },
    {
      className: "Guest Class 2",
      guestName: "Guest Speaker 2",
      sessions: [
        { type: "Guest Lecture Session", attended: false },
        { type: "Q&A Session", attended: false },
        { type: "Networking Session", attended: false },
      ],
    },
    {
      className: "Guest Class 3",
      guestName: "Guest Speaker 3",
      sessions: [
        { type: "Guest Lecture Session", attended: false },
        { type: "Q&A Session", attended: false },
        { type: "Networking Session", attended: false },
      ],
    },
    {
      className: "Guest Class 4",
      guestName: "Guest Speaker 4",
      sessions: [
        { type: "Guest Lecture Session", attended: false },
        { type: "Q&A Session", attended: false },
        { type: "Networking Session", attended: false },
      ],
    },
    {
      className: "Guest Class 5",
      guestName: "Guest Speaker 5",
      sessions: [
        { type: "Guest Lecture Session", attended: false },
        { type: "Q&A Session", attended: false },
        { type: "Networking Session", attended: false },
      ],
    },
  ]);
  
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    loadSavedAttendance();
  }, []);

  const loadSavedAttendance = async () => {
    try {
      console.log('Loading saved guest attendance...');
      const response = await fetch(`/api/student-attendance/my-attendance?batchId=${batchId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Saved guest attendance data:', data);
        if (data.success && data.data && data.data.length > 0) {
          const latestAttendance = data.data[0];
          if (latestAttendance.attendanceData?.guestClasses) {
            setAttendance(latestAttendance.attendanceData.guestClasses);
            toast.success('Loaded saved guest attendance from database');
          }
        }
      } else {
        console.error('Failed to load guest attendance:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to load saved guest attendance:', error);
    }
  };

  const toggleAttendance = (classIndex: number, sessionIndex: number) => {
    const newAttendance = [...attendance];
    newAttendance[classIndex].sessions[sessionIndex].attended =
      !newAttendance[classIndex].sessions[sessionIndex].attended;
    setAttendance(newAttendance);
    setHasUnsavedChanges(true);
    toast.success('Guest attendance updated!');
  };

  const saveAttendance = async () => {
    setSaving(true);
    try {
      console.log('Saving guest class attendance...', {
        studentId,
        attendanceRoutineId: ATTENDANCE_ROUTINE_ID,
        batchId,
        attendanceType: 'guestClasses',
        attendanceData: attendance
      });

      const response = await fetch('/api/student-attendance/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          attendanceRoutineId: ATTENDANCE_ROUTINE_ID,
          attendanceData: attendance,
          batchId,
          attendanceType: 'guestClasses'
        }),
      });

      const result = await response.json();
      console.log('Save response:', result);

      if (result.success) {
        toast.success('Guest class attendance saved to database!');
        setHasUnsavedChanges(false);
        loadSavedAttendance(); // Reload to confirm save
      } else {
        toast.error(result.message || 'Failed to save guest attendance');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save guest attendance');
    } finally {
      setSaving(false);
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

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Guest Class Attendance
        </h1>
        <p className="text-gray-600 mt-2">
          Track your guest lecture attendance
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl lg:rounded-2xl shadow-lg p-6 lg:p-8 text-white mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Attendance Summary</h2>
            <p className="text-green-100">Your guest class attendance record</p>
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg lg:text-xl font-bold text-gray-800">
                  {cls.className}
                </h3>
                <div className="flex items-center gap-2 text-blue-600">
                  <User size={20} />
                  <span className="text-sm font-medium">{cls.guestName}</span>
                </div>
              </div>

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
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-gray-800">
                          {session.type}
                        </div>

                        <div
                          className={`text-sm font-medium ${
                            session.attended
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          ({session.attended ? "Attended" : "Not Attended"})
                        </div>
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
                {hasUnsavedChanges ? 'Click save to store in database' : 'Guest attendance saved'}
              </p>
            </div>
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
                  Saving to Database...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Guest Attendance
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}