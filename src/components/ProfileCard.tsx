import React from "react";
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

export const ProfileCard = React.memo(function ProfileCard({
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
        <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 mb-4 shadow-lg">
          <img 
            src={profile.picture} 
            alt={profile.username} 
            className="w-20 h-20 rounded-full object-cover border-2 border-slate-900" 
          />
        </div>
        <div className="text-center mb-4">
          <div className="font-bold text-lg text-white flex items-center justify-center gap-1">
            <span className="truncate max-w-[180px] drop-shadow-sm">{profile.username ? `@${profile.username}` : "Unknown Creator"}</span>
            <VerifiedBadge verified={profile.is_verified} />
          </div>
          <div className="text-sm text-slate-300 mt-1 line-clamp-1">{profile.fullname || "Unknown Creator"}</div>
        </div>
        
        <div className="w-full grid grid-cols-2 gap-2 text-center bg-black/20 p-3 rounded-lg mt-auto mb-4 border border-white/10 backdrop-blur-sm">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Followers</div>
            <div className="font-semibold text-white">{formatFollowers(profile.followers)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-medium">Platform</div>
            <div className="font-semibold text-white capitalize">{platform}</div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-white/10 bg-white/5 mt-auto">
        <Button
          variant={isShortlisted ? "secondary" : "primary"}
          className="w-full font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            if (isShortlisted) {
              removeFromList(profile.user_id);
            } else {
              addToList(profile);
            }
          }}
        >
          {isShortlisted ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Added
            </span>
          ) : 'Add to List'}
        </Button>
      </div>
    </Card>
  );
});
