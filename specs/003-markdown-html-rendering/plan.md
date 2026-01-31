# Implementation Plan: Markdown-to-HTML Rendering

**Branch**: `003-markdown-html-rendering` | **Date**: 2026-01-31 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/003-markdown-html-rendering/spec.md`

## Summary

Enable bloggers to write posts using markdown syntax (bold, italic, code blocks, links, lists, etc.) which automatically renders as properly formatted HTML when displayed on the website. The system must parse markdown content at the paragraph level, maintain the existing BlogPost interface structure, support build-time syntax highlighting without client-side JavaScript, sanitize HTML to prevent XSS attacks, and implement smart link handling (external links in new tab, internal links same tab). All rendering must remain server-side to preserve static generation performance.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: Next.js 16.1.4, React 19.x, Tailwind CSS 4.x, gray-matter 4.0.3  
**Storage**: Static markdown files in lib/posts/ directory  
**Testing**: None (tests not requested for this feature)  
**Target Platform**: Web (static HTML/CSS/JS via Next.js build with Turbopack)  
**Project Type**: Next.js App Router static blog site  
**Performance Goals**: Lighthouse Performance ≥90, Accessibility ≥95, Core Web Vitals pass  
**Constraints**: Minimal dependencies (markdown library must be <50KB gzipped), static-first approach (server-side rendering only), TypeScript strict mode, no breaking changes to BlogPost interface  
**Scale/Scope**: Personal blog with 4+ markdown posts, paragraph-level markdown parsing, build-time syntax highlighting, HTML sanitization

**Unknowns Requiring Research**:
- **NEEDS CLARIFICATION**: Which markdown parsing library? (evaluate: marked, remark, markdown-it for bundle size, GFM support, extensibility)
- **NEEDS CLARIFICATION**: Which syntax highlighting library for build-time? (evaluate: shiki, highlight.js, prism for bundle size, language support, static generation)
- **NEEDS CLARIFICATION**: HTML sanitization approach? (evaluate: dompurify, sanitize-html, built-in parsing with allowlist)
- **NEEDS CLARIFICATION**: How to detect internal vs external links? (URL parsing with domain comparison vs regex patterns)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Required Checks** (based on my-blog constitution v1.0.0):

- [x] **Minimal Dependencies**: One new dependency required (markdown parser library). Bundle impact constraint documented in NFR-001 (<50KB gzipped). Justified: Core feature requires markdown-to-HTML conversion which cannot be reasonably implemented from scratch. Gray-matter already installed for frontmatter parsing.
- [x] **Component-First**: Components will be self-contained with TypeScript interfaces. BlogPostContent component will receive content: string[] and render parsed HTML. Existing BlogPost interface preserved.
- [x] **Static-First**: Static generation maintained - all markdown parsing happens server-side at render time. No client-side JavaScript needed (build-time syntax highlighting per FR-005, NFR-002). No runtime data fetching introduced.
- [x] **Type Safety**: All types will be explicit. BlogPost interface unchanged (type safety preserved). New markdown utility functions will have explicit return types for HTML strings.
- [x] **Accessibility & Performance**: Lighthouse targets achievable - markdown rendering adds <50KB (NFR-001), build time increase <20% (NFR-003), proper heading hierarchy maintained (NFR-004), Lighthouse Performance ≥90 and Accessibility ≥95 (SC-008).

**Violations**: None. Feature aligns with all constitution principles.

**Post-Design Re-Evaluation** (2026-01-31):

✅ **Minimal Dependencies Verified**: 
- marked: 11KB gzipped (chosen for smallest bundle)
- sanitize-html: ~20KB gzipped  
- shiki: Server-only, no client bundle impact
- **Total: ~45KB gzipped** ✅ Under 50KB constraint

✅ **Component-First Verified**: 
- BlogPostContent component created with TypeScript interfaces in contracts/components.ts
- lib/markdown.ts utility module with explicit function signatures in contracts/markdown-parser.ts
- Clear separation: data (lib/posts.ts), parsing (lib/markdown.ts), rendering (components/)

✅ **Static-First Verified**:
- shiki generates static HTML with inline styles (zero client JS for highlighting)
- Server Component rendering (no 'use client' directive)
- marked runs server-side only

✅ **Type Safety Verified**:
- All contracts defined with TypeScript interfaces
- No `any` types in API contracts
- BlogPost interface preserved (type safety maintained)

✅ **Accessibility & Performance Verified**:
- Semantic HTML output (h1-h6, article, blockquote)
- Alt text preserved for images
- Bundle size verified under constraint
- Build-time processing prevents runtime performance impact

**Final Status**: All constitution principles satisfied. No violations introduced during design phase.

## Project Structure

### Documentation (this feature)

```text
specs/003-markdown-html-rendering/
├── spec.md              # Feature specification (completed with clarifications)
├── plan.md              # This file (implementation plan)
├── research.md          # Phase 0: Library evaluation (marked, remark, sanitization)
├── data-model.md        # Phase 1: BlogPost structure, HTML rendering approach
├── quickstart.md        # Phase 1: Developer guide for markdown rendering
├── contracts/           # Phase 1: Markdown parser API interfaces
│   └── markdown-parser.ts  # TypeScript interface for parser functions
└── checklists/
    └── requirements.md  # Requirements validation (completed)
```

### Source Code (repository root)

```text
app/
├── blog/
│   └── [slug]/
│       └── page.tsx     # Blog post page (will use markdown rendering)
│   
lib/
├── posts.ts             # Existing: getAllPosts(), getPostBySlug() - NO CHANGES
└── markdown.ts          # NEW: parseMarkdown(), sanitizeHtml(), isExternalLink()

components/
└── BlogPostContent.tsx  # NEW: Renders content: string[] with markdown parsing

public/
└── [unchanged]          # Static assets
```

**Structure Decision**: Next.js App Router pattern. New markdown utility module (lib/markdown.ts) keeps parsing logic isolated and testable. New BlogPostContent component encapsulates rendering logic while maintaining separation from data fetching (lib/posts.ts unchanged per FR-012). Component receives content: string[] prop and renders each paragraph with markdown-to-HTML conversion.

## Complexity Tracking

No constitution violations. Feature maintains all principles:
- Single markdown parser dependency justified and constrained (<50KB)
- Server-side rendering preserved
- Type safety maintained
- Component architecture followed
- No accessibility/performance risks identified
