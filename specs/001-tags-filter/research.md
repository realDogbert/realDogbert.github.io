# Research: Tags Filter

**Feature**: `001-tags-filter`
**Date**: 7. März 2026
**Status**: ✅ Complete — all unknowns resolved

---

## Research Question 1: Client-side filtering pattern in Next.js App Router (SSG)

**Context**: The spec requires client-side tag filtering on a statically generated homepage (no URL changes, no per-tag static pages).

**Decision**: Server Component passes serialized post data as props to a `"use client"` Client Component that owns filter state (`useState`).

**Rationale**:
- `app/page.tsx` stays a Server Component — all posts are fetched once at build time via `getAllPosts()`
- A new `TagFilteredPostList` Client Component receives `posts: BlogPost[]` as props and manages `activeTag: string | null` state
- The static HTML shipped to the browser contains all posts; JavaScript filters the rendered list in memory — zero network requests at filter time
- This is the canonical Next.js App Router pattern for "interactive but statically generated" features  
- Build output remains fully static (`next export` / `output: 'export'` compatible)

**Alternatives Considered**:
- **Dedicated `/tag/[tag]` static routes**: Rejected (spec FR-005 explicitly forbids URL changes and separate static pages per tag)
- **URL search params (`/?tag=javascript`)**: Rejected (spec FR-005: no URL changes)
- **Server Component with full page re-render**: Not applicable to static deployment

---

## Research Question 2: Server Component → Client Component serialization boundary

**Context**: `BlogPost.publishedAt` is a `Date` object. Client Components can only receive serializable props.

**Decision**: `Date` objects are supported by React's Server Component serialization layer and can be passed across the Server→Client boundary safely.

**Rationale**:
- React's RSC serialization protocol (used by Next.js App Router) supports `Date` objects natively — they are serialized to an internal format and reconstructed as `Date` instances in the Client Component
- No need to convert `publishedAt` to `string` or introduce a `SerializableBlogPost` type
- Verified against Next.js App Router documentation and React RFC for Server Components

**Alternatives Considered**:
- **Convert `publishedAt: Date` → `string`**: Would require updating `lib/types.ts`, `getAllPosts()`, `BlogCard.tsx`, and `BlogPostContent.tsx` — unnecessary scope expansion
- **Separate `SerializableBlogPost` type**: Adds type complexity with no benefit since `Date` is already supported

---

## Research Question 3: gray-matter array parsing for `tags` frontmatter field

**Context**: Need to read `tags` from markdown frontmatter. Authors may omit the field entirely on older posts.

**Decision**: Access `data.tags ?? []` after `matter()` parsing. Normalize immediately: `.map((t: string) => t.toLowerCase().trim())`.

**Rationale**:
- `gray-matter` parses YAML arrays (`tags: [docker, linux]` or `tags:\n  - docker\n  - linux`) into JavaScript `string[]` automatically
- When `tags` is absent from frontmatter, `data.tags` is `undefined` — `?? []` guards against this
- Normalizing (lowercase + trim) at read time in `getAllPosts()` means normalization happens once at build, not on every render

**YAML format recommendation** (document in quickstart.md):
```yaml
tags: [docker, linux, german]
# or equivalently:
tags:
  - docker
  - linux
  - german
```

---

## Research Question 4: Accessible tag filter button pattern

**Context**: Tag buttons must be keyboard-navigable and communicate filter state to assistive technologies.

**Decision**: Use `<button>` elements with `aria-pressed` attribute toggling between `"true"` and `"false"`.

**Rationale**:
- `aria-pressed` is the correct ARIA pattern for toggle buttons (WAI-ARIA 1.1)
- `<button>` provides native keyboard focus and activation (`Enter`, `Space`)
- Visual indicator (e.g., different background color, border, or ring) must accompany the ARIA state for sighted users
- "All posts" / "Alle anzeigen" reset button: a standard `<button>` with clear label; only visible when a filter is active

**Pattern**:
```tsx
<button
  aria-pressed={activeTag === tag}
  onClick={() => setActiveTag(tag === activeTag ? null : tag)}
>
  {tag}
</button>
```

**Alternatives Considered**:
- `<a href>` tags: Not appropriate — no page navigation occurs
- Checkboxes with labels: Appropriate for multi-select; overkill for single-tag filter
- Radio group: Appropriate pattern but more complex than simple toggle buttons for this use case

---

## Research Question 5: Tag deduplication, normalization, and sort strategy

**Context**: Tags come from multiple posts; duplicates and casing variants must produce a single tag.

**Decision**: Normalize at read time in `getAllPosts()` with `toLowerCase().trim()`; deduplicate with `Set`; sort alphabetically with `Array.prototype.sort()`.

**Implementation**:
```typescript
// In getAllPosts() — normalization at read time:
tags: (data.tags ?? []).map((t: string) => t.toLowerCase().trim()),

// In TagFilteredPostList — derive unique sorted tags from posts:
const allTags = useMemo(() => {
  const tagSet = new Set(posts.flatMap(p => p.tags));
  return Array.from(tagSet).sort();
}, [posts]);
```

**Rationale**:
- Normalizing at read time (server-side, once per build) is more efficient than normalizing on every render
- `Set` deduplication is O(n) and built-in — no library needed
- `Array.prototype.sort()` for alphabetical order uses locale-aware collation by default (sufficient for German/English tags)
- `useMemo` avoids recomputing the tag list on every re-render

---

## Technologies Finalized

| Decision | Choice | Rationale |
|---|---|---|
| Filter mechanism | Client-side `useState` in Client Component | Static-compatible, no new deps |
| Data boundary | Pass `posts: BlogPost[]` as props | Next.js RSC supports Date serialization |
| Tag normalization | `toLowerCase().trim()` at read time | Once per build, not per render |
| Tag dedup | `Set` | Built-in, no library needed |
| Tag sort | `Array.prototype.sort()` | Locale-aware, sufficient |
| Accessibility | `aria-pressed` on `<button>` | WAI-ARIA 1.1 standard |
| New dependencies | None | Everything achievable with React built-ins |

**Status**: ✅ All questions answered. No remaining unknowns.
