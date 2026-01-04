// /* eslint-disable @typescript-eslint/no-explicit-any */

// export interface Session {
//     type: string;
//     name: string;
//     attended: boolean;
//     _id?: string;
// }

// export interface ClassItem {
//     className: string;
//     type: 'main' | 'special' | 'guest';
//     sessions: Session[];
//     guestName?: string;
//     _id?: string;
// }

// export interface AttendanceData {
//     classes: ClassItem[];
// }

// export interface AttendanceResponse {
//     success: boolean;
//     data?: any;
//     message?: string;
// }

// class AttendanceService {
//     private apiUrl: string;

//     constructor() {
//         this.apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
//     }

//     // Get attendance routines for a batch
//     async getAttendanceRoutines(batchId: string, type?: string): Promise<AttendanceResponse> {
//         try {
//             const url = `${this.apiUrl}/student-attendance/routines?batchId=${batchId}${type ? `&type=${type}` : ''}`;
//             const response = await fetch(url, {
//                 credentials: 'include',
//                 headers: { 'Content-Type': 'application/json' }
//             });

//             if (response.status === 401) {
//                 throw new Error('Please login again');
//             }

//             return await response.json();
//         } catch (error: any) {
//             console.error('Error fetching routines:', error);
//             throw error;
//         }
//     }

//     // Get student's saved attendance
//     async getStudentAttendance(batchId: string): Promise<AttendanceResponse> {
//         try {
//             const response = await fetch(
//                 `${this.apiUrl}/student-attendance/my-attendance?batchId=${batchId}`,
//                 {
//                     credentials: 'include',
//                     headers: { 'Content-Type': 'application/json' }
//                 }
//             );

//             if (response.status === 401) {
//                 throw new Error('Please login again');
//             }

//             return await response.json();
//         } catch (error: any) {
//             console.error('Error fetching attendance:', error);
//             throw error;
//         }
//     }

//     // Save attendance
//     async saveAttendance(data: {
//         attendanceRoutineId: string;
//         attendanceData: ClassItem[];
//         batchId: string;
//         attendanceType: 'mainClasses' | 'guestClasses' | 'specialClasses';
//     }): Promise<AttendanceResponse> {
//         try {
//             // Get user ID from profile first
//             const profileResponse = await fetch(`${this.apiUrl}/users/profile`, {
//                 credentials: 'include',
//                 headers: { 'Content-Type': 'application/json' }
//             });

//             if (profileResponse.status === 401) {
//                 throw new Error('Please login first');
//             }

//             const profileData = await profileResponse.json();
            
//             if (!profileData.success || !profileData.data?._id) {
//                 throw new Error('Could not get user information');
//             }

//             const studentId = profileData.data._id;

//             // Prepare data in correct format
//             const requestData = {
//                 studentId,
//                 attendanceRoutineId: data.attendanceRoutineId,
//                 attendanceData: data.attendanceData.map(cls => ({
//                     className: cls.className,
//                     sessions: cls.sessions.map(session => ({
//                         type: session.type,
//                         name: session.name,
//                         attended: session.attended
//                     }))
//                 })),
//                 batchId: data.batchId,
//                 attendanceType: data.attendanceType
//             };

//             console.log('Sending attendance data:', requestData);

//             const response = await fetch(`${this.apiUrl}/student-attendance/save`, {
//                 method: 'POST',
//                 credentials: 'include',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(requestData)
//             });

//             const result = await response.json();
//             console.log('Save response:', result);

//             if (!result.success) {
//                 throw new Error(result.message || 'Failed to save attendance');
//             }

//             return result;
//         } catch (error: any) {
//             console.error('Error saving attendance:', error);
//             throw error;
//         }
//     }

//     // Filter classes by type
//     filterClassesByType(classes: ClassItem[], type: 'main' | 'special' | 'guest'): ClassItem[] {
//         return classes.filter(cls => cls.type === type);
//     }

//     // Initialize attendance data from routine
//     initializeAttendanceFromRoutine(routine: any, type: 'main' | 'special' | 'guest'): ClassItem[] {
//         if (!routine || !routine.classes) return [];
        
//         return routine.classes
//             .filter((cls: any) => cls.type === type)
//             .map((cls: any) => ({
//                 className: cls.className,
//                 type: cls.type,
//                 sessions: cls.sessions.map((session: any) => ({
//                     type: session.type,
//                     name: session.name,
//                     attended: false // Initialize as not attended
//                 })),
//                 guestName: cls.guestName,
//                 _id: cls._id
//             }));
//     }
// }

// export const attendanceService = new AttendanceService();