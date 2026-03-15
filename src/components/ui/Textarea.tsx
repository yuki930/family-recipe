"use client";

import { Textarea as KazeTextarea, FormField } from "@kaze-ds/react";
import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || label?.replace(/\s/g, "-").toLowerCase();

  if (label || error) {
    return (
      <FormField label={label} error={error}>
        <KazeTextarea
          id={textareaId}
          error={!!error}
          {...props}
        />
      </FormField>
    );
  }

  return <KazeTextarea id={textareaId} error={!!error} {...props} />;
}
