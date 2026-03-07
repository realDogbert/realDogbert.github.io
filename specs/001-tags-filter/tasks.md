# Tasks: Tags Filter

**Branch**: `001-tags-filter` | **Date**: 7. März 2026
**Input**: [spec.md](spec.md), [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md)
**Tests**: Not requested — no test tasks generated

## Format: `[ID] [P?] [Story?] Description — file path`

- **[P]**: Can run in parallel (different files, no shared state)
- **[US1/US2/US3]**: User story label (Setup/Foundational phases have no label)

---

## Phase 1: Setup

**Purpose**: Confirm project baseline, no new dependencies required

- [X] T001 Verify `tsconfig.json` has `strict: true` enabled — tsconfig.json
- [X] T002 [P] Add `tags` field to `BlogPost` interface in lib/types.ts

**Checkpoint**: Type system updated — all downstream tasks can begin

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Extend the data layer to read and normalize tags from markdown frontmatter. MUST be complete before any user story work begins.

**⚠️ CRITICAL**: US1, US2, and US3 all depend on this phase

- [X] T003 Update `getAllPosts()` in lib/posts.ts to read `tags` from frontmatter and normalize (lowercase + trim) with `(data.tags ?? []).map((t: string) => t.toLowerCase().trim())`
- [X] T004 Add `tags` to at least three existing posts in lib/posts/ to enable manual testing (e.g., `als-ich-uebernaut-wurde.md`, `docker-ghost-theme.md`, `blog-reboot.md`) — depends on T003

**Checkpoint**: `getAllPosts()` returns posts with normalized tags — user stories can now begin

---

## Phase 3: User Story 1 — Tags filtern (Priority: P1) 🎯 MVP

**Goal**: Render all unique tags as clickable buttons on the homepage; clicking a tag filters the post list to show only matching posts.

**Independent Test**: Open homepage → see tag buttons → click one tag → only posts with that tag are shown → click a different tag → filter switches to new tag

### Implementation

- [X] T005 [US1] Create `TagFilteredPostList` Client Component shell with `"use client"` directive, typed `posts: BlogPost[]` prop, and `activeTag: string | null` state — components/TagFilteredPostList.tsx
- [X] T006 [US1] Add `useMemo`-derived `allTags` (`Set` dedup → `Array.from().sort()`) inside `TagFilteredPostList` — components/TagFilteredPostList.tsx — depends on T005
- [X] T007 [US1] Add `useMemo`-derived `filteredPosts` (filter by `activeTag`, fall back to all posts when `null`) inside `TagFilteredPostList` — components/TagFilteredPostList.tsx — depends on T006
- [X] T008 [US1] Render alphabetically sorted tag buttons with `aria-pressed` and active-state Tailwind styling inside `TagFilteredPostList` — components/TagFilteredPostList.tsx — depends on T007
- [X] T009 [US1] Render `filteredPosts.map(post => <BlogCard />)` list inside `TagFilteredPostList` — components/TagFilteredPostList.tsx — depends on T008
- [X] T010 [US1] Replace direct `posts.map(...)` in `app/page.tsx` with `<TagFilteredPostList posts={posts} />` — app/page.tsx

**Checkpoint**: Homepage shows tag buttons; clicking a tag filters posts. US1 fully functional and independently testable.

---

## Phase 4: User Story 2 — Tags im Frontmatter pflegen (Priority: P2)

**Goal**: Authors can add `tags:` to any post's frontmatter and the tags appear immediately in the homepage tag list on next build.

**Independent Test**: Add tags to an existing post's frontmatter → run `npm run build` → open homepage → new tags appear in the tag list

### Implementation

- [X] T011 [US2] Add tags to all remaining posts in lib/posts/ that don't yet have them (complete tagging of the full post corpus)
- [X] T012 [P] [US2] Add `tags` field documentation to one new or updated post as a frontmatter example comment — lib/posts/blog-reboot.md (or similar)

**Checkpoint**: All existing posts have tags; tag list on homepage reflects the full taxonomy.

---

