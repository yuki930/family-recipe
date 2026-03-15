"use client";

import { Input as KazeInput, FormField } from "@kaze-ds/react";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.replace(/\s/g, "-").toLowerCase();

  if (label || error) {
    return (
      <FormField label={label} error={error}>
        <KazeInput
          id={inputId}
          error={!!error}
          {...props}
        />
      </FormField>
    );
  }

  return <KazeInput id={inputId} error={!!error} {...props} />;
}
