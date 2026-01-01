/* eslint-disable @typescript-eslint/no-explicit-any */


import { Schedule, Seminar, SiteContent } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export async function getSiteData(): Promise<SiteContent | null> {
  try {
    const response = await fetch(`${API_URL}/site`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });

    const result = await response.json();
    if (result.success && result.data) {
      return result.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching site data:", error);
    return null;
  }
}

export async function getActiveBatch() {
  try {
    const response = await fetch(`${API_URL}/course-batches/active`, {
      cache: "force-cache",
      next: { revalidate: 1000 * 60 * 1 }, 
    });

    const result = await response.json();
    console.log(result)

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
    console.error("Error fetching active batch:", error);
    return null;
  }
}

export async function getCourses() {
  try {
    const response = await fetch(`${API_URL}/courses`, {
      cache: "force-cache",
      next: { revalidate: 1000 * 60 * 5 }, // 5 minutes
    });

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
    console.error("Error fetching courses:", error);
    return [];
  }
}

export async function activeSeminar(): Promise<Seminar | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/seminars/active`,
      { cache: "no-store", next: { revalidate: 1000 * 60 * 1 } },
    );

    if (!response.ok) return null;

    const result = await response.json();
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export async function getClassSchedule(): Promise<Schedule[] | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/class-schedule`,
      {
        cache: "force-cache",
        next: { revalidate: 1000 * 60 * 5 }, // 5 minutes
      },
    );

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

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
