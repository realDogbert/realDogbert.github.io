# Tasks: Blog Page with Example Posts

**Input**: Design documents from `/specs/001-blog-page/`  
**Prerequisites**: plan.md (✓), spec.md (✓), research.md (✓), data-model.md (✓), contracts/types.ts (✓), quickstart.md (✓)

**Tests**: Not requested in specification - no test tasks included

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Next.js App Router**: `app/`, `components/`, `lib/` at repository root
- **Public assets**: `public/` for images, fonts, static files (none needed for MVP)
- **Types**: `lib/types.ts` for TypeScript interfaces
- **Data**: `lib/posts.ts` for static blog post array
- **Utils**: `lib/utils.ts` for helper functions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and foundational file structure

- [X] T001 Create `lib/` directory if it doesn't exist
- [X] T002 Verify TypeScript strict mode enabled in tsconfig.json
- [X] T003 [P] Create `components/` directory if it doesn't exist
- [X] T004 [P] Verify Tailwind CSS dark mode configuration (should default to 'media')

**Checkpoint**: Directory structure ready for implementation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core type definitions and utilities that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Create TypeScript interface `BlogPost` in lib/types.ts with properties: title, slug, excerpt, content (string[]), publishedAt (Date), readTime (number), author (string)
- [X] T006 [P] Create `BlogCardProps` interface in lib/types.ts with post: BlogPost property
- [X] T007 [P] Create `BlogPostContentProps` interface in lib/types.ts with post: BlogPost property
- [X] T008 [P] Create `HeaderProps` interface in lib/types.ts with optional title and tagline properties
- [X] T009 Create `formatDate` utility function in lib/utils.ts using Intl.DateTimeFormat for "January 25, 2026" format
- [X] T010 [P] Create `calculateReadTime` utility function in lib/utils.ts using 200 WPM calculation with Math.ceil rounding
- [X] T011 Test utility functions compile without TypeScript errors (run `npm run build`)

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Blog Post List (Priority: P1) 🎯 MVP

**Goal**: Display 3 blog posts on the home page with titles, excerpts, dates, and read times in reverse chronological order

**Independent Test**: Navigate to http://localhost:3000 and verify 3 posts display with all metadata, clickable cards, and responsive layout on mobile/desktop

### Implementation for User Story 1

- [X] T012 [P] [US1] Create static blog post data array in lib/posts.ts with 3 posts, each with 4-6 paragraphs, sorted by publishedAt descending
- [X] T013 [P] [US1] Create Header component in components/Header.tsx displaying "My Blog" title as Link to "/" with dark mode support
- [X] T014 [US1] Create BlogCard component in components/BlogCard.tsx as clickable article element wrapped in Link, showing title (h2), date/read time, and excerpt
- [X] T015 [US1] Add hover and focus styles to BlogCard with border color transition and focus ring for keyboard navigation
- [X] T016 [US1] Replace app/page.tsx content with blog list page importing Header, posts array, and mapping to BlogCard components
- [X] T017 [US1] Add h1 "Latest Posts" heading and max-w-2xl container with responsive padding to app/page.tsx
- [X] T018 [US1] Verify responsive layout on mobile (320px), tablet (768px), and desktop (1024px+) using browser DevTools
- [X] T019 [US1] Verify all 3 posts display in correct order (newest first) with proper date formatting and calculated read times

**Checkpoint**: User Story 1 complete - blog list page fully functional and independently testable at root route

---

## Phase 4: User Story 2 - Read Full Blog Post (Priority: P2)

**Goal**: Enable navigation to individual post pages showing full content with proper typography and back navigation

**Independent Test**: Click any post card from homepage, verify full post displays with all paragraphs formatted, and "← Back" link returns to homepage

### Implementation for User Story 2

- [X] T020 [P] [US2] Create BlogPostContent component in components/BlogPostContent.tsx that maps content array to paragraph elements with proper spacing
- [X] T021 [US2] Create app/[slug]/page.tsx with BlogPost function component receiving params: { slug: string }
- [X] T022 [US2] Implement generateStaticParams function in app/[slug]/page.tsx returning array of slug objects from posts
- [X] T023 [US2] Add post lookup logic using posts.find() with notFound() call if post not found in app/[slug]/page.tsx
- [X] T024 [US2] Add Header component and back navigation Link ("← Back to all posts") at top of post page
- [X] T025 [US2] Add article header section with h1 post title and metadata (date, read time, author) in app/[slug]/page.tsx
- [X] T026 [US2] Render BlogPostContent component with found post in app/[slug]/page.tsx
- [X] T027 [US2] Test navigation: click post card → verify route changes to /[slug] → click back link → verify returns to /
- [X] T028 [US2] Verify paragraph typography meets readability standards (line-height 1.6-1.8, appropriate line length on mobile)

**Checkpoint**: User Stories 1 AND 2 both work independently - complete blog reading experience functional

---

