/* eslint-disable @typescript-eslint/no-explicit-any */
import { SiteContent } from "@/types";

// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getActiveBatch() {
  try {
    const response = await fetch(`${API_URL}/course-batches/active`, {
      cache: 'no-store',
    });
    
    // if (!response.ok) {
    //   console.error('Failed to fetch active batch:', response.status);
    //   return null;
    // }
    
    const result = await response.json();
    
    if (result.success && result.data) {
      return {
        id: result.data._id,
        name: result.data.name,
        description: result.data.description || '',
        registrationEnd: result.data.registrationEnd,
        isActive: result.data.isActive,
        code: result.data.code,
        registrationStart: result.data.registrationStart,
        facebookSecretGroup: result.data.facebookSecretGroup,
        messengerSecretGroup: result.data.messengerSecretGroup,
        whatsappSecretGroup: result.data.whatsappSecretGroup,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching active batch:', error);
    return null;
  }
}

export async function getCourses() {
  try {
    const response = await fetch(`${API_URL}/courses`, {
      cache: 'no-store',
    });
    
    // if (!response.ok) {
    //   console.error('Failed to fetch courses:', response.status);
    //   return [];
    // }
    
    const result = await response.json();
    
    if (result.success && Array.isArray(result.data)) {
      return result.data.map((course: any) => ({
        id: course._id,
        name: course.name,
        price: course.price,
        discount: course.discount || 0,
        paymentCharge: course.paymentCharge || 0,
        description: course.description || '',
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

// Add this function
export async function getSiteData(): Promise<SiteContent | null> {
  try {
    const response = await fetch(`${API_URL}/site`, {
      cache: 'no-store',
    });
    
    // if (!response.ok) {
    //   console.error('Failed to fetch site data:', response.status);
    //   return null;
    // }
    
    const result = await response.json();
    
    if (result.success && result.data) {
      return result.data;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching site data:', error);
    return null;
  }
}