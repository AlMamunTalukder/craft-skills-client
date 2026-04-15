// src/hooks/useSessionTracking.ts
"use client";

import { useEffect, useRef } from 'react';
import { pushEvent } from '@/src/utils/dataLayer';

export function useSessionTracking() {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Check sessionStorage to ensure only once per browser tab session
    const sessionTracked = sessionStorage.getItem('ga_session_started');
    
    if (!sessionTracked && !hasTracked.current) {
      hasTracked.current = true;
      sessionStorage.setItem('ga_session_started', 'true');
      
      // Fire a custom event for session start
      pushEvent('session_start', {
        engagement_time_msec: 0,
        page_location: window.location.href,
        page_title: document.title,
      });
      
      // Optionally set user properties (if user is logged in)
      // You can fetch user data from your auth context here
      // pushEvent('user_data', { user_id: userId, user_type: 'guest' });
    }
  }, []);
}