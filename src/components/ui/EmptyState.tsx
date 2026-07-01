import type { ReactNode } from "react";
import { Card } from "./Card";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className = "" }: EmptyStateProps) {
  return (
    <Card className={`p-12 text-center flex flex-col items-center justify-center ${className}`}>
      {icon && <div className="text-slate-300 mb-4 drop-shadow-md">{icon}</div>}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-sm text-slate-300 max-w-sm mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </Card>
  );
}
