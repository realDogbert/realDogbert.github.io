# Tasks: Markdown-to-HTML Rendering

**Input**: Design documents from `/specs/003-markdown-html-rendering/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Not requested for this feature - implementation only

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies and verify project structure

- [X] T001 Install marked package (npm install marked @types/marked)
- [X] T002 Install shiki package for syntax highlighting (npm install shiki)
- [X] T003 Install sanitize-html package (npm install sanitize-html @types/sanitize-html)
- [X] T004 Verify TypeScript strict mode enabled in tsconfig.json
- [X] T005 Verify project structure matches plan.md (app/, components/, lib/)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core markdown utilities that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Create lib/markdown.ts utility module (empty file with exports)
- [X] T007 [P] Configure marked with GFM support and custom renderer options in lib/markdown.ts
- [X] T008 [P] Configure sanitize-html allowlist (safe tags: p, div, span, strong, em, a, ul, ol, li, code, pre, blockquote, h1-h6, hr, table, etc.) in lib/markdown.ts
- [X] T009 [P] Configure shiki highlighter with theme selection (e.g., 'github-dark') in lib/markdown.ts
- [X] T010 Implement isExternalLink(url: string): boolean function using URL constructor in lib/markdown.ts
- [X] T011 Implement sanitizeHtml(html: string): string function with configured allowlist in lib/markdown.ts
- [X] T012 Implement custom marked renderer for links (add target="_blank" rel="noopener noreferrer" for external links) in lib/markdown.ts
- [X] T013 Create components/BlogPostContent.tsx component with TypeScript interface (accept content: string[], className?: string)
- [X] T014 Add basic wrapper structure (article element) to BlogPostContent component

**Checkpoint**: Foundation ready - parseMarkdown() skeleton exists, component structure ready, user story implementation can begin

---

## Phase 3: User Story 1 - Render Basic Text Formatting (Priority: P1) 🎯 MVP

**Goal**: Enable bold, italic, inline code, and basic link rendering in blog posts

**Independent Test**: Create a test post with `**bold**`, `*italic*`, `` `code` ``, and `[link](url)`, verify HTML renders correctly

### Implementation for User Story 1

- [X] T015 [P] [US1] Implement parseMarkdown(markdown: string): string function that calls marked.parse() in lib/markdown.ts
- [X] T016 [US1] Integrate sanitizeHtml() call after marked.parse() in parseMarkdown() function in lib/markdown.ts
- [X] T017 [US1] Integrate link processing (apply isExternalLink check and target attributes) in custom renderer in lib/markdown.ts
- [X] T018 [US1] Implement paragraph rendering logic in BlogPostContent component: map over content array, call parseMarkdown() for each string in components/BlogPostContent.tsx
- [X] T019 [US1] Render parsed HTML using dangerouslySetInnerHTML in BlogPostContent component for each paragraph in components/BlogPostContent.tsx
- [X] T020 [US1] Add Tailwind CSS classes for basic text formatting (bold/strong, italic/em, inline code styling) in components/BlogPostContent.tsx
- [X] T021 [US1] Add Tailwind CSS classes for link styling (color, hover states, underline) in components/BlogPostContent.tsx
- [X] T022 [US1] Update app/blog/[slug]/page.tsx to use BlogPostContent component instead of raw content rendering
- [X] T023 [US1] Test with existing blog posts (docker-virtualbox-sendfile.md, etc.) to verify basic formatting works
- [X] T024 [US1] Verify external links open in new tab with proper security attributes (inspect rendered HTML)
- [X] T025 [US1] Verify internal/relative links open in same tab (inspect rendered HTML)

**Checkpoint**: Basic text formatting (bold, italic, inline code, links) should render correctly in all existing posts

---

## Phase 4: User Story 2 - Render Block Elements (Priority: P2)

**Goal**: Enable headings, code blocks with syntax highlighting, lists, and blockquotes

**Independent Test**: Create a test post with `## Heading`, triple backtick code blocks, `- list items`, `1. ordered items`, `> blockquote`, verify structure and highlighting

### Implementation for User Story 2

- [X] T026 [P] [US2] Implement highlightCode(code: string, language: string): string function using shiki in lib/markdown.ts
- [X] T027 [US2] Integrate shiki syntax highlighting into marked renderer for code blocks (fenced code with language identifier) in lib/markdown.ts
- [X] T028 [US2] Configure marked to preserve code block language identifiers for shiki processing in lib/markdown.ts
- [X] T029 [US2] Add Tailwind CSS classes for heading styles (h2, h3, h4, h5, h6 - h1 is post title) with proper hierarchy in components/BlogPostContent.tsx
- [X] T030 [P] [US2] Add Tailwind CSS classes for code block styling (pre/code, background, padding, border-radius, overflow-x-auto) in components/BlogPostContent.tsx
- [X] T031 [P] [US2] Add Tailwind CSS classes for unordered list styling (ul, li, bullets, spacing) in components/BlogPostContent.tsx
- [X] T032 [P] [US2] Add Tailwind CSS classes for ordered list styling (ol, li, numbers, spacing) in components/BlogPostContent.tsx
- [X] T033 [P] [US2] Add Tailwind CSS classes for blockquote styling (border-left, italic, padding, background) in components/BlogPostContent.tsx
- [X] T034 [US2] Test code blocks with various languages (typescript, python, bash, etc.) to verify syntax highlighting
- [X] T035 [US2] Test heading hierarchy (verify h2-h6 render with proper sizes and spacing)
- [X] T036 [US2] Test nested lists (verify proper indentation and styling)
- [X] T037 [US2] Verify code blocks with no language identifier render without syntax highlighting but with proper styling

