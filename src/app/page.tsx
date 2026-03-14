"use client";

import { useState } from "react";
import { Recipe } from "@/types/recipe";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Badge } from "@/components/ui/Badge";
import { PhotoUpload } from "@/components/ui/PhotoUpload";
import { TagSelect } from "@/components/ui/TagSelect";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { RecipeDetail } from "@/components/recipe/RecipeDetail";
import { RecipeForm } from "@/components/recipe/RecipeForm";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { EmptyState } from "@/components/layout/EmptyState";
import { RecipeTag, RecipeStatus } from "@/types/recipe";

// サンプルレシピデータ
const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "おばあちゃんの肉じゃが",
    memo: "じゃがいもは男爵。砂糖は多めがおばあちゃん流。落とし蓋を忘れずに。",
    ingredients: [
      "じゃがいも（男爵）3個",
      "豚バラ薄切り 200g",
      "玉ねぎ 1個",
      "にんじん 1本",
      "しらたき 1袋",
      "醤油 大さじ3",
      "砂糖 大さじ2.5",
      "みりん 大さじ2",
      "だし汁 300ml",
    ],
    steps: [
      "じゃがいもは大きめの一口大に切り、水にさらす",
      "豚バラは3cm幅に切る",
      "鍋に油を熱し、豚肉を炒める",
      "野菜を加えて軽く炒める",
      "だし汁と調味料を入れ、落とし蓋をして弱火で20分煮る",
      "火を止めて10分休ませると味が染みる",
    ],
    tips: [
      "じゃがいもは大きめに切ると崩れにくい",
      "最後に火を止めて休ませるのがコツ",
      "翌日の方が美味しい",
    ],
    seasonings: [
      "キッコーマン特選丸大豆しょうゆ",
      "三温糖",
      "本みりん",
    ],
    tags: ["grandma", "staple"],
    status: "complete",
    episode:
      "毎年お正月に必ずおばあちゃんが作ってくれた。「肉じゃがは休ませるのが大事よ」が口癖だった。",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "パパの特製カレー",
    memo: "市販ルーにちょい足し。りんごとチョコが隠し味。",
    ingredients: [],
    steps: [],
    tips: ["仕上げに板チョコをひとかけ"],
    seasonings: [],
    tags: ["staple"],
    status: "memo",
    source: {
      url: "https://example.com/curry",
      title: "基本のカレーレシピ",
      arrangement: "ルーはジャワカレー中辛。りんご半分すりおろし、仕上げにチョコひとかけ追加。",
    },
    episode: "",
    createdAt: "2024-02-20",
    updatedAt: "2024-02-20",
  },
  {
    id: "3",
    title: "日曜の朝のフレンチトースト",
    memo: "",
    ingredients: [],
    steps: [],
    tips: [],
    seasonings: [],
    tags: ["quick", "sweets"],
    status: "photo",
    episode: "",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-01",
  },
];