## Phase 5: User Story 3 - Enhanced Visual Polish (Priority: P3)

**Goal**: Add subtle visual enhancements including refined hover effects, smooth transitions, and cohesive dark mode aesthetics

**Independent Test**: Hover over cards and verify smooth transitions, toggle system dark mode and verify consistent color scheme, use keyboard Tab to verify focus indicators

### Implementation for User Story 3

- [X] T029 [P] [US3] Add transition-colors utility classes to BlogCard hover states for smooth border color changes
- [X] T030 [P] [US3] Verify focus:ring-2 focus:ring-zinc-400 classes applied to BlogCard Link for keyboard accessibility
- [X] T031 [US3] Test dark mode by toggling system preferences: verify all text has sufficient contrast (WCAG AA: 4.5:1 for normal text)
- [X] T032 [US3] Audit color palette consistency: light mode uses zinc-50/900/700, dark mode uses zinc-900/950/50/300
- [X] T033 [US3] Test smooth page transitions by navigating between routes - verify no layout shift (CLS <0.1)
- [X] T034 [US3] Add appropriate whitespace with gap-8 for post card spacing and mb-4 for paragraph spacing
- [X] T035 [US3] Verify hover effects work on touch devices (cards should remain clickable on mobile)

**Checkpoint**: All user stories independently functional - blog has polished, professional appearance

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and optimization across all features

- [X] T036 [P] Run `npm run build` and verify zero TypeScript errors
- [X] T037 [P] Run `npm run lint` and fix any ESLint warnings
- [X] T038 Verify all blog post slugs are unique (build will fail with 404s if duplicates exist)
- [X] T039 Test keyboard navigation: Tab through all interactive elements, verify focus order is logical
- [X] T040 Test screen reader compatibility (optional): use VoiceOver/NVDA to verify semantic HTML announcements
- [X] T041 Run Lighthouse audit on development build: verify Performance ≥90, Accessibility ≥95
- [X] T042 Verify Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1 using Lighthouse
- [X] T043 Test edge cases: very long post title (80+ chars) wraps gracefully, short excerpt maintains card height
- [X] T044 Manual testing checklist: view on iPhone SE (320px), iPad (768px), desktop (1024px+)
- [X] T045 Production build test: run `npm run build && npm run start`, verify all routes work in production mode

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational phase completion - Independent of other stories
- **User Story 2 (Phase 4)**: Depends on Foundational phase AND US1 (T016 creates homepage links) - Can start after T016
- **User Story 3 (Phase 5)**: Depends on US1 and US2 being complete (enhances existing components) - Refinement layer
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start immediately after Foundational (Phase 2) completes
  - T012-T019 implement complete blog list functionality
  - Creates clickable cards that link to /[slug] routes (needed by US2)
  
- **User Story 2 (P2)**: Can start after T016 completes (needs blog list page with Links)
  - T020-T028 implement individual post pages
  - Depends on US1 for navigation context (links from cards)
  - Can work in parallel with US1 tasks T017-T019 (different files)

- **User Story 3 (P3)**: Must wait for US1 and US2 to be complete
  - T029-T035 refine visual details of existing components
  - Enhancement layer, not foundational functionality

### Within Each Phase

**Phase 2 (Foundational)**:
- T005 (BlogPost interface) must complete before T012 (posts.ts uses interface)
- T006-T008 (component props) can run parallel with T005
- T009-T010 (utilities) can run parallel with T005-T008
- T011 (verification) must be last in phase

**Phase 3 (US1)**:
- T012 (posts data) must complete before T016 (page.tsx imports posts)
- T013 (Header) can run parallel with T012
- T014-T015 (BlogCard) can run parallel with T012-T013
- T016 (page.tsx) depends on T012, T013, T014
- T017 (layout adjustments) depends on T016
- T018-T019 (testing) must be last

**Phase 4 (US2)**:
- T020 (BlogPostContent) can run parallel with T021-T023
- T021-T023 (page.tsx structure) sequential within this group
- T024-T026 (complete page) depends on T020-T023
- T027-T028 (testing) must be last

**Phase 5 (US3)**:
- T029-T030 (transitions/focus) can run parallel
- T031-T032 (dark mode audit) can run parallel with T029-T030
- T033-T035 (final polish) sequential verification steps

**Phase 6 (Polish)**:
- T036-T037 (build/lint) can run parallel
- T038-T043 (testing) can overlap but should follow logical order
- T044-T045 (manual/production) must be last

### Parallel Opportunities

**Maximum Parallelization** (when team has 3+ developers):

1. After Phase 2 completes:
   - Developer A: T012-T013 (data + Header)
   - Developer B: T014-T015 (BlogCard)
   - Developer C: T020 (BlogPostContent - for US2)

2. After T012-T015 complete:
   - Developer A: T016-T017 (homepage)
   - Developer C: T021-T026 (post pages) - once T016 done

