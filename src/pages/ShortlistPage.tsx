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
      <p className="text-white/70 text-lg mb-10 max-w-2xl font-light leading-relaxed">
        Manage the creators you've saved for your upcoming campaigns.
      </p>

      {shortlistedProfiles.length === 0 ? (
        <EmptyState 
          title="No creators added yet — start exploring!" 
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
                <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 mb-4 shadow-lg">
                  <img src={profile.picture} className="w-20 h-20 rounded-full object-cover border-2 border-slate-900" alt={profile.username} />
                </div>
                <div className="text-center mb-4">
                  <Link to={`/profile/${profile.username || profile.user_id}`} className="font-bold text-lg text-white hover:text-fuchsia-300 transition-colors flex items-center justify-center gap-1 drop-shadow-sm">
                    <span className="truncate max-w-[180px]">{profile.username ? `@${profile.username}` : "Unknown Creator"}</span>
                    <VerifiedBadge verified={profile.is_verified} />
                  </Link>
                  <div className="text-sm text-slate-300 mt-1 line-clamp-1">{profile.fullname || "Unknown Creator"}</div>
                </div>
                
                <div className="w-full text-center bg-black/20 p-3 rounded-lg mt-auto mb-4 border border-white/10 backdrop-blur-sm">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Followers</div>
                  <div className="font-semibold text-white">{formatFollowers(profile.followers)}</div>
                </div>
              </div>
              
              <div className="p-4 border-t border-white/10 bg-white/5 mt-auto">
                <Button
                  variant="secondary"
                  className="w-full font-semibold"
                  onClick={() => removeFromList(profile.user_id)}
                >
                  <span className="flex items-center gap-2 text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    Remove from List
                  </span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}
