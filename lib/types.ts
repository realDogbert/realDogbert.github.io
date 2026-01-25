/**
 * Blog Feature Type Definitions
 * 
 * TypeScript interfaces and types for the blog feature.
 * These types ensure type safety across components, pages, and utilities.
 */

/**
 * Represents a single blog post with metadata and content.
 * 
 * All blog posts are statically defined and generated at build time.
 */
export interface BlogPost {
  /**
   * Post headline
   */
  title: string;

  /**
   * URL-friendly identifier for routing
   * Must be lowercase letters, numbers, and hyphens only
   */
  slug: string;

  /**
   * Short preview text shown on blog list page
   */
  excerpt: string;

  /**
   * Full post body as array of paragraphs
   * Each element is one paragraph
   */
  content: string[];

  /**
   * Publication date
   */
  publishedAt: Date;

  /**
   * Estimated read time in minutes
   */
  readTime: number;

  /**
   * Post author name
   */
  author: string;
}

/**
 * Props for BlogCard component
 */
export interface BlogCardProps {
  post: BlogPost;
}

/**
 * Props for BlogPostContent component
 */
export interface BlogPostContentProps {
  post: BlogPost;
}

/**
 * Props for Header component
 */
export interface HeaderProps {
  title?: string;
  tagline?: string;
}

/**
 * Props for dynamic blog post page
 */
export interface BlogPostPageProps {
  params: {
    slug: string;
  };
}
