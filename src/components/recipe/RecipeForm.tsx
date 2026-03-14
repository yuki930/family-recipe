"use client";

import { useState } from "react";
import { Recipe, RecipeTag, SourceRecipe } from "@/types/recipe";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { PhotoUpload } from "@/components/ui/PhotoUpload";
import { TagSelect } from "@/components/ui/TagSelect";
import { SourceRecipeForm } from "@/components/recipe/SourceRecipeForm";

interface RecipeFormProps {
  initial?: Partial<Recipe>;
  onSubmit: (data: Omit<Recipe, "id" | "createdAt" | "updatedAt" | "status">) => void;
  onCancel?: () => void;
}

export function RecipeForm({ initial, onSubmit, onCancel }: RecipeFormProps) {
  const [photo, setPhoto] = useState(initial?.photo || "");
  const [title, setTitle] = useState(initial?.title || "");
  const [memo, setMemo] = useState(initial?.memo || "");
  const [ingredients, setIngredients] = useState(
    initial?.ingredients?.join("\n") || ""
  );
  const [steps, setSteps] = useState(initial?.steps?.join("\n") || "");
  const [tips, setTips] = useState(initial?.tips?.join("\n") || "");
  const [seasonings, setSeasonings] = useState(
    initial?.seasonings?.join("\n") || ""
  );
  const [tags, setTags] = useState<RecipeTag[]>(initial?.tags || []);
  const [episode, setEpisode] = useState(initial?.episode || "");
  const [source, setSource] = useState<SourceRecipe | undefined>(
    initial?.source
  );

  const splitLines = (s: string) =>
    s
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      photo: photo || undefined,
      memo,
      ingredients: splitLines(ingredients),
      steps: splitLines(steps),
      tips: splitLines(tips),
      seasonings: splitLines(seasonings),
      tags,
      episode,
      source,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-shiroan rounded-2xl p-5 shadow-sm max-w-2xl mx-auto space-y-6"
    >
      <h2 className="text-xl font-bold text-nori">レシピを記録する</h2>

      {/* 写真 */}
      <PhotoUpload photo={photo} onPhotoChange={setPhoto} />

      {/* 基本情報 */}
      <Input
        label="料理名"
        placeholder="おばあちゃんの肉じゃが"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Textarea
        label="ひとことメモ"
        placeholder="じゃがいもは男爵がいい。砂糖多めが好き。"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        rows={3}
      />

      <TagSelect selected={tags} onChange={setTags} />

      {/* 参考レシピ（元レシピの転記 + アレンジ記録） */}
      <SourceRecipeForm
        value={source}
        onChange={setSource}
        currentIngredients={ingredients}
        currentSteps={steps}
        onCopyIngredients={setIngredients}
        onCopySteps={setSteps}
      />

      {/* うちの材料・手順 */}
      <div className="space-y-1">
        <Textarea
          label="うちの材料（1行に1つ）"
          placeholder={"じゃがいも 3個\n豚バラ 200g\n醤油 大さじ2"}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={5}
        />
        {source && source.ingredients.length > 0 && (
          <p className="text-xs text-shiso">
            元レシピから変えた部分を書き換えましょう
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Textarea
          label="うちの作り方（1行に1ステップ）"
          placeholder={"じゃがいもは大きめに切る\n豚肉を炒める\n調味料を入れて煮る"}
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          rows={5}
        />
        {source && source.steps.length > 0 && (
          <p className="text-xs text-shiso">
            元レシピから変えた部分を書き換えましょう
          </p>
        )}
      </div>

      {/* こだわり */}
      <Textarea
        label="こだわり・コツ"
        placeholder={"弱火でじっくり\n最後にバターをひとかけ"}
        value={tips}
        onChange={(e) => setTips(e.target.value)}
        rows={3}
      />

      <Textarea
        label="使う調味料（1行に1つ）"
        placeholder={"キッコーマン特選丸大豆しょうゆ\nみりん"}
        value={seasonings}
        onChange={(e) => setSeasonings(e.target.value)}
        rows={3}
      />

      {/* エピソード */}
      <Textarea
        label="思い出・エピソード"
        placeholder="お正月に必ず作る、おばあちゃんの味。"
        value={episode}
        onChange={(e) => setEpisode(e.target.value)}
        rows={3}
      />

      {/* ボタン */}
      <div className="flex gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            キャンセル
          </Button>
        )}
        <Button type="submit" className="flex-1">
          保存する
        </Button>
      </div>
    </form>
  );
}
