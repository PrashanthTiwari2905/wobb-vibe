import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useAppStore } from "@/store/useAppStore";
interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}


export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const addToList = useAppStore((state) => state.addToList);
  const removeFromList = useAppStore((state) => state.removeFromList);
  const isShortlisted = useAppStore((state) => 
    state.shortlistedProfiles.some(p => p.user_id === profile.user_id)
  );

  const handleClick = () => {
    const identifier = profile.username || profile.user_id;
    if (onProfileClick) onProfileClick(identifier);
    navigate(`/profile/${identifier}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-[700px]"
      data-search={searchQuery}
    >
      <img src={profile.picture} className="w-12 h-12 rounded-full" />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowers(profile.followers)} followers</div>
      </div>
      <button
        className={`px-3 py-1 text-sm rounded ${isShortlisted ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        onClick={(e) => {
          e.stopPropagation();
          if (isShortlisted) {
            removeFromList(profile.user_id);
          } else {
            addToList(profile);
          }
        }}
      >
        {isShortlisted ? 'Remove from List' : 'Add to List'}
      </button>
    </div>
  );
}
