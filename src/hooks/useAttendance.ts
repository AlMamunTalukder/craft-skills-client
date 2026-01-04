// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect, useCallback } from 'react';
// import toast from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import { attendanceService } from '../services/attendanceService';

// interface UseAttendanceProps {
//     type: 'main' | 'special' | 'guest';
//     attendanceRoutineId: string;
//     batchId?: string;
// }

// const ATTENDANCE_TYPE_MAP = {
//     main: 'mainClasses',
//     special: 'specialClasses',
//     guest: 'guestClasses'
// } as const;

// export const useAttendance = ({
//     type,
//     attendanceRoutineId,
//     batchId = '36'
// }: UseAttendanceProps) => {
//     const router = useRouter();
//     const [classes, setClasses] = useState<ClassItem[]>([]);
//     const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [routineData, setRoutineData] = useState<any>(null);

//     // Load attendance routine and saved data
//     const loadAttendanceData = useCallback(async () => {
//         try {
//             setLoading(true);
            
//             // 1. Get attendance routine
//             const routinesResponse = await attendanceService.getAttendanceRoutines(batchId, type);
            
//             if (!routinesResponse.success || !routinesResponse.data?.[0]) {
//                 toast.error('No attendance routine found');
//                 return;
//             }

//             const routine = routinesResponse.data[0];
//             setRoutineData(routine);
            
//             // 2. Initialize classes from routine
//             const initialClasses = attendanceService.initializeAttendanceFromRoutine(routine, type);
            
//             // 3. Get saved attendance and merge
//             const savedResponse = await attendanceService.getStudentAttendance(batchId);
            
//             if (savedResponse.success && savedResponse.data?.[0]) {
//                 const savedAttendance = savedResponse.data[0];
//                 const savedType = ATTENDANCE_TYPE_MAP[type];
                
//                 if (savedAttendance.attendanceData?.[savedType]) {
//                     // Merge saved data with routine structure
//                     const savedClasses = savedAttendance.attendanceData[savedType];
                    
//                     const mergedClasses = initialClasses.map(cls => {
//                         const savedClass = savedClasses.find((s: any) => 
//                             s.className === cls.className
//                         );
                        
//                         if (savedClass) {
//                             return {
//                                 ...cls,
//                                 sessions: cls.sessions.map((session, idx) => ({
//                                     ...session,
//                                     attended: savedClass.sessions?.[idx]?.attended || false
//                                 }))
//                             };
//                         }
//                         return cls;
//                     });
                    
//                     setClasses(mergedClasses);
//                 } else {
//                     setClasses(initialClasses);
//                 }
//             } else {
//                 setClasses(initialClasses);
//             }
            
//             setHasUnsavedChanges(false);
            
//         } catch (error: any) {
//             console.error('Error loading attendance:', error);
//             toast.error(error.message || 'Failed to load attendance');
//         } finally {
//             setLoading(false);
//         }
//     }, [type, batchId]);

//     // Toggle attendance
//     const toggleAttendance = useCallback((classIndex: number, sessionIndex: number) => {
//         setClasses(prev => {
//             const newClasses = [...prev];
//             newClasses[classIndex].sessions[sessionIndex].attended = 
//                 !newClasses[classIndex].sessions[sessionIndex].attended;
//             return newClasses;
//         });
//         setHasUnsavedChanges(true);
//         toast.success('Updated!', { duration: 1000 });
//     }, []);

//     // Save attendance
//     const saveAttendance = useCallback(async () => {
//         if (!hasUnsavedChanges) return;
        
//         setSaving(true);
//         try {
//             const result = await attendanceService.saveAttendance({
//                 attendanceRoutineId,
//                 attendanceData: classes,
//                 batchId,
//                 attendanceType: ATTENDANCE_TYPE_MAP[type]
//             });
            
//             if (result.success) {
//                 setHasUnsavedChanges(false);
//                 toast.success('Attendance saved successfully!');
//                 await loadAttendanceData(); // Refresh data
//             }
//         } catch (error: any) {
//             toast.error(error.message || 'Failed to save attendance');
//         } finally {
//             setSaving(false);
//         }
//     }, [attendanceRoutineId, batchId, type, classes, hasUnsavedChanges, loadAttendanceData]);

//     // Reset all attendance
//     const resetAllAttendance = useCallback(() => {
//         setClasses(prev => 
//             prev.map(cls => ({
//                 ...cls,
//                 sessions: cls.sessions.map(session => ({ ...session, attended: false }))
//             }))
//         );
//         setHasUnsavedChanges(true);
//         toast.success('All attendance reset');
//     }, []);

//     // Calculate statistics
//     const calculateStats = useCallback(() => {
//         const totalSessions = classes.reduce(
//             (total, cls) => total + cls.sessions.length, 
//             0
//         );
//         const attendedSessions = classes.reduce(
//             (total, cls) => total + cls.sessions.filter(s => s.attended).length, 
//             0
//         );
//         const percentage = totalSessions > 0 
//             ? Math.round((attendedSessions / totalSessions) * 100) 
//             : 0;

//         return { totalSessions, attendedSessions, percentage };
//     }, [classes]);

//     // Load data on mount
//     useEffect(() => {
//         loadAttendanceData();
//     }, [loadAttendanceData]);

//     return {
//         classes,
//         hasUnsavedChanges,
//         loading,
//         saving,
//         routineData,
//         toggleAttendance,
//         saveAttendance,
//         resetAllAttendance,
//         calculateStats,
//         refresh: loadAttendanceData
//     };
// };