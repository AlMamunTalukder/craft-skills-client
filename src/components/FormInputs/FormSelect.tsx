"use client";

import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/src/lib/utils";
import { ReactNode } from "react";

interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  // New props for custom styling
  variant?: "default" | "outline" | "filled" | "gradient";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  onValueChange?: (value: string) => void;
}

export default function FormSelect({
  name,
  label,
  options,
  placeholder,
  required = false,
  disabled = false,
  className,
  labelClassName,
  triggerClassName,
  contentClassName,
  itemClassName,
  variant = "default",
  size = "md",
  icon,
  onValueChange,
}: FormSelectProps) {
  const { control } = useFormContext();

  const sizeClasses = {
    sm: "h-10 text-sm",
    md: "h-12 text-base",
    lg: "h-14 text-lg",
  };

  const variantClasses = {
    default: "border-gray-300 bg-white",
    outline: "border-2 border-[#4f0187]/20 focus:border-[#4f0187]",
    filled: "bg-gray-50 border-gray-200",
    gradient: "bg-linear-to-r from-purple-50 to-indigo-50 border-purple-200",
  };

  const focusClasses = {
    default: "focus:border-[#4f0187] focus:ring-2 focus:ring-[#4f0187]/20",
    outline: "focus:border-[#4f0187] focus:ring-2 focus:ring-[#4f0187]/20",
    filled:
      "focus:bg-white focus:border-[#4f0187] focus:ring-2 focus:ring-[#4f0187]/20",
    gradient: "focus:border-[#4f0187] focus:ring-2 focus:ring-[#4f0187]/20",
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn("space-y-2", className)}>
          <FormLabel className={cn("font-medium", labelClassName)}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onValueChange) {
                onValueChange(value);
              }
            }}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "w-full transition-all duration-300 gap-2 bg-white",
                  sizeClasses[size],
                  variantClasses[variant],
                  focusClasses[variant],
                  error &&
                    "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                  icon && "pl-3",
                  triggerClassName
                )}
              >
                {/* {icon && (
                  <span className="absolute pr-8  text-gray-500">{icon}</span>
                )} */}
                <SelectValue
                  placeholder={placeholder || `Select ${label.toLowerCase()}`}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent
              className={cn("max-h-60 overflow-y-auto", contentClassName)}
            >
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={cn(
                    "text-base py-0 cursor-pointer transition-colors",
                    itemClassName
                  )}
                >
                  {option.label}
                </SelectItem>
              ))}
              
            </SelectContent>
            {error && (
                <p className="mt-0 text-xs text-red-600" id={`${name}-error`}>
                  {error.message}
                </p>
              )}
          </Select>
          
          <FormMessage className="text-red-500 text-sm" />
          
        </FormItem>
      )}
    />
  );
}
