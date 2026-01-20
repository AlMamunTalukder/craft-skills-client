// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// export interface StudentResult {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   batchNumber: string;
//   batchId: string;
//   result: string;
//   attendanceStats?: {
//     overallRate: number;
//     totalAttended: number;
//     totalClasses: number;
//   };
//   lastUpdated: string;
//   feedback?: string;
// }

// export const resultService = {
//   // Get student's result from admission record
//   async getMyResult(): Promise<{
//     success: boolean;
//     data?: StudentResult;
//     message: string;
//   }> {
//     try {
//       const response = await fetch(`${API_URL}/users/my-result`, {
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         console.error('Failed to fetch result:', response.status);
//         return {
//           success: false,
//           message: `Failed to fetch result: ${response.status}`,
//         };
//       }

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error("Error fetching result:", error);
//       return {
//         success: false,
//         message: "Error connecting to server",
//       };
//     }
//   },

//   // Get result by batch (for students with multiple batches)
//   async getResultByBatch(batchId: string): Promise<{
//     success: boolean;
//     data?: StudentResult;
//     message: string;
//   }> {
//     try {
//       const response = await fetch(`${API_URL}/users/my-result?batchId=${batchId}`, {
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         return {
//           success: false,
//           message: "Failed to fetch result",
//         };
//       }

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error("Error fetching result:", error);
//       return {
//         success: false,
//         message: "Error connecting to server",
//       };
//     }
//   },

//   // Get result history (all batches)
//   async getResultHistory(): Promise<{
//     success: boolean;
//     data?: StudentResult[];
//     message: string;
//   }> {
//     try {
//       const response = await fetch(`${API_URL}/users/my-results`, {
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         return {
//           success: false,
//           message: "Failed to fetch results history",
//         };
//       }

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error("Error fetching results history:", error);
//       return {
//         success: false,
//         message: "Error connecting to server",
//       };
//     }
//   },
// };