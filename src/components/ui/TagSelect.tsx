"use client";

import { Button } from "@kaze-ds/react";
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
    <div className="flex flex-col gap-2">
      <span className="label">タグ</span>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isSelected = selected.includes(tag);
          return (
            <Button
              key={tag}
              type="button"
              variant={isSelected ? "primary" : "outline"}
              size="sm"
              onClick={() => toggle(tag)}
            >
              {tagEmojis[tag]} {RECIPE_TAG_LABELS[tag]}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
