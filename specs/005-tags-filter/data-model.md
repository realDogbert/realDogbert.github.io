# Data Model: Tags Filter

**Feature**: `001-tags-filter`
**Date**: 7. März 2026

---

## Entities

### BlogPost (updated)

Existing entity extended with a `tags` field.

| Field | Type | Required | Constraints | Notes |
|---|---|---|---|---|
| `title` | `string` | ✅ | Non-empty | Post headline |
| `slug` | `string` | ✅ | Lowercase, hyphens only | URL identifier |
| `excerpt` | `string` | ✅ | Non-empty | Preview text |
| `content` | `string[]` | ✅ | Non-empty array | Post body paragraphs |
| `publishedAt` | `Date` | ✅ | Valid date | Publication date |
| `readTime` | `number` | ✅ | > 0 | Estimated minutes |
| `author` | `string` | ✅ | Non-empty | Author display name |
| `tags` | `string[]` | ✅ | **NEW** | Normalized to lowercase; empty array `[]` if no tags in frontmatter |

### Tag (derived value, not a stored entity)

Tags are not stored as independent entities. They are derived at build time from the `tags` fields across all posts.

| Attribute | Type | Description |
|---|---|---|
| `name` | `string` | Lowercase, trimmed tag string (e.g., `"docker"`, `"linux"`) |
| `postCount` | `number` | Number of posts carrying this tag (derived — used to enforce FR-007: no empty tags) |

---

## Normalization Rules

1. **Lowercase**: All tags converted to lowercase (`"Docker"` → `"docker"`)
2. **Trimmed**: Leading/trailing whitespace removed (`"  docker  "` → `"docker"`)
3. **Deduplication**: Two tags identical after normalization are a single tag
4. **Applied at**: Build time in `getAllPosts()` — not at render time

---

## Tag List Derivation (Client State)

The tag list shown on the homepage is derived from the loaded posts array — not fetched separately.

```
allTags = unique(flatten(posts.map(p => p.tags))).sort()
```

- **Source**: `posts: BlogPost[]` (passed from Server Component)
- **Dedup**: via `Set`
- **Sort**: alphabetical ascending (`Array.prototype.sort()`)
- **Memoized**: via `useMemo` to avoid recomputation on re-render

---

## Filter State Model

Owned by `TagFilteredPostList` client component.

| State | Type | Initial value | Description |
|---|---|---|---|
| `activeTag` | `string \| null` | `null` | Currently selected tag; `null` = no filter active |

### State Transitions

```
null  ──[user clicks tag]──→  "docker"
"docker"  ──[user clicks same tag]──→  null    (toggle off)
"docker"  ──[user clicks different tag]──→  "linux"  (replace)
"docker"  ──[user clicks "Alle Beiträge"]──→  null   (reset button)
```

---

## Frontmatter Schema (Markdown Posts)

```yaml
---
title: "Post Title"
author: "Author Name"
published: "2026-01-15"
excerpt: "Short description..."
slug: "post-slug"
tags: [docker, linux, german]   # NEW — optional; omit or leave empty for no tags
---
```

**Supported YAML formats for tags**:
```yaml
# Inline array (recommended)
tags: [docker, linux]

# Block sequence
tags:
  - docker
  - linux

# No tags (field absent — treated as empty array)
# (no tags field)
```

---

## Component Relationship

```
app/page.tsx (Server Component)
  └── getAllPosts() → BlogPost[]
  └── <TagFilteredPostList posts={posts} />

components/TagFilteredPostList.tsx ("use client")
  ├── props: { posts: BlogPost[] }
  ├── state: activeTag: string | null
  ├── derived: allTags: string[]       (useMemo)
  ├── derived: filteredPosts: BlogPost[] (useMemo)
  └── renders:
       ├── Tag filter bar (allTags → <button aria-pressed>)
       ├── "Alle Beiträge" reset button (visible when activeTag !== null)
       └── {filteredPosts.map(post => <BlogCard />)}
```
