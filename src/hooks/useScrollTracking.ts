// src/hooks/useScrollTracking.ts
"use client";

import { useEffect, useRef } from 'react';
import { pushEvent } from '@/src/utils/dataLayer';

export function useScrollTracking(sectionIds: string[]) {
  const trackedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (entry.isIntersecting && !trackedSections.current.has(sectionId)) {
            trackedSections.current.add(sectionId);
            
            pushEvent('view_item', {
              ecommerce: {
                items: [{
                  item_id: sectionId,
                  item_name: sectionId.replace(/-/g, ' '),
                  item_category: 'content_section',
                }],
              },
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return null;
}