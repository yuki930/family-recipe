import { EmptyState as KazeEmptyState } from "@kaze-ds/react";

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
    <KazeEmptyState
      icon={<span style={{ fontSize: "3rem" }}>{icon}</span>}
      title={title}
      description={description}
      actions={action}
    />
  );
}
