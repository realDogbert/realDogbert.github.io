# Developer Quickstart: Sticky Navigation Bar

**Feature**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md) | **Research**: [research.md](research.md)  
**Date**: February 1, 2026

## Overview

This guide provides step-by-step instructions for implementing the sticky navigation bar feature. Follow these steps in order to ensure proper integration with the existing Next.js application.

## Prerequisites

✅ Next.js 16.1.4 App Router project  
✅ TypeScript 5.x with strict mode  
✅ Tailwind CSS 4.x configured  
✅ Existing project structure: `app/`, `components/`, `lib/`

## Implementation Steps

### Step 1: Add Type Definitions

**File**: `lib/types.ts`

Add the following interfaces to your types file:

```typescript
/**
 * Represents a navigation link in the site header
 */
export interface NavigationLink {
  href: string
  label: string
}

/**
 * Props for the Navigation component
 */
export interface NavigationProps {
  className?: string
}
```

**Verification**: Run `npm run build` to ensure no type errors

---

### Step 2: Create Navigation Component

**File**: `components/Navigation.tsx`

Create a new file with the following implementation:

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavigationLink } from '@/lib/types'

const BRAND_LINK: NavigationLink = {
  href: '/',
  label: 'grobsizziert.de'
}

const NAV_LINKS: NavigationLink[] = [
  { href: '/about', label: 'über' },
  { href: '/', label: 'alle posts' }
]

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (href: string): boolean => {
    // Home page: active if pathname is exactly '/'
    if (href === '/') {
      return pathname === '/'
    }
    // Other pages: active if pathname starts with href
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/50 h-16"
      aria-label="Primary navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Left: Brand link */}
          <Link
            href={BRAND_LINK.href}
            className={`text-base md:text-lg font-medium transition-colors hover:text-gray-600 focus-visible:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 ${
              isActive(BRAND_LINK.href) ? 'font-bold text-gray-900' : 'text-gray-700'
            }`}
            aria-current={isActive(BRAND_LINK.href) ? 'page' : undefined}
          >
            {BRAND_LINK.label}
          </Link>

          {/* Right: Navigation links */}
          <div className="flex gap-4 md:gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={`text-sm md:text-base transition-colors hover:text-gray-600 focus-visible:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 ${
                  isActive(link.href) ? 'font-bold text-gray-900' : 'text-gray-700'
                }`}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
```

**Key Implementation Details**:
- `'use client'` directive required for `usePathname()` hook
- Fixed positioning with `fixed top-0 left-0 right-0 z-50`
- 50% transparency via `bg-white/50`
- Height explicitly set to `h-16` (64px)
- Active state detection with `pathname === '/'` check
- ARIA attributes for accessibility (`aria-label`, `aria-current`)
- Responsive text sizing: `text-sm md:text-base`

**Verification**: 
```bash
# Check component compiles
npm run build
```

---

### Step 3: Update Root Layout

**File**: `app/layout.tsx`

Import and add the Navigation component to your root layout:

```typescript
import Navigation from '@/components/Navigation'
// ... other imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
```

**Critical Changes**:
1. Import `Navigation` component
2. Add `<Navigation />` before main content
3. Add `pt-16` to `<main>` to prevent content hiding under fixed nav
4. Ensure `<main>` wrapper exists (create if not present)

**Verification**:
```bash
npm run dev
# Navigate to http://localhost:3000
# Verify navigation appears at top
# Scroll down and verify navigation stays fixed
```

---

### Step 4: Create About Page

**File**: `app/about/page.tsx`

