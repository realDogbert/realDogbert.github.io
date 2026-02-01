/**
 * Type definitions for the Sticky Navigation Bar feature
 * 
 * This file contains TypeScript interfaces and types that define
 * the contract for the navigation component and its dependencies.
 * 
 * These types should be added to `lib/types.ts` in the main project.
 */

/**
 * Represents a single navigation link in the header
 * 
 * @example
 * const homeLink: NavigationLink = {
 *   href: '/',
 *   label: 'grobsizziert.de'
 * }
 */
export interface NavigationLink {
  /**
   * The destination URL path (relative path starting with /)
   * @example "/" | "/about" | "/blog"
   */
  href: string

  /**
   * The display text shown for this link
   * Should be concise for mobile display (ideally ≤20 characters)
   * @example "grobsizziert.de" | "über" | "alle posts"
   */
  label: string
}

/**
 * Props interface for the Navigation component
 * 
 * Currently minimal as navigation links are hardcoded within component.
 * Optional className allows for style extension if needed.
 * 
 * @example
 * <Navigation className="shadow-lg" />
 */
export interface NavigationProps {
  /**
   * Optional additional CSS classes for component customization
   * Applied to the root <nav> element
   * @default undefined
   */
  className?: string
}

/**
 * Internal navigation configuration
 * Defines the structure of the static navigation links
 * 
 * This is not exported as a type but documents the expected
 * structure of the NAVIGATION_LINKS constant
 */
interface NavigationConfig {
  /**
   * Left section: Brand/home link
   */
  brand: NavigationLink

  /**
   * Right section: Additional navigation links
   */
  links: NavigationLink[]
}

/**
 * Example configuration structure (for documentation)
 * 
 * This shows how navigation links should be structured within
 * the Navigation component. Not meant for export/import.
 */
const EXAMPLE_NAVIGATION_CONFIG: NavigationConfig = {
  brand: {
    href: '/',
    label: 'grobsizziert.de'
  },
  links: [
    {
      href: '/about',
      label: 'über'
    },
    {
      href: '/',
      label: 'alle posts'
    }
  ]
}

/**
 * Type guard to check if a value is a valid NavigationLink
 * Useful for runtime validation if needed
 * 
 * @param value - Value to check
 * @returns True if value matches NavigationLink interface
 */
export function isNavigationLink(value: unknown): value is NavigationLink {
  return (
    typeof value === 'object' &&
    value !== null &&
    'href' in value &&
    'label' in value &&
    typeof (value as NavigationLink).href === 'string' &&
    typeof (value as NavigationLink).label === 'string' &&
    (value as NavigationLink).href.startsWith('/')
  )
}

/**
 * Metadata type for About page
 * Extends Next.js Metadata type with site-specific constraints
 * 
 * This is already provided by Next.js via:
 * import type { Metadata } from 'next'
 * 
 * Documented here for completeness
 */
export interface AboutPageMetadata {
  /**
   * Page title (includes site name)
   * @example "Über | Grob skizziert"
   */
  title: string

  /**
   * Meta description for SEO
   * Should be 50-160 characters
   * @example "Informationen über diesen Blog"
   */
  description: string
}
