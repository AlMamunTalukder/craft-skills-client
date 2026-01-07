/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface AttendanceData {
  className: string;
  batchId: string;
  attendanceType: 'main' | 'special' | 'guest';
  sessionType: string;
  attended: boolean;
}

export interface SummaryResponse {
  success: boolean;
  data?: {
    main: { attended: number; total: number; percentage: number };
    special: { attended: number; total: number; percentage: number };
    guest: { attended: number; total: number; percentage: number };
    overall: { attendedSessions: number; totalSessions: number; percentage: number };
  };
  message?: string;
}

class AttendanceService {
  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (response.status === 401) {
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Request failed');
    }

    return response;
  }

  // Get attendance summary (FAST - from summary collection)
  async getSummary(batchId: string): Promise<SummaryResponse> {
    const url = `${API_URL}/attendance/summary?batchId=${batchId}`;
    
    try {
      const response = await this.fetchWithAuth(url);
      return response.json();
    } catch (error: any) {
      console.error('Get summary error:', error);
      
      // Return default data if fetch fails
      return {
        success: false,
        data: {
          main: { attended: 0, total: 15, percentage: 0 },
          special: { attended: 0, total: 5, percentage: 0 },
          guest: { attended: 0, total: 5, percentage: 0 },
          overall: { attendedSessions: 0, totalSessions: 25, percentage: 0 }
        }
      };
    }
  }

  // Get detailed attendance
  async getAttendance(batchId: string, type?: string) {
    const url = `${API_URL}/attendance?batchId=${batchId}${type ? `&type=${type}` : ''}`;
    
    try {
      const response = await this.fetchWithAuth(url);
      return response.json();
    } catch (error: any) {
      console.error('Get attendance error:', error);
      throw error;
    }
  }

  // Save attendance
  async saveAttendance(data: AttendanceData) {
    try {
      const response = await this.fetchWithAuth(`${API_URL}/attendance/save`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return response.json();
    } catch (error: any) {
      console.error('Save attendance error:', error);
      throw error;
    }
  }
}

export const attendanceService = new AttendanceService();