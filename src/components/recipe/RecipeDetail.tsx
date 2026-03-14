import { Recipe } from "@/types/recipe";
import { Badge } from "@/components/ui/Badge";

interface RecipeDetailProps {
  recipe: Recipe;
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  return (
    <div className="bg-shiroan rounded-2xl overflow-hidden shadow-sm max-w-2xl mx-auto">
      {/* ヒーロー画像 */}
      {recipe.photo ? (
        <div className="aspect-video relative overflow-hidden">
          <img
            src={recipe.photo}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video bg-kinako flex items-center justify-center text-6xl">
          🍳
        </div>
      )}

      <div className="p-5 space-y-5">
        {/* ヘッダー */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="status" status={recipe.status} />
            {recipe.tags.map((tag) => (
              <Badge key={tag} tag={tag} />
            ))}
          </div>
          <h1 className="text-2xl font-bold text-nori">{recipe.title}</h1>
        </div>

        {/* メモ */}
        {recipe.memo && (
          <div className="bg-kinako-light rounded-lg p-4">
            <p className="text-nori-light text-sm leading-relaxed whitespace-pre-wrap">
              {recipe.memo}
            </p>
          </div>
        )}

        {/* エピソード */}
        {recipe.episode && (
          <Section title="思い出・エピソード" icon="💭">
            <p className="text-nori-light text-sm leading-relaxed whitespace-pre-wrap">
              {recipe.episode}
            </p>
          </Section>
        )}

        {/* 材料 */}
        {recipe.ingredients.length > 0 && (
          <Section title="材料" icon="🥕">
            <ul className="space-y-1">
              {recipe.ingredients.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-nori-light flex items-start gap-2"
                >
                  <span className="text-kitsune mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 手順 */}
        {recipe.steps.length > 0 && (
          <Section title="作り方" icon="👩‍🍳">
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-nori-light">
                  <span className="flex-shrink-0 w-6 h-6 bg-kitsune/15 text-kitsune-dark rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* こだわり・コツ */}
        {recipe.tips.length > 0 && (
          <Section title="こだわり・コツ" icon="✨">
            <ul className="space-y-1">
              {recipe.tips.map((tip, i) => (
                <li
                  key={i}
                  className="text-sm text-nori-light flex items-start gap-2"
                >
                  <span className="text-shiso mt-0.5">◆</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* 調味料 */}
        {recipe.seasonings.length > 0 && (
          <Section title="使う調味料" icon="🧂">
            <div className="flex flex-wrap gap-2">
              {recipe.seasonings.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex px-3 py-1 bg-kinako rounded-full text-sm text-nori-light"
                >
                  {s}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* 参考レシピ */}
        {recipe.source && (
          <Section title="参考にしたレシピ" icon="🔗">
            <div className="bg-kinako-light rounded-lg p-3 space-y-2">
              <p className="text-sm font-medium text-nori">
                {recipe.source.title}
              </p>
              <p className="text-xs text-kitsune break-all">
                {recipe.source.url}
              </p>
              {recipe.source.arrangement && (
                <div className="pt-2 border-t border-kinako-dark">
                  <p className="text-xs font-medium text-shiso mb-1">
                    アレンジした点
                  </p>
                  <p className="text-sm text-nori-light">
                    {recipe.source.arrangement}
                  </p>
                </div>
              )}
            </div>
          </Section>
        )}
      </div>
    </div>
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
      <h2 className="flex items-center gap-2 text-base font-bold text-nori mb-3">
        <span>{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
