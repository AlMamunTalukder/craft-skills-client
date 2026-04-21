// app/seminar-registration/success/SeminarSuccessTracker.tsx
"use client";

import { useEffect } from "react";
import { pushEvent } from "@/src/utils/dataLayer";

interface Props {
  seminarId: string;
  seminarTitle: string;
  name: string | null | undefined;        // ✅ Allow undefined
  phone: string | null | undefined;       // ✅ Allow undefined
  email: string | null | undefined;       // ✅ Allow undefined
  whatsapp: string | null | undefined;    // ✅ Allow undefined
  occupation: string | null | undefined;  // ✅ Allow undefined
  address: string | null | undefined;     // ✅ Allow undefined
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
      pushEvent('complete_registration', {
        event_category: 'seminar',
        event_label: seminarTitle,
        registration_id: `SEM_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
      
      pushEvent("seminar_registration_success", {
        seminar_id: seminarId,
        seminar_title: seminarTitle,
        registration_id: `SEM_${Date.now()}`,
        user_name: name,
        user_phone: phone,
        user_email: email,
        user_whatsapp: whatsapp,
        user_occupation: occupation,
        user_address: address,
      });

      sessionStorage.setItem(`registration_seminar_${seminarId}`, "true");
    }
  }, [seminarId, seminarTitle, name, phone, email, whatsapp, occupation, address]);

  return null;
}