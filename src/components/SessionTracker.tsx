// src/components/SessionTracker.tsx
"use client";

import { useSessionTracking } from "@/src/hooks/useSessionTracking";

export function SessionTracker() {
  useSessionTracking();
  return null;
} 