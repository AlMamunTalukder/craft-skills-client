/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const API_URL = process.env.API_URL || 'http://localhost:5000';
    const body = await request.json();
    
    // console.log('Validating coupon at:', `${API_URL}/api/v1/coupons/apply`);
    // console.log('Coupon validation data:', body);
    
    const response = await fetch(`${API_URL}/api/v1/coupons/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          valid: false,
          message: result.message || 'Coupon validation failed' 
        },
        { status: response.status }
      );
    }
    
    return NextResponse.json({
      success: true,
      valid: result.success || result.isValid || false,
      message: result.message || 'Coupon validated',
      discountAmount: result.discountAmount || 0,
      finalPrice: result.finalAmount || (result.totalAmount - (result.discountAmount || 0)),
      coupon: result.coupon,
    });
    
  } catch (error: any) {
    console.error('Error validating coupon:', error);
    return NextResponse.json(
      { 
        success: false, 
        valid: false,
        message: error.message || 'Internal server error' 
      },
      { status: 500 }
    );
  }
}