"use client";

import { RecipeTag, RECIPE_TAG_LABELS } from "@/types/recipe";

interface TagSelectProps {
  selected: RecipeTag[];
  onChange: (tags: RecipeTag[]) => void;
}

const allTags: RecipeTag[] = [
  "grandma",
  "staple",
  "quick",
  "special",
  "sweets",
  "preserved",
];

const tagEmojis: Record<RecipeTag, string> = {
  grandma: "👵",
  staple: "⭐",
  quick: "⚡",
  special: "🎉",
  sweets: "🍰",
  preserved: "🫙",
};

export function TagSelect({ selected, onChange }: TagSelectProps) {
  const toggle = (tag: RecipeTag) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-nori">タグ</span>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isSelected = selected.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              className={`
                inline-flex items-center gap-1 px-3 py-1.5
                text-sm rounded-full border transition-colors duration-150
                cursor-pointer
                ${
                  isSelected
                    ? "bg-kitsune/15 border-kitsune text-kitsune-dark font-medium"
                    : "bg-shiroan border-kinako-dark text-goma hover:bg-kinako"
                }
              `}
            >
              {tagEmojis[tag]} {RECIPE_TAG_LABELS[tag]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
