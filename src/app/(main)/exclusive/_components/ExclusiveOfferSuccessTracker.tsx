/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";

interface Props {
  name?: string;
  phone?: string;
  email?: string;
}

export default function ExclusiveOfferSuccessTracker({
  name,
  phone,
  email,
}: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyTracked = sessionStorage.getItem("exclusive_purchase");
    if (alreadyTracked) return;

    window.dataLayer = window.dataLayer || [];

    // Standard purchase event
    window.dataLayer.push({
      event: "purchase",
      ecommerce: {
        transaction_id: `EXC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        value: 199,
        currency: "BDT",
        items: [
          {
            item_id: "exclusive_offer_199",
            item_name: "Voice & Public Speaking Masterclass",
            item_category: "exclusive_offer",
            price: 199,
            quantity: 1,
          },
        ],
      },
      user_name: name || "",
      user_phone: phone || "",
      user_email: email || "",
    });

    // Custom event (already there)
    window.dataLayer.push({
      event: "exclusive_offer_registration_success",
      course_name: "Exclusive Offer Masterclass",
      user_name: name || "",
      phone: phone || "",
      email: email || "",
      currency: "BDT",
      original_price: 5500,
      offer_price: 199,
      registration_type: "exclusive_offer",
      page_type: "success_page",
    });

    sessionStorage.setItem("exclusive_purchase", "true");
  }, [name, phone, email]);

  return null;
}
