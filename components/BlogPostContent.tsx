/**
 * BlogPostContent Component
 * 
 * Feature: 003-markdown-html-rendering
 * Purpose: Renders blog post content with markdown-to-HTML conversion
 * 
 * This is a Server Component (no 'use client' directive needed)
 */

import { BlogPostContentProps } from '@/lib/types';
import { parseMarkdown } from '@/lib/markdown';

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none">
      {post.content.map((paragraph, index) => {
        const html = parseMarkdown(paragraph);
        
        return (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: html }}
            className="mb-4"
          />
        );
      })}
    </article>
  );
}
