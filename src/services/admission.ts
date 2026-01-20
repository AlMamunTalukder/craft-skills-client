// // src/services/admission.ts
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// export const admissionService = {
//     // Get current student's admission
//     getMyAdmission: async () => {
//         try {
//             const response = await fetch(`${API_URL}/admissions/my/admission`, {
//                 method: 'GET',
//                 credentials: 'include', // Important for cookies/sessions
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             return await response.json();
//         } catch (error) {
//             console.error('Error fetching admission:', error);
//             return {
//                 success: false,
//                 message: 'Failed to fetch admission data',
//                 data: null
//             };
//         }
//     }
// };