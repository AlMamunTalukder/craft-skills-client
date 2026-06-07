
/* =========================================================
   GTM / GA4 DATA LAYER UTILITY
========================================================= */

export function pushEvent(
  eventName: string,
  params: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;

  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];

  // Debug (remove in production if needed)
  // console.log(`📤 GTM Event: ${eventName}`, params);

  // Reset ecommerce object (GA4 requirement)
  window.dataLayer.push({ ecommerce: null });

  // Push event
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

/* =========================================================
   CONSTANTS (Exclusive Offer)
========================================================= */

const COURSE_NAME = "Voice & Public Speaking Masterclass";
const OFFER_PRICE = 199;
const REGULAR_PRICE = 5500;

/* =========================================================
   EXCLUSIVE OFFER EVENTS
========================================================= */

/* -------------------------
   1. Banner Click
------------------------- */
export function trackExclusiveBannerClick() {
  pushEvent("exclusive_offer_banner_click", {
    section: "exclusive_banner",
    course_name: COURSE_NAME,
    offer_price: OFFER_PRICE,
    regular_price: REGULAR_PRICE,
    currency: "BDT",
  });
}

/* -------------------------
   2. Form View
------------------------- */
export function trackExclusiveFormView() {
  pushEvent("exclusive_offer_form_view", {
    section: "registration_form",
    course_name: COURSE_NAME,
    offer_price: OFFER_PRICE,
    regular_price: REGULAR_PRICE,
    currency: "BDT",
  });
}

/* -------------------------
   3. Begin Checkout
------------------------- */
export function trackExclusiveBeginCheckout() {
  pushEvent("begin_checkout", {
    ecommerce: {
      currency: "BDT",
      value: OFFER_PRICE,
      items: [
        {
          item_id: "exclusive_offer_course",
          item_name: COURSE_NAME,
          item_category: "course",
          price: OFFER_PRICE,
          quantity: 1,
        },
      ],
    },
  });
}

/* -------------------------
   4. Registration Success
------------------------- */
export function trackExclusiveRegistrationSuccess(data: {
  name?: string;
  phone?: string;
  email?: string;
}) {
  pushEvent("exclusive_offer_registration_success", {
    user_name: data.name || "",
    phone: data.phone || "",
    email: data.email || "",
    course_name: COURSE_NAME,
    offer_price: OFFER_PRICE,
    currency: "BDT",
  });
}