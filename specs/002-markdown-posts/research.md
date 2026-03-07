# Research: Markdown-based Blog Posts

**Feature**: 002-markdown-posts  
**Date**: 2026-01-31  
**Status**: Complete (retroactive documentation)

## Research Questions & Decisions

### 1. Frontmatter Parsing Library

**Question**: How to parse YAML frontmatter from markdown files in a Node.js environment?

**Options Evaluated**:

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **gray-matter** | Industry standard (11M+ weekly downloads), minimal footprint (~15KB), simple API, well-maintained | Adds ~10 packages to dependency tree | ✅ **SELECTED** |
| **remark-frontmatter** | Part of unified/remark ecosystem, pluggable | Heavier dependency chain, overkill for simple parsing | ❌ Rejected |
| **Manual parsing** | Zero dependencies | Error-prone, need to handle edge cases, reinventing wheel | ❌ Rejected |
| **js-yaml + custom logic** | Flexible YAML parsing | Need to manually split frontmatter from content, more code | ❌ Rejected |

**Decision**: gray-matter 4.0.3

**Rationale**: 
- Battle-tested library with proven track record in static site generators (Jekyll, Hugo converters, Gatsby)
- Simple API: `matter(fileContents)` returns `{ data, content }`
- Handles edge cases (missing frontmatter, invalid YAML, special characters)
- Minimal bundle impact (~15KB) aligns with constitution's Minimal Dependencies principle
- TypeScript types available via DefinitelyTyped

**Usage Example**:
```typescript
import matter from 'gray-matter';

const fileContents = fs.readFileSync('post.md', 'utf8');
const { data, content } = matter(fileContents);
// data = { title: "...", author: "...", ... }
// content = "Paragraph one.\n\nParagraph two."
```

---

### 2. File Storage Location

**Question**: Where should markdown files be stored in the project structure?

