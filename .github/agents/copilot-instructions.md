# my-blog Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-31

## Active Technologies
- TypeScript 5.x + Next.js 16.1.4, React 19.2.3, Tailwind CSS 4.x (004-sticky-nav-bar)
- Static markdown files (existing blog posts + new about page) (004-sticky-nav-bar)
- TypeScript 5.x (strict mode) + Next.js 16.x, React 19.x, Tailwind CSS 4.x — no new dependencies added (001-tags-filter)
- Markdown files in `lib/posts/` with YAML frontmatter (parsed by existing `gray-matter`) (001-tags-filter)
- TypeScript 5.x + Next.js 16.x, React 19.x, Tailwind CSS 4.x (no new deps) (001-dark-mode-switch)
- Browser `localStorage` (client-side only) (001-dark-mode-switch)

- TypeScript 5.x (strict mode) + Next.js 16.1.4, React 19.x, Tailwind CSS 4.x, gray-matter 4.0.3 (003-markdown-html-rendering)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.x (strict mode): Follow standard conventions

## Recent Changes
- 001-dark-mode-switch: Added TypeScript 5.x + Next.js 16.x, React 19.x, Tailwind CSS 4.x (no new deps)
- 001-tags-filter: Added TypeScript 5.x (strict mode) + Next.js 16.x, React 19.x, Tailwind CSS 4.x — no new dependencies added
- 004-sticky-nav-bar: Added TypeScript 5.x + Next.js 16.1.4, React 19.2.3, Tailwind CSS 4.x


<!-- MANUAL ADDITIONS START -->
## Custom Agent Instructions

### Static Website
Always keep in mind, that this is a static web project. Do not suggest any code that would require server-side rendering or dynamic runtime dependencies. Focus on client-side solutions that can be statically exported by Next.js.
The project is deployed on GitHub Pages, so all features must be implemented in a way that is compatible with static hosting.

### Test Driven Approach
Always prefer a test driven approach. If tests are not explicitly requested, suggest a minimal set of tests that can be implemented within the constraints of a static web project.

When suggesting code, ensure it adheres to the project's constitution principles: minimal dependencies, component-first architecture, static-first approach, type safety, and accessibility/performance best practices.
<!-- MANUAL ADDITIONS END -->
