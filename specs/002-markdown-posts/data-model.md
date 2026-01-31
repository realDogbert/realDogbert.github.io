# Data Model: Markdown-based Blog Posts

**Feature**: 002-markdown-posts  
**Date**: 2026-01-31  
**Status**: Complete (retroactive documentation)

## Entity Overview

This feature introduces **Markdown Files** as the source of truth for blog posts, while maintaining the existing **BlogPost** interface for application code.

---

## Entity 1: BlogPost (TypeScript Interface)

**Purpose**: Type-safe representation of a blog post used throughout the application

**Location**: `lib/types.ts`

**Definition**:
```typescript
export interface BlogPost {
  slug: string;           // URL-safe identifier for routing
  title: string;          // Display title
  excerpt: string;        // Short description for previews
  content: string[];      // Array of paragraphs
  author: string;         // Author name
  publishedAt: Date;      // Publication date (Date object)
  readTime: number;       // Estimated read time in minutes
}
```

### Fields

| Field | Type | Required | Validation | Description |
|-------|------|----------|------------|-------------|
| `slug` | `string` | ✅ Yes | `/^[a-z0-9-]+$/` | URL-safe identifier (lowercase alphanumeric + hyphens only) |
| `title` | `string` | ✅ Yes | Non-empty | Post title displayed in UI |
| `excerpt` | `string` | ✅ Yes | Non-empty | Short description for blog cards and previews |
| `content` | `string[]` | ✅ Yes | Non-empty array | Post content split into paragraphs |
| `author` | `string` | ✅ Yes | Non-empty | Author name displayed with post |
| `publishedAt` | `Date` | ✅ Yes | Valid Date object | Publication date for sorting and display |
| `readTime` | `number` | ✅ Yes | > 0 | Estimated reading time in minutes (calculated) |

### Relationships

- **Used by**: 
  - `app/page.tsx` (blog list page)
  - `app/[slug]/page.tsx` (individual post pages)
  - `components/BlogCard.tsx` (post preview cards)
  - `components/BlogPostContent.tsx` (post content renderer)

- **Created by**: `lib/posts.ts` → `getAllPosts()` function

- **Source**: Markdown files in `lib/posts/` directory (parsed at build time)

### Usage Example

```typescript
import { getAllPosts } from '@/lib/posts';

const posts: BlogPost[] = getAllPosts();
// [
//   {
//     slug: "getting-started-nextjs-app-router",
//     title: "Getting Started with Next.js App Router",
//     excerpt: "Learn the fundamentals...",
//     content: ["Paragraph 1...", "Paragraph 2..."],
//     author: "Jane Smith",
//     publishedAt: Date("2026-01-20"),
//     readTime: 4
//   },
//   ...
// ]
```

---

## Entity 2: Markdown File (Physical File)

**Purpose**: Source of truth for blog post data, edited by content authors

**Location**: `lib/posts/` directory

**Format**: Markdown with YAML frontmatter

**Naming Convention**: `{slug}.md` (filename should match slug for easy location)

### File Structure

```markdown
---
title: "Post Title Here"
author: "Author Name"
published: "YYYY-MM-DD"
excerpt: "Short description for previews and cards"
slug: "url-safe-slug"
---

First paragraph of content. This becomes content[0] in the BlogPost interface.

Second paragraph separated by blank line. This becomes content[1].

Third paragraph continues the post.
```

### Frontmatter Fields

| Field | Type | Required | Format | Example | Description |
|-------|------|----------|--------|---------|-------------|
| `title` | string | ✅ Yes | Any text | `"Getting Started with Next.js"` | Post title (mapped to BlogPost.title) |
| `author` | string | ✅ Yes | Any text | `"Jane Smith"` | Author name (mapped to BlogPost.author) |
| `published` | string | ✅ Yes | `YYYY-MM-DD` | `"2026-01-31"` | ISO date string (converted to BlogPost.publishedAt Date) |
| `excerpt` | string | ✅ Yes | Any text | `"Learn the fundamentals..."` | Short description (mapped to BlogPost.excerpt) |
| `slug` | string | ✅ Yes | `/^[a-z0-9-]+$/` | `"my-first-post"` | URL-safe identifier (mapped to BlogPost.slug) |

### Content Body

**Format**: Plain text with paragraph breaks

**Paragraph Separation**: Blank lines (double newlines `\n\n`)

**Processing**:
1. Content extracted by gray-matter (everything after frontmatter)
2. Trimmed of leading/trailing whitespace
3. Split by regex `/\n\n+/` (one or more blank lines)
4. Empty paragraphs filtered out
5. Resulting array becomes `BlogPost.content`

**Example**:
```markdown
---
frontmatter...
---

Paragraph one.

Paragraph two.


Paragraph three (extra blank lines OK).
```

