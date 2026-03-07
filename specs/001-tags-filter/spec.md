# Feature Specification: Tags Filter

**Feature Branch**: `001-tags-filter`
**Created**: 7. März 2026
**Status**: Draft
**Input**: User description: "Ich möchte in den Posts meines Blogs Tags einführen und meinen Lesern die Möglichkeit geben nach den Tags zu filtern. Ich stelle es mir so vor, dass ich die Tags im Frontmatter Bereich meiner Posts eingebe und dem Benutzer auf der Homapage eine Liste aller Tags angezeigt wird. Wenn der Benutzer auf einen Tag klickt, dann werden nur noch die Posts mit diesem Tag angezeigt. Es muss auch eine Möglichkeit geben diesen Filter wieder zu entfernen. Die Webseite muss weiterhin statisch generiert werden können."

## Clarifications

### Session 2026-03-07

- Q: Wie soll der Tag-Filter technisch umgesetzt werden? → A: Client-seitiges Filtern per JavaScript (eine URL `/`, kein URL-Wechsel, kein dediziertes Static Routing pro Tag)
- Q: Können mehrere Tags gleichzeitig aktiv sein? → A: Nein — immer nur ein Tag aktiv; Klick auf neuen Tag ersetzt den vorherigen Filter
- Q: Wie werden Tags hinsichtlich Groß-/Kleinschreibung behandelt? → A: Case-insensitiv, normalisiert auf Kleinschreibung — „JavaScript" und „javascript" sind ein Tag
- Q: In welcher Reihenfolge werden Tags in der Tag-Liste angezeigt? → A: Alphabetisch aufsteigend (a → z)
- Q: Was passiert mit Posts ohne Tags wenn ein Filter aktiv ist? → A: Nicht angezeigt — nur Posts mit dem passenden Tag werden gezeigt

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Tags filtern (Priority: P1)

Als Leser möchte ich auf der Homepage eine Liste aller verfügbaren Tags sehen und durch Klick auf einen Tag nur die Posts angezeigt bekommen, die mit diesem Tag versehen sind.

**Why this priority**: Das Filtern nach Tags ist der zentrale Mehrwert für die Nutzer und ermöglicht gezielte Navigation zu interessanten Themen.

**Independent Test**: Kann getestet werden, indem ein Tag ausgewählt wird und nur passende Posts erscheinen.

**Acceptance Scenarios**:

1. **Given** die Homepage mit Tag-Liste, **When** der Nutzer klickt auf einen Tag, **Then** werden nur Posts mit diesem Tag angezeigt.
2. **Given** ein aktiver Tag-Filter, **When** der Nutzer klickt auf einen anderen Tag, **Then** wird der vorherige Filter ersetzt und nur Posts des neuen Tags werden angezeigt.
3. **Given** ein aktiver Tag-Filter, **When** der Nutzer klickt erneut auf den aktiven Tag, **Then** wird der Filter deaktiviert und alle Posts werden wieder angezeigt.

---

### User Story 2 - Tags im Frontmatter pflegen (Priority: P2)

Als Autor möchte ich jedem Blogpost im Frontmatter beliebig viele Tags zuweisen können, damit diese für die Filterung genutzt werden können.

**Why this priority**: Ohne gepflegte Tags im Frontmatter ist keine Filterung möglich.

**Independent Test**: Kann getestet werden, indem ein Post mit Tags versehen wird und diese auf der Homepage erscheinen.

**Acceptance Scenarios**:

1. **Given** ein neuer oder bestehender Post, **When** im Frontmatter werden Tags eingetragen, **Then** erscheinen diese Tags in der Tag-Liste auf der Homepage.

---

### User Story 3 - Filter entfernen (Priority: P3)

Als Leser möchte ich den aktiven Tag-Filter einfach wieder entfernen können, um wieder alle Posts zu sehen.

**Why this priority**: Erhöht die Usability und verhindert, dass Nutzer in einer gefilterten Ansicht "steckenbleiben".

**Independent Test**: Kann getestet werden, indem nach Auswahl eines Tags der Filter entfernt wird und alle Posts erscheinen.

**Acceptance Scenarios**:

1. **Given** ein aktiver Tag-Filter, **When** der Nutzer klickt auf "Alle Beiträge" oder erneut auf den aktiven Tag, **Then** werden alle Posts angezeigt und kein Tag ist mehr aktiv.

### Edge Cases

- Was passiert, wenn ein Tag keine Posts zugeordnet hat? (Tag wird nicht angezeigt — FR-007)
- Wie werden Posts ohne Tags behandelt? (Sichtbar ohne Filter; unsichtbar wenn Filter aktiv — FR-006)
- Was passiert, wenn mehrere Posts identische Tags haben? (Alle erscheinen beim Klick auf das Tag)
- Wie werden sehr viele Tags dargestellt? → CSS `flex-wrap` sorgt für automatischen Zeilenumbruch; kein horizontales Scrollen. Kein separates Task erforderlich (CSS-only-Lösung mit Tailwind `flex flex-wrap`).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow authors to assign one or more tags to each blog post via the Frontmatter.
- **FR-002**: System MUST extract all unique tags from all posts and display them as a list on the homepage.
- **FR-003**: System MUST allow users to filter posts by clicking on a tag in the tag list. Only one tag can be active at a time; clicking a new tag replaces the current filter.
- **FR-004**: System MUST provide a clear way to remove the active tag filter and show all posts again.
- **FR-005**: System MUST implement tag filtering entirely client-side using JavaScript on a single page (`/`), without generating separate static pages per tag and without URL changes when a filter is applied.
- **FR-006**: When no tag filter is active, system MUST show all posts regardless of whether they have tags. When a tag filter is active, system MUST show only posts that have the selected tag; posts without tags MUST NOT be shown.
- **FR-007**: System MUST not display tags that are not assigned to any post.
- **FR-008**: System MUST normalize all tags to lowercase; tags differing only in casing (e.g., "JavaScript" and "javascript") MUST be treated as a single tag.
- **FR-009**: System MUST display the tag list in alphabetical ascending order (a → z).

### Key Entities

- **Tag**: Ein Schlagwort, das im Frontmatter eines Posts gepflegt wird. Attribute: Name (string, normalisiert auf Kleinschreibung), zugeordnete Posts (Relation). Tags sind case-insensitiv: „JavaScript" und „javascript" werden als identischer Tag behandelt.
- **Post**: Ein Blogpost mit Attributen wie Titel, Inhalt, Datum, Tags (Liste von Tag-Namen).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Nutzer können auf der Homepage nach Tags filtern und erhalten ausschließlich passende Posts angezeigt.
- **SC-002**: Die Tag-Liste zeigt alle im Blog verwendeten Tags, aber keine "leeren" Tags.
- **SC-003**: Das Entfernen des Filters zeigt zuverlässig wieder alle Posts an.
- **SC-004**: Die Filterung erfolgt vollständig client-seitig per JavaScript auf einer einzigen URL (`/`); keine separaten statischen Seiten pro Tag, keine Serveranfragen beim Filtern.
- **SC-005**: Alle interaktiven Elemente (Tag-Buttons, Reset-Button) sind per Tastatur navigierbar und für Screenreader nutzbar — verifiziert durch Lighthouse Accessibility ≥95.
- **SC-006**: Die initiale Seitenladzeit beträgt unter 2 Sekunden (statisch ausgeliefert, gemessen ohne aktivierten Filter).
- **SC-007**: Es gibt keine TypeScript-Build-Fehler nach der Implementierung.
