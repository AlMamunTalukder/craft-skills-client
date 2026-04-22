// app/seminar-registration/success/SeminarSuccessTracker.tsx (Alternative with both)
"use client";

import { useEffect } from "react";
import { pushEvent } from "@/src/utils/dataLayer";

interface Props {
  seminarId: string;
  seminarTitle: string;
  name: string | null | undefined;
  phone: string | null | undefined;
  email: string | null | undefined;
  whatsapp: string | null | undefined;
  occupation: string | null | undefined;
  address: string | null | undefined;
}

export default function SeminarSuccessTracker({ 
  seminarId, 
  seminarTitle, 
  name, 
  phone, 
  email, 
  whatsapp, 
  occupation, 
  address 
}: Props) {
  useEffect(() => {
    if (!seminarId) return;

    const alreadyTracked = sessionStorage.getItem(`registration_seminar_${seminarId}`);
    
    if (!alreadyTracked) {
      // ✅ Send both events for maximum compatibility
      
      // 1. Standard GA4 'generate_lead' event
      pushEvent('generate_lead', {
        currency: 'BDT',
        value: 0,
        seminar_id: seminarId,
        seminar_title: seminarTitle,
        user_name: name,
        user_phone: phone,
        user_email: email,
      });
      
      // 2. Custom 'complete_registration' event (if you registered it in GA4)
      pushEvent('complete_registration', {
        event_category: 'seminar',
        event_label: seminarTitle,
        seminar_id: seminarId,
        seminar_title: seminarTitle,
        registration_type: 'free',
        user_id: phone || email,
        user_name: name,
        user_phone: phone,
        user_email: email,
        user_whatsapp: whatsapp,
        user_occupation: occupation,
        user_address: address,
        registration_timestamp: new Date().toISOString(),
      });
      
      // 3. Custom event for backup
      pushEvent("seminar_registration_success", {
        seminar_id: seminarId,
        seminar_title: seminarTitle,
        registration_id: `SEM_${Date.now()}`,
        user_name: name,
        user_phone: phone,
        user_email: email,
      });

      sessionStorage.setItem(`registration_seminar_${seminarId}`, "true");
    }
  }, [seminarId, seminarTitle, name, phone, email, whatsapp, occupation, address]);

  return null;
}