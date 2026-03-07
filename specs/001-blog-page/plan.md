# Implementation Plan: Blog Page with Example Posts

**Branch**: `001-blog-page` | **Date**: 2026-01-25 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-blog-page/spec.md`

## Summary

Build a minimalistic, modern blog interface replacing the current Next.js starter homepage. The blog displays 3 example posts on the root route (`/`) with clickable cards showing title, excerpt, date, and read time. Individual posts are accessible at `/[slug]` routes with full content display and back navigation. All pages use Next.js static generation, Server Components, TypeScript strict mode, and Tailwind CSS for styling. No new dependencies required.

**Technical Approach**: Static data structure (TypeScript object array) defining blog posts, Next.js dynamic routes for individual posts (`app/[slug]/page.tsx`), reusable components (BlogCard, BlogPostContent, Header), and Tailwind CSS for responsive design with dark mode support.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 16.x, React 19.x, Tailwind CSS 4.x  
**Storage**: Static TypeScript data file (`lib/posts.ts`) with blog post array  
**Testing**: N/A - tests not requested in specification  
**Target Platform**: Web (static HTML/CSS/JS via Next.js build)  
**Project Type**: Next.js App Router static site  
**Performance Goals**: Lighthouse Performance ≥90, Accessibility ≥95, Core Web Vitals pass  
**Constraints**: Minimal dependencies only, static-first approach, TypeScript strict mode  
**Scale/Scope**: Personal blog, 3 example posts, 2 routes (home list + dynamic post pages)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Required Checks** (based on my-blog constitution v1.0.0):

- [x] **Minimal Dependencies**: No new dependencies required - uses existing Next.js, React, TypeScript, Tailwind stack
- [x] **Component-First**: Components self-contained with TypeScript interfaces (BlogCard, BlogPostContent, Header, BlogPost interface)
- [x] **Static-First**: 100% static generation - no runtime APIs, all routes use `generateStaticParams` for build-time generation
- [x] **Type Safety**: All types explicit (BlogPost interface, component props, date formatters, read time calculator)
- [x] **Accessibility & Performance**: Lighthouse targets achievable - semantic HTML, ARIA labels, keyboard navigation, optimized images, minimal CSS

**Status**: ✅ **PASSED** - No violations. All constitution principles satisfied.

## Phase 0: Research (COMPLETE)

**Output**: [research.md](research.md)

Researched and documented:
- ✅ Next.js 16 App Router static generation patterns (Server Components + generateStaticParams)
- ✅ TypeScript data structure for blog posts (content: string[] array approach)
- ✅ Date formatting without dependencies (native Intl.DateTimeFormat)
- ✅ Read time calculation algorithm (200 WPM standard)
- ✅ Responsive card layout with Tailwind CSS (single-column flexbox)
- ✅ Dark mode implementation (Tailwind dark: variant with prefers-color-scheme)
- ✅ Accessibility best practices (semantic HTML, ARIA, keyboard navigation)

All decisions align with constitution principles and require zero new dependencies.

## Phase 1: Design & Contracts (COMPLETE)

**Outputs**: 
- [data-model.md](data-model.md) - BlogPost entity definition, validation rules, data flow
- [contracts/types.ts](contracts/types.ts) - TypeScript interfaces and type contracts
- [quickstart.md](quickstart.md) - Local development guide with step-by-step implementation

### Data Model Summary

- **BlogPost Entity**: 7 properties (title, slug, excerpt, content[], publishedAt, readTime, author)
- **Validation**: TypeScript type safety + build-time slug uniqueness check
- **Storage**: Static TypeScript file (`lib/posts.ts`)
- **3 Example Posts**: Defined with 4-6 paragraphs each, sorted by date descending

### Type Contracts

- Core interfaces: `BlogPost`, `BlogCardProps`, `BlogPostContentProps`, `HeaderProps`
- Utility types: `StaticParams`, `FormatDateFn`, `CalculateReadTimeFn`
- Full JSDoc documentation with constraints and examples

### Quickstart Guide

- Prerequisites and setup instructions
- Step-by-step component development workflow
- Testing checklist (functional, responsive, accessibility, dark mode, build)
- Common issues and solutions
- Performance validation with Lighthouse

## Constitution Check (Post-Design Re-evaluation)

*GATE: Verify design phase output still complies with all principles.*

**Required Checks**:

- [x] **Minimal Dependencies**: CONFIRMED - Zero new dependencies added. Uses only Next.js, React, TypeScript, Tailwind (existing stack)
- [x] **Component-First**: CONFIRMED - 3 components with clear boundaries (Header, BlogCard, BlogPostContent), each <100 lines
- [x] **Static-First**: CONFIRMED - 100% static generation via generateStaticParams, no Client Components needed
- [x] **Type Safety**: CONFIRMED - Explicit TypeScript interfaces in contracts/, all component props typed
- [x] **Accessibility & Performance**: CONFIRMED - Semantic HTML (article, time, Link), WCAG AA contrast, target Lighthouse ≥90/≥95

**Status**: ✅ **PASSED** - Design fully complies with constitution. Ready for task breakdown (Phase 2).

## Implementation Readiness

### Files to Create

| Path | Purpose | Lines (est.) |
|------|---------|--------------|
| `lib/types.ts` | TypeScript interfaces | ~50 |
| `lib/utils.ts` | Utility functions | ~20 |
| `lib/posts.ts` | Static blog data | ~120 |
| `components/Header.tsx` | Site header | ~15 |
| `components/BlogCard.tsx` | Post card component | ~30 |
| `components/BlogPostContent.tsx` | Content renderer | ~15 |
| `app/page.tsx` | Blog list page (replaces existing) | ~30 |
| `app/[slug]/page.tsx` | Individual post pages | ~40 |

**Total New Code**: ~320 lines  
**Files Modified**: 1 (app/page.tsx - replace existing content)  
**Files Created**: 7

### Estimated Complexity

- **Simple**: Header, BlogPostContent, utils (straightforward rendering/logic)
- **Moderate**: BlogCard (hover states, accessibility), posts.ts (data entry)
- **Slightly Complex**: app/[slug]/page.tsx (dynamic routing, generateStaticParams, notFound handling)

**Overall**: Low-to-moderate complexity. No novel patterns or edge cases. Well-defined requirements.

## Next Steps

**Ready for**: `/speckit.tasks` command to generate task breakdown

The tasks will be organized by user story:
- **US1 (P1)**: View Blog Post List - Foundation + list page
- **US2 (P2)**: Read Full Blog Post - Individual post pages
- **US3 (P3)**: Enhanced Visual Polish - Hover effects, transitions, dark mode refinement

Each task will include:
- Specific file paths
- Implementation details from research/data-model
- Dependency tracking (which tasks must complete first)
- Parallel execution opportunities (marked with [P])

## Summary

This implementation plan provides a complete blueprint for building the blog feature:

✅ **Technical approach validated** - Static generation with Server Components  
✅ **Data model defined** - BlogPost interface with 3 example posts  
✅ **Architecture designed** - 7 new files, component-first structure  
✅ **Utilities specified** - Date formatting, read time calculation  
✅ **Accessibility ensured** - Semantic HTML, keyboard navigation, WCAG AA  
✅ **Performance targets set** - Lighthouse ≥90/≥95, Core Web Vitals pass  
✅ **Constitution compliant** - Zero new dependencies, fully static, type-safe  

**Branch**: `001-blog-page`  
**Documentation**: spec.md, research.md, data-model.md, contracts/types.ts, quickstart.md  
**Next Phase**: Task breakdown (to be created with `/speckit.tasks`)

## Project Structure

### Documentation (this feature)

```text
specs/001-blog-page/
├── plan.md              # This file
├── spec.md              # Feature specification (completed)
├── research.md          # Phase 0 output (to be created)
├── data-model.md        # Phase 1 output (to be created)
├── quickstart.md        # Phase 1 output (to be created)
└── checklists/
    └── requirements.md  # Validation checklist (completed)
```

### Source Code (repository root)

```text
app/
├── page.tsx             # Blog list page at root (/) - Server Component
├── [slug]/
│   └── page.tsx         # Individual blog post pages - Server Component with generateStaticParams
├── layout.tsx           # Root layout (already exists, may need updates for metadata)
└── globals.css          # Global styles (already exists)

components/
├── Header.tsx           # Site header with "My Blog" title
├── BlogCard.tsx         # Post card for list view (clickable, shows excerpt/date/read time)
└── BlogPostContent.tsx  # Full post content renderer (maps paragraph array to <p> elements)

lib/
├── posts.ts             # Static blog post data array with BlogPost[] export
├── types.ts             # TypeScript interfaces (BlogPost)
└── utils.ts             # Utility functions (formatDate, calculateReadTime)

public/
└── (no changes needed)  # Static assets - none required for MVP
```

**Structure Decision**: Using Next.js App Router with root-level pages. Blog list replaces existing home page at `/app/page.tsx`. Individual posts use dynamic routing with `[slug]` parameter. Shared components in `/components`, data and utilities in `/lib`. No tests directory created (testing not requested). Structure follows constitution's Component-First principle with clear separation of concerns.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

**Status**: No violations - table not applicable.
