# Implementation Plan: Markdown-based Blog Posts

**Branch**: `002-markdown-posts` | **Date**: 2026-01-31 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/002-markdown-posts/spec.md`

**Note**: This plan documents an already-implemented feature for retroactive documentation purposes.

## Summary

Enhance the blog system to store posts as markdown files with YAML frontmatter instead of TypeScript arrays. Each post is a `.md` file in `lib/posts/` containing metadata (title, author, published date, excerpt, slug) in frontmatter and content as markdown. The system reads these files at build time using Node.js filesystem APIs and the gray-matter library for frontmatter parsing. This approach enables zero-code-change content updates and maintains static generation for optimal performance.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: Next.js 16.1.4, React 19.x, Tailwind CSS 4.x  
**New Dependency**: gray-matter 4.0.3 (YAML frontmatter parser, ~10 packages total)  
**Storage**: Markdown files in `lib/posts/` directory (static files)  
**Testing**: N/A (tests not requested)  
**Target Platform**: Web (static HTML/CSS/JS via Next.js build)  
**Project Type**: Next.js App Router static site with Server Components  
**Performance Goals**: Lighthouse Performance ≥90, Accessibility ≥95, Core Web Vitals pass  
**Constraints**: Minimal dependencies only, static-first approach, TypeScript strict mode, fail-fast validation  
**Scale/Scope**: Personal blog with 3-10 initial posts, scalable to hundreds of posts

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Required Checks** (based on my-blog constitution v1.0.0):

- [x] **Minimal Dependencies**: ✅ PASS - gray-matter justified (industry-standard frontmatter parser, 10 packages, minimal bundle impact ~15KB)
- [x] **Component-First**: ✅ PASS - No new components required; feature uses existing BlogCard and BlogPostContent components
- [x] **Static-First**: ✅ PASS - 100% static generation; markdown files read at build time using Node.js fs APIs
- [x] **Type Safety**: ✅ PASS - All types explicit (BlogPost interface unchanged, gray-matter typed via DefinitelyTyped)
- [x] **Accessibility & Performance**: ✅ PASS - No UI changes; maintains existing Lighthouse scores (Perf ≥90, A11y ≥95)

**Status**: All gates passed. No constitution violations.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
lib/
├── posts.ts                           # MODIFIED: Now reads from markdown files
├── posts/                             # NEW: Markdown files directory
│   ├── getting-started-nextjs-app-router.md
│   ├── power-of-typescript-modern-web.md
│   └── building-accessible-web-applications.md
├── types.ts                           # UNCHANGED: BlogPost interface
└── utils.ts                           # UNCHANGED: calculateReadTime, formatDate

app/
├── page.tsx                           # UNCHANGED: Uses getAllPosts()
└── [slug]/
    └── page.tsx                       # UNCHANGED: Uses getAllPosts()

components/
├── Header.tsx                         # UNCHANGED
├── BlogCard.tsx                       # UNCHANGED
└── BlogPostContent.tsx                # UNCHANGED

package.json                           # MODIFIED: Added gray-matter dependency
```

**Structure Decision**: Next.js App Router with markdown files in `lib/posts/`. No new components required; only modified `lib/posts.ts` to read from files instead of returning static array. Existing UI components and pages unchanged.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | No violations | All constitution principles satisfied |

---

## Phase 0: Research & Technology Decisions

**Status**: ✅ Complete (documented retroactively)

### Research Questions Answered

1. **How to parse YAML frontmatter from markdown files?**
   - **Decision**: Use gray-matter library (industry standard)
   - **Rationale**: Mature, well-tested, 11M+ weekly downloads, minimal footprint (~15KB)
   - **Alternatives Considered**: Manual parsing (too error-prone), remark-frontmatter (heavier dependency chain)

2. **Where to store markdown files?**
   - **Decision**: `lib/posts/` directory
   - **Rationale**: Keeps content close to data access layer, follows lib/ convention for utilities/data
   - **Alternatives Considered**: `content/posts/` (less conventional), root `/posts/` (clutters root)

3. **How to read files at build time?**
   - **Decision**: Node.js `fs` module (readdirSync, readFileSync)
   - **Rationale**: Built-in, zero dependencies, synchronous OK for build-time operations
   - **Alternatives Considered**: Async fs/promises (unnecessary for static generation)

4. **How to handle paragraph splitting?**
   - **Decision**: Split content by double newlines (`/\n\n+/`)
   - **Rationale**: Standard markdown convention, maintains existing paragraph array structure
   - **Alternatives Considered**: Full markdown-to-HTML parsing (overengineering for current needs)

5. **Validation strategy for missing/invalid data?**
   - **Decision**: Fail-fast validation (fail build on any error)
   - **Rationale**: Prevents broken posts in production, immediate feedback during development
   - **Alternatives Considered**: Silent skipping (risky), default values (masks problems)

### Technology Stack Decisions

