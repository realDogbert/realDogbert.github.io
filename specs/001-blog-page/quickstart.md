# Quickstart Guide: Blog Page Development

**Feature**: 001-blog-page  
**Branch**: `001-blog-page`  
**Date**: 2026-01-25

## Prerequisites

- Node.js 20+ installed
- Git repository cloned
- On correct feature branch: `001-blog-page`

## Initial Setup

```bash
# Verify you're on the correct branch
git branch --show-current
# Should show: 001-blog-page

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:3000`

## Project Structure Overview

```
my-blog/
├── app/
│   ├── page.tsx            # Blog list (root route "/")
│   ├── [slug]/
│   │   └── page.tsx        # Individual post pages
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Site header with title
│   ├── BlogCard.tsx        # Post card for list view
│   └── BlogPostContent.tsx # Full post content renderer
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── posts.ts            # Static blog post data
│   └── utils.ts            # Utility functions
└── specs/001-blog-page/
    ├── spec.md             # Feature specification
    ├── plan.md             # This implementation plan
    ├── research.md         # Technical research
    ├── data-model.md       # Data structures
    ├── contracts/          # Type definitions
    └── quickstart.md       # This file
```

## Development Workflow

### 1. Create Type Definitions

**File**: `lib/types.ts`

```typescript
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  publishedAt: Date;
  readTime: number;
  author: string;
}

export interface BlogCardProps {
  post: BlogPost;
}

export interface BlogPostContentProps {
  post: BlogPost;
}
```

**Verify**:
```bash
npm run build
# Should compile without errors
```

### 2. Create Utility Functions

**File**: `lib/utils.ts`

```typescript
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function calculateReadTime(content: string[]): number {
  const text = content.join(' ');
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}
```

**Test Manually**:
```typescript
// In app/page.tsx or any component temporarily
import { formatDate, calculateReadTime } from '@/lib/utils';

console.log(formatDate(new Date('2026-01-25'))); 
// "January 25, 2026"

console.log(calculateReadTime(['Test paragraph with several words']));
// 1
```

### 3. Create Static Blog Post Data

**File**: `lib/posts.ts`

```typescript
import { BlogPost } from './types';
import { calculateReadTime } from './utils';

const content1 = [
  "Next.js has revolutionized the way we build React applications...",
  "The App Router, introduced in Next.js 13...",
  "Setting up a Next.js project is straightforward...",
  "Static site generation (SSG) is one of Next.js's most powerful features...",
  "Whether you're building a blog, documentation site, or marketing page..."
];

export const posts: BlogPost[] = [
  {
    title: "Getting Started with Next.js",
    slug: "getting-started-nextjs",
    excerpt: "Learn the fundamentals of Next.js 16 and build your first static site.",
    content: content1,
    publishedAt: new Date('2026-01-20'),
    readTime: calculateReadTime(content1),
    author: "Blog Author"
  },
  // Add 2 more posts following same pattern
].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
```

**Verify**:
```bash
npm run build
# Should compile and show 3 posts imported
```

### 4. Create Header Component

**File**: `components/Header.tsx`

```typescript
import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-2xl mx-auto px-6 py-6">
        <Link href="/" className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
          My Blog
        </Link>
      </div>
    </header>
  );
}
```

**Preview**:
- Import in `app/layout.tsx` or `app/page.tsx`
- Visit `http://localhost:3000`
- Should see "My Blog" header

### 5. Create BlogCard Component

**File**: `components/BlogCard.tsx`

```typescript
import Link from 'next/link';
import { BlogCardProps } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/${post.slug}`} className="block">
      <article className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900 dark:text-zinc-50">
          {post.title}
        </h2>
        <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
          <time dateTime={post.publishedAt.toISOString()}>
            {formatDate(post.publishedAt)}
          </time>
          <span aria-hidden="true"> · </span>
          <span>{post.readTime} min read</span>
        </div>
        <p className="text-zinc-700 dark:text-zinc-300">{post.excerpt}</p>
      </article>
    </Link>
  );
}
```

**Preview**:
- Use in `app/page.tsx`: `posts.map(post => <BlogCard key={post.slug} post={post} />)`
- Visit `http://localhost:3000`
- Should see 3 post cards

### 6. Create Blog List Page

**File**: `app/page.tsx`

```typescript
import { posts } from '@/lib/posts';
import BlogCard from '@/components/BlogCard';
import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">
          Latest Posts
        </h1>
        <div className="flex flex-col gap-8">
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
```

**Preview**:
- Visit `http://localhost:3000`
- Should see header, "Latest Posts" heading, and 3 post cards
- Cards should be clickable (links to `/[slug]`)

### 7. Create BlogPostContent Component

**File**: `components/BlogPostContent.tsx`

```typescript
import { BlogPostContentProps } from '@/lib/types';

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      {post.content.map((paragraph, index) => (
        <p key={index} className="mb-4 leading-relaxed">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
```

