import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export function Input({ icon, className = "", ...props }: InputProps) {
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <div className="absolute left-3 text-gray-400 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        className={`w-full bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow ${
          icon ? "pl-10" : "pl-3"
        } pr-3 py-2 ${className}`}
        {...props}
      />
    </div>
  );
}
