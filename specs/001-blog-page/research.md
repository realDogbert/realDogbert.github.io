# Research: Blog Page with Example Posts

**Feature**: 001-blog-page  
**Date**: 2026-01-25  
**Purpose**: Phase 0 research to resolve technical unknowns and establish implementation patterns

## Overview

This document consolidates research findings for implementing a minimalistic blog with Next.js 16 App Router, ensuring all technical decisions align with the my-blog constitution (v1.0.0) and best practices for static site generation.

## Research Areas

### 1. Next.js 16 App Router Static Generation Patterns

**Question**: How to implement fully static blog pages with Next.js 16 App Router?

**Decision**: Use Server Components with `generateStaticParams` for dynamic routes

**Rationale**:
- Next.js 16 App Router defaults to Server Components (no `"use client"` needed for static pages)
- `generateStaticParams` generates all `/[slug]` routes at build time
- No runtime overhead - pure static HTML/CSS/JS output
- Aligns with constitution's Static-First principle

**Implementation Pattern**:
```typescript
// app/[slug]/page.tsx
export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find(p => p.slug === params.slug);
  // Render post content
}
```

**Alternatives Considered**:
- Pages Router (`pages/` directory) - rejected: App Router is current Next.js standard
- Client-side rendering - rejected: violates Static-First principle, worse performance
- getStaticProps/getStaticPaths - rejected: Pages Router API, not available in App Router

**References**:
- Next.js 16 App Router documentation on static generation
- React Server Components specification

---

### 2. TypeScript Data Structure for Blog Posts

**Question**: What's the optimal TypeScript interface structure for blog posts with paragraph arrays?

**Decision**: Use interface with `content: string[]` for paragraph array

**Rationale**:
- Clean TypeScript structure with explicit types
- Easy to map over in React (`content.map((p, i) => <p key={i}>{p}</p>)`)
- No parsing overhead (no markdown library needed)
- Word count calculation straightforward (`content.join(' ').split(' ').length`)
- Aligns with Minimal Dependencies principle

**Implementation Pattern**:
```typescript
// lib/types.ts
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string[];  // Each element is one paragraph
  publishedAt: Date;
  readTime: number;   // Minutes
  author: string;
}

// lib/posts.ts
export const posts: BlogPost[] = [
  {
    title: "Getting Started with Next.js",
    slug: "getting-started-nextjs",
    excerpt: "Learn the fundamentals...",
    content: [
      "First paragraph content here...",
      "Second paragraph content here...",
      // 4-6 paragraphs total per spec clarification
    ],
    publishedAt: new Date('2026-01-20'),
    readTime: 5,
    author: "Blog Author"
  },
  // 2 more posts
];
```

**Alternatives Considered**:
- Single string with `\n\n` separators - rejected: requires runtime splitting, less explicit
- Markdown strings with parser - rejected: adds dependency (remark/markdown-it), violates Minimal Dependencies
- Rich content objects (bold/italic/links) - rejected: MVP spec only requires plain paragraphs

**References**:
- TypeScript handbook on interfaces
- React documentation on list rendering

---

### 3. Date Formatting Without External Libraries

**Question**: How to format dates in human-readable format without adding date libraries (moment.js, date-fns)?

**Decision**: Use native `Intl.DateTimeFormat` API

**Rationale**:
- Built into JavaScript (no dependencies)
- Locale-aware formatting
- Modern browser support (100% coverage)
- Lightweight and performant
- Aligns with Minimal Dependencies principle

**Implementation Pattern**:
```typescript
// lib/utils.ts
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Output: "January 25, 2026"
```

**Alternatives Considered**:
- date-fns library - rejected: adds ~14KB gzipped, violates Minimal Dependencies
- moment.js - rejected: large bundle size (~70KB), deprecated for new projects
- Manual string formatting - rejected: error-prone, doesn't handle locales

**References**:
- MDN Web Docs: Intl.DateTimeFormat
- Can I Use: Intl.DateTimeFormat browser support

---

### 4. Read Time Calculation Algorithm

**Question**: How to accurately calculate reading time from word count?

**Decision**: Use 200 words per minute standard, round up to nearest minute

**Rationale**:
- 200 WPM is industry standard (Medium, dev.to, WordPress use this)
- Simple calculation: `Math.ceil(wordCount / 200)`
- Rounding up ensures users never feel misled ("5 min read" taking 5:30)
- Matches spec assumption

**Implementation Pattern**:
```typescript
// lib/utils.ts
export function calculateReadTime(content: string[]): number {
  const text = content.join(' ');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}

// Usage in posts.ts (calculate at data definition time)
const content = ["paragraph 1...", "paragraph 2..."];
const post = {
  // ...
  content,
  readTime: calculateReadTime(content),
};
```

**Alternatives Considered**:
- 250 WPM (faster readers) - rejected: would underestimate time for average readers
- 180 WPM (slower readers) - rejected: too conservative, inflates estimates
- Character count based - rejected: less accurate than word count for English text

**References**:
- Medium's read time calculation methodology
- Research papers on average reading speeds

---

### 5. Responsive Card Layout with Tailwind CSS

**Question**: What Tailwind CSS grid/flexbox pattern works best for responsive post cards?

**Decision**: Use vertical stack (flexbox column) on all screen sizes for simplicity

**Rationale**:
- Single-column layout works on mobile (320px+), tablet, and desktop
- Avoids complex grid breakpoints
- Focuses attention on one post at a time
- Aligns with "minimalistic" design goal
- Better for readability (natural top-to-bottom scanning)

