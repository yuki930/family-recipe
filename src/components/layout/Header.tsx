"use client";

import { Button } from "@kaze-ds/react";

interface HeaderProps {
  onAddClick?: () => void;
}

export function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="top-bar sticky" style={{ zIndex: "var(--z-sticky)" }}>
      <div className="flex items-center justify-between px-4" style={{ maxWidth: "56rem", margin: "0 auto", width: "100%" }}>
        <span className="heading--4" style={{ fontWeight: 700 }}>
          <span style={{ color: "var(--color-kitsune)" }}>味</span>つぎ
        </span>
        {onAddClick && (
          <Button
            variant="primary"
            size="sm"
            iconOnly
            onClick={onAddClick}
            aria-label="レシピを追加"
          >
            <svg className="icon icon--sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </Button>
        )}
      </div>
    </header>
  );
}