3. Phase 5 (US3):
   - All tasks T029-T035 can be split between developers (different files/concerns)

4. Phase 6 (Polish):
   - T036-T037 can run parallel
   - Testing tasks can be split by viewport/concern

---

## Parallel Example: Foundational Phase

```bash
# Terminal 1 - Core types
echo "Creating BlogPost interface..."
# Work on T005 in lib/types.ts

# Terminal 2 - Component props (parallel)
echo "Creating component prop interfaces..."
# Work on T006-T008 in lib/types.ts (different section)

# Terminal 3 - Utilities (parallel)
echo "Creating utility functions..."
# Work on T009-T010 in lib/utils.ts

# Then verify all together
npm run build  # T011
```

## Parallel Example: User Story 1

```bash
# Terminal 1 - Data layer
echo "Creating blog posts array..."
# Work on T012 in lib/posts.ts

# Terminal 2 - Header component (parallel, different file)
echo "Creating Header component..."
# Work on T013 in components/Header.tsx

# Terminal 3 - BlogCard component (parallel, different file)
echo "Creating BlogCard component..."
# Work on T014-T015 in components/BlogCard.tsx

# Then integrate
echo "Assembling homepage..."
# Work on T016-T017 in app/page.tsx (depends on T012-T014)
```

---

## Implementation Strategy

### MVP First (Deliver User Story 1)

**Fastest path to value**: Complete Phases 1-3 only
- Provides working blog list at root route
- Demonstrates core functionality
- Can be deployed and validated by users
- ~50% of total work

**Tasks**: T001-T019 (19 tasks)  
**Estimated Time**: 2-4 hours for experienced Next.js developer  
**Deliverable**: Functional blog homepage with 3 posts

### Complete Blog (Add User Story 2)

**Full reading experience**: Complete through Phase 4
- Adds individual post pages
- Provides complete blog functionality
- Ready for content strategy discussions
- ~80% of total work

**Tasks**: T001-T028 (28 tasks)  
**Estimated Time**: 3-5 hours  
**Deliverable**: Full blog with list and detail pages

### Polished Product (Add User Story 3 + Polish)

**Production-ready**: Complete all phases
- Professional visual polish
- Accessibility validated
- Performance audited
- 100% complete per specification

**Tasks**: T001-T045 (45 tasks)  
**Estimated Time**: 4-6 hours  
**Deliverable**: Lighthouse-optimized, production-ready blog

---

## Task Summary

| Phase | Tasks | Parallelizable | Critical Path |
|-------|-------|----------------|---------------|
| 1: Setup | 4 | 2 (50%) | T001-T002 |
| 2: Foundational | 7 | 4 (57%) | T005→T012 |
| 3: US1 (P1) | 8 | 3 (38%) | T012→T016→T017 |
| 4: US2 (P2) | 9 | 1 (11%) | T021→T023→T026 |
| 5: US3 (P3) | 7 | 2 (29%) | T031→T033 |
| 6: Polish | 10 | 2 (20%) | T036→T045 |
| **Total** | **45** | **14 (31%)** | **~25 sequential** |

**Estimated Effort**:
- Solo developer (sequential): 4-6 hours
- 2 developers (some parallelization): 3-4 hours  
- 3+ developers (high parallelization): 2-3 hours

**Lines of Code**: ~320 total (see plan.md)
- Per task average: ~7 lines
- Largest tasks: T012 (posts data, ~120 lines), T021-T026 (post page, ~40 lines)
- Smallest tasks: T013, T020 (~15 lines each)

---

## Quality Gates

Each phase has a checkpoint that must pass before proceeding:

**Phase 2 Checkpoint**: `npm run build` succeeds with zero TypeScript errors

**Phase 3 Checkpoint**: 
- Homepage loads at http://localhost:3000
- 3 posts visible with all metadata
- Cards clickable (links work even though target routes don't exist yet)

**Phase 4 Checkpoint**:
- All post pages accessible via /[slug]
- Back navigation returns to homepage
- Typography readable on mobile and desktop

**Phase 5 Checkpoint**:
- Hover effects smooth with no jank
- Dark mode toggle works (system preference)
- Focus indicators visible for keyboard users

**Phase 6 Checkpoint**:
- Lighthouse Performance ≥90, Accessibility ≥95
- `npm run build` produces static HTML for all routes
- Manual testing on 3 viewports passes

---

## Next Steps

1. Review tasks T001-T045 above
2. Follow [quickstart.md](quickstart.md) step-by-step guide
3. Start with Phase 1-2 (foundational setup)
4. Implement User Story 1 (P1) for MVP
5. Add User Story 2 (P2) for complete blog
6. Polish with User Story 3 (P3) for production
7. Validate with Phase 6 quality gates
8. Commit and create pull request

**Branch**: `001-blog-page`  
**Target**: Complete all 45 tasks for production-ready blog  
**MVP Option**: Complete T001-T019 for functional blog list (can deploy incrementally)