# Data Model: Markdown-to-HTML Rendering

**Feature**: `003-markdown-html-rendering`  
**Created**: 2026-01-31  
**Status**: Design Complete  
**Context**: Data structures and transformation pipeline for markdown rendering in Next.js blog

---

## 1. Existing Data Model (Unchanged)

### BlogPost Interface

**Location**: [lib/types.ts](../../lib/types.ts)

```typescript
/**
 * Represents a single blog post with metadata and content.
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
```

**Critical Constraint (FR-012)**: The `content: string[]` structure **must remain unchanged**. Each string in the array represents a single paragraph that may contain markdown formatting.

**Data Flow**:
```
Markdown File (lib/posts/*.md)
  ↓ (gray-matter parsing)
BlogPost Object { content: string[] }
  ↓ (passed to component)
BlogPostContent Component
  ↓ (map over array)
Per-Paragraph Markdown Processing
  ↓ (marked.parse → shiki.codeToHtml → sanitize-html → link processing)
Safe HTML String
  ↓ (dangerouslySetInnerHTML)
Rendered HTML in Browser
```

---

## 2. HTML Rendering Pipeline

### Pipeline Overview

```
┌─────────────────────────────────────────────────────────────┐
│  INPUT: string (single paragraph from content array)       │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Markdown Parsing (marked)                          │
│  • Convert markdown syntax to raw HTML                      │
│  • Process: **bold** → <strong>bold</strong>                │
│  • Process: ```code``` → <pre><code>...</code></pre>        │
│  • GFM support: tables, strikethrough, task lists           │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Syntax Highlighting (shiki) - Build Time Only      │
│  • Detect code blocks with language identifier              │
│  • Generate static HTML with inline styles                  │
│  • Zero client-side JavaScript                              │
│  • VS Code quality highlighting                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: HTML Sanitization (sanitize-html)                  │
│  • Apply allowlist for safe tags/attributes                 │
│  • Strip dangerous elements: <script>, <iframe>, etc.       │
│  • Preserve semantic HTML structure                         │
│  • Prevent XSS attacks                                      │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: Link Processing (URL constructor)                  │
│  • Detect external links (different domain)                 │
│  • Add target="_blank" rel="noopener noreferrer"            │
│  • Internal links remain in same tab                        │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  OUTPUT: Safe HTML string ready for React rendering         │
└─────────────────────────────────────────────────────────────┘
```

### Pipeline Data Types

```typescript
// Step 1: Input from BlogPost.content array
type MarkdownInput = string;
// Example: "This is **bold** and this is `code`"

// Step 1: Output from marked.parse()
type RawHTML = string;
// Example: "<p>This is <strong>bold</strong> and this is <code>code</code></p>"

// Step 2: Code block detection
interface CodeBlock {
  language: string;
  code: string;
  startIndex: number;
  endIndex: number;
}

// Step 2: Output from shiki.codeToHtml()
type HighlightedHTML = string;
// Example: '<pre class="shiki" style="background-color:#1e1e1e"><code>...</code></pre>'

// Step 3: Output from sanitize-html()
type SanitizedHTML = string;
// Example: Same as input but with dangerous tags removed

// Step 4: Link classification
interface LinkInfo {
  url: string;
  isExternal: boolean;
  needsSecurityAttrs: boolean;
}

// Final output
type SafeHTML = string;
// Example: '<p>This is <strong>bold</strong> and <a href="https://external.com" target="_blank" rel="noopener noreferrer">link</a></p>'
```

### Transformation Examples

#### Example 1: Basic Text Formatting
```typescript
// Input (markdown)
const input = "This is **bold**, *italic*, and `inline code`.";

// After Step 1 (marked.parse)
const afterMarked = "<p>This is <strong>bold</strong>, <em>italic</em>, and <code>inline code</code>.</p>";

// After Step 2 (no code blocks, pass through)
const afterShiki = afterMarked;

// After Step 3 (sanitize-html, all tags safe)
const afterSanitize = afterMarked;

// After Step 4 (no links, pass through)
const output = afterMarked;
```

