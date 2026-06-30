import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { extractProfiles } from "@/utils/dataHelpers";
import { useAppStore } from "@/store/useAppStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Spinner";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loaded, setLoaded] = useState(false);
  const addToList = useAppStore((state) => state.addToList);
  const removeFromList = useAppStore((state) => state.removeFromList);
  const shortlistedProfiles = useAppStore((state) => state.shortlistedProfiles);

  useEffect(() => {
    if (!username) return;

    // Optional simulated delay to showcase loading state
    const delay = new Promise(res => setTimeout(res, 500));
    
    Promise.all([loadProfileByUsername(username), delay]).then(([data]) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <EmptyState title="Invalid Profile" description="The profile URL is missing a username." />
        <div className="mt-4 flex justify-center">
          <Link to="/">
            <Button variant="secondary">Back to Search</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout title="Loading Profile...">
        <div className="flex flex-col items-center justify-center py-20">
          <Spinner className="w-10 h-10 mb-4" />
          <p className="text-gray-500 font-medium">Fetching creator details...</p>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout title="Profile Not Found">
        <EmptyState 
          title="Could not load profile details" 
          description={`We couldn't find detailed data for @${username}.`} 
        />
        <div className="mt-4 flex justify-center">
          <Link to="/">
            <Button variant="secondary">Back to Search</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  let displayFollowers = user.followers;
  const isValidPlatform = platform === "instagram" || platform === "youtube" || platform === "tiktok";
  if (isValidPlatform) {
    const searchProfiles = extractProfiles(platform as any);
    const searchProfile = searchProfiles.find(
      (p) => p.user_id === user.user_id || (p.username && p.username === user.username)
    );
    if (searchProfile) {
      displayFollowers = searchProfile.followers;
    }
  }

  return (
    <Layout title="Creator Profile">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand-600 mb-6 transition-colors">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to search
      </Link>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info Column */}
        <Card className="md:col-span-1 p-6 flex flex-col items-center text-center">
          <img
            src={user.picture}
            className="w-32 h-32 rounded-full border-4 border-white shadow-md mb-4"
          />
          <h2 className="text-xl font-bold text-gray-900 flex items-center justify-center gap-1 mb-1">
            @{user.username}
            <VerifiedBadge verified={user.is_verified} />
          </h2>
          <p className="text-gray-600 font-medium">{user.fullname}</p>
          <span className="mt-3 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider rounded-full">
            {platform}
          </span>

          <div className="w-full mt-8 flex flex-col gap-3">
            {user.url && (
              <a href={user.url} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full">
                  View on {platform}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </Button>
              </a>
            )}

            {(() => {
              const isShortlisted = shortlistedProfiles.some(p => p.user_id === user.user_id);
              return (
                <Button
                  variant={isShortlisted ? "destructive" : "primary"}
                  className="w-full"
                  onClick={() => {
                    if (isShortlisted) {
                      removeFromList(user.user_id);
                    } else {
                      addToList(user);
                    }
                  }}
                >
                  {isShortlisted ? 'Remove from List' : 'Add to List'}
                </Button>
              );
            })()}
          </div>
        </Card>

        {/* Stats Column */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {user.description || "No bio provided."}
            </p>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Followers</div>
              <div className="text-2xl font-bold text-gray-900">{formatFollowers(displayFollowers)}</div>
            </Card>
            
            <Card className="p-4 text-center">
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Engagement Rate</div>
              <div className="text-2xl font-bold text-gray-900 text-brand-600">{formatEngagementRate(user.engagement_rate)}</div>
            </Card>

            {user.posts_count !== undefined && (
              <Card className="p-4 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Posts</div>
                <div className="text-2xl font-bold text-gray-900">{user.posts_count}</div>
              </Card>
            )}

            {user.avg_likes !== undefined && (
              <Card className="p-4 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Avg Likes</div>
                <div className="text-2xl font-bold text-gray-900">{formatFollowers(user.avg_likes)}</div>
              </Card>
            )}

            {user.avg_comments !== undefined && (
              <Card className="p-4 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Avg Comments</div>
                <div className="text-2xl font-bold text-gray-900">{user.avg_comments}</div>
              </Card>
            )}

            {user.avg_views !== undefined && user.avg_views > 0 && (
              <Card className="p-4 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Avg Views</div>
                <div className="text-2xl font-bold text-gray-900">{formatFollowers(user.avg_views)}</div>
              </Card>
            )}
            
            {user.engagements !== undefined && (
              <Card className="p-4 text-center sm:col-span-3">
                <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Total Engagements</div>
                <div className="text-2xl font-bold text-gray-900">{formatFollowers(user.engagements)}</div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
