# Data Model: Dark Mode Switch

**Feature**: `001-dark-mode-switch`
**Date**: 8. März 2026

---

## Entities

### ThemeMode

Represents the two possible display modes for the site.

| Field | Type | Values | Description |
|-------|------|--------|-------------|
| mode  | union | `'light'` \| `'dark'` | The active display mode |

**Validation rules**:
- Only `'light'` or `'dark'` are valid values. Any other value read from storage is treated as `'light'`.

---

### ThemePreference

Represents the user's persisted mode selection in the browser.

| Field | Storage Key | Type | Persisted |
|-------|-------------|------|-----------|
| theme | `'theme'`   | `'light'` \| `'dark'` \| `null` | `localStorage` |

**Lifecycle**:
1. **On page load** (inline script, synchronous): Read `localStorage.getItem('theme')`. If `'dark'`, add `class="dark"` to `<html>`. Otherwise, no class added (defaults to light).
2. **On user toggle** (ThemeToggle component): Toggle `document.documentElement.classList`, then write new value to `localStorage.setItem('theme', newMode)`.
3. **Storage unavailable** (e.g., private browsing): `try/catch` silently falls back to light mode; no preference is written.

---

### ThemeToggle (UI Element)

| Property | Type | Description |
|----------|------|-------------|
| isDark   | `boolean` | Current state read from `document.documentElement.classList.contains('dark')` after mount |
| mounted  | `boolean` | Guards against SSR/hydration mismatch; renders `null` until `useEffect` has run |

**State transitions**:
```
initial (SSR) → mounted=false → render null (no hydration mismatch)
          ↓
     useEffect runs → mounted=true, isDark=DOM state
          ↓
   user clicks → toggleClass + setLocalStorage + setIsDark
```

---

## Dark Color Palette

The following tokens define the intended dark-mode surface colors for consistent application across T005 and T010–T020.

| Token | Tailwind class | Hex | Usage |
|-------|---------------|-----|-------|
| Page background | `dark:bg-neutral-950` | `#0a0a0a` | `body` background |
| Elevated surface | `dark:bg-neutral-900` | `#171717` | Cards, sidebar |
| Border | `dark:border-neutral-800` | `#262626` | Nav border, card border |
| Nav/header bg | `dark:bg-neutral-950/85` | `#0a0a0ae0` | Sticky nav with blur |
| Primary text | `dark:text-neutral-100` | `#f5f5f5` | Body copy, headings |
| Secondary text | `dark:text-neutral-400` | `#a3a3a3` | Tagline, metadata, captions |
| Muted text | `dark:text-neutral-500` | `#737373` | Timestamps, secondary labels |
| Link/nav hover | `dark:hover:text-neutral-100` | `#f5f5f5` | Nav link hover state |
| Tag chip bg | `dark:bg-neutral-800` | `#262626` | Tag buttons |
| Tag chip text | `dark:text-neutral-300` | `#d4d4d4` | Tag button labels |
| Scrollbar thumb | `dark:#525252 neutral-600` | `#525252` | Custom scrollbar |

**Contrast verification required** (T026): all text/background pairs MUST meet WCAG AA (≥4.5:1 for body text, ≥3:1 for large text).

---

## Storage Schema

```
localStorage key: 'theme'
localStorage value: 'dark' | 'light' | (absent = default light)
```

**Notes**:
- Key is intentionally minimal to avoid conflicts with other potential keys.
- No expiry; persists indefinitely unless cleared by user.
- Each tab/window reads independently on load; switching in one tab does not immediately affect another (acceptable for a personal blog).