Results in:
```typescript
content: [
  "Paragraph one.",
  "Paragraph two.",
  "Paragraph three (extra blank lines OK)."
]
```

---

## Data Flow

### Build Time Processing

```
┌─────────────────────┐
│  Markdown Files     │
│  lib/posts/*.md     │
└──────────┬──────────┘
           │
           │ Read by fs.readdirSync()
           ↓
┌─────────────────────┐
│  lib/posts.ts       │
│  getAllPosts()      │
└──────────┬──────────┘
           │
           │ Parse with gray-matter
           ↓
┌─────────────────────┐
│  { data, content }  │
│  Raw frontmatter    │
└──────────┬──────────┘
           │
           │ Validate & Transform
           │ - Check required fields
           │ - Convert date string → Date
           │ - Split content → string[]
           │ - Calculate readTime
           │ - Validate slug format
           │ - Check for duplicates
           ↓
┌─────────────────────┐
│  BlogPost[]         │
│  Sorted by date     │
└──────────┬──────────┘
           │
           │ Consumed by pages/components
           ↓
┌─────────────────────┐
│  Static HTML        │
│  next build output  │
└─────────────────────┘
```

### Validation Rules

**Enforced during parsing** (build fails if violated):

1. **Required Fields**: All 5 frontmatter fields must be present
   ```typescript
   if (!data.title || !data.author || !data.published || !data.excerpt || !data.slug) {
     throw new Error(`Missing required frontmatter field in ${fileName}`);
   }
   ```

2. **Date Format**: `published` must be valid ISO date
   ```typescript
   const date = new Date(data.published);
   if (isNaN(date.getTime())) {
     throw new Error(`Invalid published date in ${fileName}`);
   }
   ```

3. **Slug Format**: Only lowercase alphanumeric and hyphens
   ```typescript
   if (!/^[a-z0-9-]+$/.test(data.slug)) {
     throw new Error(`Invalid slug format in ${fileName}`);
   }
   ```

4. **Unique Slugs**: No duplicates across all files
   ```typescript
   const slugs = new Set();
   if (slugs.has(post.slug)) {
     throw new Error(`Duplicate slug: ${post.slug}`);
   }
   slugs.add(post.slug);
   ```

5. **Non-Empty Content**: File must have actual content
   ```typescript
   if (content.trim().length === 0) {
     throw new Error(`Empty content in ${fileName}`);
   }
   ```

---

## Calculated Fields

### readTime

**Source**: Calculated from `content` array

**Algorithm**: 200 words per minute (industry standard)

**Implementation** (from `lib/utils.ts`):
```typescript
export function calculateReadTime(content: string[]): number {
  const words = content.join(' ').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
```

**Example**:
- 800 words → 4 minutes
- 150 words → 1 minute (minimum)
- 1000 words → 5 minutes

---

## State Transitions

### Markdown File Lifecycle

```
┌─────────────┐
│  Non-exist  │
└──────┬──────┘
       │ Author creates file
       ↓
┌─────────────┐
│   Created   │  ← Contains frontmatter + content
└──────┬──────┘
       │ Build runs
       ↓
┌─────────────┐
│  Validated  │  ← Passes all validation rules
└──────┬──────┘
       │ Parsing succeeds
       ↓
┌─────────────┐
│  Published  │  ← Appears on blog as static HTML
└──────┬──────┘
       │ Author edits file
       ↓
┌─────────────┐
│   Modified  │  ← Content/frontmatter changed
└──────┬──────┘
       │ Rebuild required
       ↓
┌─────────────┐
│  Published  │  ← Changes reflected after build
└─────────────┘
```

**Note**: No "draft" or "unpublished" state in current implementation. All `.md` files in `lib/posts/` are published.

---

## Constraints & Invariants

### Invariants (Always True)

1. Every BlogPost in the system originated from a markdown file
2. Every markdown file in `lib/posts/` produces exactly one BlogPost (or build fails)
3. All BlogPost slugs are unique
4. All BlogPost dates are valid Date objects
5. BlogPost array is always sorted by publishedAt descending (newest first)

### Constraints (Enforced by Validation)

1. Slug must match regex: `/^[a-z0-9-]+$/`
2. Published must be parseable as ISO date (YYYY-MM-DD)
3. All required fields must be non-empty strings
4. Content must contain at least one paragraph
5. Files must have `.md` extension to be processed

---

## Database Schema (N/A)

**This feature uses file-based storage, not a database.**

All data is stored in markdown files and converted to BlogPost objects at build time. No runtime database queries or connections.

---

## Example Markdown Files

### Example 1: Technical Post

**File**: `lib/posts/getting-started-nextjs-app-router.md`

