export interface CouponResponse {
  success: boolean;
  valid: boolean;
  message: string;
  discountAmount: number;
  finalPrice?: number;
  coupon?: {
    code: string;
    discountType: 'PERCENTAGE' | 'AMOUNT';
    discount: number;
    validFrom: string;
    validTo: string;
    isActive: boolean;
  };
}

export async function validateCoupon(code: string, originalPrice: number, courseId?: string): Promise<CouponResponse> {
  try {
    const response = await fetch('/api/coupons/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        totalAmount: originalPrice,
        courseId,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        valid: false,
        message: 'Failed to validate coupon',
        discountAmount: 0,
      };
    }

    const result = await response.json();
    
    return {
      success: result.success,
      valid: result.valid,
      message: result.message,
      discountAmount: result.discountAmount || 0,
      finalPrice: result.finalPrice,
      coupon: result.coupon,
    };
  } catch (error) {
    console.error('Coupon validation error:', error);
    return {
      success: false,
      valid: false,
      message: 'Network error. Please try again.',
      discountAmount: 0,
    };
  }
}