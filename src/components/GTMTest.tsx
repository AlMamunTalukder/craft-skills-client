"use client";

import { useEffect, useState } from "react";
import { pushEvent } from "@/src/utils/dataLayer";

export function GTMTest() {
  const [gtmStatus, setGtmStatus] = useState<string>("Checking...");

  useEffect(() => {
    // Check if GTM is loaded
    const checkGTM = () => {
      const hasGTM = typeof window !== 'undefined' && 
                     (document.querySelector('script[src*="googletagmanager"]') !== null);
      const hasDataLayer = typeof window !== 'undefined' && Array.isArray(window.dataLayer);
      
      if (hasGTM && hasDataLayer) {
        setGtmStatus("✅ GTM is loaded");
      } else if (hasDataLayer && !hasGTM) {
        setGtmStatus("⚠️ dataLayer exists but GTM script not found");
      } else {
        setGtmStatus("❌ GTM not detected");
      }
    };
    
    checkGTM();
    
    // Send a test event after 2 seconds
    const timer = setTimeout(() => {
      console.log("🧪 Sending GTM test event...");
      pushEvent("gtm_test_event", {
        test: "GTM is working!",
        timestamp: new Date().toISOString(),
        page: window.location.pathname
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 top-4 bg-gray-800 text-white text-xs p-2 rounded z-50 opacity-75">
        {gtmStatus}
      </div>
    );
  }
  
  return null;
}