import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { Badge } from "@/components/ui/Badge";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const shortlistedCount = useAppStore((state) => state.shortlistedProfiles.length);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-black tracking-tight text-white hover:text-fuchsia-300 transition-colors drop-shadow-md">
              Influencer<span className="text-fuchsia-400">Search</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link 
              to="/shortlist" 
              className="group flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors"
            >
              My Shortlist
              <Badge variant={shortlistedCount > 0 ? "brand" : "gray"} className="group-hover:scale-105 transition-transform">
                {shortlistedCount}
              </Badge>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 drop-shadow-sm">{title}</h1>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
