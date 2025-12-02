import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    
    const response = await fetch(`${API_URL}/site`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Cookie': request.headers.get('cookie') || '',
        'Content-Type': 'application/json',
      },
      cache: 'no-cache', // Don't cache the proxy request
    });
    
    if (!response.ok) {
      console.error('Backend API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: `Backend API error: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    // Pass through the backend response
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Proxy API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}