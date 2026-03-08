# Quickstart: Dark Mode Switch

**Feature**: `001-dark-mode-switch`
**For**: Developers implementing or extending dark mode on this blog.

---

## How it works (30-second overview)

1. An inline `<script>` in `<head>` (layout.tsx) reads `localStorage` and adds `class="dark"` to `<html>` before any CSS is applied → no flash of unstyled content.
2. Tailwind CSS v4's `@custom-variant dark` activates `dark:` utility classes whenever `<html class="dark">`.
3. A `ThemeToggle` Client Component in the navbar toggles the class and writes the preference back to `localStorage`.

---

## Step-by-step implementation

### 1. Enable Tailwind dark mode variant

In `app/globals.css`, add immediately after the `@import`:

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

Then add dark-mode color overrides as needed, e.g.:

```css
/* Dark mode base colors */
html.dark body {
  background-color: #0a0a0a;
  color: #ededed;
}
```

Or use Tailwind `dark:` utilities directly in component JSX.

---

### 2. Add FOUC-prevention inline script to layout

In `app/layout.tsx`, add `suppressHydrationWarning` to `<html>` and inject the script into `<head>`:

```tsx
<html lang="de" suppressHydrationWarning>
  <head>
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
      }}
    />
  </head>
  <body ...>
```

> **Why `suppressHydrationWarning`?** The inline script sets the `dark` class before React hydrates. This creates an intentional server/client HTML mismatch that React would otherwise warn about.

---

### 3. Create ThemeToggle component

Create `components/ThemeToggle.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import type { ThemeToggleProps } from '@/lib/types'; // or inline the type

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  if (!mounted) return null; // Prevent SSR hydration mismatch

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
    setIsDark(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren'}
      className={`p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors ${className}`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
```

Sun and moon icons are inline SVGs (see final implementation). No icon library needed.

---

### 4. Add ThemeToggle to Navigation

In `components/Navigation.tsx`, import and place `ThemeToggle` in the desktop nav alongside the links, and in the mobile menu section.

---

### 5. Apply dark styles throughout

Use Tailwind `dark:` utilities in components, e.g.:

```tsx
// Before:
<nav className="bg-white border-neutral-100 text-neutral-900">

// After:
<nav className="bg-white dark:bg-neutral-950 border-neutral-100 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100">
```

Key surfaces to update:
- `Navigation.tsx` — background, border, link colors
- `app/layout.tsx` — footer background, border, text
- `app/globals.css` — `body` background/color
- `BlogCard.tsx` — card background, border, metadata text
- `BlogPostContent.tsx` — prose colors
- `BlogWithSidebar.tsx` — sidebar background

---

## Testing checklist

- [ ] Toggle switches from light → dark → light
- [ ] Reload page → last selected mode is restored (no flash)
- [ ] Open in a new tab → mode is restored from localStorage
- [ ] Disable localStorage in DevTools → page loads in light mode, no errors
- [ ] Tab order: toggle button is reachable by keyboard
- [ ] Screen reader: button announces "Dunkelmodus aktivieren" / "Hellmodus aktivieren"
- [ ] `npm run build` passes with no TypeScript errors

---

## File map

| File | Change |
|------|--------|
| `app/globals.css` | Add `@custom-variant dark`; add dark body colors |
| `app/layout.tsx` | Add `suppressHydrationWarning`, inline FOUC script |
| `components/ThemeToggle.tsx` | **NEW** — sun/moon toggle button |
| `components/Navigation.tsx` | Add `<ThemeToggle />` in desktop + mobile nav |
| All components | Add `dark:` Tailwind utilities to colors |
