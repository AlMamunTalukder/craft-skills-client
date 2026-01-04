/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Save } from 'lucide-react';
import { attendanceService } from '@/src/services/attendance';

const BATCH_ID = '36';

// Main class data
const MAIN_CLASSES = [
  {
    className: 'Main Class 1',
    sessions: [
      { type: 'main_class', name: 'Main Class Session' },
      { type: 'problem_solving', name: 'Problem Solving Session' },
      { type: 'practice', name: 'Practice Session' }
    ]
  },
  {
    className: 'Main Class 2',
    sessions: [
      { type: 'main_class', name: 'Main Class Session' },
      { type: 'problem_solving', name: 'Problem Solving Session' },
      { type: 'practice', name: 'Practice Session' }
    ]
  },
  {
    className: 'Main Class 3',
    sessions: [
      { type: 'main_class', name: 'Main Class Session' },
      { type: 'problem_solving', name: 'Problem Solving Session' },
      { type: 'practice', name: 'Practice Session' }
    ]
  }
];

export default function MainClassAttendance() {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [summary, setSummary] = useState({ total: 0, attended: 0, percentage: 0 });

  // Load saved attendance
  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      const result = await attendanceService.getAttendance(BATCH_ID, 'main');
      
      if (result.success) {
        // Convert array to object for easy lookup
        const attendanceMap: Record<string, boolean> = {};
        result.data.forEach((item: any) => {
          const key = `${item.className}-${item.sessionType}`;
          attendanceMap[key] = item.attended;
        });
        setAttendance(attendanceMap);
        
        // Load summary
        const summaryResult = await attendanceService.getSummary(BATCH_ID, 'main');
        if (summaryResult.success) {
          setSummary(summaryResult.data);
        }
      }
    } catch (error) {
      console.error('Failed to load attendance:', error);
      toast.error('Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = (className: string, sessionType: string) => {
    const key = `${className}-${sessionType}`;
    setAttendance(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveAttendance = async () => {
    setSaving(true);
    
    try {
      // Save all attendance records
      const promises = MAIN_CLASSES.flatMap(cls => 
        cls.sessions.map(session => {
          const key = `${cls.className}-${session.type}`;
          return attendanceService.saveAttendance({
            className: cls.className,
            batchId: BATCH_ID,
            attendanceType: 'main',
            sessionType: session.type,
            attended: attendance[key] || false
          });
        })
      );

      await Promise.all(promises);
      toast.success('Attendance saved successfully!');
      await loadAttendance(); // Refresh data
    } catch (error) {
      console.error('Failed to save attendance:', error);
      toast.error('Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading attendance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Main Class Attendance</h1>
          <p className="text-gray-600 mt-2">Batch {BATCH_ID}</p>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Attendance Summary</h2>
              <p className="text-blue-100">Your main class attendance record</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-5xl font-bold">{summary.percentage}%</div>
              <div className="text-xl">
                {summary.attended}/{summary.total} Sessions
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="space-y-8">
            {MAIN_CLASSES.map(cls => (
              <div key={cls.className} className="border-b border-gray-200 pb-8 last:border-0 last:pb-0">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{cls.className}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {cls.sessions.map(session => {
                    const key = `${cls.className}-${session.type}`;
                    const isAttended = attendance[key] || false;
                    
                    return (
                      <div
                        key={session.type}
                        onClick={() => toggleAttendance(cls.className, session.type)}
                        className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                          isAttended
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">{session.name}</div>
                            <div className={`text-sm mt-1 ${isAttended ? 'text-green-600' : 'text-gray-500'}`}>
                              {isAttended ? 'Attended' : 'Not Attended'}
                            </div>
                          </div>
                          {isAttended ? (
                            <CheckCircle className="text-green-500" size={24} />
                          ) : (
                            <XCircle className="text-gray-400" size={24} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={saveAttendance}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save All Attendance'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}