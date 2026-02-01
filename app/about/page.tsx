import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über | Grob skizziert',
  description: 'Über diese Seite und den Autor',
}

/**
 * About page placeholder
 * 
 * This page provides information about the blog and its author.
 * Currently displays placeholder content until full about content is written.
 */
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose lg:prose-xl">
        <h1>Über</h1>
        
        <p>
          Willkommen auf <strong>grobsizziert.de</strong> – einem persönlichen Blog 
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
          Dieser Blog wurde mit <strong>Next.js 16</strong>, <strong>React 19</strong>, 
          und <strong>Tailwind CSS</strong> erstellt. Alle Blogposts werden als Markdown-Dateien 
          verwaltet und statisch generiert für optimale Performance.
        </p>
        
        <h2>Kontakt</h2>
        <p>
          <em>Kontaktinformationen folgen in Kürze.</em>
        </p>
      </article>
    </div>
  )
}
