/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/studentAttendance.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface AttendanceData {
  className: string;
  sessionType: 'regular' | 'problemSolving' | 'practice';
  attended: boolean;
}

export interface TodaySession {
  className: string;
  sessionType: 'regular' | 'problemSolving' | 'practice';
  time: string;
  topic: string;
  attended: boolean;
  attendanceId?: string;
}

export const studentAttendanceService = {
  // Get dashboard data
   async getDashboard() {
    try {
      const response = await fetch(`${API_URL}/student-attendance/dashboard`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        // Try to get error message from response
        const errorText = await response.text();
        console.error('Dashboard API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If not JSON, use the text
          if (errorText) errorMessage = errorText;
        }
        
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to load dashboard',
      };
    }
  },

  // Mark attendance
  async markAttendance(data: AttendanceData) {
    try {
      const response = await fetch(`${API_URL}/student-attendance/mark`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error marking attendance:', error);
      return {
        success: false,
        message: 'Failed to mark attendance',
      };
    }
  },

  // Get today's sessions
  async getTodaySessions() {
    try {
      const response = await fetch(`${API_URL}/student-attendance/today-sessions`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching today sessions:', error);
      return {
        success: false,
        data: [] as TodaySession[],
      };
    }
  },

  // Get attendance history
  async getAttendanceHistory(limit = 20) {
    try {
      const response = await fetch(
        `${API_URL}/student-attendance/history?limit=${limit}`,
        {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching attendance history:', error);
      return {
        success: false,
        data: [],
      };
    }
  },

  async updateSpecialClass(
    className: string,
    attended: boolean
  ): Promise<{
    success: boolean;
    data?: any;
    message?: string;
  }> {
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
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error('Error updating special class:', error);
      return {
        success: false,
        message: error.message || 'Failed to update special class',
      };
    }
  },

  // Update guest class attendance
  async updateGuestClass(
    className: string,
    attended: boolean
  ): Promise<{
    success: boolean;
    data?: any;
    message?: string;
  }> {
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
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error('Error updating guest class:', error);
      return {
        success: false,
        message: error.message || 'Failed to update guest class',
      };
    }
  },

};