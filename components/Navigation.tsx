'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavigationProps } from '@/lib/types'

/**
 * Sticky navigation bar component with transparent background
 * 
 * Features:
 * - Fixed positioning that stays visible during scroll
 * - 50% transparent background (bg-white/50)
 * - Left-aligned brand link "grobsizziert.de"
 * - Right-aligned navigation links ("alle posts")
 * - Active state indication for current page
 * - Hover and focus states for accessibility
 * - ARIA attributes for screen readers
 * - Horizontal layout on all screen sizes
 * 
 * @example
 * <Navigation />
 */
export default function Navigation({ className = '' }: NavigationProps) {
  const pathname = usePathname()
  
  // Determine active state for each link
  const isHomeActive = pathname === '/'
  const isAboutActive = pathname.startsWith('/about')
  
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/50 backdrop-blur-sm ${className}`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Brand link */}
          <Link
            href="/"
            className={`text-sm md:text-base transition-colors hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-sm px-2 py-1 ${
              isHomeActive ? 'font-bold' : ''
            }`}
            aria-current={isHomeActive ? 'page' : undefined}
          >
            grobsizziert.de
          </Link>
          
          {/* Right: Navigation links */}
          <div className="flex gap-4 md:gap-6">
            <Link
              href="/about"
              className={`text-sm md:text-base transition-colors hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-sm px-2 py-1 ${
                isAboutActive ? 'font-bold' : ''
              }`}
              aria-current={isAboutActive ? 'page' : undefined}
            >
              über
            </Link>
            <Link
              href="/"
              className={`text-sm md:text-base transition-colors hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-sm px-2 py-1 ${
                isHomeActive ? 'font-bold' : ''
              }`}
              aria-current={isHomeActive ? 'page' : undefined}
            >
              alle posts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
