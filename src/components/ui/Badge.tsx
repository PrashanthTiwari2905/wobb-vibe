import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "gray" | "instagram" | "youtube" | "tiktok" | "brand";
  className?: string;
}

export function Badge({ children, variant = "gray", className = "" }: BadgeProps) {
  const variants = {
    gray: "bg-white/10 text-slate-200 border-white/20",
    instagram: "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent",
    youtube: "bg-red-600 text-white border-transparent",
    tiktok: "bg-slate-900 text-white border-white/20 shadow-[0_0_8px_rgba(255,0,80,0.5)]",
    brand: "bg-fuchsia-500 text-white border-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.5)]",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
