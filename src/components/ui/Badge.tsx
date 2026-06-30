import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "gray" | "blue" | "green" | "red" | "brand";
  className?: string;
}

export function Badge({ children, variant = "gray", className = "" }: BadgeProps) {
  const variants = {
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    brand: "bg-brand-50 text-brand-700 border-brand-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
