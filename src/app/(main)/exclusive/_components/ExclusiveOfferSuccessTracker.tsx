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

    window.dataLayer = window.dataLayer || [];

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

    // Optional Facebook Pixel
    if ((window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Exclusive Offer Masterclass",
        value: 199,
        currency: "BDT",
      });
    }
  }, [name, phone, email]);

  return null;
}