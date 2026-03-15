import { Recipe } from "@/types/recipe";
import { Badge } from "@/components/ui/Badge";

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group bg-shiroan rounded-xl overflow-hidden shadow-sm
        hover:shadow-md transition-shadow duration-200
        text-left w-full cursor-pointer
      "
    >
      {/* 写真エリア */}
      <div className="aspect-[4/3] bg-kinako relative overflow-hidden">
        {recipe.photo ? (
          <img
            src={recipe.photo}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🍳
          </div>
        )}
        {/* ステータスバッジ */}
        <div className="absolute top-2 left-2">
          <Badge variant="status" status={recipe.status} />
        </div>
        {/* 参考元あり */}
        {recipe.source && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full bg-shiroan/90 text-nori-light">
              🔗 参考元あり
            </span>
          </div>
        )}
      </div>

      {/* テキストエリア */}
      <div className="p-3">
        <h3 className="font-bold text-nori text-base leading-tight mb-1.5 line-clamp-2">
          {recipe.title}
        </h3>

        {recipe.memo && (
          <p className="text-xs text-goma line-clamp-2 mb-2">{recipe.memo}</p>
        )}

        {/* タグ */}
        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
