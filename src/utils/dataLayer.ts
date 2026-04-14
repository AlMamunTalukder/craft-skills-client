// src/utils/dataLayer.ts
export function pushEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}