 # Feature Specification: Dark Mode Switch

 **Feature Branch**: `001-dark-mode-switch`
 **Created**: 8. März 2026
 **Status**: Draft
 **Input**: User description: "Ich möchte die Website auch in einem Dunklen WebDesign anbieten. Dazu soll es im Header Icons geben, mit denen der Benutzer von Hell auf Dunkel und wieder zurück umschalten kann. Der Browser soll sich merken, welches Design der Benutzer das letzte mal eingestellt hatte und es automatisch wieder anwenden. Die Website wird immer noch statisch ausgeliefert."

 ## User Scenarios & Testing *(mandatory)*

 ### User Story 1 - Umschalten auf Dunkelmodus (Priority: P1)

 Als Benutzer möchte ich im Header ein Icon anklicken können, um das Design der Website von Hell auf Dunkel umzuschalten.

 **Why this priority**: Dies ist die Kernfunktion für Nutzer, die ein dunkles Design bevorzugen und sofortigen Mehrwert bietet.

 **Independent Test**: Kann vollständig getestet werden, indem ein Benutzer das Icon klickt und das Design wechselt.

 **Acceptance Scenarios**:

 1. **Given** die Website ist im Hellmodus, **When** der Benutzer klickt das Dunkelmodus-Icon, **Then** wird das Design auf Dunkel umgestellt.
 2. **Given** die Website ist im Dunkelmodus, **When** der Benutzer klickt das Hellmodus-Icon, **Then** wird das Design auf Hell umgestellt.

 ---

 ### User Story 2 - Speicherung der Designwahl (Priority: P2)

 Als Benutzer möchte ich, dass die Website sich meine letzte Designwahl merkt und beim nächsten Besuch automatisch das gewählte Design anzeigt.

 **Why this priority**: Erhöht die Nutzerzufriedenheit durch Personalisierung und Komfort.

 **Independent Test**: Kann getestet werden, indem das Design gewechselt und die Seite neu geladen wird; das gewählte Design bleibt erhalten.

 **Acceptance Scenarios**:

 1. **Given** ein Benutzer hat Dunkelmodus gewählt, **When** die Seite wird neu geladen oder erneut besucht, **Then** bleibt das Design im Dunkelmodus.
 2. **Given** ein Benutzer hat Hellmodus gewählt, **When** die Seite wird neu geladen oder erneut besucht, **Then** bleibt das Design im Hellmodus.

 ---

 ### User Story 3 - Statische Auslieferung (Priority: P3)

 Als Betreiber möchte ich, dass die Website weiterhin statisch ausgeliefert wird und keine serverseitige Speicherung der Designwahl erfolgt.

 **Why this priority**: Sicherstellung der Performance und Einfachheit durch statische Auslieferung.

 **Independent Test**: Kann getestet werden, indem überprüft wird, dass keine serverseitigen Requests für die Designwahl erfolgen.

 **Acceptance Scenarios**:

 1. **Given** ein Benutzer wechselt das Design, **When** die Seite wird neu geladen, **Then** erfolgt keine serverseitige Speicherung oder Abfrage.

 ---

 ### Edge Cases

 - Was passiert, wenn der Browser keine Speicherung (z.B. LocalStorage) erlaubt?
   - Das System wechselt in den Hellmodus und speichert keine Präferenz.
 - Wie verhält sich das Umschalten, wenn JavaScript deaktiviert ist?
   - **Out of scope** — die gesamte Website setzt JavaScript voraus; ohne JS ist kein Toggle möglich und die Seite wird im Hellmodus (Default) angezeigt.
 - Was passiert, wenn mehrere Benutzer denselben Computer nutzen?
   - **Accepted limitation** — LocalStorage ist pro Browser-Profil. Jedes OS-Benutzerprofil hat eigenen Storage und damit eine unabhängige Designwahl.

 ## Requirements *(mandatory)*

 ### Functional Requirements

 - **FR-001**: System MUST allow users to switch between light and dark mode via icons in the navigation bar (`Navigation.tsx` — the sticky top nav, NOT the page-title `Header.tsx` component).
 - **FR-002**: System MUST persist the user's last selected design mode in the browser (e.g., LocalStorage).
 - **FR-003**: System MUST automatically apply the last selected design mode on page load.
 - **FR-004**: System MUST NOT use server-side storage for design mode preference.
 - **FR-005**: System MUST provide clear visual feedback when switching modes. Satisfied by icon swap (sun↔moon) and instant CSS class change on `<html>`.
 - **FR-006**: System MUST handle cases where browser storage is unavailable by defaulting to light mode silently.
 - **FR-007**: System MUST ensure accessibility for mode switch icons (keyboard, screen reader).

 ### Key Entities

 - **Design Mode Preference**: Represents the user's selected mode (light/dark), stored in the browser.
 - **Mode Switch Icon**: Interactive element in the header for toggling design mode.

 ## Success Criteria *(mandatory)*

 ### Measurable Outcomes

 - **SC-001**: Toggle switches design within 100ms of click (verifiable with browser Performance panel).
 - **SC-002**: Correct mode is applied within 50ms of initial page load — no FOUC visible on hard reload with stored preference (verifiable by throttling CPU and inspecting first paint).
 - **SC-003**: No server requests are made for design mode preference.
 - **SC-004**: All mode switch icons are keyboard accessible and have ARIA labels.
 - **SC-005**: Page loads in <2 seconds on 3G connection.
 - **SC-006**: No TypeScript errors on build.

 ## Clarifications
 ### Session 2026-03-08
 - Q: Fallback behavior if LocalStorage is blocked or unavailable? → A: Default to light mode silently if storage is unavailable.
