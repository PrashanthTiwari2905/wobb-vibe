import { useState, useEffect } from "react";
import type { ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";

export function useProfile(username: string | undefined) {
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!username) {
      setLoaded(true);
      return;
    }

    setLoaded(false);
    
    // Optional simulated delay to showcase loading state
    const delay = new Promise((res) => setTimeout(res, 500));

    Promise.all([loadProfileByUsername(username), delay]).then(([data]) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  return { profileData, loaded };
}
