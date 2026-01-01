/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/v1/course-batches/active/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_URL = process.env.API_URL || 'http://localhost:5000/api/v1';
    
    // console.log('Fetching active batch from:', `${API_URL}/course-batches/active`);
    
    const response = await fetch(`${API_URL}/course-batches/active`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: result.message || 'Failed to fetch active batch' },
        { status: response.status }
      );
    }
    
    return NextResponse.json(result);
    
  } catch (error: any) {
    console.error('Error fetching active batch:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}