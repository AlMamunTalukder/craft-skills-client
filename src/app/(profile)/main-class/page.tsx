/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  User, 
  GraduationCap, 
  BarChart3,
  CheckSquare,
  Square
} from 'lucide-react';
import { studentAttendanceService } from '@/src/services/studentAttendance';

interface MainClass {
  className: string;
  regular: boolean;
  problemSolving: boolean;
  practice: boolean;
}

export default function MainClassAttendancePage() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [mainClasses, setMainClasses] = useState<MainClass[]>([]);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
  const [todayDate] = useState(new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  // Generate 15 main classes
  const generateMainClasses = () => {
    const classes: MainClass[] = [];
    for (let i = 1; i <= 15; i++) {
      classes.push({
        className: `Class ${i}`,
        regular: false,
        problemSolving: false,
        practice: false
      });
    }
    return classes;
  };

  // Load all data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      
      // 1. Load dashboard data
      const dashboardResult = await studentAttendanceService.getDashboard();
      
      if (dashboardResult.success && dashboardResult.data) {
        setDashboardData(dashboardResult.data);
        
        // 2. Initialize main classes
        const generatedClasses = generateMainClasses();
        
        // 3. Load attendance history and update class status
        const historyResult = await studentAttendanceService.getAttendanceHistory(100);
        if (historyResult.success && historyResult.data) {
          setAttendanceHistory(historyResult.data || []);
          
          // Update class attendance status based on history
          // IMPORTANT: Only consider records where attended === true
          const updatedClasses = generatedClasses.map(cls => {
            const classHistory = historyResult.data.filter((record: any) => 
              record.className === cls.className && 
              (record.sessionType === 'regular' || 
               record.sessionType === 'problemSolving' || 
               record.sessionType === 'practice')
            );
            
            // Find the latest record for each session type
            const regularRecord = classHistory
              .filter((r: any) => r.sessionType === 'regular')
              .sort((a: any, b: any) => new Date(b.markedAt).getTime() - new Date(a.markedAt).getTime())[0];
            
            const problemSolvingRecord = classHistory
              .filter((r: any) => r.sessionType === 'problemSolving')
              .sort((a: any, b: any) => new Date(b.markedAt).getTime() - new Date(a.markedAt).getTime())[0];
            
            const practiceRecord = classHistory
              .filter((r: any) => r.sessionType === 'practice')
              .sort((a: any, b: any) => new Date(b.markedAt).getTime() - new Date(a.markedAt).getTime())[0];
            
            return {
              ...cls,
              regular: regularRecord?.attended || false,
              problemSolving: problemSolvingRecord?.attended || false,
              practice: practiceRecord?.attended || false
            };
          });
          
          setMainClasses(updatedClasses);
        } else {
          setMainClasses(generatedClasses);
        }
        
        toast.success('All data loaded successfully');
      } else {
        toast.error(dashboardResult.message || 'Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (className: string, sessionType: 'regular' | 'problemSolving' | 'practice') => {
    try {
      // Find current attendance status
      const currentClass = mainClasses.find(cls => cls.className === className);
      if (!currentClass) return;
      
      const currentStatus = currentClass[sessionType];
      const newStatus = !currentStatus;

      console.log('Marking attendance:', { className, sessionType, currentStatus, newStatus });

      const result = await studentAttendanceService.markAttendance({
        className: className,
        sessionType: sessionType,
        attended: newStatus
      });

      console.log('Mark attendance result:', result);

      if (result.success) {
        // Update main classes state immediately
        setMainClasses(prev => prev.map(cls => 
          cls.className === className 
            ? { ...cls, [sessionType]: newStatus }
            : cls
        ));
        
        // Update dashboard stats if available
        if (result.data && dashboardData) {
          setDashboardData({
            ...dashboardData,
            attendanceStats: result.data,
          });
        }
        
        // Reload history to get updated records
        const historyResult = await studentAttendanceService.getAttendanceHistory(100);
        if (historyResult.success) {
          setAttendanceHistory(historyResult.data || []);
        }
        
        toast.success(`Attendance ${newStatus ? 'marked' : 'unmarked'} for ${className} - ${sessionType}`);
      } else {
        toast.error(result.message || 'Failed to mark attendance');
        // Reload data to ensure UI is in sync
        await loadAllData();
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error('Failed to mark attendance');
      // Reload data to ensure UI is in sync
      await loadAllData();
    }
  };

  const calculateMainClassStats = () => {
    let attendedSessions = 0;
    
    mainClasses.forEach(cls => {
      if (cls.regular) attendedSessions++;
      if (cls.problemSolving) attendedSessions++;
      if (cls.practice) attendedSessions++;
    });

    // For 15 classes × 3 sessions each = 45 total possible sessions
    const totalPossibleSessions = 45;
    const percentage = totalPossibleSessions > 0 ? Math.round((attendedSessions / totalPossibleSessions) * 100) : 0;
    
    return {
      attended: attendedSessions,
      total: totalPossibleSessions,
      percentage,
      completed: attendedSessions,
      remaining: totalPossibleSessions - attendedSessions
    };
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your attendance...</p>
          <p className="text-sm text-gray-500">Fetching your profile and attendance data</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Failed to load data</h3>
          <p className="text-gray-600 mb-4">Please try refreshing the page or contact support.</p>
          <button
            onClick={loadAllData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { user, attendanceStats } = dashboardData;
  const mainClassStats = calculateMainClassStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Main Class Attendance</h1>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                📅 {todayDate}
              </p>
            </div>
            <button
              onClick={loadAllData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              <RefreshCw size={18} />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Student Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600 flex items-center gap-2">
                  <GraduationCap size={16} />
                  Batch {user.batchNumber} • Main Classes
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {user.status?.charAt(0).toUpperCase() + user.status?.slice(1) || 'Active'}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Student ID: {user._id?.slice(-8) || 'N/A'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">Name</div>
              <div className="font-semibold text-gray-800">{user.name}</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-sm text-blue-600 mb-1">Batch Code</div>
              <div className="font-bold text-blue-800">#{user.batchNumber}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">Email</div>
              <div className="font-semibold text-gray-800 truncate">{user.email}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">Phone</div>
              <div className="font-semibold text-gray-800">{user.phone}</div>
            </div>
          </div>
        </div>

        {/* Main Class Stats */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <BarChart3 size={24} />
                Main Class Progress
              </h2>
              <p className="text-indigo-200">15 Classes × 3 Sessions Each = 45 Total Sessions</p>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-4xl md:text-5xl font-bold">{mainClassStats.percentage}%</div>
              <div className="text-lg">{mainClassStats.attended}/{mainClassStats.total} Sessions</div>
            </div>
          </div>
          
          {/* Progress breakdown */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{mainClassStats.completed}</div>
              <div className="text-indigo-200 text-sm">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{mainClassStats.remaining}</div>
              <div className="text-indigo-200 text-sm">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">15</div>
              <div className="text-indigo-200 text-sm">Total Classes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">45</div>
              <div className="text-indigo-200 text-sm">Total Sessions</div>
            </div>
          </div>
        </div>

        {/* Session Type Legend */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Session Types</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-700">Regular Class</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-700">Problem Solving</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-700">Practice Session</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-700">Attended</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-700">Not Attended</span>
            </div>
          </div>
        </div>

        {/* Main Classes Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Main Classes Attendance</h3>
          
          <div className="space-y-6">
            {mainClasses.map((cls, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-800">{cls.className}</h4>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${cls.regular ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      Regular
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${cls.problemSolving ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      Problem
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${cls.practice ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      Practice
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Regular Session */}
                  <button
                    onClick={() => markAttendance(cls.className, 'regular')}
                    className={`border-2 rounded-lg p-4 transition-all duration-200 flex items-center justify-between ${
                      cls.regular
                        ? 'border-green-500 bg-green-50 hover:bg-green-100'
                        : 'border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-gray-800">Regular Class</div>
                      <div className={`text-sm mt-1 font-medium ${cls.regular ? 'text-green-600' : 'text-blue-600'}`}>
                        {cls.regular ? '✓ Attended' : '○ Not Attended'}
                      </div>
                    </div>
                    <div className={`p-2 rounded-full ${cls.regular ? 'bg-green-100' : 'bg-blue-100'}`}>
                      {cls.regular ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-blue-500"></div>
                      )}
                    </div>
                  </button>

                  {/* Problem Solving Session */}
                  <button
                    onClick={() => markAttendance(cls.className, 'problemSolving')}
                    className={`border-2 rounded-lg p-4 transition-all duration-200 flex items-center justify-between ${
                      cls.problemSolving
                        ? 'border-green-500 bg-green-50 hover:bg-green-100'
                        : 'border-orange-300 bg-orange-50 hover:bg-orange-100 hover:border-orange-400'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-gray-800">Problem Solving</div>
                      <div className={`text-sm mt-1 font-medium ${cls.problemSolving ? 'text-green-600' : 'text-orange-600'}`}>
                        {cls.problemSolving ? '✓ Attended' : '○ Not Attended'}
                      </div>
                    </div>
                    <div className={`p-2 rounded-full ${cls.problemSolving ? 'bg-green-100' : 'bg-orange-100'}`}>
                      {cls.problemSolving ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-orange-500"></div>
                      )}
                    </div>
                  </button>

                  {/* Practice Session */}
                  <button
                    onClick={() => markAttendance(cls.className, 'practice')}
                    className={`border-2 rounded-lg p-4 transition-all duration-200 flex items-center justify-between ${
                      cls.practice
                        ? 'border-green-500 bg-green-50 hover:bg-green-100'
                        : 'border-green-300 bg-green-50 hover:bg-green-100 hover:border-green-400'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-gray-800">Practice Session</div>
                      <div className={`text-sm mt-1 font-medium ${cls.practice ? 'text-green-600' : 'text-green-600'}`}>
                        {cls.practice ? '✓ Attended' : '○ Not Attended'}
                      </div>
                    </div>
                    <div className={`p-2 rounded-full ${cls.practice ? 'bg-green-100' : 'bg-green-100'}`}>
                      {cls.practice ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-green-500"></div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{mainClassStats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{mainClassStats.remaining}</div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{mainClassStats.total}</div>
              <div className="text-sm text-gray-600">Total Sessions</div>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{mainClassStats.percentage}%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>
        </div>

        {/* Recent Main Class Attendance History */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Main Class Attendance</h3>
          {attendanceHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 text-gray-600 font-medium">Date</th>
                    <th className="text-left p-3 text-gray-600 font-medium">Class</th>
                    <th className="text-left p-3 text-gray-600 font-medium">Session Type</th>
                    <th className="text-left p-3 text-gray-600 font-medium">Status</th>
                    <th className="text-left p-3 text-gray-600 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceHistory
                    .filter((record: any) => 
                      record.className.startsWith('Class ') && 
                      (record.sessionType === 'regular' || 
                       record.sessionType === 'problemSolving' || 
                       record.sessionType === 'practice')
                    )
                    .slice(0, 15)
                    .map((record, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="p-3">{formatDate(record.date || record.createdAt)}</td>
                      <td className="p-3 font-medium">{record.className}</td>
                      <td className="p-3">
                        <span className={`capitalize px-3 py-1 rounded-full text-xs font-medium ${
                          record.sessionType === 'regular' 
                            ? 'bg-blue-100 text-blue-800'
                            : record.sessionType === 'problemSolving'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {record.sessionType?.replace(/([A-Z])/g, ' $1') || 'Regular'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          record.attended
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.attended ? (
                            <>
                              <CheckCircle size={12} />
                              Attended
                            </>
                          ) : (
                            <>
                              <XCircle size={12} />
                              Absent
                            </>
                          )}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">
                        {record.markedAt ? new Date(record.markedAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        }) : record.createdAt ? new Date(record.createdAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        }) : '--'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CheckSquare size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No main class attendance records found yet.</p>
              <p className="text-sm text-gray-400 mt-1">Mark your first attendance above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}