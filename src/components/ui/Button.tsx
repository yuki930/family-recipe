"use client";

import { Button as KazeButton } from "@kaze-ds/react";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantMap: Record<ButtonVariant, "primary" | "secondary" | "outline" | "ghost" | "destructive"> = {
  primary: "primary",
  secondary: "secondary",
  ghost: "ghost",
  danger: "destructive",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <KazeButton
      variant={variantMap[variant]}
      size={size}
      {...props}
    >
      {children}
    </KazeButton>
  );
}