#### Example 2: Code Block with Syntax Highlighting
```typescript
// Input (markdown)
const input = `
Check this code:

\`\`\`typescript
function hello(name: string) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`
`;

// After Step 1 (marked.parse)
const afterMarked = `
<p>Check this code:</p>
<pre><code class="language-typescript">function hello(name: string) {
  console.log(\`Hello, \${name}!\`);
}
</code></pre>
`;

// After Step 2 (shiki.codeToHtml)
const afterShiki = `
<p>Check this code:</p>
<pre class="shiki" style="background-color:#1e1e1e" tabindex="0"><code>
<span class="line"><span style="color:#569CD6">function</span><span style="color:#D4D4D4"> </span><span style="color:#DCDCAA">hello</span><span style="color:#D4D4D4">(</span><span style="color:#9CDCFE">name</span><span style="color:#D4D4D4">: </span><span style="color:#4EC9B0">string</span><span style="color:#D4D4D4">) {</span></span>
<span class="line"><span style="color:#D4D4D4">  </span><span style="color:#9CDCFE">console</span><span style="color:#D4D4D4">.</span><span style="color:#DCDCAA">log</span><span style="color:#D4D4D4">(</span><span style="color:#CE9178">\`Hello, \${</span><span style="color:#9CDCFE">name</span><span style="color:#CE9178">}!\`</span><span style="color:#D4D4D4">);</span></span>
<span class="line"><span style="color:#D4D4D4">}</span></span>
</code></pre>
`;

// After Step 3 (sanitize-html, pre/code tags allowed)
const afterSanitize = afterShiki;

// After Step 4 (no links)
const output = afterShiki;
```

#### Example 3: External Link Processing
```typescript
// Input (markdown)
const input = "Read more at [Example](https://example.com) or [internal page](/about).";

// After Step 1 (marked.parse)
const afterMarked = '<p>Read more at <a href="https://example.com">Example</a> or <a href="/about">internal page</a>.</p>';

// After Step 2 (no code blocks)
const afterShiki = afterMarked;

// After Step 3 (sanitize-html, a tags allowed)
const afterSanitize = afterMarked;

// After Step 4 (link processing)
const output = '<p>Read more at <a href="https://example.com" target="_blank" rel="noopener noreferrer">Example</a> or <a href="/about">internal page</a>.</p>';
```

---

## 3. Component Architecture

### BlogPostContent Component

**Location**: [components/BlogPostContent.tsx](../../components/BlogPostContent.tsx)

```typescript
import { parseMarkdown } from '@/lib/markdown';

/**
 * Props for BlogPostContent component
 */
interface BlogPostContentProps {
  /**
   * Array of paragraph strings from BlogPost.content
   * Each string may contain markdown formatting
   */
  content: string[];

  /**
   * Optional CSS class for styling the article container
   */
  className?: string;
}

/**
 * Renders blog post content with markdown-to-HTML transformation
 * 
 * @param content - Array of markdown-formatted paragraphs
 * @param className - Optional CSS class for styling
 * 
 * @security Uses dangerouslySetInnerHTML with sanitized HTML
 * @performance Processes markdown at render time (server-side)
 */
export default function BlogPostContent({ content, className }: BlogPostContentProps) {
  return (
    <article className={className}>
      {content.map((paragraph, index) => {
        // Parse markdown for each paragraph
        const html = parseMarkdown(paragraph);
        
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </article>
  );
}
```

### Component Data Flow

```
BlogPostContent Component
  │
  ├─ Props: { content: string[], className?: string }
  │
  ├─ Loop: content.map((paragraph, index) => ...)
  │   │
  │   └─ For each paragraph:
  │       │
  │       ├─ Call: parseMarkdown(paragraph)
  │       │   └─ Returns: Safe HTML string
  │       │
  │       └─ Render: <div dangerouslySetInnerHTML={{ __html: html }} />
  │
  └─ Output: <article> with rendered HTML paragraphs
```

### Why dangerouslySetInnerHTML?

**Decision Rationale**:
1. **Performance**: Avoids complex React component trees for HTML elements
2. **Simplicity**: Direct HTML rendering without component mapping
3. **Safety**: HTML is fully sanitized before rendering (Step 3 in pipeline)
4. **Flexibility**: Supports any valid HTML structure from markdown
5. **Server-Side**: Rendering happens server-side, reducing client workload

**Safety Guarantee**: All HTML is sanitized through `sanitize-html` library with strict allowlist before being passed to `dangerouslySetInnerHTML`.

---

## 4. Utility Functions

**Location**: [lib/markdown.ts](../../lib/markdown.ts) (to be created)

### Core Functions

```typescript
/**
 * Parse markdown text to safe HTML
 * Orchestrates the full rendering pipeline
 */
export function parseMarkdown(text: string): string;

/**
 * Sanitize HTML to prevent XSS attacks
 * Applies allowlist for safe tags and attributes
 */
export function sanitizeHtml(html: string): string;

/**
 * Check if URL is external to the blog
 * Returns true for different domains
 */
export function isExternalLink(url: string): boolean;

/**
 * Highlight code block with syntax highlighting
 * Returns static HTML with inline styles (build-time only)
 */
export function highlightCode(code: string, language: string): string;

/**
 * Process HTML to add security attributes to external links
 * Adds target="_blank" rel="noopener noreferrer" to external links
 */
export function processLinks(html: string): string;
```

### Function Signatures with Types

```typescript
import { marked } from 'marked';
import sanitize from 'sanitize-html';
import { codeToHtml } from 'shiki';

/**
 * Configuration for marked parser
 */
interface MarkedOptions {
  gfm: boolean;           // GitHub Flavored Markdown
  breaks: boolean;        // Convert \n to <br>
  headerIds: boolean;     // Add IDs to headings
  mangle: boolean;        // Escape autolinked email addresses
}

/**
 * Configuration for sanitize-html
 */
interface SanitizeOptions {
  allowedTags: string[];
  allowedAttributes: Record<string, string[]>;
  allowedSchemes: string[];
  allowedSchemesByTag: Record<string, string[]>;
}

/**
 * Configuration for shiki syntax highlighter
 */
interface ShikiOptions {
  theme: string;          // VS Code theme name
  langs: string[];        // Supported languages
}

/**
 * Main markdown parser function
 * 
 * @param text - Raw markdown string from BlogPost.content array
 * @returns Safe HTML string ready for React rendering
 * 
 * @example
 * const html = parseMarkdown("This is **bold** text");
 * // Returns: "<p>This is <strong>bold</strong> text</p>"
 */
export function parseMarkdown(text: string): string {
  // Step 1: Parse markdown to HTML
  let html = marked.parse(text, markedOptions) as string;
  
  // Step 2: Highlight code blocks (if present)
  html = highlightCodeBlocks(html);
  
  // Step 3: Sanitize HTML
  html = sanitizeHtml(html);
  
  // Step 4: Process links
  html = processLinks(html);
  
  return html;
}

/**
 * Sanitize HTML to prevent XSS attacks
 * 
 * @param html - Raw HTML from markdown parser
 * @returns Sanitized HTML with dangerous tags removed
 * 
 * @example
 * const safe = sanitizeHtml("<p>Safe</p><script>alert('xss')</script>");
 * // Returns: "<p>Safe</p>"
 */
export function sanitizeHtml(html: string): string {
  return sanitize(html, sanitizeOptions);
}

/**
 * Check if URL is external to the blog
 * 
 * @param url - URL to check (can be relative or absolute)
 * @returns true if URL points to external domain
 * 
 * @example
 * isExternalLink("https://example.com")     // true
 * isExternalLink("/about")                  // false
 * isExternalLink("https://myblog.com/post") // false (same domain)
 */
export function isExternalLink(url: string): boolean {
  try {
    // Handle relative URLs
    if (url.startsWith('/') || url.startsWith('#')) {
      return false;
    }
    
    // Parse URL and compare domain
    const urlObj = new URL(url);
    const blogDomain = process.env.NEXT_PUBLIC_SITE_URL || 'localhost';
    const blogHostname = new URL(blogDomain).hostname;
    
    return urlObj.hostname !== blogHostname;
  } catch {
    // Invalid URL or relative path
    return false;
  }
}

/**
 * Highlight code block with syntax highlighting
 * 
 * @param code - Code content
 * @param language - Programming language identifier
 * @returns Static HTML with inline styles
 * 
 * @example
 * const html = highlightCode("const x = 1;", "typescript");
 * // Returns: '<pre class="shiki">...(styled HTML)...</pre>'
 */
export async function highlightCode(code: string, language: string): Promise<string> {
  return await codeToHtml(code, {
    lang: language,
    theme: 'dark-plus'
  });
}

/**
 * Process HTML to add security attributes to external links
 * 
 * @param html - Sanitized HTML
 * @returns HTML with modified link attributes
 * 
 * @example
 * const processed = processLinks('<a href="https://example.com">Link</a>');
 * // Returns: '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link</a>'
 */
export function processLinks(html: string): string {
  // Use regex to find all <a> tags
  return html.replace(
    /<a\s+href="([^"]+)"([^>]*)>/gi,
    (match, url, rest) => {
      if (isExternalLink(url)) {
        // Add security attributes for external links
        return `<a href="${url}" target="_blank" rel="noopener noreferrer"${rest}>`;
      }
      // Keep internal links unchanged
      return match;
    }
  );
}
```

---

## 5. Configuration Objects

### Marked Configuration

```typescript
import { marked } from 'marked';

/**
 * Marked parser options for GitHub Flavored Markdown
 * 
 * @see https://marked.js.org/using_advanced#options
 */
export const markedOptions: marked.MarkedOptions = {
  // Enable GitHub Flavored Markdown
  gfm: true,
  
  // Convert \n to <br> (more lenient line breaks)
  breaks: true,
  
  // Add IDs to headings for anchor links
  headerIds: true,
  
  // Don't escape autolinked email addresses
  mangle: false,
  
  // Custom renderer for links (optional, if needed)
  renderer: new marked.Renderer()
};

// Optional: Custom renderer for advanced use cases
const renderer = new marked.Renderer();

// Override link rendering to detect external links
renderer.link = function({ href, title, text }) {
  const isExternal = isExternalLink(href);
  const target = isExternal ? ' target="_blank"' : '';
  const rel = isExternal ? ' rel="noopener noreferrer"' : '';
  const titleAttr = title ? ` title="${title}"` : '';
  
  return `<a href="${href}"${target}${rel}${titleAttr}>${text}</a>`;
};

markedOptions.renderer = renderer;
```

### Sanitize-HTML Configuration

```typescript
import sanitize from 'sanitize-html';

/**
 * HTML sanitization configuration
 * Defines allowed tags and attributes to prevent XSS
 * 
 * @see https://github.com/apostrophecms/sanitize-html
 */
export const sanitizeOptions: sanitize.IOptions = {
  // Allowed HTML tags
  allowedTags: [
    // Text formatting
    'p', 'span', 'strong', 'em', 'u', 's', 'del', 'code',
    
    // Headings
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    
    // Lists
    'ul', 'ol', 'li',
    
    // Links
    'a',
    
    // Block elements
    'blockquote', 'pre', 'hr', 'br',
    
    // Tables
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th',
    
    // Containers
    'div', 'section', 'article'
  ],
  
  // Allowed attributes per tag
  allowedAttributes: {
    'a': ['href', 'title', 'target', 'rel'],
    'code': ['class'],          // For syntax highlighting
    'pre': ['class', 'style'],  // For shiki themes
    'span': ['style', 'class'], // For syntax highlighting
    'div': ['class'],
    '*': ['id']                 // Allow IDs for heading anchors
  },
  
  // Allowed URL schemes
  allowedSchemes: ['http', 'https', 'mailto'],
  
  // Allowed schemes per tag
  allowedSchemesByTag: {
    'a': ['http', 'https', 'mailto']
  },
  
  // Allow class names for syntax highlighting
  allowedClasses: {
    'code': ['language-*'],
    'pre': ['shiki'],
    'span': ['line', 'token-*']
  }
};
```

### Shiki Configuration

```typescript
import { getHighlighter, bundledLanguages } from 'shiki';

/**
 * Shiki syntax highlighter configuration
 * Build-time only (generates static HTML with inline styles)
 * 
 * @see https://shiki.matsu.io/
 */
export const shikiConfig = {
  // VS Code theme
  theme: 'dark-plus',
  
  // Supported languages (lazy-loaded)
  langs: Object.keys(bundledLanguages),
  
  // Default language if not specified
  defaultLang: 'text'
};

/**
 * Initialize shiki highlighter (call once at build time)
 * 
 * @returns Configured highlighter instance
 */
export async function getConfiguredHighlighter() {
  return await getHighlighter({
    themes: [shikiConfig.theme],
    langs: shikiConfig.langs
  });
}
```

---

## 6. Data Structure Summary

### Type Hierarchy

```
BlogPost (existing interface)
  └─ content: string[]
       │
       └─ Each string passes through:
            │
            ├─ parseMarkdown(text: string): string
            │    │
            │    ├─ marked.parse(text, options): string
            │    │    └─ Converts markdown → raw HTML
            │    │
            │    ├─ highlightCodeBlocks(html): string
            │    │    └─ Detects code blocks → calls highlightCode()
            │    │         └─ shiki.codeToHtml(code, lang): Promise<string>
            │    │              └─ Returns styled HTML
            │    │
            │    ├─ sanitizeHtml(html): string
            │    │    └─ sanitize(html, options): string
            │    │         └─ Removes dangerous tags
            │    │
            │    └─ processLinks(html): string
            │         └─ Adds target/rel to external links
            │
            └─ Rendered via dangerouslySetInnerHTML
```

### Configuration Hierarchy

```
Markdown Rendering System
  │
  ├─ markedOptions: marked.MarkedOptions
  │    ├─ gfm: true
  │    ├─ breaks: true
  │    ├─ headerIds: true
  │    └─ renderer: marked.Renderer (custom link handling)
  │
  ├─ sanitizeOptions: sanitize.IOptions
  │    ├─ allowedTags: string[]
  │    ├─ allowedAttributes: Record<string, string[]>
  │    └─ allowedSchemes: string[]
  │
  └─ shikiConfig
       ├─ theme: 'dark-plus'
       ├─ langs: string[]
       └─ defaultLang: 'text'
```

---

## 7. Security Model

### XSS Prevention Strategy

```typescript
/**
 * Multi-layer security approach to prevent XSS attacks
 */
interface SecurityLayer {
  layer: number;
  component: string;
  protection: string;
}

const securityLayers: SecurityLayer[] = [
  {
    layer: 1,
    component: 'Markdown Parser (marked)',
    protection: 'Escapes HTML entities by default, only allows markdown syntax'
  },
  {
    layer: 2,
    component: 'Syntax Highlighter (shiki)',
    protection: 'Generates static HTML with inline styles, no JavaScript execution'
  },
  {
    layer: 3,
    component: 'HTML Sanitizer (sanitize-html)',
    protection: 'Strips dangerous tags (script, iframe, object, embed) via allowlist'
  },
  {
    layer: 4,
    component: 'Link Processor',
    protection: 'Adds rel="noopener noreferrer" to external links, prevents window.opener access'
  },
  {
    layer: 5,
    component: 'React Rendering',
    protection: 'Server-side rendering prevents client-side script injection'
  }
];
```

### Dangerous Input Examples

```typescript
/**
 * Examples of dangerous inputs and how they're handled
 */
const dangerousInputs = [
  {
    input: '<script>alert("XSS")</script>',
    afterMarked: '<p>&lt;script&gt;alert("XSS")&lt;/script&gt;</p>',
    afterSanitize: '<p>&lt;script&gt;alert("XSS")&lt;/script&gt;</p>',
    result: 'SAFE - Script tags escaped or removed'
  },
  {
    input: '<iframe src="https://evil.com"></iframe>',
    afterMarked: '<iframe src="https://evil.com"></iframe>',
    afterSanitize: '',
    result: 'SAFE - iframe tag stripped by sanitizer'
  },
  {
    input: '<a href="javascript:alert(1)">Click</a>',
    afterMarked: '<a href="javascript:alert(1)">Click</a>',
    afterSanitize: '<a>Click</a>',
    result: 'SAFE - javascript: scheme removed, href stripped'
  },
  {
    input: '<img src=x onerror="alert(1)">',
    afterMarked: '<img src=x onerror="alert(1)">',
    afterSanitize: '',
    result: 'SAFE - img tag not in allowlist (if img not allowed), or onerror attribute stripped'
  }
];
```

---

## 8. Performance Considerations

### Bundle Size Impact

```typescript
/**
 * Bundle size analysis for rendering libraries
 */
interface BundleSizeImpact {
  library: string;
  minified: string;
  gzipped: string;
  location: 'client' | 'server' | 'both';
}

const bundleSizes: BundleSizeImpact[] = [
  {
    library: 'marked',
    minified: '31 KB',
    gzipped: '11 KB',
    location: 'server'
  },
  {
    library: 'sanitize-html',
    minified: '~60 KB',
    gzipped: '~20 KB',
    location: 'server'
  },
  {
    library: 'shiki',
    minified: 'N/A (build-time only)',
    gzipped: '0 KB',
    location: 'server'
  }
];

// Total client bundle impact: 0 KB (all server-side)
// Total server bundle impact: ~31 KB gzipped
```

### Rendering Performance

```typescript
/**
 * Performance characteristics of markdown rendering
 */
interface PerformanceMetrics {
  stage: string;
  operation: string;
  timing: string;
  optimization: string;
}

const performanceMetrics: PerformanceMetrics[] = [
  {
    stage: 'Build Time',
    operation: 'Parse all markdown files',
    timing: '~10-50ms per post',
    optimization: 'Cached at build time, not repeated on each request'
  },
  {
    stage: 'Server Render',
    operation: 'Process markdown paragraphs',
    timing: '~1-5ms per paragraph',
    optimization: 'Memoize parseMarkdown() for repeated content'
  },
  {
    stage: 'Client Load',
    operation: 'Hydrate React components',
    timing: 'Standard React hydration',
    optimization: 'No additional JavaScript for content rendering'
  },
  {
    stage: 'Syntax Highlighting',
    operation: 'Generate highlighted code',
    timing: '~5-20ms per code block',
    optimization: 'Build-time only, outputs static HTML'
  }
];
```

---

## 9. Testing Data Model

### Test Input Structures

```typescript
/**
 * Test cases for markdown rendering pipeline
 */
interface TestCase {
  name: string;
  input: string;
  expectedOutput: string;
  testLayer: 'marked' | 'shiki' | 'sanitize' | 'links' | 'full';
}

const testCases: TestCase[] = [
  // Basic formatting tests
  {
    name: 'Bold text',
    input: '**bold**',
    expectedOutput: '<p><strong>bold</strong></p>',
    testLayer: 'marked'
  },
  {
    name: 'Italic text',
    input: '*italic*',
    expectedOutput: '<p><em>italic</em></p>',
    testLayer: 'marked'
  },
  {
    name: 'Inline code',
    input: '`code`',
    expectedOutput: '<p><code>code</code></p>',
    testLayer: 'marked'
  },
  
  // Link tests
  {
    name: 'External link',
    input: '[Example](https://example.com)',
    expectedOutput: '<p><a href="https://example.com" target="_blank" rel="noopener noreferrer">Example</a></p>',
    testLayer: 'full'
  },
  {
    name: 'Internal link',
    input: '[About](/about)',
    expectedOutput: '<p><a href="/about">About</a></p>',
    testLayer: 'full'
  },
  
  // Code block tests
  {
    name: 'Code block with language',
    input: '```typescript\nconst x = 1;\n```',
    expectedOutput: '<pre class="shiki"><code>...(highlighted HTML)...</code></pre>',
    testLayer: 'shiki'
  },
  
  // Security tests
  {
    name: 'Script tag injection',
    input: '<script>alert("xss")</script>',
    expectedOutput: '<p>&lt;script&gt;alert("xss")&lt;/script&gt;</p>',
    testLayer: 'sanitize'
  },
  {
    name: 'Iframe injection',
    input: '<iframe src="evil.com"></iframe>',
    expectedOutput: '',
    testLayer: 'sanitize'
  }
];
```

---

## 10. Migration Strategy

### No Breaking Changes Required

```typescript
/**
 * Migration checklist for implementing markdown rendering
 * 
 * ✅ NO changes to BlogPost interface
 * ✅ NO changes to lib/posts.ts data loading
 * ✅ NO changes to existing components (BlogCard, Header)
 * ✅ ONLY changes to BlogPostContent component
 */
interface MigrationStep {
  step: number;
  action: string;
  files: string[];
  breakingChange: boolean;
}

const migrationSteps: MigrationStep[] = [
  {
    step: 1,
    action: 'Install dependencies (marked, sanitize-html, shiki)',
    files: ['package.json'],
    breakingChange: false
  },
  {
    step: 2,
    action: 'Create lib/markdown.ts utility functions',
    files: ['lib/markdown.ts'],
    breakingChange: false
  },
  {
    step: 3,
    action: 'Update BlogPostContent component to use parseMarkdown()',
    files: ['components/BlogPostContent.tsx'],
    breakingChange: false
  },
  {
    step: 4,
    action: 'Add CSS for code syntax highlighting',
    files: ['app/globals.css'],
    breakingChange: false
  },
  {
    step: 5,
    action: 'Test with existing markdown posts',
    files: ['lib/posts/*.md'],
    breakingChange: false
  }
];
```

### Data Flow Remains Identical

```
BEFORE (plain text rendering):
  getAllPosts() → BlogPost[] → content: string[] → BlogPostContent → {paragraph}

AFTER (markdown rendering):
  getAllPosts() → BlogPost[] → content: string[] → BlogPostContent → parseMarkdown(paragraph) → {HTML}

Key point: BlogPost.content structure unchanged
```

---

## Summary

This data model document defines:

1. **Existing BlogPost Interface**: `content: string[]` remains unchanged (FR-012)
2. **HTML Rendering Pipeline**: 4-step transformation (marked → shiki → sanitize → links)
3. **Component Architecture**: `BlogPostContent` maps over content array, applies `parseMarkdown()`
4. **Utility Functions**: Core functions in `lib/markdown.ts` for parsing, sanitizing, highlighting
5. **Configuration Objects**: Settings for marked, sanitize-html, and shiki
6. **Security Model**: Multi-layer XSS prevention strategy
7. **Performance**: Server-side only, 0 KB client bundle impact, ~31 KB server impact
8. **Testing**: Test cases for each pipeline layer
9. **Migration**: No breaking changes, backward compatible

**Key Design Decisions**:
- ✅ Preserve existing `BlogPost` interface
- ✅ Server-side rendering only (no client JS)
- ✅ Build-time syntax highlighting (static HTML)
- ✅ Multi-layer security (marked + sanitize-html + link processing)
- ✅ External links open in new tab with security attrs
- ✅ Minimal bundle size impact (<50KB gzipped, server-only)