Create a new directory and file for the about page:

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über | Grob skizziert',
  description: 'Informationen über diesen Blog'
}

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Über</h1>
      <div className="prose prose-gray max-w-none">
        <p>
          About page content coming soon...
        </p>
      </div>
    </main>
  )
}
```

**Key Details**:
- Metadata follows existing pattern (title | site name)
- Layout matches existing page structure
- Content is placeholder (to be filled later)
- Uses Tailwind typography classes

**Verification**:
```bash
npm run dev
# Navigate to http://localhost:3000/about
# Verify page loads without errors
# Click "über" link in navigation
```

---

### Step 5: Verify Integration

Run through this complete verification checklist:

#### Visual Checks
- [ ] Navigation bar appears at top of all pages
- [ ] Navigation remains fixed when scrolling down
- [ ] Background is semi-transparent (can see content through it)
- [ ] Left section has "grobsizziert.de" link
- [ ] Right section has "über" and "alle posts" links
- [ ] All three links are visible on mobile viewport (no wrapping)

#### Functional Checks
- [ ] Clicking "grobsizziert.de" navigates to home page
- [ ] Clicking "über" navigates to about page
- [ ] Clicking "alle posts" navigates to home page
- [ ] Current page link appears bold (active state)
- [ ] Hover states show color change
- [ ] No content is hidden under navigation bar

#### Keyboard Navigation
- [ ] Tab key moves focus through all navigation links
- [ ] Enter key activates focused link
- [ ] Focus ring is visible on keyboard focus
- [ ] Focus states match hover states visually

#### Responsive Design
- [ ] Navigation looks good on mobile (< 640px)
- [ ] Navigation looks good on tablet (640px - 1024px)
- [ ] Navigation looks good on desktop (> 1024px)
- [ ] Text size adjusts appropriately for viewport

#### Accessibility
```bash
# Run Lighthouse audit
npm run build
npm run start
# Open Chrome DevTools → Lighthouse
# Run audit for all pages (/, /about, /[slug])
```
- [ ] Lighthouse Accessibility score ≥ 95
- [ ] No accessibility violations in DevTools
- [ ] Screen reader announces navigation correctly

#### Performance
- [ ] Lighthouse Performance score ≥ 90
- [ ] No layout shift when page loads (CLS = 0)
- [ ] Navigation renders immediately (no flash)
- [ ] Smooth transitions on hover/focus

---

## Testing Scenarios

### Scenario 1: Home Page Navigation
1. Navigate to `/`
2. Observe "grobsizziert.de" and "alle posts" are bold
3. Click "über" link
4. Should navigate to `/about`
5. Observe only "über" is bold

### Scenario 2: About Page Navigation
1. Navigate to `/about`
2. Observe only "über" is bold
3. Click "grobsizziert.de"
4. Should navigate to `/`
5. Observe "grobsizziert.de" and "alle posts" are bold

### Scenario 3: Blog Post Navigation
1. Navigate to any blog post (e.g., `/markdown-test`)
2. Observe no links are bold (not home, not about)
3. Navigation remains visible while scrolling
4. Click "alle posts"
5. Should navigate to `/` showing all posts

### Scenario 4: Scroll Behavior
1. Navigate to a long blog post
2. Scroll down multiple viewport heights
3. Verify navigation stays at top of viewport
4. Verify content is visible through transparent background
5. Verify navigation text remains readable

### Scenario 5: Mobile Responsive
1. Open DevTools → Device Toolbar
2. Select iPhone SE (375px width)
3. Verify all three links visible
4. Verify text is readable (not too small)
5. Verify spacing is appropriate
6. Tap each link to verify touch targets work

---

## Common Issues & Solutions

### Issue: Content Hidden Under Navigation
**Symptom**: Top of content is cut off by navigation bar

**Solution**: Ensure `pt-16` is applied to `<main>` element in layout:
```typescript
<main className="pt-16">
  {children}
</main>
```

### Issue: Navigation Not Fixed
**Symptom**: Navigation scrolls away with content

**Solution**: Verify `fixed top-0 left-0 right-0` classes on `<nav>` element

### Issue: Active State Not Working
**Symptom**: Current page link not bolded

**Solution**: Verify `'use client'` directive at top of Navigation.tsx

### Issue: Links Wrapping on Mobile
**Symptom**: Navigation links stack vertically on small screens

**Solution**: Reduce text size further or decrease gap:
```typescript
className="flex gap-2 md:gap-4" // Reduced gap
className="text-xs md:text-base" // Smaller mobile text
```

### Issue: Transparency Too Dark/Light
**Symptom**: Background not visible or text unreadable

**Solution**: Adjust opacity value in `bg-white/{value}`:
```typescript
bg-white/40  // Lighter (more transparent)
bg-white/60  // Darker (less transparent)
```

### Issue: Z-Index Conflict
**Symptom**: Navigation appears behind other elements

**Solution**: Increase z-index value:
```typescript
className="... z-50"  // Try z-[60] or z-[100] if needed
```

---

## Performance Optimization Tips

1. **Bundle Size**: Navigation is a Client Component (~1-2KB). Monitor bundle:
   ```bash
   npm run build
   # Check .next/analyze output for component size
   ```

2. **Rendering**: Navigation renders once in layout (not per-page)

3. **CSS**: All styles are Tailwind classes (no runtime CSS-in-JS)

4. **Images**: No images in navigation (pure text links)

5. **Fonts**: Uses existing Geist fonts (no additional font loading)

---

## Next Steps

After implementing the navigation bar:

1. **Content**: Update about page with actual content
2. **Styling**: Fine-tune colors/spacing to match site design
3. **Analytics**: Add tracking events for navigation clicks (if desired)
4. **Testing**: Run full Lighthouse audit on production build
5. **Deployment**: Deploy to production and verify across devices

---

## Reference Links

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Next.js Link Component](https://nextjs.org/docs/app/api-reference/components/link)
- [usePathname Hook](https://nextjs.org/docs/app/api-reference/functions/use-pathname)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [ARIA Current Attribute](https://www.w3.org/TR/wai-aria-1.2/#aria-current)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Support

If you encounter issues not covered in this guide:

1. Check research.md for technical decisions and alternatives
2. Review data-model.md for type definitions and structure
3. Verify constitution compliance in plan.md
4. Run TypeScript checks: `npm run build`
5. Run linter: `npm run lint`
