<!--
SYNC IMPACT REPORT
==================
Version Change: Template → 1.0.0
Initial Constitution Creation for my-blog project

Modified/Created Principles:
- I. Minimal Dependencies → New principle enforcing dependency minimalism
- II. Component-First Architecture → New principle for React component organization
- III. Static-First → New principle for static generation and build optimization
- IV. Type Safety → New principle for TypeScript usage patterns
- V. Accessibility & Performance → New principle for web standards

Added Sections:
- Technology Stack (Section 2) → Defines approved stack and constraints
- Development Workflow (Section 3) → Establishes feature development process

Templates Requiring Updates:
✅ plan-template.md - Constitution Check gates verified
✅ spec-template.md - Scope requirements aligned with static web principles
✅ tasks-template.md - Task categorization matches component-first approach

Follow-up TODOs: None

Deployment: Ready for production use
-->

# my-blog Constitution

## Core Principles

### I. Minimal Dependencies

Every new dependency MUST be justified and approved before addition. The project maintains
a lean dependency footprint focused on core functionality.

**Rules**:
- Dependencies limited to: Next.js framework, React runtime, TypeScript compiler, Tailwind
  CSS (styling), ESLint (linting)
- New runtime dependencies require explicit justification documenting: what problem it
  solves, why existing solutions insufficient, bundle size impact, maintenance status
- DevDependencies may be added for build/test/lint purposes but MUST NOT leak into
  production bundle
- Before adding any package, evaluate: Can this be implemented with existing tools? Can
  vanilla JS/TS solve this? What is the long-term maintenance cost?

**Rationale**: Minimal dependencies reduce bundle size, security surface area, maintenance
burden, and build complexity. Static web apps thrive on simplicity.

### II. Component-First Architecture

UI features MUST be built as self-contained React components with clear boundaries and
single responsibilities.

**Rules**:
- Each component lives in its own file under `app/` or dedicated `components/` directory
- Components MUST be independently understandable without traversing multiple files
- Props interfaces MUST be explicitly typed with TypeScript
- Component files include: interface definition, component implementation, default export
- No component should exceed 200 lines; split into smaller focused components if needed
- Shared components go in `components/`, page-specific components stay in `app/[page]/`

**Rationale**: Component isolation enables independent testing, reusability, easier
debugging, and clear mental models for feature development.

### III. Static-First

The project prioritizes static generation over runtime rendering. All pages MUST be
statically generated unless dynamic rendering is explicitly required and justified.

**Rules**:
- Default to static generation using Next.js App Router conventions
- Server Components preferred over Client Components unless interactivity required
- Client Components marked with `"use client"` directive only when necessary
- No runtime data fetching unless feature requires user-specific or real-time data
- Build output (`next build`) MUST be fully static HTML/CSS/JS for all non-dynamic routes
- Dynamic routes require explicit documentation of necessity in feature spec

**Rationale**: Static generation ensures maximum performance, zero server costs, global
CDN distribution, improved SEO, and eliminates runtime dependencies.

### IV. Type Safety

TypeScript MUST be used throughout the codebase. All functions, components, and data
structures MUST have explicit type annotations.

**Rules**:
- No `any` types except in strictly justified edge cases (document why in comments)
- All component props MUST have TypeScript interfaces or types
- All functions MUST have explicit return types
- Enable strict mode in `tsconfig.json` (`strict: true`)
- Type definitions for external data (APIs, content) MUST be maintained
- Build MUST fail on type errors (`next build` checks types)

**Rationale**: Type safety catches bugs at compile time, enables better IDE support,
serves as living documentation, and prevents runtime errors in production.

### V. Accessibility & Performance

Web standards for accessibility and performance MUST be met. The site MUST be usable by
all visitors regardless of device, ability, or connection speed.

**Rules**:
- Semantic HTML elements required (`<article>`, `<nav>`, `<main>`, etc.)
- All images MUST have meaningful `alt` attributes
- Color contrast ratios MUST meet WCAG AA standards (use Tailwind's default palette)
- Keyboard navigation MUST work for all interactive elements
- Lighthouse Performance score MUST be ≥90 on production builds
- Lighthouse Accessibility score MUST be ≥95
- Core Web Vitals MUST pass (LCP <2.5s, FID <100ms, CLS <0.1)
- Use Next.js Image component for automatic optimization

**Rationale**: Accessibility is a right, not a feature. Performance impacts user
experience, SEO, and conversion rates. Static sites have no excuse for poor metrics.

## Technology Stack

**Approved Stack** (as defined in package.json):

- **Framework**: Next.js 16.x (App Router)
- **Runtime**: React 19.x
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x with PostCSS
- **Linting**: ESLint 9.x with next config

**Constraints**:

- Node.js version MUST be ≥20 (specified in development documentation)
- Package manager: npm (lockfile: package-lock.json)
- No additional UI frameworks (no Material-UI, Ant Design, etc.)
- No CSS-in-JS libraries (styled-components, emotion) - use Tailwind only
- No state management libraries (Redux, MobX) unless global state need justified in spec
- Content MUST be statically sourced (markdown files, JSON, or static API calls at build)

**Rationale**: Stack constraints enforce consistency, prevent bloat, and maintain the
minimal dependency principle. The approved stack covers all requirements for a static
blog/content site.

## Development Workflow

**Feature Development Process**:

1. **Specification**: Create feature spec in `.specify/specs/[###-feature-name]/spec.md`
   using spec-template.md
2. **Planning**: Generate implementation plan using plan-template.md, verify Constitution
   Check gates
3. **Task Breakdown**: Create tasks.md from tasks-template.md with component-level
   granularity
4. **Implementation**: Develop features in priority order, commit frequently to feature
   branch
5. **Validation**: Run `npm run build` and `npm run lint` - both MUST pass before merge
6. **Review**: Self-review against constitution principles before considering complete

**Quality Gates** (all MUST pass):

- TypeScript compilation successful (`next build` completes)
- No ESLint errors or warnings
- No console errors/warnings in browser
- Lighthouse scores meet thresholds (Performance ≥90, Accessibility ≥95)
- Visual review on mobile and desktop viewports
- All pages load and navigate correctly

## Governance

This constitution supersedes all other development practices and guidelines. All feature
work, code reviews, and technical decisions MUST comply with these principles.

**Amendment Process**:

- Amendments require clear justification documenting why current principles inadequate
- Proposed changes MUST include impact analysis on existing codebase and templates
- Version bumped according to semantic versioning: MAJOR (principle removal/redefinition),
  MINOR (new principle/section), PATCH (clarifications/wording)
- After amendment, all templates in `.specify/templates/` MUST be updated for consistency

**Compliance**:

- Every feature implementation plan MUST include a "Constitution Check" section verifying
  alignment with principles
- Violations MUST be documented in plan's "Complexity Tracking" table with justification
- Runtime development guidance for AI agents/developers stored in
  `.specify/memory/guidance.md` (if created)
- Regular constitution reviews recommended when project scope significantly changes

**Version**: 1.0.0 | **Ratified**: 2026-01-25 | **Last Amended**: 2026-01-25