export default function CatalogPage() {
  const [photo, setPhoto] = useState("");
  const [selectedTags, setSelectedTags] = useState<RecipeTag[]>(["grandma", "staple"]);
  const [activeTab, setActiveTab] = useState<"recipes" | "seasonings" | "family">("recipes");

  return (
    <div className="min-h-screen bg-kinako-light pb-20">
      <Header onAddClick={() => {}} />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-16">
        {/* ============================== */}
        {/* カラーパレット */}
        {/* ============================== */}
        <section>
          <SectionTitle>カラーパレット</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ColorSwatch name="きつね" color="bg-kitsune" hex="#D4874E" />
            <ColorSwatch name="きつね・薄" color="bg-kitsune-light" hex="#E8A872" />
            <ColorSwatch name="きなこ" color="bg-kinako" hex="#F5E6C8" />
            <ColorSwatch name="きなこ・薄" color="bg-kinako-light" hex="#FBF4E8" />
            <ColorSwatch name="海苔" color="bg-nori" hex="#2D4A3E" light />
            <ColorSwatch name="海苔・薄" color="bg-nori-light" hex="#4A7A68" light />
            <ColorSwatch name="紫蘇" color="bg-shiso" hex="#7B4B94" light />
            <ColorSwatch name="梅干し" color="bg-umeboshi" hex="#C2455A" light />
            <ColorSwatch name="抹茶" color="bg-matcha" hex="#5B8C5A" light />
            <ColorSwatch name="ごま" color="bg-goma" hex="#8B7355" light />
          </div>
        </section>

        {/* ============================== */}
        {/* ボタン */}
        {/* ============================== */}
        <section>
          <SectionTitle>ボタン</SectionTitle>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button size="sm">小さい</Button>
              <Button size="md">標準</Button>
              <Button size="lg">大きい</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">保存する</Button>
              <Button variant="secondary">キャンセル</Button>
              <Button variant="ghost">もっと見る</Button>
              <Button variant="danger">削除する</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button disabled>無効状態</Button>
            </div>
          </div>
        </section>

        {/* ============================== */}
        {/* 入力フィールド */}
        {/* ============================== */}
        <section>
          <SectionTitle>入力フィールド</SectionTitle>
          <div className="max-w-md space-y-4">
            <Input label="料理名" placeholder="おばあちゃんの肉じゃが" />
            <Input
              label="エラー状態"
              placeholder="入力してください"
              error="料理名は必須です"
            />
            <Textarea
              label="ひとことメモ"
              placeholder="じゃがいもは男爵がいい。砂糖多めが好き。"
              rows={3}
            />
          </div>
        </section>

        {/* ============================== */}
        {/* 写真アップロード */}
        {/* ============================== */}
        <section>
          <SectionTitle>写真アップロード</SectionTitle>
          <div className="max-w-xs">
            <PhotoUpload photo={photo} onPhotoChange={setPhoto} />
          </div>
        </section>

        {/* ============================== */}
        {/* バッジ */}
        {/* ============================== */}
        <section>
          <SectionTitle>バッジ</SectionTitle>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-goma mb-2">ステータス</p>
              <div className="flex flex-wrap gap-2">
                {(["photo", "memo", "draft", "complete"] as RecipeStatus[]).map(
                  (s) => (
                    <Badge key={s} variant="status" status={s} />
                  )
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-goma mb-2">タグ</p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    "grandma",
                    "staple",
                    "quick",
                    "special",
                    "sweets",
                    "preserved",
                  ] as RecipeTag[]
                ).map((t) => (
                  <Badge key={t} tag={t} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================== */}
        {/* タグ選択 */}
        {/* ============================== */}
        <section>
          <SectionTitle>タグ選択</SectionTitle>
          <div className="max-w-md">
            <TagSelect selected={selectedTags} onChange={setSelectedTags} />
          </div>
        </section>

        {/* ============================== */}
        {/* レシピカード */}
        {/* ============================== */}
        <section>
          <SectionTitle>レシピカード</SectionTitle>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {sampleRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>

        {/* ============================== */}
        {/* レシピ詳細 */}
        {/* ============================== */}
        <section>
          <SectionTitle>レシピ詳細</SectionTitle>
          <RecipeDetail recipe={sampleRecipes[0]} />
        </section>

        {/* ============================== */}
        {/* レシピフォーム */}
        {/* ============================== */}
        <section>
          <SectionTitle>レシピフォーム</SectionTitle>
          <RecipeForm
            onSubmit={(data) => console.log("submit:", data)}
            onCancel={() => console.log("cancel")}
          />
        </section>

        {/* ============================== */}
        {/* 空状態 */}
        {/* ============================== */}
        <section>
          <SectionTitle>空状態</SectionTitle>
          <div className="bg-shiroan rounded-2xl">
            <EmptyState
              title="まだレシピがありません"
              description="家族の味を記録してみましょう。写真を撮るだけでOK！"
              action={<Button>最初のレシピを追加</Button>}
            />
          </div>
        </section>

        {/* ============================== */}
        {/* ヘッダー（再掲） */}
        {/* ============================== */}
        <section>
          <SectionTitle>ヘッダー</SectionTitle>
          <div className="border border-kinako-dark rounded-xl overflow-hidden">
            <Header onAddClick={() => {}} />
          </div>
        </section>
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}

/* ヘルパーコンポーネント */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-bold text-nori mb-4 pb-2 border-b border-kinako-dark">
      {children}
    </h2>
  );
}

function ColorSwatch({
  name,
  color,
  hex,
  light,
}: {
  name: string;
  color: string;
  hex: string;
  light?: boolean;
}) {
  return (
    <div className="text-center">
      <div
        className={`${color} h-16 rounded-lg shadow-sm border border-black/5`}
      />
      <p className={`text-xs mt-1.5 font-medium ${light ? "text-nori" : "text-nori"}`}>
        {name}
      </p>
      <p className="text-xs text-goma">{hex}</p>
    </div>
  );
}
