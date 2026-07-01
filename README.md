# Influencer Discovery Platform - Refactor & Modernization

## Live Demo
https://wobb-vibe.vercel.app

This repository contains a comprehensive refactor of an Influencer Discovery React application. The objective of this assignment was to audit an existing broken codebase, resolve critical bugs, implement missing features, modernize the UI, and heavily optimize the application for both code quality and rendering performance.

## What Was Changed & Why

### 1. Critical Bug Fixes
- **Safe Filtering**: Fixed a crash occurring when filtering YouTube profiles by adding safe-guards in `filterProfiles` against `undefined` fields.
- **Data Normalization (Engagement Rate)**: Resolved `NaN` rendering issues on specific profile pages by safely defaulting missing metrics (like `posts_count` or `followers`) and conditionally rendering statistics.
- **Data Parity**: Fixed the mismatched follower count bug between the dashboard and profile detail pages by unifying the underlying data-lookup logic for consistency.

### 2. State Management Setup (Zustand)
- The original codebase relied entirely on localized `useState` passing props deep down the tree. 
- Introduced a centralized store using **Zustand** to manage global state: `platform` filters, `searchQuery`, and `shortlistedProfiles`. This eliminated prop drilling and established a scalable foundation for global state.

### 3. "Add to List" Feature
- Wired up functional "Add/Remove from List" buttons on both the profile cards and profile detail pages.
- Leveraged the Zustand store to hold shortlisted profiles uniquely (preventing duplicates).
- Created a dedicated `/shortlist` route equipped with a clean empty-state fallback to view selected creators.

### 4. SaaS UI Redesign
- Completely modernized the aesthetic using a responsive grid system and **Tailwind CSS**.
- Extracted and built a library of reusable UI primitives (`Button`, `Card`, `Badge`, `Input`, `Spinner`, `EmptyState`) to establish a clean, consistent, and highly accessible SaaS appearance.
- Swapped out rigid, hardcoded pixel dimensions for fluid breakpoints (`sm:`, `md:`, `lg:`).

### 5. Code Quality & Performance Improvements
- **Extracted Hooks**: Moved heavy data-fetching logic (`useEffect`, loading/error states) out of `ProfileDetailPage.tsx` into a reusable `useProfile.ts` hook.
- **Strict TypeScript**: Removed implicit `any` types, added explicit return types, and removed dead code/unused imports.
- **Rendering Optimizations**: 
  - Wrapped `ProfileCard` and `ProfileList` in `React.memo` to prevent unnecessary list re-renders.
  - Used `useMemo` for the heavy `filterProfiles` computation to ensure it only runs when the search query or platform changes.
  - Used `useCallback` to stabilize event handlers passed down to memoized children.

---

## Libraries Added

- **`zustand`**: Chosen as the global state management solution. Unlike React Context (which requires providers and can trigger widespread cascading re-renders), Zustand provides a highly performant, boilerplate-free API that hooks directly into components via selectors.

---

## Assumptions Made

- **Data Immutability**: It was assumed the static JSON dataset acts as a mock API. Therefore, simulated network delays were introduced to demonstrate asynchronous loading states (spinners).
- **Session Persistence**: The "Add to List" functionality utilizes Zustand's `persist` middleware to automatically save selections to `localStorage`. It was assumed that a backend database for cross-device cloud synchronization was outside the scope of the immediate assignment requirements.

---

## Trade-offs

- **Client-Side Search vs. Server-Side**: Currently, the application pulls all platform data and performs string-matching and filtering entirely on the client. While perfectly fine for thousands of mocked profiles, a real-world scenario with millions of creators would necessitate pushing this logic to a backend API with proper pagination.
- **Vite Glob Imports (Code Splitting)**: The profile JSON data is loaded via Vite's `import.meta.glob` which dynamically generates separate JS chunks per profile. While this incredibly optimizes initial page load times (by not bundling megabytes of JSON), it results in many small network requests during fast client-side navigation.

---

## Remaining Improvements (With More Time)

1. **List Virtualization**: For massive datasets, implementing `react-window` or `react-virtuoso` on the `ProfileList` would drastically reduce the number of DOM nodes, ensuring perfectly smooth 60fps scrolling regardless of list size.
2. **Cloud Sync / Backend Persistence**: Sync the Zustand shortlist state to a backend database so user selections persist across different devices and accounts, rather than just locally in the browser's `localStorage`.
3. **Automated Testing**: Introduce **Jest** + **React Testing Library** for unit testing critical utility functions (like `filterProfiles` and `extractProfiles`), and use **Playwright** or **Cypress** to establish E2E tests for the "Add to List" user flow.
4. **Image Lazy Loading**: Avatar images currently load immediately. Applying `loading="lazy"` on profile images would save significant initial bandwidth when loading the dashboard grid.