- **Frontmatter Parser**: gray-matter 4.0.3
- **File I/O**: Node.js fs module (built-in)
- **Date Handling**: JavaScript Date constructor with validation
- **Content Processing**: String split with regex

**Research Output**: See [research.md](research.md) (to be created for full documentation)

---

## Phase 1: Design & Contracts

**Status**: ✅ Complete (documented retroactively)

### Data Model

**Entity**: BlogPost (UNCHANGED from existing implementation)

```typescript
interface BlogPost {
  slug: string;           // URL-safe identifier
  title: string;          // Post title
  excerpt: string;        // Short description
  content: string[];      // Array of paragraphs
  author: string;         // Author name
  publishedAt: Date;      // Publication date
  readTime: number;       // Estimated read time in minutes
}
```

**Entity**: Markdown File (NEW - physical file format)

```yaml
---
title: "Post Title"
author: "Author Name"
published: "YYYY-MM-DD"
excerpt: "Short description"
slug: "url-safe-slug"
---

Content paragraph one.

Content paragraph two.
```

**Data Flow**:
1. Build time: Next.js executes `lib/posts.ts`
2. `getAllPosts()` calls `fs.readdirSync('lib/posts')`
3. For each `.md` file: Read content → Parse with gray-matter → Extract frontmatter + content
4. Validate required fields → Convert published string to Date → Split content into paragraphs
5. Return BlogPost[] array sorted by publishedAt descending
6. Pages consume array (no changes to page components)

### API Contracts

**Internal API**: `lib/posts.ts`

```typescript
/**
 * Get all blog posts from markdown files
 * @returns Array of BlogPost objects sorted by published date (newest first)
 * @throws Error if markdown file missing required frontmatter fields
 * @throws Error if published date format invalid
 * @throws Error if duplicate slugs detected
 * @throws Error if file has no content
 */
export function getAllPosts(): BlogPost[];
```

**Validation Rules**:
- Required frontmatter: title, author, published, excerpt, slug
- Published format: YYYY-MM-DD (must parse to valid Date)
- Slug format: lowercase alphanumeric and hyphens only (validated via regex: `/^[a-z0-9-]+$/`)
- Content: Must contain at least one non-whitespace character
- Slugs: Must be unique across all files

**Error Handling**:
- Missing fields → Build fails with message: "Missing required frontmatter field '[field]' in [filename]"
- Invalid date → Build fails with message: "Invalid published date '[value]' in [filename]"
- Duplicate slugs → Build fails with message: "Duplicate slug '[slug]' found in: [file1], [file2]"
- Empty content → Build fails with message: "Empty content in [filename]"
- Invalid slug → Build fails with message: "Invalid slug '[slug]' in [filename] (use lowercase alphanumeric and hyphens only)"

### Quickstart Guide

**Adding a New Post** (for content authors):

1. Create new `.md` file in `lib/posts/` (e.g., `my-new-post.md`)
2. Add frontmatter header:
   ```yaml
   ---
   title: "Your Post Title"
   author: "Your Name"
   published: "2026-01-31"
   excerpt: "A short description of your post"
   slug: "my-new-post"
   ---
   ```
3. Write content below frontmatter (use blank lines to separate paragraphs)
4. Run `npm run build` to verify (build will fail if validation errors)
5. Post automatically appears on blog after successful build

**Design Output**: See [data-model.md](data-model.md) and [quickstart.md](quickstart.md) (to be created for full documentation)

---

## Phase 2: Implementation Tasks

**Status**: ✅ Complete (see [tasks.md](tasks.md) for detailed breakdown)

**High-Level Task Summary**:
1. ✅ Install gray-matter dependency
2. ✅ Create `lib/posts/` directory
3. ✅ Modify `lib/posts.ts` to read from markdown files
4. ✅ Add frontmatter validation logic
5. ✅ Create 3 initial markdown files with migrated content
6. ✅ Test build process and validation
7. ✅ Verify all pages render correctly

**Next Command**: Run `/speckit.tasks` to generate detailed task breakdown (if not already created)

---

## Implementation Notes

**What Changed**:
- `lib/posts.ts`: Replaced static array with file reading logic
- `package.json`: Added gray-matter dependency
- NEW: Created `lib/posts/` directory with 3 markdown files

**What Stayed the Same**:
- BlogPost interface (no changes)
- All UI components (Header, BlogCard, BlogPostContent)
- All page components (app/page.tsx, app/[slug]/page.tsx)
- Utility functions (formatDate, calculateReadTime)
- Build output (still 100% static HTML)

**Migration Path**:
- Original posts from TypeScript array → Converted to markdown files
- Frontmatter fields map directly to previous object properties
- Content array → Markdown paragraphs (separated by blank lines)

**Verification**:
- Build completes successfully: ✅
- All 3 posts render on homepage: ✅
- Individual post pages accessible: ✅
- Read time calculation works: ✅
- Date sorting correct (newest first): ✅
- Zero TypeScript errors: ✅

