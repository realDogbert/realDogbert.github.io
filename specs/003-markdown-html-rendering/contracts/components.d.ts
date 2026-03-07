/**
 * Component Contracts
 * 
 * Feature: 003-markdown-html-rendering
 * Purpose: Define React component interfaces for markdown content rendering
 */

import { ReactNode } from 'react';

/**
 * BlogPostContent Component Props
 * 
 * Server Component that renders markdown content as HTML.
 * Receives content: string[] from BlogPost and applies markdown parsing
 * to each paragraph individually.
 */
export interface BlogPostContentProps {
  /** Array of markdown paragraph strings from BlogPost.content */
  content: string[];
  
  /** Optional CSS class for content wrapper */
  className?: string;
  
  /** Optional wrapper element (default: 'article') */
  as?: 'article' | 'section' | 'div';
}

/**
 * BlogPostContent Component Return Type
 * 
 * Renders as Server Component (no 'use client' directive needed).
 */
export type BlogPostContentComponent = (props: BlogPostContentProps) => ReactNode;

/**
 * Individual Paragraph Renderer Props
 * 
 * Internal component for rendering single markdown paragraph.
 */
export interface MarkdownParagraphProps {
  /** Raw markdown string for single paragraph */
  markdown: string;
  
  /** Paragraph index in content array (for React keys) */
  index: number;
  
  /** Optional CSS class for paragraph wrapper */
  className?: string;
}

/**
 * Code Block Component Props
 * 
 * Optional: If code blocks are rendered as React components instead of
 * dangerouslySetInnerHTML. Provides better type safety and accessibility.
 */
export interface CodeBlockProps {
  /** Raw code content */
  code: string;
  
  /** Programming language identifier */
  language: string;
  
  /** Optional title for code block */
  title?: string;
  
  /** Whether to show line numbers */
  showLineNumbers?: boolean;
}

/**
 * Link Component Props
 * 
 * Optional: If links are rendered as React components for better control.
 */
export interface MarkdownLinkProps {
  /** Link destination URL */
  href: string;
  
  /** Link text content */
  children: ReactNode;
  
  /** Link title attribute */
  title?: string;
  
  /** Whether link is external (determines target/rel attributes) */
  external?: boolean;
}
