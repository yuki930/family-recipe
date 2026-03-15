"use client";

import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({
  label,
  error,
  className = "",
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || label?.replace(/\s/g, "-").toLowerCase();

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-nori">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          w-full px-3 py-2 rounded-lg resize-y min-h-[80px]
          bg-shiroan border border-kinako-dark
          text-nori placeholder:text-goma/50
          focus:outline-none focus:ring-2 focus:ring-kitsune/40 focus:border-kitsune
          transition-colors duration-150
          ${error ? "border-umeboshi focus:ring-umeboshi/40" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-umeboshi">{error}</p>}
    </div>
  );
}
