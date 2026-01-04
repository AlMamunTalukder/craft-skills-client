/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, Save, User } from 'lucide-react';
import { attendanceService } from '@/src/services/attendance';

const BATCH_ID = '36';

const GUEST_CLASSES = [
  { className: 'Guest Class 1', guestName: 'Guest Speaker 1', type: 'guest_lecture' },
  { className: 'Guest Class 2', guestName: 'Guest Speaker 2', type: 'guest_lecture' },
  { className: 'Guest Class 3', guestName: 'Guest Speaker 3', type: 'guest_lecture' },
  { className: 'Guest Class 4', guestName: 'Guest Speaker 4', type: 'guest_lecture' },
  { className: 'Guest Class 5', guestName: 'Guest Speaker 5', type: 'guest_lecture' }
];

export default function GuestClassAttendance() {
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      const result = await attendanceService.getAttendance(BATCH_ID, 'guest');
      
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

  const toggleAttendance = (className: string, type: string) => {
    const key = `${className}-${type}`;
    setAttendance(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveAttendance = async () => {
    setSaving(true);
    
    try {
      const promises = GUEST_CLASSES.map(cls => {
        const key = `${cls.className}-${cls.type}`;
        return attendanceService.saveAttendance({
          className: cls.className,
          batchId: BATCH_ID,
          attendanceType: 'guest',
          sessionType: cls.type,
          attended: attendance[key] || false
        });
      });

      await Promise.all(promises);
      toast.success('Guest class attendance saved!');
      await loadAttendance();
    } catch (error) {
      toast.error('Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  const total = GUEST_CLASSES.length;
  const attended = GUEST_CLASSES.filter(cls => {
    const key = `${cls.className}-${cls.type}`;
    return attendance[key];
  }).length;
  const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading guest class attendance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Guest Class Attendance</h1>
          <p className="text-gray-600 mt-2">Batch {BATCH_ID}</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Guest Classes Summary</h2>
              <p className="text-green-100">Your guest lecture attendance</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-5xl font-bold">{percentage}%</div>
              <div className="text-xl">{attended}/{total} Classes</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="space-y-6">
            {GUEST_CLASSES.map(cls => {
              const key = `${cls.className}-${cls.type}`;
              const isAttended = attendance[key] || false;
              
              return (
                <div key={cls.className} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{cls.className}</h3>
                    <div className="flex items-center gap-2 text-blue-600">
                      <User size={20} />
                      <span className="text-sm font-medium">{cls.guestName}</span>
                    </div>
                  </div>

                  <div
                    onClick={() => toggleAttendance(cls.className, cls.type)}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                      isAttended
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">Guest Lecture Session</div>
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
              {saving ? 'Saving...' : 'Save Guest Class Attendance'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}