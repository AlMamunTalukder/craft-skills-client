/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/courses/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_URL = process.env.API_URL || 'http://localhost:5000/api/v1';
    
    // console.log('Fetching courses from:', `${API_URL}/courses`);
    
    const response = await fetch(`${API_URL}/courses`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: result.message || 'Failed to fetch courses' },
        { status: response.status }
      );
    }
    
    return NextResponse.json(result);
    
  } catch (error: any) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}