import { Badge as KazeBadge } from "@kaze-ds/react";
import { RecipeTag, RecipeStatus, RECIPE_TAG_LABELS, RECIPE_STATUS_LABELS, RECIPE_STATUS_ICONS } from "@/types/recipe";

interface TagBadgeProps {
  variant?: "tag";
  tag: RecipeTag;
}

interface StatusBadgeProps {
  variant: "status";
  status: RecipeStatus;
}

type BadgeProps = TagBadgeProps | StatusBadgeProps;

const tagVariantMap: Record<RecipeTag, "default" | "positive" | "negative" | "warning" | "info"> = {
  grandma: "info",
  staple: "warning",
  quick: "positive",
  special: "negative",
  sweets: "warning",
  preserved: "default",
};

const statusVariantMap: Record<RecipeStatus, "default" | "positive" | "negative" | "warning" | "info"> = {
  photo: "default",
  memo: "warning",
  draft: "info",
  complete: "positive",
};

export function Badge(props: BadgeProps) {
  if (props.variant === "status") {
    const { status } = props;
    return (
      <KazeBadge variant={statusVariantMap[status]}>
        {RECIPE_STATUS_ICONS[status]} {RECIPE_STATUS_LABELS[status]}
      </KazeBadge>
    );
  }

  const { tag } = props;
  return (
    <KazeBadge variant={tagVariantMap[tag]}>
      {RECIPE_TAG_LABELS[tag]}
    </KazeBadge>
  );
}
