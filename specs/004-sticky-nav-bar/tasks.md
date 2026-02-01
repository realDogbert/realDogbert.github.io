# Implementation Tasks: Sticky Navigation Bar

**Feature**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)  
**Branch**: `004-sticky-nav-bar` | **Date**: February 1, 2026

## Overview

This document breaks down the implementation of the sticky navigation bar feature into discrete, testable tasks organized by user story. Each task includes acceptance criteria and file paths for implementation.

**Implementation Strategy**: MVP-first incremental delivery. Each user story phase represents a complete, independently testable increment of functionality.

---

## Phase 1: Setup & Foundation

**Objective**: Initialize project structure and TypeScript types for the navigation feature

**Prerequisites**: None - this is the starting point

### Tasks

- [X] T001 Create TypeScript interfaces in lib/types.ts for NavigationLink and NavigationProps
- [X] T002 [P] Create contracts/navigation.d.ts type definition file in specs directory

**Dependencies**: None  
**Deliverable**: Type system ready for component implementation

---

## Phase 2: Core Navigation Component (User Story 4 + Story 1 + Story 2)

**Objective**: Implement the persistent navigation bar with home page navigation functionality

**User Story Coverage**: 
- US4 (P1): Persistent Navigation During Scroll
- US1 (P1): Navigate to Home Page  
- US2 (P1): View All Posts

**Independent Test**: Navigate to any page, verify navigation bar is fixed at top, click brand link and "alle posts" to navigate to home page

### Tasks

- [X] T003 [US4] [US1] [US2] Create components/Navigation.tsx with Client Component directive and usePathname hook
- [X] T004 [US4] Implement CSS fixed positioning (position: fixed, top-0, z-50) in Navigation component
- [X] T005 [US4] Add 50% transparency background (bg-white/50) to navigation bar
- [X] T006 [US1] Implement left-aligned brand link "grobsizziert.de" pointing to home page (/)
- [X] T007 [P] [US2] Implement right-aligned navigation links section with flexbox layout
- [X] T008 [P] [US2] Add "alle posts" link pointing to home page (/) in right section
- [X] T009 [US1] [US2] Implement active state detection logic using pathname === '/' for home page links
- [X] T010 [US1] [US2] Add active state styling (font-bold) for current page links with conditional className
- [X] T011 [P] [US1] [US2] Add hover states (hover:text-gray-600) with transition-colors to all links
- [X] T012 [P] [US1] [US2] Add focus-visible styles (ring-2, ring-gray-400) for keyboard navigation
- [X] T013 [US1] [US2] Add ARIA attributes (aria-label for nav, aria-current for active links)
- [X] T014 [US4] Add responsive text sizing (text-sm md:text-base) for horizontal layout on all screen sizes
- [X] T015 Update app/layout.tsx to import and render Navigation component before main content
- [X] T016 [US4] Add pt-16 (padding-top: 64px) to main element in app/layout.tsx to prevent content hiding
- [X] T017 [P] Verify navigation renders on all existing pages (home, blog posts)
- [X] T018 [P] [US4] Test scroll behavior on long blog posts - verify nav stays fixed and content visible through transparency

**Dependencies**: T001 (types must exist before component creation)  
**Deliverable**: Fully functional sticky navigation with home page navigation working

---

## Phase 3: About Page & Link (User Story 3)

**Objective**: Create about page placeholder and complete navigation link functionality

**User Story Coverage**: 
- US3 (P2): Access About Page

**Independent Test**: Click "über" link from any page, verify about page loads and "über" link shows as active

### Tasks

- [X] T019 [US3] Create app/about directory
- [X] T020 [P] [US3] Create app/about/page.tsx with TypeScript Metadata export
- [X] T021 [US3] Add page metadata (title: "Über | Grob skizziert", description)
- [X] T022 [US3] Implement basic about page layout with heading and placeholder content
- [X] T023 [US3] Add "über" link to Navigation component right section pointing to /about
- [X] T024 [US3] Update active state logic to handle /about route (pathname.startsWith('/about'))
- [X] T025 [P] [US3] Verify "über" link navigation from home page
- [X] T026 [P] [US3] Verify "über" link navigation from blog post pages
- [X] T027 [P] [US3] Verify "über" link shows active state on about page

**Dependencies**: T003-T016 (Navigation component must exist)  
**Deliverable**: Complete about page with working navigation link

---

## Phase 4: Visual Polish & Accessibility (User Story 5)

**Objective**: Refine visual appearance, transparency, and ensure accessibility compliance

