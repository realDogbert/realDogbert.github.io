/**
 * Blog Feature Type Contracts
 * 
 * This file defines the TypeScript interfaces and types for the blog feature.
 * These contracts serve as the single source of truth for data structures
 * used across components, pages, and utilities.
 * 
 * Feature: 001-blog-page
 * Version: 1.0.0
 * Date: 2026-01-25
 */

/**
 * Represents a single blog post with metadata and content.
 * 
 * All blog posts are statically defined and generated at build time.
 * No dynamic content fetching or user-generated content.
 */
export interface BlogPost {
  /**
   * Post headline
   * @constraint 1-100 characters, non-empty
   * @example "Getting Started with Next.js"
   */
  title: string;

  /**
   * URL-friendly identifier for routing
   * @constraint Lowercase letters, numbers, hyphens only. Must be unique.
   * @pattern /^[a-z0-9]+(?:-[a-z0-9]+)*$/
   * @example "getting-started-nextjs"
   */
  slug: string;

  /**
   * Short preview text shown on blog list page
   * @constraint 150-200 characters recommended for consistent card heights
   * @example "Learn the fundamentals of Next.js 16 and build your first..."
   */
  excerpt: string;

  /**
   * Full post body as array of paragraphs
   * @constraint 4-6 paragraphs per post (per specification clarification)
   * @example ["First paragraph...", "Second paragraph...", ...]
   */
  content: string[];

  /**
   * Publication date (when post was published)
   * @constraint Must be valid Date object, not in future
   * @example new Date('2026-01-20')
   */
  publishedAt: Date;

  /**
   * Estimated read time in minutes
   * @constraint Positive integer, calculated from word count at 200 WPM
   * @derived Calculated by counting words in content array
   * @example 5
   */
  readTime: number;

  /**
   * Post author name
   * @constraint Non-empty string
   * @default "Blog Author"
   * @example "Blog Author"
   */
  author: string;
}

/**
 * Props for BlogCard component
 * 
 * BlogCard displays a post preview on the blog list page.
 * The entire card is clickable and navigates to the full post.
 */
export interface BlogCardProps {
  /**
   * The blog post to display as a card
   */
  post: BlogPost;
}

/**
 * Props for BlogPostContent component
 * 
 * BlogPostContent renders the full post content with proper typography.
 * Handles paragraph array mapping and formatting.
 */
export interface BlogPostContentProps {
  /**
   * The blog post to display in full
   */
  post: BlogPost;
}

/**
 * Props for Header component
 * 
 * Header displays site branding at the top of all pages.
 */
export interface HeaderProps {
  /**
   * Site title to display
   * @default "My Blog"
   */
  title?: string;

  /**
   * Optional tagline/subtitle
   * @default undefined
   */
  tagline?: string;
}

/**
 * Props for dynamic blog post page
 * 
 * Next.js App Router provides this structure for dynamic routes.
 */
export interface BlogPostPageProps {
  /**
   * Route parameters from Next.js App Router
   */
  params: {
    /**
     * Post slug from URL path
     * @example "getting-started-nextjs"
     */
    slug: string;
  };
}

/**
 * Return type for generateStaticParams function
 * 
 * Used by Next.js to generate static paths at build time.
 */
export type StaticParams = Array<{
  slug: string;
}>;

/**
 * Utility function type for date formatting
 */
export type FormatDateFn = (date: Date) => string;

/**
 * Utility function type for read time calculation
 */
export type CalculateReadTimeFn = (content: string[]) => number;