```markdown
---
title: "Getting Started with Next.js App Router"
author: "Jane Smith"
published: "2026-01-20"
excerpt: "Learn the fundamentals of Next.js 15 App Router and how to build modern React applications with server-side rendering."
slug: "getting-started-nextjs-app-router"
---

The Next.js App Router represents a significant shift in how we build React applications. Unlike the traditional Pages Router, the App Router embraces React Server Components by default.

Server Components allow you to render components on the server, reducing the JavaScript bundle sent to the client. This results in faster initial page loads and better performance.

Getting started is straightforward: create your routes in the app/ directory, with each folder representing a URL segment. A page.tsx file makes the route publicly accessible.

Layouts provide a way to share UI across multiple pages. The root app/layout.tsx wraps your entire application, perfect for global navigation and metadata.

Ready to dive deeper? Check out the official Next.js documentation and start building your first App Router application today!
```

### Example 2: Short Post

**File**: `lib/posts/power-of-typescript-modern-web.md`

```markdown
---
title: "The Power of TypeScript in Modern Web Development"
author: "John Doe"
published: "2026-01-15"
excerpt: "Discover why TypeScript has become essential for building scalable web applications and how it improves developer productivity."
slug: "power-of-typescript-modern-web"
---

TypeScript has revolutionized web development by bringing static typing to JavaScript. This seemingly simple addition provides enormous benefits for large-scale applications.

Type safety catches bugs at compile time rather than runtime. Instead of discovering errors in production, your editor highlights problems immediately as you type.

Refactoring becomes safer and more efficient. When you change an interface, TypeScript shows you every place that needs updating, preventing breaking changes from slipping through.

The developer experience improvements are substantial. Autocomplete, inline documentation, and intelligent code navigation make you more productive from day one.

Modern frameworks like Next.js, React, and Vue all have first-class TypeScript support. There's never been a better time to adopt TypeScript in your projects.

Whether you're starting a new project or migrating an existing one, TypeScript is worth the investment. Your future self will thank you for the improved maintainability and fewer runtime errors.
```

---

## Migration Guide

### Converting Static Array to Markdown Files

**Before** (`lib/posts.ts`):
```typescript
export const posts: BlogPost[] = [
  {
    slug: "my-post",
    title: "My Post",
    excerpt: "Description",
    content: ["Para 1", "Para 2"],
    author: "John Doe",
    publishedAt: new Date("2026-01-20"),
    readTime: 3
  }
];
```

**After** (`lib/posts/my-post.md`):
```markdown
---
title: "My Post"
author: "John Doe"
published: "2026-01-20"
excerpt: "Description"
slug: "my-post"
---

Para 1

Para 2
```

**Steps**:
1. Create `lib/posts/` directory
2. For each post in array, create `{slug}.md` file
3. Extract fields into frontmatter YAML
4. Join content array with `\n\n` for markdown body
5. Remove static array from `lib/posts.ts`
6. Implement file reading logic (see [plan.md](plan.md))

---

## API Contract

### getAllPosts()

**Signature**:
```typescript
function getAllPosts(): BlogPost[]
```

**Behavior**:
- Reads all `.md` files from `lib/posts/` directory
- Parses frontmatter and content using gray-matter
- Validates required fields and formats
- Converts `published` string to Date object
- Splits content into paragraph array
- Calculates readTime for each post
- Sorts by publishedAt descending (newest first)
- Returns array of BlogPost objects

**Errors**:
- Throws Error if required field missing
- Throws Error if date format invalid
- Throws Error if slug format invalid
- Throws Error if duplicate slugs found
- Throws Error if content empty

**Performance**: O(n) where n = number of markdown files

**Side Effects**: Reads filesystem (at build time only)

---

## Future Enhancements

### Potential Fields to Add

1. **tags**: `string[]` - Category tags for filtering
2. **coverImage**: `string` - Featured image path
3. **draft**: `boolean` - Hide unpublished posts
4. **updatedAt**: `string` - Last modification date
5. **description**: `string` - SEO meta description (separate from excerpt)

### Example Extended Frontmatter

```yaml
---
title: "My Post"
author: "John Doe"
published: "2026-01-31"
updatedAt: "2026-02-01"
excerpt: "Short preview text"
description: "SEO-optimized meta description"
slug: "my-post"
tags: ["nextjs", "typescript", "tutorial"]
coverImage: "/images/my-post-cover.jpg"
draft: false
---
```

---

## Conclusion

The data model maintains the existing BlogPost interface while adding markdown files as the source of truth. This approach:

- ✅ Preserves type safety (TypeScript interface unchanged)
- ✅ Enables zero-code-change content updates (just edit markdown)
- ✅ Maintains static generation (all processing at build time)
- ✅ Enforces data quality (fail-fast validation)
- ✅ Provides clear separation (content in files, logic in code)

**Full implementation details**: See [plan.md](plan.md) and [research.md](research.md)