**Implementation Pattern**:
```typescript
// components/BlogCard.tsx
<div className="flex flex-col gap-8 max-w-2xl mx-auto">
  {posts.map(post => (
    <Link href={`/${post.slug}`} key={post.slug}>
      <article className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 
                         hover:border-zinc-300 dark:hover:border-zinc-700 
                         transition-colors cursor-pointer">
        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
        <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
          {formatDate(post.publishedAt)} · {post.readTime} min read
        </div>
        <p className="text-zinc-700 dark:text-zinc-300">{post.excerpt}</p>
      </article>
    </Link>
  ))}
</div>
```

**Alternatives Considered**:
- Multi-column grid on desktop (2-3 columns) - rejected: makes cards smaller, harder to scan excerpts
- CSS Grid with auto-fit - rejected: adds complexity, inconsistent card sizes
- Masonry layout - rejected: requires JavaScript or complex CSS, overkill for 3 posts

**References**:
- Tailwind CSS flexbox documentation
- UX research on card-based interfaces

---

### 6. Dark Mode Implementation

**Question**: How to implement dark mode using system preferences without JavaScript toggle?

**Decision**: Use Tailwind CSS `dark:` variant with `prefers-color-scheme` media query

**Rationale**:
- Tailwind has built-in dark mode support (no config needed)
- Respects user's OS/browser preference automatically
- No JavaScript required (pure CSS solution)
- No runtime overhead
- Aligns with Static-First and Minimal Dependencies principles

**Implementation Pattern**:
```typescript
// tailwind.config.ts (check if darkMode is set)
// Default is 'media' which uses prefers-color-scheme

// Component usage
<div className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
  <p className="text-zinc-700 dark:text-zinc-300">Content</p>
</div>
```

**Color Palette Decision**:
- Light mode: zinc-50 backgrounds, zinc-900/700 text
- Dark mode: zinc-900/950 backgrounds, zinc-50/300 text
- Maintains 4.5:1+ contrast ratio (WCAG AA compliant)

**Alternatives Considered**:
- Manual toggle button - rejected: adds UI complexity, requires Client Component for state
- Class-based dark mode (manual toggle) - rejected: spec requires system preference only
- Custom CSS variables - rejected: Tailwind's dark: variant is simpler and well-tested

**References**:
- Tailwind CSS dark mode documentation
- MDN: prefers-color-scheme

---

### 7. Accessibility Best Practices for Blog Cards

**Question**: What semantic HTML and ARIA patterns ensure blog cards are fully accessible?

**Decision**: Use `<article>` elements wrapped in `<Link>`, proper heading hierarchy, time elements

**Rationale**:
- `<article>` semantically represents self-contained blog post preview
- `<Link>` from Next.js provides proper anchor behavior
- `<h2>` for post titles (assuming page has `<h1>` for site title)
- `<time datetime>` for machine-readable dates
- No ARIA needed when semantic HTML is used correctly (ARIA First Rule: Don't use ARIA)

**Implementation Pattern**:
```typescript
// components/BlogCard.tsx
<Link href={`/${post.slug}`} className="block focus:outline-none focus:ring-2 
                                        focus:ring-zinc-400 rounded-lg">
  <article className="border ... hover:border-zinc-300 transition-colors">
    <h2 className="text-2xl font-semibold">{post.title}</h2>
    <div className="text-sm text-zinc-600 dark:text-zinc-400">
      <time dateTime={post.publishedAt.toISOString()}>
        {formatDate(post.publishedAt)}
      </time>
      <span aria-hidden="true"> · </span>
      <span>{post.readTime} min read</span>
    </div>
    <p>{post.excerpt}</p>
  </article>
</Link>
```

**Keyboard Navigation**:
- Card itself is not focusable (containing Link is)
- Tab focuses the Link, Enter/Space activates
- Visible focus ring with `focus:ring-2`

**Alternatives Considered**:
- `<div>` with `role="article"` - rejected: semantic HTML preferred over ARIA
- Button wrapping card - rejected: Links are for navigation, buttons for actions
- `aria-label` on cards - rejected: unnecessary when content is already descriptive

**References**:
- WebAIM: Semantic HTML guidelines
- ARIA Authoring Practices Guide: No ARIA is better than Bad ARIA

---

## Summary of Decisions

| Area | Decision | Key Benefit |
|------|----------|-------------|
| Static Generation | Server Components + generateStaticParams | Pure static HTML, zero runtime cost |
| Data Structure | `content: string[]` interface | No parsing overhead, type-safe |
| Date Formatting | Native Intl.DateTimeFormat | Zero dependencies, locale-aware |
| Read Time | 200 WPM standard, round up | Industry standard, user-friendly |
| Layout | Single-column flexbox | Responsive simplicity, better readability |
| Dark Mode | Tailwind dark: variant with prefers-color-scheme | No JavaScript, respects user preference |
| Accessibility | Semantic HTML (article, time, Link) | Standards-compliant, screen reader friendly |

## Constitution Alignment

✅ **Minimal Dependencies**: All solutions use built-in APIs (Intl, String methods) or existing stack (Tailwind, Next.js)  
✅ **Component-First**: Clear component boundaries (Header, BlogCard, BlogPostContent)  
✅ **Static-First**: 100% static generation with Server Components  
✅ **Type Safety**: Explicit TypeScript interfaces for all data structures  
✅ **Accessibility & Performance**: Semantic HTML, WCAG AA contrast, optimized for Lighthouse ≥90/≥95

## Next Phase

**Phase 1**: Generate data-model.md (entity relationships), contracts/ (type definitions), and quickstart.md (local development guide)