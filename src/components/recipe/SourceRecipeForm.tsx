"use client";

import { useState } from "react";
import { SourceRecipe } from "@/types/recipe";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface SourceRecipeFormProps {
  value: SourceRecipe | undefined;
  onChange: (source: SourceRecipe | undefined) => void;
  /** 現在のうちレシピの材料（差分表示用） */
  currentIngredients: string;
  /** 現在のうちレシピの手順（差分表示用） */
  currentSteps: string;
  /** 元レシピからうちレシピへ材料をコピーするコールバック */
  onCopyIngredients: (ingredients: string) => void;
  /** 元レシピからうちレシピへ手順をコピーするコールバック */
  onCopySteps: (steps: string) => void;
}

export function SourceRecipeForm({
  value,
  onChange,
  currentIngredients,
  currentSteps,
  onCopyIngredients,
  onCopySteps,
}: SourceRecipeFormProps) {
  const [isOpen, setIsOpen] = useState(!!value?.url);

  const update = (patch: Partial<SourceRecipe>) => {
    const current: SourceRecipe = value ?? {
      url: "",
      title: "",
      ingredients: [],
      steps: [],
      memo: "",
      arrangement: "",
    };
    onChange({ ...current, ...patch });
  };

  const splitLines = (s: string) =>
    s
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          w-full border-2 border-dashed border-kinako-dark rounded-xl
          py-4 px-6 text-center text-goma
          hover:bg-kinako hover:border-kitsune-light transition-colors
          cursor-pointer
        "
      >
        <span className="text-lg">🔗</span>
        <p className="text-sm mt-1">参考にしたレシピがある場合はこちら</p>
      </button>
    );
  }

  const sourceIngredients = value?.ingredients?.join("\n") ?? "";
  const sourceSteps = value?.steps?.join("\n") ?? "";

  return (
    <fieldset className="border border-kitsune/30 rounded-xl overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-kitsune/10 px-4 py-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-nori flex items-center gap-2">
          🔗 参考にしたレシピ
        </h3>
        <button
          type="button"
          onClick={() => {
            setIsOpen(false);
            onChange(undefined);
          }}
          className="text-xs text-goma hover:text-umeboshi transition-colors cursor-pointer"
        >
          削除
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* 基本情報 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="レシピ名"
            placeholder="基本のカレーレシピ"
            value={value?.title ?? ""}
            onChange={(e) => update({ title: e.target.value })}
          />
          <Input
            label="URL（消えても大丈夫なように転記しましょう）"
            placeholder="https://cookpad.com/recipe/..."
            value={value?.url ?? ""}
            onChange={(e) => update({ url: e.target.value })}
          />
        </div>

        {/* 元レシピの転記 */}
        <div className="bg-kinako-light rounded-lg p-4 space-y-4">
          <p className="text-xs font-medium text-kitsune-dark">
            元レシピを転記しておくと、サイトが消えても安心です
          </p>

          <Textarea
            label="元レシピの材料（1行に1つ）"
            placeholder={"じゃがいも 2個\n牛肉 150g\n醤油 大さじ2"}
            value={sourceIngredients}
            onChange={(e) =>
              update({ ingredients: splitLines(e.target.value) })
            }
            rows={4}
          />

          <Textarea
            label="元レシピの手順（1行に1ステップ）"
            placeholder={"野菜を切る\n肉を炒める\n調味料を入れて煮込む"}
            value={sourceSteps}
            onChange={(e) => update({ steps: splitLines(e.target.value) })}
            rows={4}
          />

          <Textarea
            label="元レシピのメモ（自由記述）"
            placeholder="元レシピに書いてあったコツなど"
            value={value?.memo ?? ""}
            onChange={(e) => update({ memo: e.target.value })}
            rows={2}
          />

          {/* 元レシピからコピーボタン */}
          {sourceIngredients && !currentIngredients && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onCopyIngredients(sourceIngredients)}
            >
              元レシピの材料をうちレシピにコピーして編集する
            </Button>
          )}
          {sourceSteps && !currentSteps && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onCopySteps(sourceSteps)}
            >
              元レシピの手順をうちレシピにコピーして編集する
            </Button>
          )}
        </div>

        {/* アレンジ内容 */}
        <Textarea
          label="どうアレンジした？"
          placeholder={"砂糖を半分に減らして、代わりにみりんを多めに\n牛肉→豚バラに変更\nじゃがいもは男爵に指定"}
          value={value?.arrangement ?? ""}
          onChange={(e) => update({ arrangement: e.target.value })}
          rows={3}
        />
      </div>
    </fieldset>
  );
}
