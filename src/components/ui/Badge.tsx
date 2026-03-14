import { RecipeTag, RecipeStatus, RECIPE_TAG_LABELS, RECIPE_STATUS_LABELS, RECIPE_STATUS_ICONS } from "@/types/recipe";

type BadgeVariant = "tag" | "status";

interface TagBadgeProps {
  variant?: "tag";
  tag: RecipeTag;
}

interface StatusBadgeProps {
  variant: "status";
  status: RecipeStatus;
}

type BadgeProps = TagBadgeProps | StatusBadgeProps;

const tagColors: Record<RecipeTag, string> = {
  grandma: "bg-shiso/15 text-shiso",
  staple: "bg-kitsune/15 text-kitsune-dark",
  quick: "bg-matcha/15 text-matcha",
  special: "bg-umeboshi/15 text-umeboshi",
  sweets: "bg-kitsune-light/30 text-kitsune-dark",
  preserved: "bg-goma/15 text-goma",
};

const statusColors: Record<RecipeStatus, string> = {
  photo: "bg-nori-muted/15 text-nori-muted",
  memo: "bg-kitsune/15 text-kitsune-dark",
  draft: "bg-shiso/15 text-shiso",
  complete: "bg-matcha/15 text-matcha",
};

export function Badge(props: BadgeProps) {
  if (props.variant === "status") {
    const { status } = props;
    return (
      <span
        className={`
          inline-flex items-center gap-1 px-2 py-0.5
          text-xs font-medium rounded-full
          ${statusColors[status]}
        `}
      >
        {RECIPE_STATUS_ICONS[status]} {RECIPE_STATUS_LABELS[status]}
      </span>
    );
  }

  const { tag } = props;
  return (
    <span
      className={`
        inline-flex items-center px-2 py-0.5
        text-xs font-medium rounded-full
        ${tagColors[tag]}
      `}
    >
      {RECIPE_TAG_LABELS[tag]}
    </span>
  );
}
