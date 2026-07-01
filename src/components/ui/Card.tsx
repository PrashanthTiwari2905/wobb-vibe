import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
        onClick ? "cursor-pointer hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
