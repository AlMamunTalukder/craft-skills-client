// src/utils/dataLayer.ts
export function pushEvent(eventName: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  
  // ✅ Add debug logs
  console.log(`📤 [GTM] Pushing event: ${eventName}`, params);
  
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
  
  console.log(`✅ [GTM] Event pushed: ${eventName}`);
  console.log(`📊 [GTM] Current dataLayer length: ${window.dataLayer.length}`);
}


// // src/utils/dataLayer.ts
// export function pushEvent(eventName: string, params: Record<string, unknown>) {
//   if (typeof window === 'undefined') return;
//   window.dataLayer = window.dataLayer || [];
//   window.dataLayer.push({ ecommerce: null });
//   window.dataLayer.push({
//     event: eventName,
//     ...params,
//   });
// }