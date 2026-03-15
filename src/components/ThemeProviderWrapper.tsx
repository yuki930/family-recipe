"use client";

import { ThemeProvider } from "@kaze-ds/react";
// ThemeProvider is re-exported from the main module

export function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
