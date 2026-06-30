import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  const isClickable = !!onClick;
  
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${
        isClickable ? "cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
