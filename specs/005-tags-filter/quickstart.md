# Quickstart: Tags Filter

**Feature**: `001-tags-filter` | **Branch**: `001-tags-filter`
**For**: Developers implementing this feature

---

## Overview

This feature adds tag-based filtering to the blog homepage. All filtering is client-side — the statically built page receives all posts at build time, and JavaScript handles showing/hiding posts based on the selected tag.

**Files changed**: `lib/types.ts`, `lib/posts.ts`, `app/page.tsx`, `components/TagFilteredPostList.tsx` (new), + all markdown posts in `lib/posts/`

---

## Step 1: Add tags to a post (frontmatter)

Open any file in `lib/posts/` and add a `tags:` field to the YAML frontmatter:

```yaml
---
title: "Post Title"
author: "Frank von Eitzen"
published: "2026-01-15"
excerpt: "Short description..."
slug: "post-slug"
tags: [docker, linux, german]
---
```

**Rules**:
- Tags are normalized to **lowercase** at read time — `Docker` and `docker` are the same tag.
- Tags are **trimmed** of whitespace.
- Posts with **no `tags:` field** are treated as having zero tags and will not appear when any filter is active.
- Both YAML formats are supported: `tags: [a, b, c]` and block sequences (`tags:\n  - a`).

---

## Step 2: Extend the BlogPost type

In `lib/types.ts`, add `tags` to the `BlogPost` interface:

```typescript
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  publishedAt: Date;
  readTime: number;
  author: string;
  tags: string[];   // NEW — normalized lowercase strings; [] if no tags
}
```

---

## Step 3: Read tags in getAllPosts()

In `lib/posts.ts`, update the `BlogPost` construction inside `getAllPosts()`:

```typescript
const post: BlogPost = {
  title: data.title,
  slug: data.slug,
  excerpt: data.excerpt,
  content: paragraphs,
  publishedAt: new Date(data.published),
  readTime: calculateReadTime(paragraphs),
  author: data.author,
  tags: (data.tags ?? []).map((t: string) => t.toLowerCase().trim()),  // NEW
};
```

---

## Step 4: Create TagFilteredPostList component

Create `components/TagFilteredPostList.tsx`:

```typescript
"use client";

import { useState, useMemo } from "react";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/types";

interface TagFilteredPostListProps {
  posts: BlogPost[];
}

export default function TagFilteredPostList({ posts }: TagFilteredPostListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).sort(),
    [posts]
  );

  const filteredPosts = useMemo(
    () => activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts,
    [posts, activeTag]
  );

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <>
      {/* Tag filter bar */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {allTags.map((tag) => (
            <button
              key={tag}
              aria-pressed={activeTag === tag}
              onClick={() => handleTagClick(tag)}
              className={
                activeTag === tag
                  ? "px-3 py-1 text-xs font-medium rounded-full bg-neutral-900 text-white"
                  : "px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }
            >
              {tag}
            </button>
          ))}
          {activeTag !== null && (
            <button
              onClick={() => setActiveTag(null)}
              className="px-3 py-1 text-xs font-medium rounded-full border border-neutral-300 text-neutral-500 hover:bg-neutral-50"
            >
              Alle Beiträge
            </button>
          )}
        </div>
      )}

      {/* Post list */}
      <div className="flex flex-col">
        {filteredPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </>
  );
}
```

---

## Step 5: Wire into the homepage

In `app/page.tsx`, replace the direct `posts.map(...)` with the new component:

```typescript
import Header from "@/components/Header";
import TagFilteredPostList from "@/components/TagFilteredPostList";
import { posts } from "@/lib/posts";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 pt-16 sm:pt-24 pb-12">
        <Header tagline="Wer nicht auf das Kleine schaut, scheitert am Großem." />

        <section>
          <h2 className="text-xs font-body font-semibold tracking-widest uppercase text-neutral-300 mb-2 animate-fade-in">
            Neueste Beiträge
          </h2>
          <TagFilteredPostList posts={posts} />
        </section>
      </div>
    </div>
  );
}
```

---

## Verification

```bash
# 1. TypeScript must compile clean
npm run build

# 2. No lint errors
npm run lint

# 3. Manual test in browser
npm run dev
# → Open http://localhost:3000
# → Verify tag buttons appear
# → Click a tag → only matching posts shown
# → Click same tag again → all posts shown
# → Click different tag → filter switches
# → Click "Alle Beiträge" → all posts shown, button disappears
```

---

## Accessibility Checklist

- [ ] All tag buttons focusable via `Tab`
- [ ] `Enter` / `Space` activates a focused button
- [ ] Active tag has `aria-pressed="true"`, inactive buttons `aria-pressed="false"`
- [ ] "Alle Beiträge" button has visible focus ring
- [ ] Lighthouse Accessibility ≥95 on production build
