interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon = "🍳",
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span className="text-5xl mb-4">{icon}</span>
      <h3 className="text-lg font-bold text-nori mb-1">{title}</h3>
      <p className="text-sm text-goma mb-6 max-w-xs">{description}</p>
      {action}
    </div>
  );
}
