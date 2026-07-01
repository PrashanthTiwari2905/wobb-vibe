import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export function Input({ icon, className = "", ...props }: InputProps) {
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <div className="absolute left-3 text-slate-300 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        className={`w-full bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:bg-white/20 transition-all ${
          icon ? "pl-10" : "pl-3"
        } pr-3 py-2.5 ${className}`}
        {...props}
      />
    </div>
  );
}
