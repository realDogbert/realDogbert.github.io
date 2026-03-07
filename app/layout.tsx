import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import GoogleAnalytics from "@/components/GoogleAnalytics";
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
        <GoogleAnalytics />
        <Navigation />
        <main className="pt-14">
          {children}
        </main>
        <footer className="border-t border-neutral-200 mt-24">
          <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-400 font-body">
              &copy; Frank von Eitzen {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:FvEitzen@gmail.com"
                aria-label="E-Mail senden"
                className="text-neutral-400 hover:text-orange transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              <a
                href="https://github.com/realDogbert"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profil"
                className="text-neutral-400 hover:text-orange transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <Link
                href="/impressum"
                aria-label="Impressum"
                className="text-neutral-400 hover:text-orange transition-colors duration-200"
              >
                Impressum
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
