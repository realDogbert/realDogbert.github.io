/**
 * Markdown Parser API Contracts
 * 
 * Feature: 003-markdown-html-rendering
 * Purpose: Define TypeScript interfaces for markdown-to-HTML conversion utilities
 * 
 * These contracts specify the public API for markdown parsing, HTML sanitization,
 * syntax highlighting, and link processing functions.
 */

/**
 * Main markdown parsing function that orchestrates the full conversion pipeline.
 * 
 * @param markdown - Raw markdown string (single paragraph from BlogPost.content[])
 * @returns Safe HTML string ready for React rendering via dangerouslySetInnerHTML
 * 
 * Pipeline:
 * 1. Parse markdown to HTML using marked
 * 2. Apply syntax highlighting to code blocks using shiki (build-time)
 * 3. Sanitize HTML to prevent XSS attacks
 * 4. Process links (add target="_blank" for external links)
 */
export function parseMarkdown(markdown: string): string;

/**
 * HTML sanitization function that removes dangerous tags and attributes.
 * 
 * @param html - Raw HTML string from markdown parser
 * @returns Sanitized HTML with only safe tags/attributes allowed
 * 
 * Allowlist (safe tags): p, div, span, strong, em, a, ul, ol, li, code, pre,
 * blockquote, h1-h6, hr, table, thead, tbody, tr, td, th
 * 
 * Blocklist (dangerous): script, iframe, object, embed, style, link
 */
export function sanitizeHtml(html: string): string;

/**
 * Determines if a URL points to an external domain (different from blog's domain).
 * 
 * @param url - URL string from markdown link
 * @param currentDomain - Optional current blog domain (default: from process.env or config)
 * @returns true if external link, false if internal/relative
 * 
 * External links get: target="_blank" rel="noopener noreferrer"
 * Internal links get: target="_self" (default behavior)
 */
export function isExternalLink(url: string, currentDomain?: string): boolean;

/**
 * Applies syntax highlighting to code blocks at build time.
 * 
 * @param code - Raw code string from markdown code block
 * @param language - Programming language identifier (e.g., 'typescript', 'python')
 * @returns Static HTML with inline styles or CSS classes for highlighting
 * 
 * Uses shiki with VS Code themes. Returns static HTML (no client-side JavaScript).
 */
export function highlightCode(code: string, language: string): string;

/**
 * Configuration for marked parser options.
 */
export interface MarkedOptions {
  /** Enable GitHub Flavored Markdown */
  gfm: boolean;
  /** Convert line breaks to <br> */
  breaks: boolean;
  /** Pedantic mode (strict compliance) */
  pedantic: boolean;
  /** Custom renderer for links (external link processing) */
  renderer?: {
    link?: (href: string, title: string | null, text: string) => string;
  };
}

/**
 * Configuration for HTML sanitization allowlist.
 */
export interface SanitizeOptions {
  /** Allowed HTML tags */
  allowedTags: string[];
  /** Allowed attributes per tag */
  allowedAttributes: {
    [tag: string]: string[];
  };
  /** Allowed URL schemes for href/src attributes */
  allowedSchemes: string[];
}

/**
 * Configuration for shiki syntax highlighter.
 */
export interface HighlightOptions {
  /** Theme name (e.g., 'github-dark', 'monokai') */
  theme: string;
  /** Languages to load (reduces bundle size) */
  languages: string[];
}

/**
 * BlogPost content rendering props for BlogPostContent component.
 */
export interface BlogPostContentProps {
  /** Array of paragraph strings with markdown syntax */
  content: string[];
  /** Optional CSS class for styling wrapper */
  className?: string;
}

/**
 * Parsed HTML result with metadata.
 */
export interface ParsedContent {
  /** Safe HTML string */
  html: string;
  /** Number of external links detected */
  externalLinks: number;
  /** Code blocks found and highlighted */
  codeBlocks: number;
  /** Processing time in milliseconds (for performance monitoring) */
  processingTime: number;
}

/**
 * Extended parsing function with metadata (useful for debugging/monitoring).
 * 
 * @param markdown - Raw markdown string
 * @returns Parsed content with HTML and metadata
 */
export function parseMarkdownWithMetadata(markdown: string): ParsedContent;
