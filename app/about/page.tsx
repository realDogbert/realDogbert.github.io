import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über | Grob skizziert',
  description: 'Über diese Seite und den Autor',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 pt-16 sm:pt-24 pb-16">
        {/* Page header */}
        <header className="mb-14 animate-fade-in-up">
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 leading-tight">
            Über<span className="text-orange">.</span>
          </h1>
          <div className="mt-6 w-12 h-[3px] bg-orange" aria-hidden="true" />
        </header>

        <article className="prose max-w-none animate-fade-in stagger-2">
          <p>
            Willkommen auf <strong>grob skizziert</strong> — einem persönlichen Blog
            über Webentwicklung, Technologie und Softwaredesign.
          </p>

          <h2>Über diesen Blog</h2>
          <p>
            Hier teile ich Gedanken, Tutorials und Erfahrungen aus der Welt der
            Softwareentwicklung. Die Themen reichen von modernen Web-Frameworks
            wie Next.js und React bis hin zu Best Practices in TypeScript,
            Barrierefreiheit und Performance-Optimierung.
          </p>

          <h2>Technologie</h2>
          <p>
            Dieser Blog wurde mit <strong>Next.js 16</strong>, <strong>React 19</strong>
            {" "}und <strong>Tailwind CSS</strong> erstellt. Alle Blogposts werden als
            Markdown-Dateien verwaltet und statisch generiert für optimale Performance.
          </p>

        </article>
      </div>
    </div>
  )
}
