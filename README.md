# Grob skizziert

Willkommen zu **grob skizziert** — einem persönlichen Blog über Webentwicklung, Technologie und Softwaredesign.

## Über diesen Blog

Der Blog wird von Frank von Eitzen betrieben, Software Architekt bei der [BMW AG](https://www.bmw.de/de/index.html). Hier findest du Beiträge zu Themen wie Webentwicklung, Softwarearchitektur, Fitness, Gaming und Miniaturmalerei. Alle Meinungen sind persönlich und spiegeln nicht die Ansichten des Arbeitgebers wider.

## Technologie

- **Next.js 16**
- **React 19**
- **Tailwind CSS**
- Markdown-basierte Blogposts, statisch generiert

## Projektstruktur

- `app/` — Next.js App Router, Seiten und Layouts
- `components/` — Wiederverwendbare UI-Komponenten
- `lib/` — Hilfsfunktionen, Markdown-Parser, Post-Logik
- `public/` — Fonts und Bilder
- `specs/` — Spezifikationen und Pläne

## Entwicklung

### Lokale Installation

1. Repository klonen:
	```bash
	git clone https://github.com/realDogbert/realDogbert.github.io.git
	cd realDogbert.github.io
	```
2. Abhängigkeiten installieren:
	```bash
	npm install
	```
3. Entwicklungsserver starten:
	```bash
	npm run dev
	```
	Die Seite ist unter [http://localhost:3000](http://localhost:3000) erreichbar.

### Build & Deployment

- Produktion bauen:
  ```bash
  npm run build
  ```
- Deployment auf Vercel oder anderen Next.js-fähigen Plattformen möglich.

## Linting & Qualität

- Linting:
  ```bash
  npm run lint
  ```

## Lizenz

MIT License

---

Fragen, Feedback oder Anregungen? Einfach ein Issue auf GitHub erstellen!
