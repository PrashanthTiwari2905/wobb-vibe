import type { ProfileDetailResponse, FullUserProfile } from "@/types";
import { extractProfiles, PLATFORMS } from "./dataHelpers";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

export async function loadProfileByUsername(
  identifier: string
): Promise<ProfileDetailResponse | null> {
  // 1. Try exact or case-insensitive match for dedicated JSON files
  const targetPath = `../assets/data/profiles/${identifier.toLowerCase()}.json`;
  const pathKey = Object.keys(profileModules).find(
    (key) => key.toLowerCase() === targetPath
  );

  if (pathKey) {
    const loader = profileModules[pathKey];
    const result = await loader();
    return (result as { default?: ProfileDetailResponse }).default ?? result;
  }

  // 2. Fallback to search data to ensure ALL profiles load even without a dedicated file
  for (const plat of PLATFORMS) {
    const searchProfiles = extractProfiles(plat);
    const fallbackProfile = searchProfiles.find(
      (p) => p.user_id === identifier || p.username?.toLowerCase() === identifier.toLowerCase()
    );
    
    if (fallbackProfile) {
      return {
        data: {
          success: true,
          user_profile: {
            ...fallbackProfile,
            type: plat
          } as FullUserProfile
        }
      };
    }
  }

  // 3. Fail loudly instead of silently
  console.error(`[profileLoader] Failed to load profile for identifier: '${identifier}'. No dedicated file exists, and it was not found in search data.`);
  return null;
}