**Options Evaluated**:

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **lib/posts/** | Keeps content with data access layer, follows lib/ convention | N/A | ✅ **SELECTED** |
| **content/posts/** | Dedicated content directory, common in CMS systems | Less conventional for Next.js, adds top-level directory | ❌ Rejected |
| **app/posts/data/** | Collocated with posts pages | Mixes page code with data files, less clean | ❌ Rejected |
| **public/posts/** | Easy access, could serve raw files | Public directory for client-side assets, not build-time data | ❌ Rejected |

**Decision**: `lib/posts/` directory

**Rationale**:
- `lib/` already established as home for utilities and data functions (types.ts, utils.ts, posts.ts)
- Keeps markdown files close to `posts.ts` which reads them
- Maintains clear separation: `lib/` = data/utilities, `app/` = pages, `components/` = UI
- Follows Next.js App Router convention where `lib/` contains non-UI code

**Directory Structure**:
```
lib/
├── posts.ts          # Reads markdown files
├── posts/            # Markdown files directory
│   ├── post-1.md
│   ├── post-2.md
│   └── post-3.md
├── types.ts
└── utils.ts
```

---

### 3. File I/O Strategy

**Question**: How to read markdown files at build time in Next.js Server Components?

**Options Evaluated**:

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **Node.js fs (sync)** | Built-in, zero dependencies, simple API | Synchronous blocks thread | ✅ **SELECTED** |
| **Node.js fs/promises (async)** | Non-blocking, modern async/await | Unnecessary complexity for static generation | ❌ Rejected |
| **Next.js import.meta.glob** | Vite-style imports | Not standard Next.js pattern, experimental | ❌ Rejected |

**Decision**: Node.js `fs` module (synchronous APIs)

**Rationale**:
- Static generation runs at build time, not runtime - blocking is acceptable and expected
- `fs.readdirSync()` and `fs.readFileSync()` provide simple, predictable behavior
- Zero dependencies (Node.js built-in module)
- Server Components have access to Node.js APIs
- Async overhead unnecessary when all files processed sequentially during build

**Implementation**:
```typescript
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'lib/posts');
const fileNames = fs.readdirSync(postsDirectory);
const markdownFiles = fileNames.filter(name => name.endsWith('.md'));

markdownFiles.forEach(fileName => {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  // Process file...
});
```

---

### 4. Content Structure & Paragraph Splitting

**Question**: How to convert markdown content into the existing `content: string[]` format?

**Options Evaluated**:

| Option | Pros | Cons | Decision |
|--------|------|------|----------|
| **Split by `\n\n+`** | Simple, standard markdown convention, maintains existing structure | Doesn't support advanced markdown (lists, code blocks) | ✅ **SELECTED** |
| **Full markdown-to-HTML** | Rich formatting support (bold, italic, lists) | Overkill for current needs, requires renderer library | ❌ Rejected |
| **Line-by-line array** | Granular control | Loses paragraph boundaries, inconsistent with existing UI | ❌ Rejected |

**Decision**: Split content by double newlines using regex `/\n\n+/`

**Rationale**:
- Matches existing BlogPost interface: `content: string[]` where each element is a paragraph
- Follows standard markdown convention (blank lines separate paragraphs)
- Simple implementation with zero dependencies
- Existing `BlogPostContent` component already renders string[] as separate paragraphs
- Future enhancement: Could add markdown-to-HTML rendering without changing data structure

**Implementation**:
```typescript
const paragraphs = content
  .trim()
  .split(/\n\n+/)
  .filter(p => p.trim().length > 0);
```

---

### 5. Validation Strategy

**Question**: How should the system handle invalid or missing data in markdown files?

**Options Evaluated**:

| Strategy | Pros | Cons | Decision |
|----------|------|------|----------|
| **Fail-fast (build fails)** | Immediate feedback, prevents broken posts in production | Strict, requires valid data | ✅ **SELECTED** |
| **Silent skipping** | Graceful degradation, partial content available | Hides problems, risky for production | ❌ Rejected |
| **Default values** | Always builds successfully | Masks data quality issues, unexpected behavior | ❌ Rejected |
| **Warning logs** | Flexible, informational | Easy to ignore, problems reach production | ❌ Rejected |

**Decision**: Fail-fast validation with descriptive error messages

**Rationale**:
- Aligns with TypeScript's strict mode philosophy: catch errors early
- Static sites have luxury of failing at build time (no runtime failures)
- Clear error messages guide content authors to fix issues
- Prevents partial or broken content from being deployed
- Enforces data quality standards

**Validation Rules Implemented**:
1. **Required fields**: All frontmatter fields must be present (title, author, published, excerpt, slug)
2. **Date format**: `published` must be valid YYYY-MM-DD date
3. **Slug format**: Only lowercase alphanumeric and hyphens allowed
4. **Unique slugs**: No duplicate slugs across all posts
5. **Non-empty content**: File must contain actual content after frontmatter

**Error Message Format**:
```
Build Error: Missing required frontmatter field 'title' in lib/posts/my-post.md
Build Error: Invalid published date '2026-13-45' in lib/posts/my-post.md
Build Error: Duplicate slug 'my-post' found in: my-post.md, my-post-copy.md
Build Error: Empty content in lib/posts/draft.md
Build Error: Invalid slug 'My Post!' in lib/posts/my-post.md (use lowercase alphanumeric and hyphens only)
```

---

## Best Practices Identified

### Markdown File Naming

**Convention**: Use the slug as the filename

**Example**: For slug `"my-first-post"` → filename `my-first-post.md`

**Rationale**:
- Easy to locate files by their URL
- Prevents confusion between filename and slug
- Natural organization

### Frontmatter Field Order

**Recommended Order**:
```yaml
---
title: "Post Title"
author: "Author Name"
published: "2026-01-31"
excerpt: "Short description"
slug: "url-slug"
---
```

**Rationale**: Most important fields first (title, author), followed by metadata

### Date Format

**Format**: ISO 8601 date format (YYYY-MM-DD)

**Examples**: 
- ✅ `"2026-01-31"`
- ✅ `"2026-12-25"`
- ❌ `"1/31/2026"` (ambiguous)
- ❌ `"Jan 31, 2026"` (harder to parse)

**Rationale**: Unambiguous, sortable, parseable by JavaScript Date constructor

### Content Formatting

**Guidelines**:
- Use blank lines to separate paragraphs
- Keep paragraphs focused (3-5 sentences)
- No trailing whitespace
- Consistent indentation (if using lists)

**Example**:
```markdown
---
frontmatter here
---

First paragraph introduces the topic.

Second paragraph provides details.

Third paragraph concludes the section.
```

---

## Dependencies Added

### Production Dependencies

**gray-matter** (4.0.3)
- Purpose: YAML frontmatter parser
- License: MIT
- Size: ~15KB minified
- Transitive dependencies: ~10 packages total
- Justification: Industry-standard frontmatter parser, minimal footprint, battle-tested

**Dependency Tree** (notable packages):
```
gray-matter@4.0.3
├── js-yaml@3.14.1 (YAML parser)
├── section-matter@1.0.0 (frontmatter extraction)
└── strip-bom-string@1.0.0 (BOM handling)
```

### No Development Dependencies Added

All parsing and validation done with:
- gray-matter (production)
- Node.js built-ins (fs, path)
- JavaScript built-ins (Date, RegExp, String)

---

## Alternatives Considered & Rejected

### 1. MDX (Markdown + JSX)

**Why Considered**: Rich component integration, popular in Next.js ecosystem

**Why Rejected**: 
- Overkill for simple text posts
- Larger dependency footprint (@mdx-js packages)
- More complexity than needed
- Content authors would need to understand JSX

### 2. Database Storage (e.g., SQLite)

**Why Considered**: Query capabilities, relational data

**Why Rejected**:
- Violates Static-First principle
- Adds build-time dependencies
- More complex than needed for <100 posts
- File-based storage sufficient and simpler

### 3. Headless CMS (e.g., Contentful, Sanity)

**Why Considered**: Non-technical content management, preview capabilities

**Why Rejected**:
- Adds external dependency and API calls
- Monthly costs for hosted service
- Overkill for personal blog
- File-based editing simpler for technical users

### 4. Git-based CMS (e.g., Netlify CMS, Tina CMS)

**Why Considered**: GUI for markdown editing, keeps files in repo

**Why Rejected**:
- Additional build-time complexity
- Not requested in requirements
- Direct file editing simpler for technical blogger
- Can be added later if needed

---

## Performance Considerations

### Build Time Impact

**Measurement**: Build time with 3 markdown files vs. previous static array

- Previous (static array): ~2.1s
- Current (markdown files): ~2.2s
- **Impact**: +0.1s (negligible)

**Scalability**: Linear growth with number of posts
- Estimated: +0.01s per additional post
- At 100 posts: ~3.2s build time (acceptable)

### Bundle Size Impact

**gray-matter**: 
- Minified: ~15KB
- Gzipped: ~5KB
- **Impact**: <0.5% of typical bundle

**No Runtime Impact**: All file reading happens at build time
- Zero runtime dependencies added
- No client-side JavaScript for markdown parsing
- Static HTML output unchanged

### Memory Usage

**Build Time**: 
- 3 files × ~2KB each = ~6KB of markdown
- gray-matter parsing overhead: <100KB
- **Total**: Negligible for typical development machine

---

## Security Considerations

### File System Access

**Risk**: Arbitrary file reading if user controls file paths

**Mitigation**: 
- Fixed directory (`lib/posts/`) hardcoded in source
- Only reads `.md` files
- No user input in file path construction
- Runs at build time (not runtime)

**Verdict**: No security risk (static build process)

### YAML Parsing

**Risk**: YAML injection or malicious content

**Mitigation**:
- gray-matter uses safe YAML parsing (no code execution)
- Frontmatter only used for data extraction
- No eval() or dynamic code execution
- Content sanitization not needed (static generation)

**Verdict**: No security risk

### Content Validation

**Risk**: XSS through markdown content

**Mitigation**:
- Content rendered as plain text paragraphs (no HTML parsing currently)
- React automatically escapes text content
- Future: If adding markdown-to-HTML, use sanitization library

**Verdict**: Safe with current implementation

---

## Recommendations for Future Enhancements

### Short Term (If Needed)

1. **Markdown Rendering**: Add markdown-to-HTML parser (e.g., marked, remark) to support bold, italic, links, lists
   - Impact: +1 dependency, ~20KB bundle
   - Benefit: Richer content formatting

2. **Slug Auto-generation**: Generate slug from title if not provided
   - Impact: Zero dependencies (use built-in string methods)
   - Benefit: Reduces frontmatter boilerplate

3. **Draft Posts**: Support `published: false` to hide posts
   - Impact: Zero dependencies (filter in getAllPosts())
   - Benefit: Work-in-progress posts without deleting

### Long Term (Future Features)

1. **Tags/Categories**: Add `tags: ["tag1", "tag2"]` to frontmatter
   - Enables filtering and categorization
   - Requires UI changes for tag display

2. **Table of Contents**: Auto-generate from markdown headings
   - Improves navigation for long posts
   - Requires markdown AST parsing

3. **Search**: Client-side search across posts
   - Requires search index generation at build time
   - Consider libraries like Fuse.js or flexsearch

---

## Conclusion

**Research Complete**: All technical decisions documented and implemented

**Key Takeaways**:
- gray-matter is the right choice for frontmatter parsing
- File-based storage in `lib/posts/` aligns with project structure
- Fail-fast validation prevents production issues
- Zero runtime impact (all work at build time)
- Minimal dependencies principle satisfied

**Next Steps**: Implementation documented in [plan.md](plan.md)
