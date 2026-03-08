# Research: Dark Mode Switch

**Feature**: `001-dark-mode-switch`
**Date**: 8. März 2026
**Phase**: 0 — Pre-Design Research

---

## R-001: Tailwind CSS v4 Class-Based Dark Mode

**Decision**: Use `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`

**Rationale**: Tailwind CSS v4 uses a CSS-first configuration model. There is no `tailwind.config.js` `darkMode: 'class'` option. The `@custom-variant` directive registers the `dark:` variant to activate whenever `class="dark"` exists on any ancestor element (typically `<html>`).

**Implementation**:
```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

**Alternatives considered**:
- `prefers-color-scheme` media query (built-in default) — rejected because user must be able to override OS preference
- Third-party theme provider (next-themes) — rejected per constitution Minimal Dependencies principle

---

## R-002: FOUC Prevention on Static Sites

**Decision**: Inject an inline synchronous `<script>` via `dangerouslySetInnerHTML` in `<head>` in `app/layout.tsx`

**Rationale**: A parser-blocking inline script runs before the browser paints any content, so the `dark` class is applied to `<html>` before CSS is evaluated. This is the industry-standard pattern for static sites.

**Pattern**:
```ts
<script dangerouslySetInnerHTML={{ __html: `
  (function() {
    try {
      var t = localStorage.getItem('theme');
      if (t === 'dark') document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
`}} />
```

**Fallback**: If `localStorage` throws (private browsing, blocked storage), the `try/catch` silently falls back to light mode — aligned with FR-006.

**Alternatives considered**:
- `<Script strategy="beforeInteractive">` from `next/script` — rejected: unreliable timing in static export
- Cookie-based SSR approach — rejected: site is statically exported, no server rendering at runtime

---

## R-003: Theme Toggle Component Strategy

**Decision**: Single `ThemeToggle` Client Component in `components/ThemeToggle.tsx`. No Context/Provider.

**Rationale**: Since the CSS class on `<html>` drives all dark styling, the toggle only needs to (a) read current state from the DOM and (b) write to `localStorage` + toggle the class. No global React state propagation needed. This avoids adding any runtime dependency.

**`mounted` guard**: The component uses a `useEffect`-based `mounted` flag and renders `null` until hydrated, preventing hydration mismatch between server-rendered markup and client DOM state.

**Alternatives considered**:
- `next-themes` library — rejected: unnecessary dependency for this narrow use case
- React Context / `useContext` — rejected: over-engineering; DOM class is the single source of truth
- Storing state in URL query param — rejected: poor UX, affects SEO

---

## R-004: suppressHydrationWarning

**Decision**: Add `suppressHydrationWarning` only on the `<html>` element in `app/layout.tsx`

**Rationale**: The inline script modifies `document.documentElement.classList` before React hydrates. React detects this as a mismatch (server has no class, client has `dark` class). The attribute tells React to ignore this specific, intentional mismatch.

---

## R-005: Icon strategy

**Decision**: Use inline SVG icons (sun/moon) — no icon library

**Rationale**: Avoids any new dependency. Constitution prohibits new runtime dependencies without explicit justification. Two simple SVG icons are trivially inlined.

---

## Summary

| # | Unknown | Resolution |
|---|---------|-----------|
| R-001 | Tailwind v4 dark mode config | `@custom-variant dark (&:where(.dark, .dark *))` in globals.css |
| R-002 | FOUC prevention | Inline `<script>` via `dangerouslySetInnerHTML` in `<head>` |
| R-003 | Toggle component pattern | Single Client Component, no provider, DOM as source of truth |
| R-004 | Hydration warning | `suppressHydrationWarning` on `<html>` only |
| R-005 | Icons | Inline SVG only |
