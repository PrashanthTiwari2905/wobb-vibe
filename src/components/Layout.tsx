import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const shortlistedCount = useAppStore((state) => state.shortlistedProfiles.length);

  return (
    <div className="p-4 min-h-screen">
      <header className="mb-6 border-b pb-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-xl font-semibold text-gray-900">
            Influencer Search
          </Link>
          {title && <h1 className="text-2xl mt-2">{title}</h1>}
        </div>
        <Link to="/shortlist" className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
          My Shortlist ({shortlistedCount})
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
