// app/admission-registration/success/AdmissionSuccessTracker.tsx
"use client";

import { useEffect } from "react";
import { pushEvent } from "@/src/utils/dataLayer";
import { Batch, Course } from "@/types";

interface Props {
  batch: Batch | null;
  course: Course | null;
  amount: string | null | undefined;  // ✅ Allow undefined
  name: string | null | undefined;    // ✅ Allow undefined
  phone: string | null | undefined;   // ✅ Allow undefined
  email: string | null | undefined;   // ✅ Allow undefined
}

export default function AdmissionSuccessTracker({ batch, course, amount, name, phone, email }: Props) {
  useEffect(() => {
    if (!batch) return;

    const alreadyTracked = sessionStorage.getItem(`purchase_admission_${batch.id}`);
    
    if (!alreadyTracked && amount && parseFloat(amount) > 0) {
      // GA4 Purchase Event
      pushEvent('purchase', {
        ecommerce: {
          transaction_id: `ADM_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          value: parseFloat(amount),
          currency: 'BDT',
          tax: 0,
          shipping: 0,
          affiliation: 'Craft Skills',
          items: [{
            item_id: course?.id || batch.id,
            item_name: course?.name || batch.name,
            item_category: 'admission',
            price: parseFloat(amount),
            quantity: 1,
            item_brand: 'Craft Skills',
            item_variant: batch?.name || '',
          }],
        },
        user_id: phone || email,
        user_phone: phone,
        user_email: email,
        user_name: name,
      });
      
      pushEvent("admission_registration_success", {
        batch_id: batch.id,
        batch_name: batch.name,
        course_id: course?.id,
        course_name: course?.name,
        amount: parseFloat(amount),
        transaction_id: `ADM_${Date.now()}`,
        user_name: name,
        user_phone: phone,
        user_email: email,
      });

      sessionStorage.setItem(`purchase_admission_${batch.id}`, "true");
    }
  }, [batch, course, amount, name, phone, email]);

  return null;
}