**User Story Coverage**: 
- US5 (P2): Visual Transparency

**Independent Test**: Scroll on pages to see content beneath navigation, verify transparency is visible and text remains readable

### Tasks

- [X] T028 [US5] Verify bg-white/50 transparency allows content visibility while maintaining text readability
- [X] T029 [P] [US5] Test navigation appearance on different background colors (white, images, colored sections)
- [X] T030 [P] Add semantic HTML validation (nav element, proper heading hierarchy)
- [X] T031 [P] Run keyboard navigation test (Tab through all links, Enter to activate)
- [X] T032 [P] Verify color contrast ratios meet WCAG AA standards (4.5:1 for text)
- [X] T033 [P] Test responsive behavior on mobile (375px), tablet (768px), and desktop (1024px+) viewports
- [X] T034 [P] Verify all three links remain visible horizontally on smallest mobile viewport
- [X] T035 [P] Check for layout shift (CLS) - ensure pt-16 offset prevents content jump

**Dependencies**: T003-T027 (all navigation functionality complete)  
**Deliverable**: Polished navigation meeting all accessibility and visual requirements

---

## Phase 5: Validation & Performance

**Objective**: Verify performance targets and validate implementation against specification

**Independent Test**: Run Lighthouse audits, verify all acceptance scenarios from spec

### Tasks

- [X] T036 [P] Run `npm run build` and verify zero TypeScript errors
- [X] T037 [P] Run `npm run lint` and fix any linting issues in Navigation.tsx
- [X] T038 [P] Run Lighthouse Performance audit - verify score ≥90
- [X] T039 [P] Run Lighthouse Accessibility audit - verify score ≥95
- [X] T040 [P] Verify Core Web Vitals: CLS = 0 (no layout shift)
- [X] T041 [P] Test all User Story 1 acceptance scenarios (5 scenarios)
- [X] T042 [P] Test all User Story 2 acceptance scenarios (4 scenarios)
- [X] T043 [P] Test all User Story 3 acceptance scenarios (5 scenarios)
- [X] T044 [P] Test all User Story 4 acceptance scenarios (5 scenarios)
- [X] T045 [P] Test all User Story 5 acceptance scenarios (4 scenarios)
- [X] T046 [P] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [X] T047 [P] Verify navigation works without JavaScript (graceful degradation)

**Dependencies**: T003-T035 (complete implementation)  
**Deliverable**: Validated, production-ready navigation component

---

## Task Summary

**Total Tasks**: 47  
**Parallelizable Tasks**: 25 (marked with [P])  
**Sequential Tasks**: 22  

**By User Story**:
- Setup & Foundation: 2 tasks
- US4 (Persistent Navigation) + US1 (Home) + US2 (All Posts): 16 tasks (P1 - Core functionality)
- US3 (About Page): 9 tasks (P2 - Secondary navigation)
- US5 (Visual Transparency): 8 tasks (P2 - Polish)
- Validation: 12 tasks (Final verification)

**Estimated Effort**: 4-6 hours for experienced Next.js developer

---

## Dependency Graph

```
Phase 1: Setup
├── T001 (types) ──┐
└── T002 (contracts)│
                    ▼
Phase 2: Core Navigation (US4+US1+US2)
├── T003 (component) ───────┐
├── T004 (fixed position)   │
├── T005 (transparency)     │
├── T006 (brand link)       │
├── T007 (right section)    │
├── T008 (alle posts link)  │ ALL parallel after T003
├── T009 (active state)     │
├── T010 (active styling)   │
├── T011 (hover states)     │
├── T012 (focus states)     │
├── T013 (ARIA)             │
├── T014 (responsive)       │
└── T015-T018 (integration) ┘
                            ▼
Phase 3: About Page (US3)
├── T019 (directory) ────┐
├── T020 (page file)     │
├── T021 (metadata)      │ parallel
├── T022 (layout)        │
├── T023 (über link)     │
├── T024 (active state)  │
└── T025-T027 (tests)    ┘
                         ▼
Phase 4: Polish (US5)
└── T028-T035 ────────┐ all parallel
                       ▼
Phase 5: Validation
└── T036-T047 ────────┘ all parallel (can run concurrently)
```

---

## Parallel Execution Examples

### Maximum Parallelization (Phase 2)

After T003 (component creation), these can run in parallel:
- T004, T005: CSS styling
- T006, T007, T008: Link structure
- T009, T010: Active state logic
- T011, T012, T013: Interactive states
- T014: Responsive design

