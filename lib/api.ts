/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ScheduleGroup, Seminar, SiteContent } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function getSiteData(): Promise<SiteContent | null> {
  try {
    const response = await fetch(`${API_URL}/site`, {});

    const result = await response.json();

    if (result.success && result.data) {
      return {
        ...result.data,
        showPdfMenu: result.data.showPdfMenu !== false,
      };
    }

    return null;
  } catch (error) {
    // console.error("Error fetching site data:", error);
    return null;
  }
}

export async function getActiveBatch() {
  try {
    const response = await fetch(`${API_URL}/course-batches/active`);

    const result = await response.json();
    // console.log(result)

    if (result.success && result.data) {
      return {
        id: result.data._id,
        name: result.data.name,
        description: result.data.description || "",
        registrationEnd: result.data.registrationEnd,
        isActive: result.data.isActive,
        code: result.data.code,
        registrationStart: result.data.registrationStart,
        facebookSecretGroup: result.data.facebookSecretGroup,
        messengerSecretGroup: result.data.messengerSecretGroup,
        whatsappSecretGroup: result.data.whatsappSecretGroup,
      };
    }

    return null;
  } catch (error) {
    // console.error("Error fetching active batch:", error);
    return null;
  }
}

export async function getCourses() {
  try {
    const response = await fetch(`${API_URL}/courses`);

    const result = await response.json();

    if (result.success && Array.isArray(result.data)) {
      return result.data.map((course: any) => ({
        id: course._id,
        name: course.name,
        price: course.price,
        discount: course.discount || 0,
        paymentCharge: course.paymentCharge || 0,
        description: course.description || "",
      }));
    }

    return [];
  } catch (error) {
    // console.error("Error fetching courses:", error);
    return [];
  }
}

export async function activeSeminar(): Promise<Seminar | null> {
  try {
    const response = await fetch(`${API_URL}/seminars/active`);

    if (!response.ok) return null;

    const result = await response.json();
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export async function getClassSchedule(): Promise<ScheduleGroup[] | null> {
  try {
    const response = await fetch(`${API_URL}/class-schedule`);

    if (!response.ok) return null;

    const result = await response.json();
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export async function registration(
  data: any,
): Promise<{ success: boolean; message: string }> {
  try {
    // Transform data for server
    const registrationData = {
      name: data.name,
      email: data.email || "",
      phone: data.phone || "",
      password: data.password,
      batchNumber: data.batchNumber,
    };

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      return response.json();
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during registration.",
    };
  }
}

export async function login(
  data: any,
): Promise<{ success: boolean; message: string; token?: string }> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return response.json();
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during login.",
    };
  }
}

export async function checkBatchExists(
  batchNumber: string,
): Promise<{ exists: boolean }> {
  try {
    const response = await fetch(
      `${API_URL}/course-batches/check/${batchNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      return { exists: false };
    }

    const result = await response.json();
    return { exists: result.exists || false };
  } catch (error: any) {
    // console.error("Error checking batch:", error);
    return { exists: false };
  }
}

export const api = {
  async getAttendance(batchId: string) {
    const response = await fetch(
      `${API_URL}/student-attendance/my-attendance?batchId=${batchId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      },
    );
    return response.json();
  },

  async saveAttendance(data: any) {
    const response = await fetch(`${API_URL}/student-attendance/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// Add this to your lib/api.ts file if not already there
export async function getActiveSeminar() {
  try {
    const response = await fetch(`${API_URL}/seminars/active`, {});

    if (!response.ok) {
      // console.error(`API error: ${response.status}`);
      return null;
    }

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    // console.error("Error fetching active seminar:", error);
    return null;
  }
}

export async function updateSiteSettings(
  data: any,
): Promise<{ success: boolean; data?: any; message: string }> {
  try {
    const response = await fetch(`${API_URL}/site`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    // console.error('Error updating site settings:', error);
    return {
      success: false,
      message: "Failed to update site settings",
    };
  }
}

export async function updatePdfSettings(
  showPdfMenu: boolean,
): Promise<{ success: boolean; data?: any; message: string }> {
  try {
    const response = await fetch("/api/site/pdf-settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ showPdfMenu }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating PDF settings:", error);
    return {
      success: false,
      message: "Failed to update PDF settings",
    };
  }
}
