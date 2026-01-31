/**
 * Markdown-to-HTML Parsing Utilities
 * 
 * Feature: 003-markdown-html-rendering
 * Purpose: Convert markdown strings to safe, styled HTML for blog posts
 * 
 * Pipeline: markdown → marked → shiki (code blocks) → sanitize → link processing → HTML
 */

import { marked } from 'marked';
import sanitizeHtmlLib from 'sanitize-html';
import { codeToHtml } from 'shiki';

// ============================================================================
// Configuration
// ============================================================================

/**
 * Configure marked with GitHub Flavored Markdown and custom renderer
 */
marked.setOptions({
  gfm: true,           // Enable GitHub Flavored Markdown
  breaks: false,       // Don't convert \n to <br> (preserve paragraph boundaries)
  pedantic: false,     // Don't be overly strict (allow common markdown patterns)
});

/**
 * HTML Sanitization Allowlist
 * Allows safe tags while stripping dangerous ones (script, iframe, etc.)
 */
const SANITIZE_OPTIONS: sanitizeHtmlLib.IOptions = {
  allowedTags: [
    // Text formatting
    'p', 'div', 'span', 'strong', 'em', 'b', 'i', 'u', 'del', 's',
    // Links
    'a',
    // Lists
    'ul', 'ol', 'li',
    // Code
    'code', 'pre',
    // Blockquotes
    'blockquote',
    // Headings
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    // Horizontal rule
    'hr',
    // Tables
    'table', 'thead', 'tbody', 'tr', 'td', 'th',
    // Images (for future support)
    'img',
  ],
  allowedAttributes: {
    'a': ['href', 'title', 'target', 'rel'],
    'img': ['src', 'alt', 'title', 'width', 'height'],
    'code': ['class'], // For syntax highlighting classes
    'pre': ['class'],
    'span': ['style', 'class'], // For shiki inline styles
    'div': ['class'],
    '*': ['id'], // Allow id on any element for heading anchors
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: {
    'img': ['http', 'https', 'data'], // Allow data URIs for images
  },
};

/**
 * Shiki highlighter configuration
 * Theme: github-dark for code blocks
 */
const SHIKI_THEME = 'github-dark';

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Determines if a URL is external (different domain) or internal (same domain/relative)
 * 
 * @param url - URL string from markdown link
 * @param currentDomain - Optional current blog domain (default: localhost for dev)
 * @returns true if external link, false if internal/relative
 * 
 * External links: http://example.com, https://google.com
 * Internal links: /blog/post, ./about, #heading
 */
export function isExternalLink(url: string, currentDomain?: string): boolean {
  // Relative URLs are always internal
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../') || url.startsWith('#')) {
    return false;
  }

  try {
    const urlObj = new URL(url);
    const domain = currentDomain || (typeof window !== 'undefined' ? window.location.hostname : 'localhost');
    
    // Compare hostnames (ignore port, protocol differences)
    return urlObj.hostname !== domain;
  } catch {
    // Invalid URL format - treat as internal (likely a relative path)
    return false;
  }
}

/**
 * Sanitizes HTML output to prevent XSS attacks
 * 
 * @param html - Raw HTML string from markdown parser
 * @returns Sanitized HTML with only safe tags/attributes
 */
export function sanitizeHtml(html: string): string {
  return sanitizeHtmlLib(html, SANITIZE_OPTIONS);
}

/**
 * Highlights code blocks with shiki at build time (async)
 * 
 * @param code - Raw code string
 * @param language - Programming language identifier
 * @returns Promise<string> - Static HTML with inline styles
 */
export async function highlightCode(code: string, language: string): Promise<string> {
  try {
    const html = await codeToHtml(code, {
      lang: language || 'text',
      theme: SHIKI_THEME,
    });
    return html;
  } catch {
    // If language not supported, return plain code block
    console.warn(`Shiki: Language '${language}' not supported, using plain text`);
    return `<pre><code class="language-${language || 'text'}">${escapeHtml(code)}</code></pre>`;
  }
}

/**
 * Escapes HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// ============================================================================
// Custom Marked Renderer for Link Processing
// ============================================================================

/**
 * Custom renderer to add target="_blank" and rel="noopener noreferrer" to external links
 */
const renderer = new marked.Renderer();

renderer.link = ({ href, title, tokens }): string => {
  const text = marked.Parser.parseInline(tokens);
  const isExternal = isExternalLink(href || '');
  const titleAttr = title ? ` title="${title}"` : '';
  
  if (isExternal) {
    return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer">${text}</a>`;
  }
  
  return `<a href="${href}"${titleAttr}>${text}</a>`;
};

/**
 * Custom renderer for code blocks to integrate shiki highlighting
 * Note: Currently synchronous - async version will be used when needed
 */
renderer.code = ({ text, lang }): string => {
  const language = lang || 'text';
  // For now, return plain code block - will integrate shiki in async version
  return `<pre><code class="language-${language}">${escapeHtml(text)}</code></pre>`;
};

// Apply custom renderer to marked
marked.use({ renderer });

// ============================================================================
// Main Parsing Function
// ============================================================================

/**
 * Parses markdown string to safe HTML
 * 
 * Pipeline:
 * 1. Parse markdown with marked (converts markdown syntax to HTML)
 * 2. Sanitize HTML (remove dangerous tags/attributes)
 * 3. Link processing (handled by custom renderer in step 1)
 * 
 * Note: Syntax highlighting is handled separately in code blocks via shiki
 * 
 * @param markdown - Raw markdown string (single paragraph)
 * @returns Safe HTML string ready for rendering
 */
export function parseMarkdown(markdown: string): string {
  // Step 1: Parse markdown to HTML
  const rawHtml = marked.parse(markdown, { async: false }) as string;
  
  // Step 2: Sanitize HTML
  const safeHtml = sanitizeHtml(rawHtml);
  
  return safeHtml;
}

/**
 * Async version of parseMarkdown for when syntax highlighting is needed
 * Currently not used (shiki integration will be added in Phase 4)
 */
export async function parseMarkdownAsync(markdown: string): Promise<string> {
  const rawHtml = await marked.parse(markdown);
  const safeHtml = sanitizeHtml(rawHtml);
  return safeHtml;
}
