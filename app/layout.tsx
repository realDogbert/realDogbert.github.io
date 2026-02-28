import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
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
