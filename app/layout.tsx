import type { Metadata } from "next";
import localFont from "next/font/local";
import Navigation from "@/components/Navigation";
import "./globals.css";

const fraunces = localFont({
  src: [
    {
      path: "../public/fonts/fraunces-latin-normal.woff2",
      style: "normal",
    },
    {
      path: "../public/fonts/fraunces-latin-ext-normal.woff2",
      style: "normal",
    },
    {
      path: "../public/fonts/fraunces-latin-italic.woff2",
      style: "italic",
    },
    {
      path: "../public/fonts/fraunces-latin-ext-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

const outfit = localFont({
  src: [
    {
      path: "../public/fonts/outfit-latin.woff2",
      style: "normal",
    },
    {
      path: "../public/fonts/outfit-latin-ext.woff2",
      style: "normal",
    },
  ],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grob skizziert",
  description: "Ein Blog über Webentwicklung, Technologie und Softwaredesign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${fraunces.variable} ${outfit.variable} antialiased`}
      >
        <Navigation />
        <main className="pt-14">
          {children}
        </main>
        <footer className="border-t border-neutral-200 mt-24">
          <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-400 font-body">
              &copy; {new Date().getFullYear()} grob skizziert
            </p>
            <div className="flex items-center gap-1.5 text-sm text-neutral-400">
              <span className="inline-block w-2 h-2 rounded-full bg-orange" />
              <span className="font-body">Handgemacht mit Next.js</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
