/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/v1/admissions/register/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const API_URL = process.env.API_URL || 'http://localhost:5000/api/v1';
    const body = await request.json();
    
    console.log('Sending admission data to backend:', body);
    
    const response = await fetch(`${API_URL}/admissions/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: result.message || 'Registration failed' },
        { status: response.status }
      );
    }
    
    return NextResponse.json(result);
    
  } catch (error: any) {
    console.error('Error in admissions/register route:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}