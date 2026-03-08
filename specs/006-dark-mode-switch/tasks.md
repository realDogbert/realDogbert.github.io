# Tasks: Dark Mode Switch

**Input**: Design documents from `/specs/001-dark-mode-switch/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/theme.d.ts ✅, quickstart.md ✅

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no blocked dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths in all descriptions

---

## Phase 1: Setup

**Purpose**: Register the `ThemeMode` type and the `@custom-variant` Tailwind directive — foundational plumbing that all subsequent tasks depend on.

- [X] T001 [P] Add `ThemeMode = 'light' | 'dark'` and `ThemeToggleProps` types to `lib/types.ts`
- [X] T002 [P] Add `@custom-variant dark (&:where(.dark, .dark *))` to `app/globals.css` immediately after `@import "tailwindcss"`

**Checkpoint**: `ThemeMode` type exported; `dark:` Tailwind variant activates on `<html class="dark">`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: FOUC-prevention script and layout changes. Must be complete before any UI work begins.

**⚠️ CRITICAL**: US1, US2, and US3 all depend on this phase.

- [X] T003 Add `suppressHydrationWarning` attribute to `<html>` element in `app/layout.tsx`
- [X] T004 Inject inline FOUC-prevention `<script dangerouslySetInnerHTML>` into `<head>` in `app/layout.tsx` — reads `localStorage.getItem('theme')`, adds `class="dark"` to `document.documentElement` if value is `'dark'`, wrapped in `try/catch`
- [X] T005 [P] Add dark-mode base color tokens to `app/globals.css` (`body` background and foreground for `html.dark`)
- [X] T006 [P] Add dark scrollbar colors to `app/globals.css` (`::-webkit-scrollbar-*` for dark mode)

**Checkpoint**: Page loads with correct dark/light class applied before first paint. No FOUC visible when reloading with `localStorage.theme = 'dark'`.

---

## Phase 3: User Story 1 — Umschalten auf Dunkelmodus (Priority: P1) 🎯 MVP

**Goal**: User can click a sun/moon icon in the header to toggle between light and dark mode.

**Independent Test**: Open site → click the toggle icon → site switches to dark mode → icon changes to sun. Click again → site switches back to light mode.

### Implementation

- [X] T007 [US1] Create `components/ThemeToggle.tsx` as a `'use client'` component — `useEffect`-based `mounted` guard, reads `document.documentElement.classList.contains('dark')` for initial state, toggles class on `<html>` on click, inline SVG sun and moon icons, `aria-label` in German (FR-007)
- [X] T008 [US1] Add `<ThemeToggle />` to the desktop nav section of `components/Navigation.tsx` (alongside the existing desktop `NavLink` elements)
- [X] T009 [US1] Add `<ThemeToggle />` to the mobile nav section of `components/Navigation.tsx` (inside the mobile dropdown)
- [X] T010 [P] [US1] Apply `dark:` Tailwind utilities to `components/Navigation.tsx` — nav background (`dark:bg-neutral-950/85`), border (`dark:border-neutral-800`), brand link, NavLink text and hover colors
- [X] T011 [P] [US1] Apply `dark:` Tailwind utilities to `app/layout.tsx` footer — border, text, icon link colors

**Checkpoint**: Toggle button visible in header, clicking it switches full-page dark/light styling. Icon updates correctly. Keyboard accessible (Tab + Enter/Space).

---

## Phase 4: User Story 2 — Speicherung der Designwahl (Priority: P2)

**Goal**: User's last selected mode is persisted in `localStorage` and automatically restored on every page load.

**Independent Test**: Set dark mode → reload page → dark mode is still active (no flash of light mode first).

### Implementation

- [X] T012 [US2] Implement `localStorage.setItem('theme', ...)` write inside `ThemeToggle.tsx` `toggle` handler, wrapped in `try/catch` for unavailable storage (FR-006)
- [X] T013 [US2] Verify FOUC-prevention script from T004 correctly reads back the stored value and applies `dark` class before hydration — manual test: set `localStorage.theme = 'dark'` → hard reload → no flash

**Checkpoint**: Mode survives page reload with zero flash of incorrect mode. Storage unavailable (private window) silently defaults to light mode.

---

## Phase 5: User Story 3 — Statische Auslieferung (Priority: P3)

**Goal**: Site continues to be fully statically exported. No server-side logic involved in theme switching.

**Independent Test**: Run `npm run build` → verify `out/` directory is produced, no server routes added. Network tab shows zero requests for theme. `ThemeToggle` uses `'use client'` but does not trigger any API calls.

### Implementation

- [X] T014 [US3] Verify `next.config.ts` retains `output: 'export'` — no changes needed, confirm with `npm run build`
- [X] T015 [P] [US3] Confirm `ThemeToggle.tsx` contains no `fetch`, `axios`, or server calls — code review checkoff

**Checkpoint**: `npm run build` succeeds with static export intact. No new server routes. Network tab shows zero requests on toggle.

---

## Phase 6: Polish & Dark Mode Styling Coverage

**Purpose**: Apply `dark:` utilities to remaining page surfaces so dark mode is consistent across all pages.

- [X] T016 [P] Apply `dark:` Tailwind utilities to `components/BlogCard.tsx` — card background, border, title, metadata, tag colors
- [X] T017 [P] Apply `dark:` Tailwind utilities to `components/BlogPostContent.tsx` — prose text, headings, code blocks, blockquotes
- [X] T018 [P] Apply `dark:` Tailwind utilities to `components/BlogWithSidebar.tsx` — sidebar background and border
- [X] T019 [P] Apply `dark:` Tailwind utilities to `components/TagCloud.tsx` — tag chip background and text
- [X] T020 [P] Apply `dark:` Tailwind utilities to `components/TagFilteredPostList.tsx` — any hardcoded light colors
- [X] T021 Run `npm run build` and confirm zero TypeScript errors (SC-006)
- [X] T022 Run `npm run lint` and fix any ESLint issues
- [ ] T023 Visual QA: toggle dark mode on home page, blog post page, about page, impressum page on mobile and desktop viewports
- [ ] T024 [P] Accessibility check: confirm toggle button is reachable by keyboard Tab, activatable by Enter/Space, and announces correctly via screen reader (SC-004)
- [ ] T025 [P] Run Lighthouse on production build output (`npm run build && npx serve out`) — verify Lighthouse Performance ≥90 and Accessibility ≥95 (constitution V, SC-005)
- [ ] T026 [P] Verify WCAG AA color contrast for dark palette — check body copy, link, nav-link, tag chip text/background combinations using browser DevTools Accessibility panel or Colour Contrast Analyser (constitution V)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — blocks all user story phases
- **Phase 3 (US1)**: Depends on Phase 2 — MVP deliverable
- **Phase 4 (US2)**: Depends on T007 (ThemeToggle created in Phase 3)
- **Phase 5 (US3)**: Independent of US1/US2 — can run in parallel with Phase 3
- **Phase 6 (Polish)**: Depends on Phase 2 foundation; individual T016–T020 are fully parallel; T025 and T026 depend on Phase 3 (need toggle to exist)

### User Story Dependencies

- **US1 (P1)**: Can start immediately after Phase 2
- **US2 (P2)**: Depends on T007 (ThemeToggle) for the write path — implement T012 after T007
- **US3 (P3)**: No code changes required beyond `npm run build` verification — can run at any time

### Parallel Opportunities per Phase

```
Phase 1:  T001 ‖ T002
Phase 2:  T003 → T004 (sequential on layout.tsx), T005 ‖ T006 (parallel on globals.css)
Phase 3:  T007 → T008 → T009 (sequential), T010 ‖ T011 (parallel, different files)
Phase 4:  T012 → T013 (sequential, same component)
Phase 5:  T014 ‖ T015 (parallel)
Phase 6:  T016 ‖ T017 ‖ T018 ‖ T019 ‖ T020 (all parallel), T021 → T022 → T023 → T024
```

---

## Implementation Strategy

### MVP First (User Story 1 only — ~6 tasks)

1. Complete Phase 1: T001, T002
2. Complete Phase 2: T003–T006
3. Complete Phase 3: T007–T011

**Result**: Fully functional dark/light toggle in the nav. All other stories layer on top.

### Full Feature (~26 tasks total)

Phase 1 → Phase 2 → Phase 3 (MVP) → Phase 4 + Phase 5 (parallel) → Phase 6 (parallel polish)

---

## Task Summary

| Phase | Tasks | Parallelizable | User Story |
|-------|-------|---------------|-----------|
| 1 Setup | T001–T002 | 2 of 2 | — |
| 2 Foundational | T003–T006 | 2 of 4 | — |
| 3 US1 MVP | T007–T011 | 2 of 5 | US1 |
| 4 US2 Persistence | T012–T013 | 0 of 2 | US2 |
| 5 US3 Static | T014–T015 | 1 of 2 | US3 |
| 6 Polish | T016–T026 | 7 of 11 | — |
| **Total** | **26** | **14** | |
