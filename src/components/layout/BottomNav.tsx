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
    <nav className="fixed bottom-0 left-0 right-0 bg-shiroan/90 backdrop-blur-sm border-t border-kinako-dark z-50">
      <div className="max-w-4xl mx-auto flex">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                flex-1 flex flex-col items-center gap-0.5 py-2
                text-xs transition-colors cursor-pointer
                ${isActive ? "text-kitsune-dark font-medium" : "text-goma"}
              `}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-kitsune" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
