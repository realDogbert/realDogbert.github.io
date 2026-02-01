# Data Model: Sticky Navigation Bar

**Feature**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md) | **Research**: [research.md](research.md)  
**Date**: February 1, 2026

## Overview

The sticky navigation bar feature involves minimal data modeling as it's primarily a UI component with static configuration. The data model focuses on TypeScript type definitions for navigation links and component props.

## Entities

### 1. NavigationLink

**Purpose**: Represents a single navigation link with its destination and display text

**Attributes**:
- `href`: `string` - The destination URL path (e.g., "/", "/about")
- `label`: `string` - The display text for the link (e.g., "grobsizziert.de", "über", "alle posts")

**Validation Rules**:
- `href` must be a valid relative path starting with `/`
- `label` must not be empty
- `label` should be concise (ideally ≤20 characters for mobile display)

**Usage Context**:
- Links are statically defined within the Navigation component
- No dynamic link generation required
- Three links total: home (brand), über, alle posts

**Example**:
```typescript
const links: NavigationLink[] = [
  { href: '/', label: 'grobsizziert.de' },
  { href: '/about', label: 'über' },
  { href: '/', label: 'alle posts' }
]
```

### 2. Navigation Component Props

**Purpose**: Type definition for the Navigation component props interface

**Attributes**:
- None required (navigation links are hardcoded in component)
- Alternative design: Could accept `className?: string` for custom styling

**Validation Rules**:
- N/A (no props passed to component)

**Usage Context**:
- Component instantiated in root layout without props: `<Navigation />`
- All configuration is internal to the component

**Example**:
```typescript
interface NavigationProps {
  // Empty interface - no props needed
  // Links are hardcoded per specification
}

// Alternative with optional className:
interface NavigationProps {
  className?: string // Optional additional CSS classes
}
```

### 3. Page Metadata (About Page)

**Purpose**: Type-safe metadata for the new about page

**Attributes**:
- `title`: `string` - Page title for browser tab and SEO
- `description`: `string` - Meta description for SEO

**Validation Rules**:
- `title` should include site name: "Über | Grob skizziert"
- `description` should be concise (50-160 characters for SEO)

**Usage Context**:
- Defined in `app/about/page.tsx` using Next.js Metadata type
- Follows existing pattern from other pages

**Example**:
```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über | Grob skizziert',
  description: 'Informationen über diesen Blog'
}
```

## Relationships

```
┌─────────────────────────┐
│   Root Layout           │
│   (app/layout.tsx)      │
└───────────┬─────────────┘
            │
            │ renders
            ▼
┌─────────────────────────┐
│   Navigation Component  │
│   (components/          │
│    Navigation.tsx)      │
└───────────┬─────────────┘
            │
            │ contains
            ▼
┌─────────────────────────┐
│   NavigationLink[]      │
│   (3 static links)      │
└─────────────────────────┘
            │
            │ links to
            ▼
┌─────────────────────────┐      ┌─────────────────────────┐
│   Home Page             │      │   About Page            │
│   (app/page.tsx)        │◄─────┤   (app/about/page.tsx)  │
└─────────────────────────┘      └─────────────────────────┘
```

**Navigation Component** → renders on all pages via root layout  
**NavigationLink[]** → static configuration within Navigation component  
**Home Page** → destination for two links (brand and "alle posts")  
**About Page** → destination for "über" link (new page)

## State Management

**No state management required**

- Navigation links are static (no CRUD operations)
- Active page detection via `usePathname()` hook (read-only)
- No user interactions that modify navigation structure
- No persistent storage needed

## Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│                     Browser Request                           │
└────────────────────────────────┬─────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────┐
│              Next.js Server (Build Time)                      │
│  - Renders root layout with Navigation component             │
│  - Generates static HTML with navigation links                │
└────────────────────────────────┬─────────────────────────────┘
                                 │
                                 ▼
┌──────────────────────────────────────────────────────────────┐
│               Client Browser (Runtime)                        │
│  - Hydrates Navigation as Client Component                   │
│  - usePathname() detects current route                       │
│  - Applies active state styling to matching link             │
│  - CSS handles hover/focus states                            │
└──────────────────────────────────────────────────────────────┘
```

**Build Time**: Navigation structure generated as static HTML  
**Runtime**: Pathname detection for active state only (minimal client JS)

## Type Definitions

### TypeScript Interfaces

```typescript
// lib/types.ts (additions)

/**
 * Represents a navigation link in the site header
 */
export interface NavigationLink {
  /** Relative URL path (e.g., "/", "/about") */
  href: string
  
  /** Display text for the link */
  label: string
}

/**
 * Props for the Navigation component
 * Currently empty as links are hardcoded
 */
export interface NavigationProps {
  /** Optional additional CSS classes for customization */
  className?: string
}
```

### Component Type Signatures

```typescript
// components/Navigation.tsx

import type { NavigationProps } from '@/lib/types'

/**
 * Sticky navigation bar component
 * Renders at top of viewport on all pages
 */
export default function Navigation(props: NavigationProps): JSX.Element
```

## Data Validation

**No runtime validation required**:
- Links are hardcoded (no user input or external data)
- TypeScript provides compile-time type checking
- Next.js validates href paths at build time

**Build-time checks**:
- TypeScript strict mode catches type errors
- Next.js Link component validates href format
- ESLint catches unused props or incorrect patterns

## Constraints

1. **Static Links**: Navigation links must be hardcoded (cannot be fetched or configured externally per constitution principle I - Minimal Dependencies)

2. **Three Links Only**: Per specification, exactly three links: "grobsizziert.de" (home), "über" (about), "alle posts" (home)

3. **No Link Management**: No add/edit/delete functionality for links (out of scope)

4. **Immutable Structure**: Left/right section structure is fixed (cannot be reconfigured)

5. **Single Instance**: Navigation component renders once in root layout (shared across all pages)

## Future Considerations

**Not in current scope** (document for potential future features):

1. **Configurable Links**: Could externalize link configuration to JSON/config file
2. **Nested Navigation**: Could support dropdown menus or sub-navigation
3. **Dynamic Links**: Could fetch links from CMS or database
4. **User Preferences**: Could allow hiding/showing certain links
5. **Internationalization**: Could support multiple languages for link labels

**Current scope is minimal** per specification requirements.
