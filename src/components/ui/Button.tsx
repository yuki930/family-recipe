"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-kitsune text-shiroan hover:bg-kitsune-dark active:bg-kitsune-dark shadow-sm",
  secondary:
    "bg-kinako text-nori border border-kinako-dark hover:bg-kinako-dark active:bg-kinako-dark",
  ghost:
    "bg-transparent text-nori-light hover:bg-kinako active:bg-kinako-dark",
  danger:
    "bg-umeboshi text-shiroan hover:bg-umeboshi-light active:bg-umeboshi",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-4 py-2 text-base rounded-lg",
  lg: "px-6 py-3 text-lg rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-medium transition-colors duration-150
        disabled:opacity-50 disabled:pointer-events-none
        cursor-pointer
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
