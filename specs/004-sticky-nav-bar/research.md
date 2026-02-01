# Research: Sticky Navigation Bar

**Feature**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)  
**Date**: February 1, 2026

## Research Questions & Findings

### 1. CSS Fixed Positioning Best Practices

**Decision**: Use `position: fixed` with `top: 0` and `z-index`

**Rationale**:
- `position: fixed` keeps element fixed relative to viewport during scroll
- More performant than `position: sticky` for always-visible navigation
- Better browser support and predictable behavior across all scroll positions
- Requires height reservation in body to prevent content jump (using padding-top)

**Alternatives considered**:
- `position: sticky`: Considered but rejected because spec requires navigation to be "always visible" from initial load, not just after scrolling. Sticky would require the element to be in the flow initially.
- JavaScript scroll listeners: Rejected due to performance concerns and unnecessary complexity when CSS solves the requirement

**Implementation notes**:
- Apply `position: fixed; top: 0; left: 0; right: 0; width: 100%`
- Use `z-index: 50` (Tailwind's standard navigation z-index)
- Add equivalent padding-top to `<body>` or main content to prevent content hiding under nav
- Height should be explicit (e.g., `h-16` = 64px) to calculate padding offset

### 2. Transparency Implementation

**Decision**: Use `bg-white/50` (Tailwind opacity modifier syntax)

**Rationale**:
- Tailwind 4.x supports `/` opacity modifier: `bg-{color}/{opacity}`
- `bg-white/50` = 50% transparent white background
- CSS output: `background-color: rgb(255 255 255 / 0.5)`
- Maintains readability while showing underlying content
- No JavaScript required - pure CSS solution

**Alternatives considered**:
- `rgba()` notation: Functionally equivalent but Tailwind modifier syntax is more maintainable
- `backdrop-filter: blur()`: Considered for additional visual effect but rejected to maintain simplicity and browser compatibility

**Implementation notes**:
- Base color: `white` (matches existing site background)
- Opacity: 50% (`/50`)
- Full class: `bg-white/50`
- Ensure text color has sufficient contrast: use dark text (`text-gray-900` or `text-black`)

### 3. Active Page Indication

**Decision**: Use Next.js `usePathname()` hook with conditional styling

**Rationale**:
- `usePathname()` is the App Router way to get current route
- Allows dynamic class application based on current path
- Requires Client Component (`"use client"` directive)

**⚠️ CONSTITUTION IMPACT**: This creates a violation of Static-First principle

**Justification for Client Component**:
- Active state indication requires runtime path detection
- No static way to determine "current page" at build time for a shared component
- Minimal client-side JavaScript (only path detection, no state management)
- Performance impact negligible (tiny bundle size for pathname hook)

**Alternatives considered**:
- Server Component with path prop: Would require passing current path from every page → more coupling and maintenance burden
- CSS `:target` selector: Only works for hash fragments, not full routes
- No active state: Rejected per clarification requirement (Question 2 answer)

**Implementation notes**:
```typescript
'use client'
import { usePathname } from 'next/navigation'

const pathname = usePathname()
const isActive = pathname === '/about' // example
const className = isActive ? 'font-bold' : 'font-normal'
```

### 4. Responsive Horizontal Layout

**Decision**: Use Flexbox with text size scaling

**Rationale**:
- Flexbox handles alignment naturally: `justify-between` for left/right split
- Text can scale down on mobile using Tailwind responsive utilities
- All three links remain visible (per clarification #1)
- No hamburger menu needed (only 3 links = manageable on small screens)

**Alternatives considered**:
- Hamburger menu: Rejected per clarification answer - adds complexity
- Grid layout: Flexbox is simpler for two-section horizontal layout
- Absolute positioning: Flexbox is more maintainable

**Implementation notes**:
```tsx
<nav className="flex justify-between items-center">
  <div>{/* Left: brand link */}</div>
  <div className="flex gap-4">{/* Right: navigation links */}</div>
</nav>
```
- Mobile: Use `text-sm` or `text-xs` for smaller screens
- Desktop: Use `text-base` or `text-lg`
- Responsive classes: `text-sm md:text-base`

### 5. Accessibility Requirements

**Decision**: Use semantic HTML with ARIA labels where needed

**Rationale**:
- `<nav>` element provides semantic context
- `<a>` elements are inherently keyboard accessible
- Hover styles also applied to `:focus` for keyboard users
- Active state must be programmatically indicated (ARIA current page)

**Implementation notes**:
- Wrap navigation in `<nav aria-label="Primary navigation">`
- Use `<Link>` from Next.js (server-side routing, accessibility built-in)
- Add `aria-current="page"` to active link
- Ensure focus states: `focus:outline-none focus:ring-2 focus:ring-offset-2`
- Color contrast: Dark text on semi-transparent white must meet WCAG AA (4.5:1 ratio)

**Target compliance**:
- Lighthouse Accessibility score ≥95 ✓
- Keyboard navigation ✓
- Screen reader support ✓

### 6. Layout Shift Prevention

**Decision**: Reserve space with padding-top on main content

**Rationale**:
- Fixed navigation removes element from document flow
- Content would jump up if no space reserved
- Must maintain CLS (Cumulative Layout Shift) = 0

**Implementation notes**:
- Navigation height: 64px (`h-16`)
- Add `pt-16` to `<body>` or first `<main>` element
- Alternative: Use margin-top on main content wrapper
- Ensure height is consistent across all breakpoints

### 7. Next.js Link Component Best Practices

**Decision**: Use `next/link` for all navigation links

**Rationale**:
- Client-side navigation (faster page transitions)
- Prefetching on link hover (App Router default)
- No page reload required
- SEO-friendly (proper `<a>` tags in HTML)

**Implementation notes**:
```tsx
import Link from 'next/link'

<Link href="/" className="...">
  grobsizziert.de
</Link>
```
- All hrefs are relative paths: `/`, `/about`
- No `onClick` handlers needed (Link handles routing)
- Styling applied to Link component directly

### 8. TypeScript Interface Design

**Decision**: Create NavigationLink type and Navigation component props

**Rationale**:
- Type safety for link configuration
- Reusable link definition structure
- Explicit prop types for component

**Implementation notes**:
```typescript
interface NavigationLink {
  href: string
  label: string
}

interface NavigationProps {
  // Props interface (may be empty for this component)
  // Navigation data can be hardcoded in component
}
```

### 9. About Page Implementation

**Decision**: Create minimal placeholder with proper Next.js metadata

**Rationale**:
- Functional about page validates navigation completeness
- Placeholder allows future content without breaking links
- Follows existing page structure pattern

**Implementation notes**:
```tsx
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über | Grob skizziert',
  description: 'About page'
}

export default function AboutPage() {
  return (
    <main className="...">
      <h1>Über</h1>
      <p>About page content coming soon...</p>
    </main>
  )
}
```

### 10. Hover and Focus States

**Decision**: Combine hover and focus-visible with transition

**Rationale**:
- Visual feedback for both mouse and keyboard users
- Smooth transitions improve perceived performance
- Focus-visible avoids blue outline on mouse click

**Implementation notes**:
```tsx
className="transition-colors hover:text-gray-600 focus-visible:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
```
- Transition duration: 150ms (Tailwind default)
- Focus ring for keyboard users
- Hover color change for mouse users

## Technology Choices

### Required Stack (from constitution)
- ✅ Next.js 16.1.4 App Router
- ✅ React 19.2.3 (Server Components default, Client Component for pathname detection)
- ✅ TypeScript 5.x with strict mode
- ✅ Tailwind CSS 4.x for styling

### No New Dependencies Required
- ✅ All functionality achievable with existing stack
- ✅ No third-party navigation libraries needed
- ✅ No animation libraries needed (CSS transitions sufficient)

## Performance Considerations

**Bundle Impact**:
- Server Component: Zero client bundle (rendered at build time)
- Client Component pathname hook: ~1-2KB (minimal)
- CSS-only transparency: Zero runtime cost
- No JavaScript for scroll detection: Maximum performance

**Rendering Strategy**:
- Navigation rendered as part of root layout
- Same navigation instance used across all pages (shared layout)
- No per-page re-rendering of navigation

**Core Web Vitals Impact**:
- LCP (Largest Contentful Paint): Navigation is small element, won't affect LCP
- FID (First Input Delay): Minimal JS = fast interaction
- CLS (Cumulative Layout Shift): Zero if padding-top properly applied

## Security Considerations

**No security implications**:
- Static navigation links (no user input)
- No external data fetching
- No authentication/authorization logic
- Standard Next.js Link component (XSS protection built-in)

## Open Questions Resolved

All clarification questions from `/speckit.clarify` have been answered and integrated:
1. ✅ Mobile layout: Horizontal, all links visible
2. ✅ Active state: Visual indication required
3. ✅ About page: Create placeholder as part of feature
4. ✅ Base color: Use site's existing background/theme color (white)
5. ✅ Dual home links: Intentional design (brand vs. explicit navigation)

**No remaining unknowns requiring clarification.**
