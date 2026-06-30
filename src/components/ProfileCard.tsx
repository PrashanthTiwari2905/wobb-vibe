import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useAppStore } from "@/store/useAppStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}

export function ProfileCard({
  profile,
  platform,
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
    <Card onClick={handleClick} className="flex flex-col h-full hover:-translate-y-1 transition-transform">
      <div className="p-5 flex flex-col items-center flex-1">
        <img 
          src={profile.picture} 
          alt={profile.username} 
          className="w-20 h-20 rounded-full object-cover shadow-sm mb-4 border border-gray-100" 
        />
        <div className="text-center mb-4">
          <div className="font-bold text-lg text-gray-900 flex items-center justify-center gap-1">
            <span className="truncate max-w-[180px]">@{profile.username}</span>
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <div className="text-sm text-gray-500 mt-1 line-clamp-1">{profile.fullname}</div>
        </div>
        
        <div className="w-full grid grid-cols-2 gap-2 text-center bg-gray-50 p-3 rounded-lg mt-auto mb-4 border border-gray-100">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Followers</div>
            <div className="font-semibold text-gray-900">{formatFollowers(profile.followers)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Platform</div>
            <div className="font-semibold text-gray-900 capitalize">{platform}</div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50 mt-auto">
        <Button
          variant={isShortlisted ? "destructive" : "primary"}
          className="w-full"
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
        </Button>
      </div>
    </Card>
  );
}
