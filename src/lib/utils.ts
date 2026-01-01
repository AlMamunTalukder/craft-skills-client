/* eslint-disable @typescript-eslint/no-explicit-any */


import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Handles Zod validation errors and returns an array of error messages.
 * @param error - The ZodError instance
 * @returns An array of error messages
 */
export const handleValidationError = (error: ZodError): string[] => {
  return error.errors.map((err) => err.message);
};

/**
 * Global error handler for consistent error management.
 * @param error - The error object to handle.
 */
export const handleError = (error: unknown) => {
  try {
    if (typeof error === "string") {
      toast.error(error);
      return;
    }

    if (error instanceof Error) {
      const errorMessages = JSON.parse(error.message);

      if (Array.isArray(errorMessages)) {
        errorMessages.forEach((msg) => toast.error(msg));
      } else {
        toast.error(errorMessages || "An error occurred.");
      }
    } else {
      toast.error("An unexpected error occurred. Please try again.");
    }
  } catch (err: any) {
    toast.error(
      err.message || "An unexpected error occurred. Please try again.",
    );
  }
};

export const formatPrice = (amount: number) => {
  const formattedPrice = Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    currencySign: "standard",
  }).format(amount);

  // Replace the currency code "BDT" with the Taka symbol "৳"
  return formattedPrice.replace("BDT", "৳").trim();
};

export function checkIdentifier(identifier: string): "email" | "phone" | "invalid" {
  // Remove spaces and normalize
  const cleaned = identifier.trim().replace(/\s+/g, "");

  const emailRegex = /^\S+@\S+\.\S+$/;
  const bdPhoneRegex = /^(?:\+?88)?01[3-9][0-9]{8}$/; // allows optional +88

  if (emailRegex.test(cleaned)) return "email";
  if (bdPhoneRegex.test(cleaned)) return "phone";
  return "invalid";
}

/**
 * Normalizes Bangladeshi phone numbers to 11-digit format (01XXXXXXXXX)
 * @param phone - The phone number to normalize
 * @returns Normalized 11-digit phone number
 */
export function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters except +
  let cleaned = phone.trim().replace(/\s+/g, "");
  
  // If starts with +88, remove it
  if (cleaned.startsWith('+88')) {
    cleaned = cleaned.substring(3); // Remove +88
  }
  
  // If starts with 88 (without +) and has 13 digits, remove it
  if (cleaned.startsWith('88') && cleaned.length === 13) {
    cleaned = cleaned.substring(2); // Remove 88
  }
  
  // If already 11 digits starting with 01, return as is
  if (/^01[3-9]\d{8}$/.test(cleaned)) {
    return cleaned;
  }
  
  // If it's 10 digits starting with 1, add 0 at the beginning
  if (/^1[3-9]\d{8}$/.test(cleaned) && cleaned.length === 10) {
    return `0${cleaned}`;
  }
  
  return cleaned; // Return as is if no normalization needed
}

/**
 * Validates if a string is a valid Bangladeshi phone number
 * @param phone - The phone number to validate
 * @returns boolean indicating if the phone number is valid
 */
export function isValidBangladeshiPhone(phone: string): boolean {
  const normalized = normalizePhoneNumber(phone);
  return /^01[3-9]\d{8}$/.test(normalized);
}

/**
 * Formats a phone number to a consistent display format
 * @param phone - The phone number to format
 * @returns Formatted phone number (e.g., +880 1XXX-XXXXXX)
 */
export function formatPhoneNumber(phone: string): string {
  const normalized = normalizePhoneNumber(phone);
  
  if (/^01[3-9]\d{8}$/.test(normalized)) {
    return `+88 ${normalized.slice(0, 4)}-${normalized.slice(4)}`;
  }
  
  return phone; // Return original if normalization failed
}

/**
 * Extracts and normalizes identifier for database operations
 * @param identifier - The identifier (email or phone)
 * @returns Normalized identifier and type, or null if invalid
 */
export function processIdentifier(identifier: string): {
  type: "email" | "phone";
  normalized: string;
} | null {
  const type = checkIdentifier(identifier);
  
  if (type === "phone") {
    const normalized = normalizePhoneNumber(identifier);
    // Validate the normalized phone number
    if (!/^01[3-9]\d{8}$/.test(normalized)) {
      return null;
    }
    return {
      type,
      normalized
    };
  }
  
  if (type === "email") {
    return {
      type,
      normalized: identifier.trim().toLowerCase()
    };
  }
  
  return null; // Return null for invalid identifiers
}