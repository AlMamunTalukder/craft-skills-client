// src/services/studentAttendance.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const studentAttendanceService = {
  
  async getAttendance(batchId: string) {
    try {
      console.log(`[Service] Getting attendance for batch: ${batchId}`);
      const response = await fetch(
        `${API_URL}/student-attendance?batchId=${batchId}`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log(`[Service] Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Service] Error response: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`[Service] Success response:`, data);
      return data;
    } catch (error) {
      console.error('[Service] Error fetching attendance:', error);
      throw error;
    }
  },

  async updateMainClass(className: string, sessionType: string, attended: boolean, batchId: string) {
    try {
      console.log(`[Service] Updating main class:`, {
        className,
        sessionType,
        attended,
        batchId
      });
      
      const response = await fetch(
        `${API_URL}/student-attendance/main-class`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            className,
            sessionType,
            attended,
            batchId,
          }),
        }
      );
      
      console.log(`[Service] Update response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Service] Update error response: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`[Service] Update success response:`, data);
      return data;
    } catch (error) {
      console.error('[Service] Error updating main class:', error);
      throw error;
    }
  },


  async updateSpecialClass(className: string, attended: boolean, batchId: string) {
    try {
      const response = await fetch(
        `${API_URL}/student-attendance/special-class`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            className,
            attended,
            batchId,
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating special class:', error);
      throw error;
    }
  },

  async updateGuestClass(className: string, attended: boolean, batchId: string) {
    try {
      const response = await fetch(
        `${API_URL}/student-attendance/guest-class`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            className,
            attended,
            batchId,
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating guest class:', error);
      throw error;
    }
  },

  async getStatistics(batchId: string) {
    try {
      const response = await fetch(
        `${API_URL}/student-attendance/statistics?batchId=${batchId}`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },
};