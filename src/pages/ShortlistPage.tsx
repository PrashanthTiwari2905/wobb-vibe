import { Link } from "react-router-dom";
import { useAppStore } from "@/store/useAppStore";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";

export function ShortlistPage() {
  const shortlistedProfiles = useAppStore((state) => state.shortlistedProfiles);
  const removeFromList = useAppStore((state) => state.removeFromList);

  return (
    <Layout title="My Shortlist">
      {shortlistedProfiles.length === 0 ? (
        <div className="text-gray-500 text-center mt-10">
          <p>Your shortlist is empty.</p>
          <Link to="/" className="text-blue-600 underline mt-2 inline-block">Go search for profiles</Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-w-3xl mx-auto mt-6">
          {shortlistedProfiles.map((profile) => (
            <div
              key={profile.user_id}
              className="flex items-center gap-4 p-4 border border-gray-300 rounded hover:bg-gray-50 bg-white"
            >
              <img src={profile.picture} className="w-16 h-16 rounded-full" alt={profile.username} />
              <div className="flex-1 text-left">
                <Link to={`/profile/${profile.username || profile.user_id}`} className="font-bold text-lg hover:underline block">
                  @{profile.username}
                  <VerifiedBadge verified={profile.is_verified} />
                </Link>
                <div className="text-sm text-gray-600">{profile.fullname}</div>
                <div className="text-sm text-gray-500 mt-1">{formatFollowers(profile.followers)} followers</div>
              </div>
              <button
                onClick={() => removeFromList(profile.user_id)}
                className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