### 8. Create Individual Post Pages

**File**: `app/[slug]/page.tsx`

```typescript
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { posts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import BlogPostContent from '@/components/BlogPostContent';
import Header from '@/components/Header';

export async function generateStaticParams() {
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts.find(p => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 py-12">
        <Link 
          href="/" 
          className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-8 inline-block"
        >
          ← Back to all posts
        </Link>
        
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              {post.title}
            </h1>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              <time dateTime={post.publishedAt.toISOString()}>
                {formatDate(post.publishedAt)}
              </time>
              <span aria-hidden="true"> · </span>
              <span>{post.readTime} min read</span>
              <span aria-hidden="true"> · </span>
              <span>{post.author}</span>
            </div>
          </header>
          
          <BlogPostContent post={post} />
        </article>
      </main>
    </>
  );
}
```

**Preview**:
- Visit `http://localhost:3000`
- Click any post card
- Should navigate to `/[slug]` route
- Should show full post with back link

## Testing Checklist

### Functional Testing

- [ ] Blog list page shows 3 posts at `http://localhost:3000`
- [ ] Posts are ordered by date (newest first)
- [ ] Each card shows: title, date, read time, excerpt
- [ ] Clicking card navigates to post page
- [ ] Post page shows full content with paragraphs
- [ ] Back link returns to blog list
- [ ] Header "My Blog" link returns to home

### Responsive Testing

- [ ] Open DevTools, toggle device toolbar
- [ ] Test at 320px width (iPhone SE)
- [ ] Test at 768px width (tablet)
- [ ] Test at 1024px+ width (desktop)
- [ ] No horizontal scrolling on any size
- [ ] Text remains readable on all sizes

### Accessibility Testing

- [ ] Use keyboard only (Tab, Enter, Shift+Tab)
- [ ] All cards are focusable
- [ ] Focus indicators visible
- [ ] Enter key activates links
- [ ] Screen reader test (optional): use VoiceOver (Mac) or NVDA (Windows)

### Dark Mode Testing

- [ ] System Preferences → Change to Dark Mode
- [ ] Browser automatically switches to dark theme
- [ ] Text is readable (good contrast)
- [ ] Hover states work in dark mode
- [ ] Switch back to Light Mode and verify

### Build Testing

```bash
# Build for production
npm run build

# Should see output like:
# Route (app)                Size
# ┌ ○ /                      1.2 kB
# ├ ○ /[slug]                1.5 kB
# └ ○ /getting-started...    (etc)

# Start production server
npm run start

# Visit http://localhost:3000 and verify all works
```

## Common Issues & Solutions

### Issue: "Cannot find module '@/lib/types'"

**Solution**: 
- Verify `tsconfig.json` has `"paths": { "@/*": ["./*"] }`
- Restart TypeScript server: CMD+Shift+P → "TypeScript: Restart TS Server"

### Issue: Dark mode not working

**Solution**:
- Check `tailwind.config.ts` has `darkMode: 'media'` (or no darkMode key, default is 'media')
- Ensure all dark: classes are applied correctly
- Test with System Preferences dark mode toggle

### Issue: Build fails with "generateStaticParams is not defined"

**Solution**:
- Function must be named exactly `generateStaticParams` (not generateStaticPaths)
- Must be exported with `export async function generateStaticParams()`
- Must return array of `{ slug: string }` objects

### Issue: Post page shows 404

**Solution**:
- Verify slug in URL matches slug in `posts` array
- Check `posts.find()` logic in `app/[slug]/page.tsx`
- Rebuild: `npm run build` to regenerate static params

## Performance Validation

### Lighthouse Audit

```bash
# Build production version
npm run build
npm run start

# Open Chrome DevTools
# Lighthouse tab → Generate report

# Target scores:
# Performance: ≥90
# Accessibility: ≥95
# Best Practices: 100
# SEO: 100
```

### Expected Metrics

- **LCP** (Largest Contentful Paint): <1s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1
- **First Load JS**: <100kB

## Next Steps

Once all items in Testing Checklist pass:

1. Commit changes: `git add -A && git commit -m "feat: implement blog page with 3 example posts"`
2. Run final build: `npm run build && npm run lint`
3. Create pull request from `001-blog-page` to `main`
4. Deploy to Vercel/Netlify for production testing

## Development Commands Reference

```bash
# Development server
npm run dev

# Production build
npm run build

# Production server (after build)
npm run start

# Linting
npm run lint

# Type checking (manual)
npx tsc --noEmit

# Git status
git status
git diff
```

## Troubleshooting

If stuck, refer to:
- [spec.md](spec.md) - Feature requirements
- [data-model.md](data-model.md) - Data structures
- [research.md](research.md) - Technical decisions
- Next.js 16 documentation: https://nextjs.org/docs