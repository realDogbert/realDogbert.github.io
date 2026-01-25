# Data Model: Blog Page with Example Posts

**Feature**: 001-blog-page  
**Date**: 2026-01-25  
**Purpose**: Define data structures, relationships, and validation rules

## Overview

This document defines the data model for the blog feature, including entities, their properties, relationships, and TypeScript type definitions. All data is statically defined at build time (no database or runtime APIs).

## Entities

### BlogPost

Represents a single blog article with all content and metadata.

**Properties**:

| Property | Type | Required | Description | Validation Rules |
|----------|------|----------|-------------|------------------|
| `title` | `string` | Yes | Post headline | 1-100 characters, non-empty |
| `slug` | `string` | Yes | URL-friendly identifier | Lowercase, hyphens only, unique across all posts, matches `/^[a-z0-9]+(?:-[a-z0-9]+)*$/` |
| `excerpt` | `string` | Yes | Short preview text | 150-200 characters recommended |
| `content` | `string[]` | Yes | Full post body as paragraph array | 4-6 elements (per spec clarification), each element is one paragraph |
| `publishedAt` | `Date` | Yes | Publication date | Valid Date object, not in future |
| `readTime` | `number` | Yes | Estimated read time in minutes | Positive integer, calculated from word count |
| `author` | `string` | Yes | Post author name | Non-empty string, default: "Blog Author" |

**Relationships**: None (flat data structure, no references between posts)

**Derived Values**:
- `readTime`: Calculated from total word count in `content` array using `calculateReadTime()` utility
- Word count: `content.join(' ').split(/\s+/).length`

**Example Instance**:

```typescript
{
  title: "Getting Started with Next.js",
  slug: "getting-started-nextjs",
  excerpt: "Learn the fundamentals of Next.js 16 and build your first static site with the App Router. This guide covers everything from project setup to deployment.",
  content: [
    "Next.js has revolutionized the way we build React applications by providing a powerful framework with built-in optimizations and developer-friendly features.",
    "The App Router, introduced in Next.js 13 and refined in version 16, brings React Server Components to the forefront, enabling better performance and simpler data fetching patterns.",
    "Setting up a Next.js project is straightforward. With create-next-app, you can scaffold a new application in seconds and start building immediately.",
    "Static site generation (SSG) is one of Next.js's most powerful features. It pre-renders pages at build time, resulting in fast load times and excellent SEO.",
    "Whether you're building a blog, documentation site, or marketing page, Next.js provides the tools you need to create fast, accessible, and maintainable web applications."
  ],
  publishedAt: new Date('2026-01-20'),
  readTime: 5,
  author: "Blog Author"
}
```

## Data Flow

```
Static Data (lib/posts.ts)
         ↓
  BlogPost[] array
         ↓
    ┌─────────┴─────────┐
    ↓                   ↓
Root Page (/)     [slug]/page.tsx
    ↓                   ↓
BlogCard (map)    BlogPostContent
    ↓                   ↓
Display list      Display full post
```

**Build Time**:
1. `lib/posts.ts` exports `posts: BlogPost[]` array (3 posts defined statically)
2. `app/page.tsx` imports `posts` and maps to `<BlogCard>` components
3. `app/[slug]/page.tsx` uses `generateStaticParams()` to generate static pages for each slug
4. Next.js build creates static HTML for `/` and `/[slug]` routes

**Runtime**: No data fetching. All data embedded in static HTML at build time.

## Type Definitions

### Core Types

```typescript
// lib/types.ts

/**
 * Represents a single blog post with metadata and content
 */
export interface BlogPost {
  /** Post headline (1-100 characters) */
  title: string;
  
  /** URL-friendly identifier (lowercase, hyphens, unique) */
  slug: string;
  
  /** Short preview text (150-200 characters recommended) */
  excerpt: string;
  
  /** Full post body as array of paragraphs (4-6 paragraphs per spec) */
  content: string[];
  
  /** Publication date */
  publishedAt: Date;
  
  /** Estimated read time in minutes (calculated from word count) */
  readTime: number;
  
  /** Post author name */
  author: string;
}

/**
 * Props for BlogCard component
 */
export interface BlogCardProps {
  post: BlogPost;
}

/**
 * Props for BlogPostContent component
 */
export interface BlogPostContentProps {
  post: BlogPost;
}

/**
 * Props for dynamic post page
 */
export interface BlogPostPageProps {
  params: {
    slug: string;
  };
}
```

### Utility Function Signatures

```typescript
// lib/utils.ts

/**
 * Format Date object to human-readable string
 * @example formatDate(new Date('2026-01-25')) // "January 25, 2026"
 */
export function formatDate(date: Date): string;

/**
 * Calculate read time from paragraph array
 * Uses 200 words per minute standard, rounds up to nearest minute
 * @example calculateReadTime(["First para", "Second para"]) // 1
 */
export function calculateReadTime(content: string[]): number;
```

## Validation Rules

### At Data Definition Time (lib/posts.ts)

