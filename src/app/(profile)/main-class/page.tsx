/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle, XCircle, RefreshCw, AlertCircle, Info } from 'lucide-react';
import { studentAttendanceService } from '@/src/services/studentAttendance';
import { currentUser } from '@/src/lib/currentUser';

export default function MainClassAttendance() {
  const [attendance, setAttendance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [userBatchId, setUserBatchId] = useState<string>('');
  const [recordBatchId, setRecordBatchId] = useState<string>('');
  const [apiError, setApiError] = useState<string>('');

  const mainClasses = Array.from({ length: 15 }, (_, i) => `Class ${i + 1}`);
  const sessionTypes = [
    { key: 'regular', label: 'Regular Class' },
    { key: 'problemSolving', label: 'Problem Solving' },
    { key: 'practice', label: 'Practice Session' }
  ];

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      setApiError('');
      
      // Get user data
      const userData = await currentUser();
      
      if (!userData) {
        toast.error('Please log in to view attendance');
        window.location.href = '/login';
        return;
      }
      
      // Get batch ID from user data
      const userBatchId = userData?.batchNumber || '36';
      console.log('User Batch ID:', userBatchId);
      setUserBatchId(userBatchId);
      
      console.log('Loading attendance...');
      const result = await studentAttendanceService.getAttendance(userBatchId);
      console.log('Attendance result:', result);
      
      if (result.success) {
        console.log('Attendance data received:', result.data);
        setAttendance(result.data);
        setRecordBatchId(result.data.batchId || userBatchId);
        
        // Check for batchId mismatch
        if (result.data.batchId && result.data.batchId !== userBatchId) {
          console.warn(`Batch ID mismatch: User has ${userBatchId}, Record has ${result.data.batchId}`);
          // toast.info(`Note: Your attendance record is for Batch ${result.data.batchId}`);
        }
        
        toast.success('Attendance loaded successfully');
      } else {
        setApiError(result.message || 'Failed to load attendance');
        // toast.error('Failed to load attendance');
      }
    } catch (error: any) {
      // console.error('Load error details:', error);
      setApiError(error.message || 'Network error');
      // toast.error('Failed to load attendance');
    } finally {
      setLoading(false);
    }
  };

  const toggleAttendance = async (className: string, sessionType: string) => {
    try {
      setSaving(`${className}-${sessionType}`);
      
      // Get current status
      const currentStatus = attendance?.mainClasses?.[className]?.[sessionType] || false;
      const newValue = !currentStatus;

      // Update local state immediately for better UX
      const updatedAttendance = {
        ...attendance,
        mainClasses: {
          ...attendance.mainClasses,
          [className]: {
            ...attendance.mainClasses[className],
            [sessionType]: newValue
          }
        },
        updatedAt: new Date().toISOString()
      };
      
      setAttendance(updatedAttendance);
      
      console.log('Saving attendance:', {
        className,
        sessionType,
        attended: newValue,
        // Use the record's batchId if available, otherwise use user's batchId
        batchId: recordBatchId || userBatchId
      });

      // Save to API - use the record's batchId if it exists
      const saveBatchId = recordBatchId || userBatchId;
      const result = await studentAttendanceService.updateMainClass(
        className,
        sessionType,
        newValue,
        saveBatchId
      );

      console.log('Save result:', result);

      if (result.success) {
        setAttendance(result.data);
        toast.success(`Updated ${className} - ${sessionType}`);
      } else {
        console.error('Save failed:', result);
        
        // If the error is about batchId mismatch, try to fix it
        if (result.message?.includes('batch') || result.error?.includes('batch')) {
          toast.error('Batch mismatch detected. Refreshing data...');
          loadAttendance();
        } else {
          toast.error(result.error || result.message || 'Failed to save');
        }
      }
    } catch (error: any) {
      console.error('Toggle error details:', error);
      toast.error('Failed to update attendance');
      // Reload to get correct state
      loadAttendance();
    } finally {
      setSaving(null);
    }
  };

  const calculateStats = () => {
    if (!attendance || !attendance.mainClasses) {
      return { attended: 0, total: 45, percentage: 0 };
    }
    
    let attended = 0;
    Object.values(attendance.mainClasses || {}).forEach((cls: any) => {
      if (cls.regular) attended++;
      if (cls.problemSolving) attended++;
      if (cls.practice) attended++;
    });
    
    const total = 45;
    const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;
    
    return { attended, total, percentage };
  };

  const stats = calculateStats();

  // Get class data safely
  const getClassData = (className: string) => {
    return attendance?.mainClasses?.[className] || {
      regular: false,
      problemSolving: false,
      practice: false
    };
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
        <div className="mb-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Main Class Attendance</h1>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-gray-600">Your Batch: {userBatchId}</p>
                {recordBatchId && recordBatchId !== userBatchId && (
                  <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    <Info size={14} />
                    <span>Record Batch: {recordBatchId}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={loadAttendance}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <RefreshCw size={18} />
                Refresh
              </button>
            </div>
          </div>
          
          {apiError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-red-500" size={20} />
                <p className="text-red-600">{apiError}</p>
              </div>
            </div>
          )}

          {/* Batch ID Warning */}
          {recordBatchId && recordBatchId !== userBatchId && (
            <div className="mt-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
                <div>
                  <h3 className="font-medium text-yellow-800">Batch ID Notice</h3>
                  <p className="text-yellow-700 mt-1 text-sm">
                    Your attendance record is registered under <strong>Batch {recordBatchId}</strong>, 
                    but your profile shows <strong>Batch {userBatchId}</strong>. 
                    This might cause issues when saving attendance.
                  </p>
                  <p className="text-yellow-600 mt-2 text-sm">
                    Contact your administrator if you believe this is incorrect.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Attendance Summary</h2>
              <p className="text-blue-100">Your main class progress</p>
              {recordBatchId && (
                <p className="text-blue-200 text-sm mt-1">
                  Record Batch: {recordBatchId}
                </p>
              )}
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold">{stats.percentage}%</div>
              <div className="text-lg">{stats.attended}/{stats.total} Sessions</div>
            </div>
          </div>
        </div>

        {/* Debug Info - Development only */}
        {process.env.NODE_ENV === 'development' && attendance && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <details>
              <summary className="cursor-pointer font-medium text-blue-800">Debug Information</summary>
              <div className="mt-2 space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">User Batch ID:</span> {userBatchId}
                  </div>
                  <div>
                    <span className="font-medium">Record Batch ID:</span> {recordBatchId}
                  </div>
                  <div>
                    <span className="font-medium">Match:</span>{' '}
                    <span className={userBatchId === recordBatchId ? 'text-green-600' : 'text-red-600'}>
                      {userBatchId === recordBatchId ? '✓ Matched' : '✗ Mismatched'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Attendance ID:</span> {attendance._id?.substring(0, 8)}...
                  </div>
                </div>
                <div>
                  <span className="font-medium">Total classes:</span> {Object.keys(attendance.mainClasses || {}).length}
                </div>
                <div>
                  <span className="font-medium">Attended sessions:</span> {stats.attended}
                </div>
              </div>
            </details>
          </div>
        )}

        {/* Attendance Grid */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100">
          <div className="space-y-6">
            {mainClasses.map((className) => {
              const classData = getClassData(className);
              
              return (
                <div key={className} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {className}
                    </h3>
                    <div className="flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${classData.regular ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        Regular
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${classData.problemSolving ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        Problem
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${classData.practice ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        Practice
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    {sessionTypes.map((session) => {
                      const isAttended = classData[session.key] || false;
                      const isSaving = saving === `${className}-${session.key}`;
                      
                      return (
                        <button
                          key={session.key}
                          onClick={() => toggleAttendance(className, session.key)}
                          disabled={isSaving}
                          className={`relative border-2 rounded-lg p-4 transition-all duration-200 ${
                            isAttended
                              ? 'border-green-500 bg-green-50 hover:bg-green-100'
                              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-blue-400'
                          } ${isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}`}
                        >
                          {isSaving && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-lg">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <div className="font-medium text-gray-800">{session.label}</div>
                              <div className={`text-sm mt-1 font-medium ${isAttended ? 'text-green-600' : 'text-gray-500'}`}>
                                {isAttended ? '✓ Attended' : '○ Not Attended'}
                              </div>
                            </div>
                            <div className={`p-2 rounded-full ${isAttended ? 'bg-green-100' : 'bg-gray-100'}`}>
                              {isAttended ? (
                                <CheckCircle className="text-green-600" size={24} />
                              ) : (
                                <XCircle className="text-gray-400" size={24} />
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Info className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">{stats.attended}</div>
                <div className="text-sm text-gray-600">Sessions Attended</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <XCircle className="text-gray-600" size={20} />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">{stats.total - stats.attended}</div>
                <div className="text-sm text-gray-600">Sessions Remaining</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <CheckCircle className="text-purple-600" size={20} />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">{stats.total}</div>
                <div className="text-sm text-gray-600">Total Sessions</div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <RefreshCw className="text-green-600" size={20} />
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800">{stats.percentage}%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Troubleshooting:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• If attendance is not saving, check if your Batch ID matches the record</li>
            <li>• Your profile shows Batch {userBatchId}</li>
            <li>• The attendance record is for Batch {recordBatchId || userBatchId}</li>
            <li>• If these dont match, contact your administrator to update your record</li>
            <li>• Use Refresh button to reload data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}