'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import type { NavigationProps } from '@/lib/types'

export default function Navigation({ className = '' }: NavigationProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isHomeActive = pathname === '/'
  const isAboutActive = pathname.startsWith('/about')

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-neutral-100 ${className}`}
      aria-label="Main navigation"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          {/* Brand */}
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-neutral-900 transition-colors duration-200 hover:text-orange"
            aria-current={isHomeActive ? 'page' : undefined}
          >
            grob skizziert<span className="text-orange font-bold">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex items-center gap-8">
            <NavLink href="/" active={isHomeActive}>Beiträge</NavLink>
            <NavLink href="/about" active={isAboutActive}>Über</NavLink>
          </div>

          {/* Mobile toggle */}
          <button
            className="sm:hidden p-2 -mr-2 text-neutral-500 hover:text-neutral-900 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Navigation öffnen"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="4" y1="4" x2="14" y2="14" />
                  <line x1="14" y1="4" x2="4" y2="14" />
                </>
              ) : (
                <>
                  <line x1="2" y1="5" x2="16" y2="5" />
                  <line x1="2" y1="9" x2="16" y2="9" />
                  <line x1="2" y1="13" x2="16" y2="13" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-neutral-100 bg-white/95 backdrop-blur-md px-6 py-5 flex flex-col gap-4">
          <MobileNavLink href="/" active={isHomeActive} onClick={() => setMobileOpen(false)}>
            Beiträge
          </MobileNavLink>
          <MobileNavLink href="/about" active={isAboutActive} onClick={() => setMobileOpen(false)}>
            Über
          </MobileNavLink>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`group relative text-[0.8125rem] font-body tracking-widest uppercase transition-colors duration-200 py-1 ${
        active
          ? 'text-neutral-900'
          : 'text-neutral-400 hover:text-neutral-900'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      {children}
      <span
        className={`absolute -bottom-0.5 left-0 h-[2px] bg-orange transition-all duration-300 ease-out ${
          active ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  )
}

function MobileNavLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-base font-body tracking-wide transition-colors duration-200 ${
        active
          ? 'text-orange font-medium'
          : 'text-neutral-500 hover:text-neutral-900'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
