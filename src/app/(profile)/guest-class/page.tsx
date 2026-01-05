/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, User } from 'lucide-react';
import { studentAttendanceService } from '@/src/services/studentAttendance';
import { currentUser } from '@/src/lib/currentUser';

export default function GuestClassAttendance() {
  const [attendance, setAttendance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [batchId, setBatchId] = useState<string>('');

  const guestClasses = Array.from({ length: 5 }, (_, i) => `Guest Class ${i + 1}`);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      // Get user data to extract batch ID
      const userData = await currentUser();
      const userBatchId = userData?.batchNumber || '36';
      setBatchId(userBatchId);
      
      const result = await studentAttendanceService.getAttendance(userBatchId);
      
      if (result.success) {
        setAttendance(result.data);
      }
    } catch (error) {
      console.error('Load error:', error);
      toast.error('Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = async (className: string) => {
    try {
      setSaving(className);
      
      const current = attendance?.guestClasses?.[className]?.attended || false;
      const newValue = !current;

      const result = await studentAttendanceService.updateGuestClass(
        className,
        newValue,
        batchId
      );

      if (result.success) {
        setAttendance(result.data);
        toast.success(`${className} ${newValue ? 'marked attended' : 'marked not attended'}`);
      } else {
        toast.error('Failed to update');
      }
    } catch (error) {
      console.error('Toggle error:', error);
      toast.error('Failed to update attendance');
    } finally {
      setSaving(null);
    }
  };

  // Calculate stats
  const calculateStats = () => {
    if (!attendance) return { attended: 0, total: 5, percentage: 0 };
    
    let attended = 0;
    Object.values(attendance.guestClasses || {}).forEach((cls: any) => {
      if (cls.attended) attended++;
    });
    
    const total = 5;
    const percentage = Math.round((attended / total) * 100);
    
    return { attended, total, percentage };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading guest classes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Guest Class Attendance</h1>
          <p className="text-gray-600 mt-2">Batch {batchId}</p>
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Guest Classes Summary</h2>
              <p className="text-green-100">Your guest lecture progress</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold">{stats.percentage}%</div>
              <div className="text-lg">{stats.attended}/{stats.total} Classes</div>
            </div>
          </div>
        </div>

        {/* Attendance List */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
          <div className="space-y-6">
            {guestClasses.map((className) => {
              const guestClass = attendance?.guestClasses?.[className];
              const isAttended = guestClass?.attended || false;
              const guestName = guestClass?.guestName || 'Guest Speaker';
              const isSaving = saving === className;
              
              return (
                <div key={className} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">{className}</h3>
                    <div className="flex items-center gap-2 text-blue-600">
                      <User size={20} />
                      <span className="text-sm font-medium">{guestName}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleAttendance(className)}
                    disabled={isSaving}
                    className={`w-full border rounded-lg p-4 transition-all duration-300 ${
                      isAttended
                        ? 'border-green-500 bg-green-50 hover:bg-green-100'
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-blue-300'
                    } ${isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-medium text-gray-800">Guest Lecture Session</div>
                        <div className={`text-sm mt-1 ${isAttended ? 'text-green-600' : 'text-gray-500'}`}>
                          {isAttended ? '✓ Attended Guest Lecture' : 'Click to mark guest lecture attendance'}
                        </div>
                      </div>
                      {isAttended ? (
                        <CheckCircle className="text-green-500" size={24} />
                      ) : (
                        <XCircle className="text-gray-400" size={24} />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}