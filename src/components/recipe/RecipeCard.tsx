import { Card, CardBody, CardTitle, CardDescription } from "@kaze-ds/react";
import { Recipe } from "@/types/recipe";
import { Badge } from "@/components/ui/Badge";

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <Card variant="interactive" onClick={onClick} style={{ cursor: "pointer" }}>
      {/* 写真エリア */}
      <div className="card__media" style={{ aspectRatio: "4/3", position: "relative", overflow: "hidden", background: "var(--color-bg-secondary)" }}>
        {recipe.photo ? (
          <img
            src={recipe.photo}
            alt={recipe.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div className="flex items-center justify-center" style={{ width: "100%", height: "100%", fontSize: "2.5rem" }}>
            🍳
          </div>
        )}
        {/* ステータスバッジ */}
        <div style={{ position: "absolute", top: "var(--space-2)", left: "var(--space-2)" }}>
          <Badge variant="status" status={recipe.status} />
        </div>
        {/* 参考元あり */}
        {recipe.source && (
          <div style={{ position: "absolute", top: "var(--space-2)", right: "var(--space-2)" }}>
            <span className="badge badge--default" style={{ background: "rgba(255,255,255,0.9)" }}>
              🔗 参考元あり
            </span>
          </div>
        )}
      </div>

      <CardBody>
        <CardTitle>{recipe.title}</CardTitle>

        {recipe.memo && (
          <CardDescription>{recipe.memo}</CardDescription>
        )}

        {/* タグ */}
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
}