## Phase 5: User Story 3 — Filter entfernen (Priority: P3)

**Goal**: When a tag filter is active, a clearly visible "Alle Beiträge" button is shown that resets the filter.

**Independent Test**: Click a tag → confirm filtered state → click "Alle Beiträge" → all posts visible again → button disappears

### Implementation

- [X] T013 [US3] Add "Alle Beiträge" reset button inside `TagFilteredPostList` — rendered only when `activeTag !== null`; on click sets `activeTag` to `null` — components/TagFilteredPostList.tsx
- [X] T014 [US3] Style reset button distinctly (e.g., outlined or muted) so it reads as secondary action compared to tag buttons — components/TagFilteredPostList.tsx

**Checkpoint**: Filter can be removed. All three user stories are complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T015 [P] Accessibility audit: verify tag buttons have `aria-pressed`, reset button has descriptive label, keyboard navigation works end-to-end — components/TagFilteredPostList.tsx
- [X] T016 [P] Responsive check: verify tag list wraps gracefully on narrow viewports — components/TagFilteredPostList.tsx
- [X] T017 Run `npm run build` and confirm zero TypeScript errors and zero ESLint warnings
- [X] T018 [P] Run `npm run lint` and fix any issues
- [ ] T019 Visual QA on mobile (375px) and desktop (1280px) viewports
- [X] T020 [P] Update `lib/types.ts` JSDoc comment for `tags` field if not already done — lib/types.ts

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **BLOCKS all user stories**
- **Phase 3 (US1)**: Depends on Phase 2 — MVP deliverable
- **Phase 4 (US2)**: Depends on Phase 2 — can run in parallel with Phase 3 after Phase 2 completes
- **Phase 5 (US3)**: Depends on Phase 3 (T013 extends `TagFilteredPostList`)
- **Phase 6 (Polish)**: Depends on all desired stories being complete

### User Story Dependencies

- **US1 (P1)**: Depends only on Foundational (Phase 2)
- **US2 (P2)**: Depends only on Foundational (Phase 2) — independent of US1
- **US3 (P3)**: Depends on US1 (T013 modifies `TagFilteredPostList` created in US1)

### Parallel Opportunities within Phases

- T001 and T002 (Phase 1): Parallel
- T003 and T004 (Phase 2): Sequential — T004 depends on T003 completing first
- T005–T009 (Phase 3): Sequential (each builds on previous)
- T011 and T012 (Phase 4): Parallel
- T013 and T014 (Phase 5): T013 first, T014 parallel
- T015, T016, T018, T020 (Phase 6): All parallel

---

## Parallel Example: Phase 2 + Phase 4

```
# After Phase 1 completes, start both in parallel:
Thread A: T003 → T004 (data layer; unblocks US1 + US3)
Thread B: T011 → T012 (post corpus tagging; US2 content)
```

---

## Implementation Strategy

### MVP: User Story 1 Only (4 files changed)

1. ✅ Phase 1: T001, T002 — type update
2. ✅ Phase 2: T003, T004 — data layer
3. ✅ Phase 3: T005–T010 — TagFilteredPostList + homepage wiring

Result: Fully working tag filter on homepage with no reset button (reset via clicking active tag again).

### Full Delivery (all stories)

Continue with Phase 4, Phase 5, Phase 6 after MVP is verified.

---

## Task Summary

| Phase | Tasks | Parallelizable | User Story |
|---|---|---|---|
| 1 – Setup | T001–T002 | T001, T002 | — |
| 2 – Foundational | T003–T004 | — | — |
| 3 – US1 Tags filtern | T005–T010 | — | US1 |
| 4 – US2 Frontmatter | T011–T012 | T011, T012 | US2 |
| 5 – US3 Filter entfernen | T013–T014 | T014 | US3 |
| 6 – Polish | T015–T020 | T015, T016, T018, T020 | — |
| **Total** | **20 tasks** | **11 parallelizable** | |

**Suggested MVP scope**: Phases 1–3 (T001–T010, 10 tasks, ~4 files)