### Typical Developer Flow

**Session 1** (Setup + Core - 2h):
1. T001, T002 (types)
2. T003 (create component shell)
3. T004, T005, T006, T007, T008 (basic structure and styling)
4. T015, T016 (integrate into layout)

**Session 2** (Interactions - 1h):
1. T009, T010 (active states)
2. T011, T012, T013 (hover, focus, ARIA)
3. T014, T017, T018 (responsive + testing)

**Session 3** (About Page - 1h):
1. T019-T024 (about page + link)
2. T025-T027 (test about integration)

**Session 4** (Polish + Validation - 1-2h):
1. T028-T035 (visual refinement)
2. T036-T047 (validation + Lighthouse)

---

## Acceptance Criteria per Phase

### Phase 1: Setup ✓
- [ ] TypeScript interfaces compile without errors
- [ ] Types are properly exported and importable

### Phase 2: Core Navigation ✓
- [ ] Navigation bar visible on all pages
- [ ] Navigation remains fixed during scroll
- [ ] "grobsizziert.de" navigates to home
- [ ] "alle posts" navigates to home
- [ ] Active state shows on home page for both brand and "alle posts" links
- [ ] Hover and focus states work
- [ ] Keyboard navigation functional
- [ ] All three links visible on mobile

### Phase 3: About Page ✓
- [ ] About page accessible at /about
- [ ] "über" link navigates to about page
- [ ] Active state shows on about page for "über" link
- [ ] About page has basic content structure

### Phase 4: Polish ✓
- [ ] Transparency is visible (50% opacity)
- [ ] Text remains readable over all backgrounds
- [ ] No layout shift when pages load
- [ ] Responsive on all screen sizes

### Phase 5: Validation ✓
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥95
- [ ] All 23 acceptance scenarios pass
- [ ] Works across all major browsers

---

## Implementation Notes

### Critical Path (Must Complete in Order)
1. T001 → T003 → T015 → (all other tasks can branch)

### Quick Win Tasks (Easy, High Impact)
- T004, T005: CSS positioning and transparency (5 min)
- T006, T007, T008: Link structure (10 min)
- T015, T016: Layout integration (5 min)

### Complex Tasks (Require Careful Implementation)
- T003: Component creation with Client Component and usePathname (15 min)
- T009, T010: Active state logic with proper route matching (15 min)
- T024: Expanding active state logic for /about route (10 min)

### Testing Tasks (Run After Each Phase)
- T017-T018: Phase 2 validation
- T025-T027: Phase 3 validation
- T028-T035: Phase 4 validation
- T036-T047: Phase 5 comprehensive validation

---

## MVP Scope (Minimum Viable Product)

**Recommended MVP**: Complete Phase 1 + Phase 2 only

**Rationale**: 
- Phase 2 delivers all P1 user stories (US1, US2, US4)
- Navigation is functional with home page links
- Sticky behavior and transparency implemented
- About page (US3) and final polish (US5) are P2 priorities

**MVP Deliverable**:
- Sticky navigation bar with "grobsizziert.de" and "alle posts" links
- Fixed positioning with transparency
- Active states for home page
- Keyboard accessible

**Post-MVP Increments**:
- Increment 1: Add Phase 3 (About page - US3)
- Increment 2: Add Phase 4 (Visual polish - US5)
- Increment 3: Add Phase 5 (Full validation)

---

## Risk Mitigation

**Low Risk Tasks** (straightforward implementation):
- T001, T002: Type definitions
- T004, T005: CSS styling
- T006-T008: Static links
- T019-T022: About page structure

**Medium Risk Tasks** (test carefully):
- T003: Client Component setup
- T009, T010, T024: Active state routing logic
- T028, T029: Transparency visibility
- T038-T040: Performance targets

**Mitigation Strategies**:
- Follow quickstart.md implementation guide closely
- Test each phase completion before moving to next
- Use browser DevTools to verify CSS positioning and transparency
- Run Lighthouse audits incrementally, not just at end

---

## References

- **Specification**: [spec.md](spec.md) - All acceptance scenarios
- **Implementation Plan**: [plan.md](plan.md) - Technical approach
- **Research**: [research.md](research.md) - Design decisions
- **Developer Guide**: [quickstart.md](quickstart.md) - Step-by-step instructions
- **Type Contracts**: [contracts/navigation.d.ts](contracts/navigation.d.ts) - TypeScript interfaces
- **Data Model**: [data-model.md](data-model.md) - Entity relationships
