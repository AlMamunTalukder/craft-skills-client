/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { seminarFormSchema } from "@/schemas/seminar/registration";

export async function seminarRegistration(data: any, seminarId?: string) {
  const parsed = seminarFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: {
        message: "Validation failed",
      },
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/seminars/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...parsed.data,
        seminarId,
      }),
    },
  );

  if (!res.ok) {
    const error = await res.json();
    return { error };
  }

  return { success: true };
}
