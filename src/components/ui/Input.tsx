"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.replace(/\s/g, "-").toLowerCase();

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-nori">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-3 py-2 rounded-lg
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
