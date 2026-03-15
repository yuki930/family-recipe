"use client";

import { useState } from "react";
import { Heading, Card, Divider } from "@kaze-ds/react";
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
import { SourceRecipeForm } from "@/components/recipe/SourceRecipeForm";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { EmptyState } from "@/components/layout/EmptyState";
import { RecipeTag, RecipeStatus, SourceRecipe } from "@/types/recipe";

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
    ingredients: [
      "じゃがいも 2個",
      "にんじん 1本",
      "玉ねぎ 2個（元より多め）",
      "豚バラ 250g",
      "カレールー（ジャワカレー中辛）1/2箱",
      "りんご 1/2個（すりおろし）",
      "板チョコ ひとかけ",
      "水 600ml",
    ],
    steps: [
      "野菜を一口大に切る",
      "豚バラを炒める",
      "玉ねぎが飴色になるまでじっくり炒める",
      "残りの野菜を加えて炒める",
      "水を加えて煮込む",
      "ルーを入れて溶かす",
      "すりおろしりんごを入れて10分煮る",
      "最後にチョコをひとかけ入れて溶かす",
    ],
    tips: ["仕上げに板チョコをひとかけ", "玉ねぎは飴色まで炒めるのがパパ流"],
    seasonings: [],
    tags: ["staple"],
    status: "memo",
    source: {
      url: "https://example.com/curry",
      title: "基本のカレーレシピ",
      ingredients: [
        "じゃがいも 2個",
        "にんじん 1本",
        "玉ねぎ 1個",
        "牛肉 200g",
        "カレールー 1/2箱",
        "水 600ml",
      ],
      steps: [
        "野菜を一口大に切る",
        "牛肉を炒める",
        "野菜を加えて炒める",
        "水を加えて煮込む",
        "ルーを入れて溶かし、とろみがつくまで煮る",
      ],
      memo: "中辛がおすすめ",
      arrangement: "ルーはジャワカレー中辛。りんご半分すりおろし、仕上げにチョコひとかけ追加。牛肉→豚バラに変更。",
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
  const [demoSource, setDemoSource] = useState<SourceRecipe | undefined>({
    url: "https://example.com/nikujaga",
    title: "基本の肉じゃがレシピ",
    ingredients: ["じゃがいも 2個", "牛肉 150g", "醤油 大さじ2", "砂糖 大さじ1"],
    steps: ["野菜を切る", "肉を炒める", "調味料を入れて煮込む"],
    memo: "落とし蓋をすると味がよく染みます",
    arrangement: "牛肉→豚バラに変更。砂糖を1.5倍に。じゃがいもは男爵を指定。",
  });
  const [demoIngredients, setDemoIngredients] = useState("");
  const [demoSteps, setDemoSteps] = useState("");

  return (
    <div style={{ minHeight: "100vh", paddingBottom: "5rem" }}>
      <Header onAddClick={() => {}} />

      <main style={{ maxWidth: "56rem", margin: "0 auto", padding: "var(--space-6) var(--space-4)" }} className="flex flex-col gap-8">
        {/* カラーパレット */}
        <CatalogSection title="カラーパレット">
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))" }}>
            <ColorSwatch name="きつね" hex="#D4874E" color="var(--color-kitsune)" />
            <ColorSwatch name="きつね・薄" hex="#E8A872" color="var(--color-kitsune-light)" />
            <ColorSwatch name="きなこ" hex="#F5E6C8" color="var(--color-kinako)" />
            <ColorSwatch name="きなこ・薄" hex="#FBF4E8" color="var(--color-kinako-light)" />
            <ColorSwatch name="海苔" hex="#2D4A3E" color="var(--color-nori)" light />
            <ColorSwatch name="海苔・薄" hex="#4A7A68" color="var(--color-nori-light)" light />
            <ColorSwatch name="紫蘇" hex="#7B4B94" color="var(--color-shiso)" light />
            <ColorSwatch name="梅干し" hex="#C2455A" color="var(--color-umeboshi)" light />
            <ColorSwatch name="抹茶" hex="#5B8C5A" color="var(--color-matcha)" light />
            <ColorSwatch name="ごま" hex="#8B7355" color="var(--color-goma)" light />
          </div>
        </CatalogSection>

        {/* ボタン */}
        <CatalogSection title="ボタン">
          <div className="flex flex-col gap-4">
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
        </CatalogSection>

        {/* 入力フィールド */}
        <CatalogSection title="入力フィールド">
          <div className="flex flex-col gap-4" style={{ maxWidth: "28rem" }}>
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
        </CatalogSection>

        {/* 写真アップロード */}
        <CatalogSection title="写真アップロード">
          <div style={{ maxWidth: "16rem" }}>
            <PhotoUpload photo={photo} onPhotoChange={setPhoto} />
          </div>
        </CatalogSection>

        {/* バッジ */}
        <CatalogSection title="バッジ">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text--sm font-medium mb-2" style={{ color: "var(--color-fg-muted)" }}>ステータス</p>
              <div className="flex flex-wrap gap-2">
                {(["photo", "memo", "draft", "complete"] as RecipeStatus[]).map(
                  (s) => (
                    <Badge key={s} variant="status" status={s} />
                  )
                )}
              </div>
            </div>
            <div>
              <p className="text--sm font-medium mb-2" style={{ color: "var(--color-fg-muted)" }}>タグ</p>
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
        </CatalogSection>

        {/* タグ選択 */}
        <CatalogSection title="タグ選択">
          <div style={{ maxWidth: "28rem" }}>
            <TagSelect selected={selectedTags} onChange={setSelectedTags} />
          </div>
        </CatalogSection>

        {/* レシピカード */}
        <CatalogSection title="レシピカード">
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
            {sampleRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </CatalogSection>

        {/* レシピ詳細 */}
        <CatalogSection title="レシピ詳細">
          <RecipeDetail recipe={sampleRecipes[0]} />
        </CatalogSection>

        {/* レシピ詳細（参考元あり — 差分比較） */}
        <CatalogSection title="レシピ詳細（参考元あり — 元レシピとの比較）">
          <RecipeDetail recipe={sampleRecipes[1]} />
        </CatalogSection>

        {/* 参考レシピフォーム（単体） */}
        <CatalogSection title="参考レシピフォーム（元レシピ転記 + アレンジ記録）">
          <div style={{ maxWidth: "42rem", margin: "0 auto" }}>
            <SourceRecipeForm
              value={demoSource}
              onChange={setDemoSource}
              currentIngredients={demoIngredients}
              currentSteps={demoSteps}
              onCopyIngredients={setDemoIngredients}
              onCopySteps={setDemoSteps}
            />
          </div>
        </CatalogSection>

        {/* レシピフォーム */}
        <CatalogSection title="レシピフォーム（参考レシピ組み込み済み）">
          <RecipeForm
            onSubmit={(data) => console.log("submit:", data)}
            onCancel={() => console.log("cancel")}
          />
        </CatalogSection>

        {/* 空状態 */}
        <CatalogSection title="空状態">
          <Card>
            <EmptyState
              title="まだレシピがありません"
              description="家族の味を記録してみましょう。写真を撮るだけでOK！"
              action={<Button>最初のレシピを追加</Button>}
            />
          </Card>
        </CatalogSection>

        {/* ヘッダー（再掲） */}
        <CatalogSection title="ヘッダー">
          <Card style={{ overflow: "hidden" }}>
            <Header onAddClick={() => {}} />
          </Card>
        </CatalogSection>
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}

/* ヘルパーコンポーネント */

function CatalogSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <Heading level={4} bordered className="mb-4">{title}</Heading>
      {children}
    </section>
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
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          backgroundColor: color,
          height: "4rem",
          borderRadius: "var(--radius-md)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      />
      <p className="text--xs font-medium mt-1">{name}</p>
      <p className="text--xs text--muted">{hex}</p>
    </div>
  );
}
