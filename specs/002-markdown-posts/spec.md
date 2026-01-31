# Feature Specification: Markdown-based Blog Posts

**Feature Branch**: `002-markdown-posts`  
**Created**: 2026-01-31  
**Status**: Draft  
**Input**: User description: "As a blogger, I want that each post is saved as a markdown file. The markdown file has a frontmatter header that specifies the information for title, author, published, excerpt and title. The markdown files are stored in /lib/posts folder."

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Store Posts as Markdown Files (Priority: P1)

A blogger creates a new blog post by adding a markdown file to the `lib/posts` folder. The file includes frontmatter with metadata (title, author, published date, excerpt, slug) and the post content as markdown text. When the site builds, the post automatically appears on the blog.

**Why this priority**: This is the core functionality that enables content management without a database or CMS. It provides immediate value by allowing bloggers to write and publish posts using simple text files.

**Independent Test**: Create a new `.md` file in `lib/posts` with frontmatter and content, run build, verify the post appears on the blog homepage and has its own page.

**Acceptance Scenarios**:

1. **Given** I have a markdown file with frontmatter in `lib/posts`, **When** the site builds, **Then** the post appears in the blog post list
2. **Given** I have multiple markdown files in `lib/posts`, **When** the site builds, **Then** all posts appear sorted by published date (newest first)
3. **Given** a markdown file contains frontmatter fields (title, author, published, excerpt, slug), **When** the file is parsed, **Then** all metadata is correctly extracted and displayed

---

### User Story 2 - Write Content in Markdown Format (Priority: P2)

A blogger writes post content using markdown syntax (paragraphs, headings, lists, links, emphasis). The markdown is parsed and converted to HTML for display, preserving formatting and structure.

**Why this priority**: Markdown provides a clean writing experience with formatting capabilities. This enhances the P1 functionality by supporting rich content beyond plain text.

**Independent Test**: Create a post with markdown formatting (bold, italic, links, lists), verify formatting renders correctly on the post page.

**Acceptance Scenarios**:

1. **Given** post content contains multiple paragraphs separated by blank lines, **When** rendered, **Then** each paragraph is displayed as separate text blocks with appropriate spacing
2. **Given** post content includes markdown formatting, **When** rendered, **Then** formatting is preserved (bold, italic, links, lists work correctly)

---

### User Story 3 - Edit Posts by Modifying Files (Priority: P3)

A blogger edits an existing post by modifying its markdown file in `lib/posts`. After rebuilding the site, the changes are reflected on the published blog.

**Why this priority**: File-based editing enables simple content management using any text editor. This completes the content lifecycle (create, read, update).

**Independent Test**: Modify an existing post's title and content, rebuild, verify changes appear on the site.

**Acceptance Scenarios**:

1. **Given** I modify a post's frontmatter, **When** I rebuild the site, **Then** the updated metadata is displayed
2. **Given** I modify a post's content, **When** I rebuild the site, **Then** the updated content is displayed
3. **Given** I rename a post's slug in frontmatter, **When** I rebuild the site, **Then** the post is accessible at the new URL

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- **Missing frontmatter fields**: Build fails with clear error message identifying the file and missing fields (prevents broken posts in production)
- **Duplicate slugs**: Build fails with error listing all files that share the same slug value (prevents routing conflicts)
- **Invalid or future published dates**: Build fails on invalid dates (e.g., "2026-13-45"); future dates are allowed (post will appear after next build when date arrives)
- **Empty markdown files**: Build fails with error message for files with no content or only whitespace (prevents empty posts from being published)
- **Special characters in slugs**: Build fails if slug contains invalid URL characters; only lowercase alphanumeric characters and hyphens are allowed (ensures URL safety)

## Requirements *(mandatory)*

### Functional Requirements

**FR-001**: System must read all markdown files from the `lib/posts` directory at build time

**FR-002**: System must parse YAML frontmatter from markdown files using gray-matter library

**FR-003**: System must validate that required frontmatter fields exist (title, author, published, excerpt, slug)

**FR-004**: System must validate and convert the `published` string (YYYY-MM-DD format) to a Date object, failing the build if the date format is invalid; future dates are allowed

**FR-005**: System must split post content by double newlines (`\n\n`) to create paragraph arrays

**FR-006**: System must calculate estimated read time based on content length (200 words per minute)

**FR-007**: System must sort posts by published date in descending order (newest first)

**FR-008**: System must generate static pages for all posts using Next.js generateStaticParams

**FR-009**: System must fail the build with clear error messages when markdown files are missing required frontmatter fields, identifying the specific file and missing fields

**FR-010**: System must support all markdown syntax including paragraphs, headings, lists, links, bold, italic

**FR-011**: System must use filesystem operations (fs.readdirSync, fs.readFileSync) for file access

**FR-012**: System must validate that slugs from frontmatter are URL-safe (lowercase alphanumeric and hyphens only) and fail the build if invalid characters are detected

**FR-013**: System must detect duplicate slug values across all markdown files and fail the build with error listing all conflicting files

**FR-014**: System must validate that markdown files contain actual content (not empty or only whitespace) and fail the build with error message for empty files

### Non-Functional Requirements

**NFR-001**: Build process must complete successfully with all markdown files parsed (zero TypeScript errors)

**NFR-002**: Post list page must achieve Lighthouse performance score ≥90 for mobile, ≥95 for desktop

**NFR-003**: Individual post pages must pass Core Web Vitals (LCP <2.5s, FID <100ms, CLS <0.1)

**NFR-004**: System must require zero code changes to add new posts (only markdown file creation)

**NFR-005**: Markdown parsing must use minimal dependencies (gray-matter only, ~10 packages)

### Key Entities

- **BlogPost**: Represents a blog post with fields: slug (string), title (string), excerpt (string), content (string[]), author (string), publishedAt (Date), readTime (number)
- **Markdown File**: Physical .md file in lib/posts directory containing YAML frontmatter header and markdown content body

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Adding a new post requires zero code changes - only creating a `.md` file in `lib/posts`
- **SC-002**: Build completes with zero TypeScript compilation errors when processing markdown files
- **SC-003**: All five frontmatter fields (title, author, published, excerpt, slug) are correctly extracted and displayed
- **SC-004**: Posts are sorted by published date in descending order on the homepage
- **SC-005**: Read time calculation displays accurate estimates (±10% margin)
- **SC-006**: System adds only gray-matter as dependency (~10 packages total, minimal footprint)
- **SC-007**: Missing frontmatter fields produce clear error messages during build
- **SC-008**: All posts render as static HTML (no client-side JavaScript required for content display)
- **SC-009**: Lighthouse performance scores achieve ≥90 mobile, ≥95 desktop
- **SC-010**: TypeScript types (BlogPost interface) correctly represent all markdown-derived data

---

## Clarifications

### Session 2026-01-31

- Q: When a markdown file is missing required frontmatter fields (e.g., no title or slug), what should the system do? → A: Fail the build with a clear error message identifying the file and missing fields
- Q: When two posts have the same slug value in their frontmatter, how should the system handle this conflict? → A: Fail the build with error listing all duplicate slugs
- Q: How should the system handle published dates that are invalid (e.g., "2026-13-45") or set in the future? → A: Fail build on invalid dates; allow future dates (post appears after next build when date arrives)
- Q: How should the system handle empty markdown files (files with no content or only whitespace)? → A: Fail the build with error message for empty content
- Q: How should the system handle special characters in slugs (e.g., spaces, uppercase, special symbols like @, #, /, ?)? → A: Fail build if slug contains invalid URL characters (enforce lowercase alphanumeric and hyphens only)

