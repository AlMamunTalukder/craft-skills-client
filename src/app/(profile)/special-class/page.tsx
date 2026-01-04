// app/special-class/page.tsx
"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Save, Clock } from "lucide-react";
import toast from "react-hot-toast";

const studentId = "your-student-id";
const batchId = "36";

// Use the actual attendance routine ID from your database
const ATTENDANCE_ROUTINE_ID = "694ea462045fcf9aeda56247";

export default function SpecialClassAttendance() {
  const [attendance, setAttendance] = useState([
    { className: "Special Class 1", attended: false },
    { className: "Special Class 2", attended: false },
    { className: "Special Class 3", attended: false },
    { className: "Special Class 4", attended: false },
    { className: "Special Class 5", attended: false },
  ]);
  
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    loadSavedAttendance();
  }, []);

  const loadSavedAttendance = async () => {
    try {
      console.log('Loading saved special class attendance...');
      const response = await fetch(`/api/student-attendance/my-attendance?batchId=${batchId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Saved special class attendance data:', data);
        if (data.success && data.data && data.data.length > 0) {
          const latestAttendance = data.data[0];
          if (latestAttendance.attendanceData?.specialClasses) {
            setAttendance(latestAttendance.attendanceData.specialClasses);
            toast.success('Loaded saved special class attendance from database');
          }
        }
      } else {
        console.error('Failed to load special attendance:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to load saved special attendance:', error);
    }
  };

  const toggleAttendance = (index: number) => {
    const newAttendance = [...attendance];
    newAttendance[index].attended = !newAttendance[index].attended;
    setAttendance(newAttendance);
    setHasUnsavedChanges(true);
    toast.success('Special class attendance updated!');
  };

  const saveAttendance = async () => {
    setSaving(true);
    try {
      console.log('Saving special class attendance...', {
        studentId,
        attendanceRoutineId: ATTENDANCE_ROUTINE_ID,
        batchId,
        attendanceType: 'specialClasses',
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
          attendanceType: 'specialClasses'
        }),
      });

      const result = await response.json();
      console.log('Save response:', result);

      if (result.success) {
        toast.success('Special class attendance saved to database!');
        setHasUnsavedChanges(false);
        loadSavedAttendance(); // Reload to confirm save
      } else {
        toast.error(result.message || 'Failed to save special attendance');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save special class attendance');
    } finally {
      setSaving(false);
    }
  };

  const totalClasses = attendance.length;
  const attendedClasses = attendance.filter(cls => cls.attended).length;
  const percentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Special Class Attendance
        </h1>
        <p className="text-gray-600 mt-2">
          Track your special class attendance
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl lg:rounded-2xl shadow-lg p-6 lg:p-8 text-white mb-6 lg:mb-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Attendance Summary</h2>
            <p className="text-orange-100">Your special class attendance record</p>
          </div>
          <div className="mt-4 lg:mt-0 text-center lg:text-right">
            <div className="text-4xl lg:text-5xl font-bold">{percentage}%</div>
            <div className="text-lg">
              {attendedClasses}/{totalClasses} Classes
            </div>
          </div>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {attendance.map((cls, index) => (
            <div
              key={cls.className}
              className={`border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                cls.attended
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
              }`}
              onClick={() => toggleAttendance(index)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="font-medium text-gray-800">
                    {cls.className}
                  </div>

                  <div
                    className={`text-sm font-medium ${
                      cls.attended
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    ({cls.attended ? "Attended ✓" : "Not Attended"})
                  </div>
                </div>

                {cls.attended ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : (
                  <XCircle className="text-gray-400" size={24} />
                )}
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
                {hasUnsavedChanges ? 'Click save to store in database' : 'Special attendance saved'}
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
                  Save Special Attendance
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}