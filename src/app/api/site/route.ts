/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/v1/site/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const API_URL = process.env.API_URL || 'http://localhost:5000/api/v1';
    
    // console.log('Fetching site data from:', `${API_URL}/site`);
    
    const response = await fetch(`${API_URL}/site`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Backend site API error:', response.status, response.statusText);
      return NextResponse.json(
        { success: false, message: 'Failed to fetch site data' },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('Error in site route:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}