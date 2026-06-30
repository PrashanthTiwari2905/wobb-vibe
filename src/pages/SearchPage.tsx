
import { useMemo, useCallback } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage(): JSX.Element {
  const platform = useAppStore((state) => state.platform);
  const setPlatform = useAppStore((state) => state.setPlatform);
  const searchQuery = useAppStore((state) => state.searchQuery);
  const setSearchQuery = useAppStore((state) => state.setSearchQuery);

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(() => filterProfiles(allProfiles, searchQuery), [allProfiles, searchQuery]);

  const handleProfileClick = useCallback(() => {
    // Currently a no-op, but stabilized for React.memo
  }, []);

  return (
    <Layout title="Discover Creators">
      <p className="text-gray-500 text-lg mb-8 max-w-2xl">
        Search and filter through thousands of top influencers across Instagram, YouTube, and TikTok to find the perfect match for your campaign.
      </p>

      <PlatformFilter
        selected={platform}
        onChange={(p) => {
          setPlatform(p);
          setSearchQuery("");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">Results</h2>
        <p className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
          Showing {filtered.length} of {allProfiles.length}
        </p>
      </div>

      <ProfileList
        profiles={filtered}
        platform={platform}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}
