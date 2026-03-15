"use client";

type NavTab = "recipes" | "seasonings" | "family";

interface BottomNavProps {
  active: NavTab;
  onChange: (tab: NavTab) => void;
}

const tabs: { id: NavTab; label: string; icon: string }[] = [
  { id: "recipes", label: "レシピ", icon: "📖" },
  { id: "seasonings", label: "調味料", icon: "🧂" },
  { id: "family", label: "家族", icon: "👨‍👩‍👧" },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav
      className="fixed flex"
      style={{
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: "var(--z-sticky)",
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex" style={{ maxWidth: "56rem", margin: "0 auto", width: "100%" }}>
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex flex-col items-center gap-1 py-2 cursor-pointer transition"
              style={{
                flex: 1,
                fontSize: "var(--font-size-xs)",
                color: isActive ? "var(--color-kitsune-dark)" : "var(--color-fg-muted)",
                fontWeight: isActive ? 500 : 400,
                background: "none",
                border: "none",
              }}
            >
              <span style={{ fontSize: "1.125rem" }}>{tab.icon}</span>
              <span>{tab.label}</span>
              {isActive && (
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "var(--radius-full)",
                    background: "var(--color-kitsune)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