**Checkpoint**: Block elements (headings, code blocks, lists, blockquotes) should render with proper structure and styling

---

## Phase 5: User Story 3 - Handle Special Markdown Syntax (Priority: P3)

**Goal**: Enable horizontal rules, images, tables, and strikethrough

**Independent Test**: Create a test post with `---`, `![alt](url)`, markdown table, `~~strikethrough~~`, verify rendering

### Implementation for User Story 3

- [X] T038 [P] [US3] Add Tailwind CSS classes for horizontal rule styling (hr, border, margin) in components/BlogPostContent.tsx
- [X] T039 [P] [US3] Add Tailwind CSS classes for table styling (table, thead, tbody, tr, td, th, borders) in components/BlogPostContent.tsx
- [X] T040 [P] [US3] Add Tailwind CSS classes for strikethrough/del styling in components/BlogPostContent.tsx
- [X] T041 [US3] Implement custom marked renderer for images to use Next.js Image component (optional optimization) in lib/markdown.ts
- [X] T042 [US3] Configure marked to enable GFM table support (should be enabled by default with GFM) in lib/markdown.ts
- [X] T043 [US3] Configure marked to enable strikethrough support (part of GFM) in lib/markdown.ts
- [X] T044 [US3] Test horizontal rules render correctly with proper spacing
- [X] T045 [US3] Test tables render with proper borders, padding, and alignment
- [X] T046 [US3] Test strikethrough renders with line-through styling
- [X] T047 [US3] Test images render (Next.js Image component if implemented, otherwise standard img tag)

**Checkpoint**: All special markdown syntax renders correctly with proper styling

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final touches, validation, and documentation

- [X] T048 [P] Add responsive design adjustments for mobile viewports (code blocks scroll, tables responsive)
- [X] T049 [P] Verify accessibility: proper heading hierarchy, semantic HTML elements, link descriptions
- [X] T050 [P] Add focus styles for keyboard navigation (links, code blocks if interactive)
- [X] T051 Run npm run build and verify no TypeScript errors
- [X] T052 Run npm run lint and fix any linting issues
- [X] T053 Test with all existing blog posts to verify backward compatibility (no broken rendering)
- [X] T054 Create sample blog post showcasing all markdown features for visual QA
- [X] T055 Verify bundle size impact with npm run build (check .next/static for bundle sizes)
- [X] T056 Measure build time increase (should be <20% per NFR-003)
- [X] T057 Run Lighthouse audit on blog post pages (Performance ≥90, Accessibility ≥95)
- [X] T058 [P] Verify XSS protection: test with malicious HTML tags in markdown (should be stripped)
- [X] T059 [P] Verify malformed markdown auto-correction: test with unclosed code blocks (should not break build)
- [X] T060 Update specs/003-markdown-html-rendering/quickstart.md with any implementation learnings
- [X] T061 Visual QA on desktop (Chrome, Firefox, Safari) and mobile (iOS Safari, Chrome) browsers

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational (Phase 2) - Can start immediately after Phase 2
- **User Story 2 (Phase 4)**: Depends on Foundational (Phase 2) - Can start in parallel with US1 if staffed
- **User Story 3 (Phase 5)**: Depends on Foundational (Phase 2) - Can start in parallel with US1/US2 if staffed
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other user stories - independently implementable after Foundational
- **User Story 2 (P2)**: No dependencies on US1 - independently implementable after Foundational (shares same markdown utilities)
- **User Story 3 (P3)**: No dependencies on US1/US2 - independently implementable after Foundational (shares same markdown utilities)

**Key Insight**: All user stories depend ONLY on Foundational phase (lib/markdown.ts utilities + BlogPostContent component shell). Once Foundational is complete, all three user stories can be implemented in parallel by different developers.

### Within Each User Story

**User Story 1 (Basic Formatting)**:
- T015-T017 (parseMarkdown implementation) can be done in parallel with [P] marker
- T018-T019 (component integration) depend on T015-T017
- T020-T021 (styling) can be done in parallel with [P] marker
- T022-T025 (testing) depend on T018-T021

**User Story 2 (Block Elements)**:
- T026-T028 (shiki integration) sequential (code block rendering)
- T029-T033 (styling) can ALL be done in parallel with [P] markers
- T034-T037 (testing) depend on T026-T033

**User Story 3 (Special Syntax)**:
- T038-T040 (styling) can ALL be done in parallel with [P] markers
- T041-T043 (configuration) can be done in parallel with [P] marker
- T044-T047 (testing) depend on T038-T043

