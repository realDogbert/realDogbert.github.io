# Implementation Plan: Dark Mode Switch

**Branch**: `001-dark-mode-switch` | **Date**: 8. März 2026 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-dark-mode-switch/spec.md`

## Summary

Add a dark mode toggle to the static Next.js blog. A sun/moon icon in the `Navigation` bar lets users switch between light and dark design. The preference is persisted in `localStorage` and restored on every page load via an inline script injected into `<head>` before React hydration — preventing any flash of unstyled content. No new runtime dependencies are introduced. Tailwind CSS v4's `@custom-variant` directive enables the `dark:` utility class pattern.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 16.x, React 19.x, Tailwind CSS 4.x (no new deps)  
**Storage**: Browser `localStorage` (client-side only)  
**Testing**: N/A — no tests requested  
**Target Platform**: Web (static HTML/CSS/JS via Next.js `output: 'export'`)  
**Project Type**: Next.js App Router static site  
**Performance Goals**: Lighthouse Performance ≥90, Accessibility ≥95, Core Web Vitals pass  
**Constraints**: Zero new runtime dependencies; static export must remain intact  
**Scale/Scope**: Personal blog (~10 pages), affects all pages via shared layout

## Constitution Check

*GATE: evaluated after Phase 0 research*

**Required Checks** (based on my-blog constitution v1.0.0):

- [x] **Minimal Dependencies**: No new runtime dependencies. Tailwind `dark:` variants are zero-cost at runtime. ✅
- [x] **Component-First**: `ThemeToggle` is a self-contained Client Component with a typed props interface. ✅
- [x] **Static-First**: All pages remain statically generated. Theme switching is 100% client-side via DOM class + localStorage. ✅
- [x] **Type Safety**: `ThemeMode = 'light' | 'dark'` union type; no `any` used. ✅
- [x] **Accessibility & Performance**: Toggle button has ARIA label, keyboard-accessible. Inline script is tiny (<150 bytes). Lighthouse targets remain achievable. ✅

**Violations**: None.

## Project Structure

### Documentation (this feature)

```text
specs/001-dark-mode-switch/
├── plan.md        ← this file
├── research.md    ← Phase 0 output
├── data-model.md  ← Phase 1 output
├── quickstart.md  ← Phase 1 output
├── contracts/
│   └── theme.d.ts ← Phase 1 output
└── tasks.md       ← /speckit.tasks output (not created here)
```

### Source Code (repository root)

```text
app/
├── layout.tsx          # MODIFY: add suppressHydrationWarning, inline FOUC script
└── globals.css         # MODIFY: add @custom-variant dark, dark: color tokens
components/
├── Navigation.tsx      # MODIFY: add ThemeToggle to desktop + mobile nav
└── ThemeToggle.tsx     # NEW: sun/moon toggle button (Client Component)
```

**Structure Decision**: Minimal surface area. All dark-mode styling lives in `globals.css` and Tailwind `dark:` utilities inline in existing components. One new file created (`ThemeToggle.tsx`), two files modified (`layout.tsx`, `globals.css`), one file receives a minor UI addition (`Navigation.tsx`).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| Client Component (`ThemeToggle`) | User interaction (click) + localStorage access requires browser APIs | Server Component cannot access DOM or localStorage |
| `dangerouslySetInnerHTML` in `<head>` | FOUC prevention requires synchronous script before paint | `<Script strategy="beforeInteractive">` unreliable in static export; no other pattern achieves same effect |
| `suppressHydrationWarning` on `<html>` | Inline script adds `dark` class before hydration causing intentional server/client HTML mismatch | Cannot be avoided; this is the prescribed Next.js pattern for this use case |
