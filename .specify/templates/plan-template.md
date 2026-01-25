# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Next.js 16.x, React 19.x, Tailwind CSS 4.x  
**Storage**: Static files (markdown, JSON) or build-time data fetching  
**Testing**: [e.g., Vitest, Jest, Playwright or N/A - tests optional unless requested]  
**Target Platform**: Web (static HTML/CSS/JS via Next.js build)  
**Project Type**: Next.js App Router static site  
**Performance Goals**: Lighthouse Performance ≥90, Accessibility ≥95, Core Web Vitals pass  
**Constraints**: Minimal dependencies only, static-first approach, TypeScript strict mode  
**Scale/Scope**: [e.g., 10-50 pages, personal blog, documentation site, or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Required Checks** (based on my-blog constitution v1.0.0):

- [ ] **Minimal Dependencies**: Any new dependencies justified? Bundle impact assessed?
- [ ] **Component-First**: Components self-contained with TypeScript interfaces?
- [ ] **Static-First**: Static generation used unless dynamic requirement documented?
- [ ] **Type Safety**: All types explicit? No `any` without justification?
- [ ] **Accessibility & Performance**: Lighthouse targets achievable (Perf ≥90, A11y ≥95)?

**If any violations**: Document in "Complexity Tracking" section with rationale.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., app/blog, components/BlogCard). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Next.js App Router (DEFAULT for my-blog)
app/
├── [route]/
│   ├── page.tsx        # Page component (Server Component by default)
│   ├── layout.tsx      # Layout wrapper (optional)
│   └── loading.tsx     # Loading UI (optional)
components/              # Shared components
├── [ComponentName].tsx
└── [OtherComponent].tsx
lib/                     # Utilities and helpers
└── [utility].ts
public/                  # Static assets
└── [images]/

# [REMOVE IF UNUSED] Option 3: With tests (only if testing explicitly requested)
app/
components/
lib/
__tests__/
├── components/
├── integration/
└── e2e/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., New runtime dependency: lodash] | [specific use case] | [why vanilla JS insufficient] |
| [e.g., Client Component for static content] | [interactivity requirement] | [why Server Component won't work] |
| [e.g., Using `any` type in utils/parser.ts] | [external untyped API] | [why type inference insufficient] |