### Parallel Opportunities

**Within Setup (Phase 1)**: T001-T003 can run in parallel (different npm installs)

**Within Foundational (Phase 2)**: 
- T007-T009 (configuration) can run in parallel with [P] markers (different config sections)
- T010-T011 (utility functions) can run in parallel with [P] markers (independent functions)

**Across User Stories**: Once Phase 2 complete:
```bash
# Three developers can work simultaneously:
Developer A: Phase 3 (User Story 1) - Basic formatting
Developer B: Phase 4 (User Story 2) - Block elements  
Developer C: Phase 5 (User Story 3) - Special syntax

# Or sequential by priority:
1. Complete User Story 1 → Test independently → Deploy as MVP
2. Add User Story 2 → Test independently → Deploy
3. Add User Story 3 → Test independently → Deploy
```

---

## Parallel Example: Foundational Phase

```bash
# After T006 creates the file, these can run simultaneously:
Task T007: Configure marked (top of file)
Task T008: Configure sanitize-html (separate config object)
Task T009: Configure shiki (separate config object)

# Then these utility functions in parallel:
Task T010: Implement isExternalLink() function
Task T011: Implement sanitizeHtml() function
Task T012: Implement custom renderer for links
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (install dependencies)
2. Complete Phase 2: Foundational (markdown utilities + component shell) - **CRITICAL GATE**
3. Complete Phase 3: User Story 1 (basic text formatting)
4. **STOP and VALIDATE**: Test with existing posts, verify bold/italic/code/links work
5. Deploy/demo MVP with basic markdown rendering

**Estimated Tasks for MVP**: T001-T025 (25 tasks)

### Incremental Delivery

1. MVP (US1): Basic text formatting → Deploy ✅
2. +US2: Add block elements (headings, code blocks, lists) → Deploy ✅
3. +US3: Add special syntax (tables, images, hr, strikethrough) → Deploy ✅
4. Polish: Final validation and optimization → Deploy ✅

Each increment adds value without breaking previous functionality.

### Parallel Team Strategy

With 3 developers after Foundational phase completes:

```bash
Developer A (US1): T015-T025 (Basic formatting)
Developer B (US2): T026-T037 (Block elements)
Developer C (US3): T038-T047 (Special syntax)

All three stories develop in parallel, merge independently
```

---

## Task Count Summary

- **Phase 1 (Setup)**: 5 tasks
- **Phase 2 (Foundational)**: 9 tasks - **BLOCKS all user stories**
- **Phase 3 (User Story 1 - P1)**: 11 tasks - **MVP target**
- **Phase 4 (User Story 2 - P2)**: 12 tasks
- **Phase 5 (User Story 3 - P3)**: 10 tasks
- **Phase 6 (Polish)**: 14 tasks

**Total**: 61 tasks

**MVP Completion**: After T025 (first 25 tasks), basic markdown rendering is functional

**Parallel Opportunities**: 18 tasks marked [P] can run in parallel when conditions met

---

## Notes

- **No tests included**: Tests not requested in feature specification
- **[P] marker**: Indicates tasks working on different files or independent sections (can parallelize)
- **[Story] label**: Maps each task to specific user story (US1, US2, US3) for traceability
- **File paths included**: Every implementation task specifies exact file to modify
- **Independent user stories**: Each story can be deployed independently after Foundational phase
- **Foundational phase is critical**: T006-T014 MUST complete before any user story work begins
- **Backward compatibility**: Existing BlogPost interface unchanged, existing posts continue to work
- **Build-time highlighting**: shiki runs server-side only, zero client JavaScript for syntax highlighting
- **Security built-in**: HTML sanitization with allowlist prevents XSS attacks
- **Bundle size monitored**: Total addition should be ~45KB gzipped (marked 11KB + sanitize-html 20KB + shiki server-only)

---

## Validation Checklist

After completing all tasks, verify:

- [ ] All 4+ existing blog posts render correctly without errors
- [ ] Bold (`**text**`) renders as `<strong>` with proper styling
- [ ] Italic (`*text*`) renders as `<em>` with proper styling
- [ ] Inline code (`` `code` ``) renders with monospace font and background
- [ ] Links have proper href attributes
- [ ] External links open in new tab with security attributes
- [ ] Internal links open in same tab
- [ ] Headings (h2-h6) have proper hierarchy and styling
- [ ] Code blocks with language identifiers show syntax highlighting
- [ ] Code blocks without language identifiers show monospace styling
- [ ] Unordered lists render with bullets and proper spacing
- [ ] Ordered lists render with numbers and proper spacing
- [ ] Blockquotes have distinct visual styling (border, italics)
- [ ] Horizontal rules display correctly
- [ ] Tables render with proper structure and borders
- [ ] Strikethrough text has line-through styling
- [ ] No XSS vulnerabilities (dangerous HTML tags stripped)
- [ ] Malformed markdown doesn't break build (auto-correction works)
- [ ] TypeScript compilation succeeds (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥95
- [ ] Bundle size increase <50KB gzipped
- [ ] Build time increase <20%
