/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Save } from 'lucide-react';
import { attendanceService } from '@/src/services/attendance';

const BATCH_ID = '36';

const SPECIAL_CLASSES = [
  { className: 'Special Class 1', type: 'special_session' },
  { className: 'Special Class 2', type: 'special_session' },
  { className: 'Special Class 3', type: 'special_session' },
  { className: 'Special Class 4', type: 'special_session' },
  { className: 'Special Class 5', type: 'special_session' }
];

export default function SpecialClassAttendance() {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      const result = await attendanceService.getAttendance(BATCH_ID, 'special');
      
      if (result.success) {
        const attendanceMap: Record<string, boolean> = {};
        result.data.forEach((item: any) => {
          const key = `${item.className}-${item.sessionType}`;
          attendanceMap[key] = item.attended;
        });
        setAttendance(attendanceMap);
      }
    } catch (error) {
      console.error('Failed to load attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = (className: string) => {
    const key = `${className}-special_session`;
    setAttendance(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveAttendance = async () => {
    setSaving(true);
    
    try {
      const promises = SPECIAL_CLASSES.map(cls => {
        const key = `${cls.className}-special_session`;
        return attendanceService.saveAttendance({
          className: cls.className,
          batchId: BATCH_ID,
          attendanceType: 'special',
          sessionType: 'special_session',
          attended: attendance[key] || false
        });
      });

      await Promise.all(promises);
      toast.success('Special class attendance saved!');
      await loadAttendance();
    } catch (error) {
      toast.error('Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  const total = SPECIAL_CLASSES.length;
  const attended = SPECIAL_CLASSES.filter(cls => {
    const key = `${cls.className}-special_session`;
    return attendance[key];
  }).length;
  const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading special class attendance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Special Class Attendance</h1>
          <p className="text-gray-600 mt-2">Batch {BATCH_ID}</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Special Classes Summary</h2>
              <p className="text-orange-100">Your special class attendance</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-5xl font-bold">{percentage}%</div>
              <div className="text-xl">{attended}/{total} Classes</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SPECIAL_CLASSES.map(cls => {
              const key = `${cls.className}-special_session`;
              const isAttended = attendance[key] || false;
              
              return (
                <div
                  key={cls.className}
                  onClick={() => toggleAttendance(cls.className)}
                  className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                    isAttended
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{cls.className}</div>
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

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={saveAttendance}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Special Class Attendance'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}