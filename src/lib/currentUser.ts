/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

export async function logout(): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const cookieStore = await cookies();
    cookieStore.delete("craftskills.session");

    // const cookieStore = await cookies();
    // cookieStore.delete("connect.sid");

    if (!response.ok) {
      return response.json();
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred during logout.",
    };
  }
}

export const currentUser = async () => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      {
        headers: {
          Cookie: cookieHeader,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
};
