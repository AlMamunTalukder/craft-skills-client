"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FormCheckboxProps {
  name: string;
  label: ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function FormCheckbox({
  name,
  label,
  required = false,
  disabled = false,
  className,
}: FormCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field, fieldState }) => (
        <>
          <div className={cn("space-y-2", className)}>
            <div className="flex items-start gap-3">
              <Checkbox
                checked={field.value}
                disabled={disabled}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                className="mt-1 border border-black"
              />
              <label className="text-sm leading-7 font-normal cursor-pointer">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
            {/* ✅ Display the validation error message */}
            {fieldState.error && (
              <p className="text-sm font-medium text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </div>
        </>
      )}
    />
  );
}
