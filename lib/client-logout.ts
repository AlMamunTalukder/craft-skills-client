/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/client-logout.ts - Create this file
"use client";

export async function clientLogout(): Promise<{ success: boolean; message: string }> {
  try {
    const isProduction = typeof window !== 'undefined' && window.location.hostname.includes('craftskillsbd.com');
    const API_URL = isProduction 
      ? 'https://server.craftskillsbd.com/api/v1'
      : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    
    // console.log('Client logout calling:', `${API_URL}/auth/logout`);
    
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    // Clear client-side storage
    localStorage.removeItem('auth-user');
    localStorage.removeItem('auth-timestamp');
    localStorage.removeItem('auth-state');
    
    // Clear all cookies by expiring them
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Logout failed');
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error('Client logout error:', error);
    return {
      success: false,
      message: error.message || "An error occurred during logout.",
    };
  }
}