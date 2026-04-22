// app/seminar-registration/success/SeminarSuccessTracker.tsx
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
      console.log("🔥 Firing generate_lead event for seminar:", seminarTitle);
      
      // ✅ Use standard GA4 'generate_lead' event
      pushEvent('generate_lead', {
        // Required parameters
        currency: 'BDT',
        value: 0,
        // Event parameters
        event_category: 'seminar',
        event_label: seminarTitle,
        // Custom dimensions
        seminar_id: seminarId,
        seminar_title: seminarTitle,
        registration_type: 'free',
        // User information
        user_id: phone || email,
        user_name: name,
        user_phone: phone,
        user_email: email,
        user_whatsapp: whatsapp,
        user_occupation: occupation,
        user_address: address,
        registration_timestamp: new Date().toISOString(),
      });
      
      // ✅ Also send a custom event for backup
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
      
      console.log("✅ Events fired successfully");
    }
  }, [seminarId, seminarTitle, name, phone, email, whatsapp, occupation, address]);

  return null;
}