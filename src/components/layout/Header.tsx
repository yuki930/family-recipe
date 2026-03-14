interface HeaderProps {
  onAddClick?: () => void;
}

export function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="bg-shiroan/80 backdrop-blur-sm border-b border-kinako-dark sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="text-xl font-bold text-nori">
          <span className="text-kitsune">味</span>つぎ
        </h1>
        {onAddClick && (
          <button
            onClick={onAddClick}
            className="
              w-9 h-9 rounded-full bg-kitsune text-shiroan
              flex items-center justify-center
              hover:bg-kitsune-dark transition-colors
              shadow-sm cursor-pointer
            "
            aria-label="レシピを追加"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
