import { useState, useEffect } from "react";
import type { ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";

export function useProfile(username: string | undefined) {
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(!username);

  useEffect(() => {
    if (!username) {
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      setLoaded(false);
      
      // Optional simulated delay to showcase loading state
      const delay = new Promise((res) => setTimeout(res, 500));
      const [data] = await Promise.all([loadProfileByUsername(username), delay]);
      
      if (isMounted) {
        setProfileData(data);
        setLoaded(true);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { profileData, loaded };
}
