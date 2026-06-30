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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 hover:text-brand-600 transition-colors">
              Influencer<span className="text-brand-600">Search</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link 
              to="/shortlist" 
              className="group flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              My Shortlist
              <Badge variant={shortlistedCount > 0 ? "brand" : "gray"} className="group-hover:bg-brand-100 transition-colors">
                {shortlistedCount}
              </Badge>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
