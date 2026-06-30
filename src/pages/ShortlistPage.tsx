import { Link } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export function ShortlistPage() {
  const shortlistedProfiles = useAppStore((state) => state.shortlistedProfiles);
  const removeFromList = useAppStore((state) => state.removeFromList);

  return (
    <Layout title="My Shortlist">
      <p className="text-gray-500 text-lg mb-8 max-w-2xl">
        Manage the creators you've saved for your upcoming campaigns.
      </p>

      {shortlistedProfiles.length === 0 ? (
        <EmptyState 
          title="Your shortlist is empty" 
          description="You haven't added any creators to your shortlist yet. Go back to the search page to discover and save profiles."
          icon={
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
          }
          action={
            <Link to="/">
              <Button variant="primary">Discover Creators</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shortlistedProfiles.map((profile) => (
            <Card key={profile.user_id} className="flex flex-col h-full hover:-translate-y-1 transition-transform">
              <div className="p-5 flex flex-col items-center flex-1">
                <img src={profile.picture} className="w-20 h-20 rounded-full object-cover shadow-sm mb-4 border border-gray-100" alt={profile.username} />
                <div className="text-center mb-4">
                  <Link to={`/profile/${profile.username || profile.user_id}`} className="font-bold text-lg text-gray-900 hover:text-brand-600 transition-colors flex items-center justify-center gap-1">
                    <span className="truncate max-w-[180px]">@{profile.username}</span>
                    <VerifiedBadge verified={profile.is_verified} />
                  </Link>
                  <div className="text-sm text-gray-500 mt-1 line-clamp-1">{profile.fullname}</div>
                </div>
                
                <div className="w-full text-center bg-gray-50 p-3 rounded-lg mt-auto mb-4 border border-gray-100">
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Followers</div>
                  <div className="font-semibold text-gray-900">{formatFollowers(profile.followers)}</div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-100 bg-gray-50 mt-auto">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => removeFromList(profile.user_id)}
                >
                  Remove from List
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}
