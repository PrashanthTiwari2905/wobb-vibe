import { create } from 'zustand';
import type { Platform, UserProfileSummary } from '@/types';
import { persist } from 'zustand/middleware';

interface AppState {
  platform: Platform;
  searchQuery: string;
  shortlistedProfiles: UserProfileSummary[];
  setPlatform: (platform: Platform) => void;
  setSearchQuery: (query: string) => void;
  addToList: (profile: UserProfileSummary) => void;
  removeFromList: (userId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      platform: 'instagram',
      searchQuery: '',
      shortlistedProfiles: [],
      setPlatform: (platform) => set({ platform }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      addToList: (profile) =>
        set((state) => {
          // Prevent duplicates
          if (state.shortlistedProfiles.some((p) => p.user_id === profile.user_id)) {
            return state;
          }
          return { shortlistedProfiles: [...state.shortlistedProfiles, profile] };
        }),
      removeFromList: (userId) =>
        set((state) => ({
          shortlistedProfiles: state.shortlistedProfiles.filter((p) => p.user_id !== userId),
        })),
    }),
    {
      name: 'wobb-vibe-storage',
    }
  )
);
