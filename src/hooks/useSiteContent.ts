"use client";

import { useQuery } from "@tanstack/react-query";

export interface SiteContent {
  _id: string;
  name: string;
  logoLight: string;
  logoDark: string;
  tagline: string;
  email: string;
  phone1: string;
  phone2?: string;
  address: string;
  facebook?: string;
  facebookGroup?: string;
  whatsapp?: string;
  youtube?: string;
  telegram?: string;
  instagram?: string;
  totalsTeachers?: number;
  totalCourses?: number;
  totalBatches?: number;
  successRate?: number;
}

const fetchSiteContent = async (): Promise<SiteContent> => {
  const response = await fetch('/api/site', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || `Failed to fetch site content: ${response.status}`);
  }
  
  const result = await response.json();
  
  if (!result.success) {
    throw new Error(result.message || 'Failed to fetch site content');
  }
  
  return result.data;
};

export const useSiteContent = () => {
  return useQuery<SiteContent, Error>({
    queryKey: ['siteContent'],
    queryFn: fetchSiteContent,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};