| Rule | Check | Error if Violated |
|------|-------|-------------------|
| Unique slugs | No duplicate `slug` values in `posts` array | Build error (TypeScript won't catch, but runtime will 404) |
| Non-empty titles | `title.length > 0` | Required by TypeScript |
| Valid dates | `publishedAt instanceof Date` and not invalid | Type system enforces |
| Content array length | `content.length >= 4 && content.length <= 6` | Spec guideline (not enforced) |
| Read time positive | `readTime > 0` | Spec requirement |

### At Build Time (Next.js)

| Rule | Check | Error if Violated |
|------|-------|-------------------|
| Slug route generation | `generateStaticParams()` returns valid slugs | Build fails if slug undefined |
| Post lookup | `posts.find(p => p.slug === params.slug)` succeeds | 404 page shown (handled by Next.js) |

### At Runtime (None)

No runtime validation required. All data is static and validated at build time.

## State Transitions

**Not applicable**: This is a static blog with no user interaction that modifies data. Posts are read-only.

## Data Storage

**Format**: TypeScript file (`lib/posts.ts`) exporting `const posts: BlogPost[]`

**Location**: `/lib/posts.ts` in repository root

**Persistence**: Version-controlled in git, no database or external storage

**Migration Path** (future): If blog grows beyond static definition:
1. Move to JSON file (`lib/posts.json`) for easier editing
2. Later: Add CMS (Contentful, Sanity) or markdown files with frontmatter
3. Later: Database (if dynamic features needed)

Current approach: Static TypeScript array (simplest, no dependencies, type-safe)

## Example Data Structure

```typescript
// lib/posts.ts

import { BlogPost } from './types';
import { calculateReadTime } from './utils';

export const posts: BlogPost[] = [
  // Post 1: Most recent
  {
    title: "Getting Started with Next.js",
    slug: "getting-started-nextjs",
    excerpt: "Learn the fundamentals of Next.js 16 and build your first static site with the App Router. This guide covers everything from project setup to deployment.",
    content: [
      "Next.js has revolutionized the way we build React applications...",
      "The App Router, introduced in Next.js 13 and refined in version 16...",
      "Setting up a Next.js project is straightforward...",
      "Static site generation (SSG) is one of Next.js's most powerful features...",
      "Whether you're building a blog, documentation site, or marketing page..."
    ],
    publishedAt: new Date('2026-01-20'),
    readTime: 5,
    author: "Blog Author"
  },
  
  // Post 2: Middle chronological position
  {
    title: "Understanding React Server Components",
    slug: "understanding-react-server-components",
    excerpt: "React Server Components represent a paradigm shift in how we think about React applications. Discover the benefits and learn when to use them.",
    content: [
      "React Server Components (RSC) are a new feature that fundamentally changes...",
      "Unlike traditional React components, Server Components run only on the server...",
      "The benefits of Server Components are substantial: smaller bundle sizes...",
      "When should you use Server Components versus Client Components?...",
      "Adopting Server Components in your Next.js application is straightforward..."
    ],
    publishedAt: new Date('2026-01-15'),
    readTime: 4,
    author: "Blog Author"
  },
  
  // Post 3: Oldest
  {
    title: "Building Accessible Web Applications",
    slug: "building-accessible-web-applications",
    excerpt: "Accessibility isn't optional—it's essential. Learn practical techniques for building web applications that everyone can use, regardless of ability.",
    content: [
      "Web accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites.",
      "Semantic HTML is the foundation of accessible web development. Using the correct elements for their intended purpose...",
      "ARIA (Accessible Rich Internet Applications) attributes provide additional information to assistive technologies...",
      "Keyboard navigation is crucial. Every interactive element should be accessible without a mouse...",
      "Testing for accessibility should be part of your development workflow. Use tools like Lighthouse, axe DevTools...",
      "By prioritizing accessibility from the start, you create better experiences for all users while ensuring compliance with WCAG standards."
    ],
    publishedAt: new Date('2026-01-10'),
    readTime: 6,
    author: "Blog Author"
  }
].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
// Sort by date descending (newest first) as required by FR-002
```

## Schema Evolution Strategy

**Current Version**: 1.0 (static array)

**Future Additions** (backward compatible):
- Add `tags: string[]` for categorization
- Add `coverImage?: string` for featured images
- Add `updatedAt?: Date` for tracking revisions
- Add `seo: { description: string, keywords: string[] }` for meta tags

**Breaking Changes** (require migration):
- Changing `content` from `string[]` to different format (e.g., markdown)
- Renaming core properties (`slug` → `id`)
- Changing date representation

**Strategy**: Keep current interface stable. New fields should be optional (`?`) to maintain backward compatibility.

## Compliance with Constitution

✅ **Minimal Dependencies**: Pure TypeScript data structure, no serialization libraries  
✅ **Type Safety**: Explicit `BlogPost` interface, all properties typed  
✅ **Static-First**: Data embedded at build time, no runtime fetching  
✅ **Component-First**: Data model separates concerns (data in lib/, components in components/)

## Next Steps

**Phase 1 Remaining**: Create contracts/ directory with exported type definitions and quickstart.md for local development