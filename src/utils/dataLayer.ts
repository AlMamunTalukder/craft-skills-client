/* eslint-disable @typescript-eslint/no-explicit-any */

export function pushEvent(eventName: string, params: Record<string, any>) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({ ecommerce: null });

  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}