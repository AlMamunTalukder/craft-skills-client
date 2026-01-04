const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export interface AttendanceData {
  className: string;
  batchId: string;
  attendanceType: 'main' | 'special' | 'guest';
  sessionType: string;
  attended: boolean;
}

class AttendanceService {
  // Get attendance
  async getAttendance(batchId: string, type?: string) {
    const url = `${API_URL}/attendance?batchId=${batchId}${type ? `&type=${type}` : ''}`;
    
    const response = await fetch(url, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch attendance');
    }

    return response.json();
  }

  // Save attendance
  async saveAttendance(data: AttendanceData) {
    const response = await fetch(`${API_URL}/attendance/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to save attendance');
    }

    return response.json();
  }

  // Get summary
  async getSummary(batchId: string, type?: string) {
    const url = `${API_URL}/attendance/summary?batchId=${batchId}${type ? `&type=${type}` : ''}`;
    
    const response = await fetch(url, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch summary');
    }

    return response.json();
  }
}

export const attendanceService = new AttendanceService();