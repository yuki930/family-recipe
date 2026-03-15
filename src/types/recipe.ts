export type RecipeStatus = "photo" | "memo" | "draft" | "complete";

export type RecipeTag =
  | "grandma"
  | "staple"
  | "quick"
  | "special"
  | "sweets"
  | "preserved";

export const RECIPE_TAG_LABELS: Record<RecipeTag, string> = {
  grandma: "おばあちゃん直伝",
  staple: "定番",
  quick: "簡単",
  special: "特別な日",
  sweets: "おやつ",
  preserved: "保存食",
};

export const RECIPE_STATUS_LABELS: Record<RecipeStatus, string> = {
  photo: "写真だけ",
  memo: "メモあり",
  draft: "下書き",
  complete: "レシピ完成",
};

export const RECIPE_STATUS_ICONS: Record<RecipeStatus, string> = {
  photo: "📸",
  memo: "🗒️",
  draft: "📝",
  complete: "📖",
};

export interface SourceRecipe {
  url: string;
  title: string;
  /** 元レシピの材料（転記） */
  ingredients: string[];
  /** 元レシピの手順（転記） */
  steps: string[];
  /** 元レシピの自由メモ（転記） */
  memo: string;
  /** アレンジ内容の自由記述 */
  arrangement: string;
}

export interface Recipe {
  id: string;
  title: string;
  photo?: string;
  memo: string;
  ingredients: string[];
  steps: string[];
  tips: string[];
  seasonings: string[];
  tags: RecipeTag[];
  status: RecipeStatus;
  source?: SourceRecipe;
  episode: string;
  createdAt: string;
  updatedAt: string;
}
