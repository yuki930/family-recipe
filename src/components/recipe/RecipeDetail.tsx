import { Card, CardBody, Heading, Text, Badge as KazeBadge, List, ListItem } from "@kaze-ds/react";
import { Recipe } from "@/types/recipe";
import { Badge } from "@/components/ui/Badge";

interface RecipeDetailProps {
  recipe: Recipe;
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  return (
    <Card style={{ maxWidth: "42rem", margin: "0 auto", overflow: "hidden" }}>
      {/* ヒーロー画像 */}
      {recipe.photo ? (
        <div className="card__media" style={{ aspectRatio: "16/9", overflow: "hidden" }}>
          <img
            src={recipe.photo}
            alt={recipe.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center" style={{ aspectRatio: "16/9", background: "var(--color-bg-secondary)", fontSize: "3.5rem" }}>
          🍳
        </div>
      )}

      <CardBody className="flex flex-col gap-5">
        {/* ヘッダー */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="status" status={recipe.status} />
            {recipe.tags.map((tag) => (
              <Badge key={tag} tag={tag} />
            ))}
          </div>
          <Heading level={2}>{recipe.title}</Heading>
        </div>

        {/* メモ */}
        {recipe.memo && (
          <div className="card card--fill p-4">
            <Text className="leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>
              {recipe.memo}
            </Text>
          </div>
        )}

        {/* エピソード */}
        {recipe.episode && (
          <Section title="思い出・エピソード" icon="💭">
            <Text className="leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>
              {recipe.episode}
            </Text>
          </Section>
        )}

        {/* 材料 */}
        {recipe.ingredients.length > 0 && (
          <Section title="材料" icon="🥕">
            <List marker="disc">
              {recipe.ingredients.map((item, i) => (
                <ListItem key={i}>{item}</ListItem>
              ))}
            </List>
          </Section>
        )}

        {/* 手順 */}
        {recipe.steps.length > 0 && (
          <Section title="作り方" icon="👩‍🍳">
            <List marker="decimal">
              {recipe.steps.map((step, i) => (
                <ListItem key={i}>{step}</ListItem>
              ))}
            </List>
          </Section>
        )}

        {/* こだわり・コツ */}
        {recipe.tips.length > 0 && (
          <Section title="こだわり・コツ" icon="✨">
            <List marker="disc">
              {recipe.tips.map((tip, i) => (
                <ListItem key={i}>{tip}</ListItem>
              ))}
            </List>
          </Section>
        )}

        {/* 調味料 */}
        {recipe.seasonings.length > 0 && (
          <Section title="使う調味料" icon="🧂">
            <div className="flex flex-wrap gap-2">
              {recipe.seasonings.map((s, i) => (
                <KazeBadge key={i}>{s}</KazeBadge>
              ))}
            </div>
          </Section>
        )}

        {/* 参考レシピ */}
        {recipe.source && (
          <Section title="参考にしたレシピ" icon="🔗">
            <div className="flex flex-col gap-3">
              {/* 基本情報 */}
              <div className="card card--fill p-3 flex flex-col gap-1">
                <Text className="font-semibold">{recipe.source.title}</Text>
                {recipe.source.url && (
                  <Text className="text--xs text--primary" style={{ wordBreak: "break-all" }}>
                    {recipe.source.url}
                  </Text>
                )}
                {recipe.source.memo && (
                  <Text className="text--xs text--muted mt-1" style={{ whiteSpace: "pre-wrap" }}>
                    {recipe.source.memo}
                  </Text>
                )}
              </div>

              {/* アレンジ内容 */}
              {recipe.source.arrangement && (
                <div className="card p-3" style={{ background: "rgba(123, 75, 148, 0.06)", border: "1px solid rgba(123, 75, 148, 0.2)" }}>
                  <Text className="text--xs font-bold mb-1" style={{ color: "var(--color-shiso)" }}>
                    うちのアレンジ
                  </Text>
                  <Text className="text--sm leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>
                    {recipe.source.arrangement}
                  </Text>
                </div>
              )}

              {/* 元レシピの材料 vs うちの材料 */}
              {recipe.source.ingredients.length > 0 && (
                <SourceComparison
                  label="材料"
                  sourceItems={recipe.source.ingredients}
                  myItems={recipe.ingredients}
                />
              )}

              {/* 元レシピの手順 vs うちの手順 */}
              {recipe.source.steps.length > 0 && (
                <SourceComparison
                  label="作り方"
                  sourceItems={recipe.source.steps}
                  myItems={recipe.steps}
                  numbered
                />
              )}
            </div>
          </Section>
        )}
      </CardBody>
    </Card>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Heading level={4} className="flex items-center gap-2 mb-3">
        <span>{icon}</span>
        {title}
      </Heading>
      {children}
    </section>
  );
}

function SourceComparison({
  label,
  sourceItems,
  myItems,
  numbered,
}: {
  label: string;
  sourceItems: string[];
  myItems: string[];
  numbered?: boolean;
}) {
  const mySet = new Set(myItems.map((s) => s.trim()));
  const sourceSet = new Set(sourceItems.map((s) => s.trim()));

  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
      {/* 元レシピ */}
      <div className="card card--fill p-3">
        <Text className="text--xs font-bold text--muted mb-2">元レシピの{label}</Text>
        <ul className="flex flex-col gap-1">
          {sourceItems.map((item, i) => {
            const changed = !mySet.has(item.trim());
            return (
              <li
                key={i}
                className="text--xs flex items-start gap-1"
                style={{
                  color: changed ? "var(--color-fg-muted)" : "var(--color-fg-secondary)",
                  textDecoration: changed ? "line-through" : "none",
                }}
              >
                <span style={{ flexShrink: 0, opacity: 0.5 }}>
                  {numbered ? `${i + 1}.` : "•"}
                </span>
                {item}
              </li>
            );
          })}
        </ul>
      </div>

      {/* うちバージョン */}
      <div className="card p-3" style={{ background: "rgba(212, 135, 78, 0.06)", border: "1px solid rgba(212, 135, 78, 0.2)" }}>
        <Text className="text--xs font-bold mb-2" style={{ color: "var(--color-kitsune-dark)" }}>
          うちの{label}
        </Text>
        <ul className="flex flex-col gap-1">
          {myItems.map((item, i) => {
            const isNew = !sourceSet.has(item.trim());
            return (
              <li
                key={i}
                className="text--xs flex items-start gap-1"
                style={{
                  color: isNew ? "var(--color-kitsune-dark)" : "var(--color-fg-secondary)",
                  fontWeight: isNew ? 500 : 400,
                }}
              >
                <span style={{ flexShrink: 0, color: isNew ? "var(--color-kitsune)" : "rgba(212, 135, 78, 0.4)" }}>
                  {numbered ? `${i + 1}.` : isNew ? "+" : "•"}
                </span>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
