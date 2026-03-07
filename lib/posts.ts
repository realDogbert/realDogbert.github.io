/**
 * Blog Posts Loader
 * 
 * Reads blog posts from markdown files in the lib/posts directory.
 * Each markdown file has frontmatter with metadata and content body.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from './types';
import { calculateReadTime } from './utils';

const postsDirectory = path.join(process.cwd(), 'lib/posts');

/**
 * Get all blog posts from markdown files
 */
export function getAllPosts(): BlogPost[] {
  // Get all markdown files from the posts directory
  const fileNames = fs.readdirSync(postsDirectory);
  const markdownFiles = fileNames.filter(name => name.endsWith('.md'));

  const posts = markdownFiles.map(fileName => {
    // Read the file
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter and content
    const { data, content } = matter(fileContents);

    // Split content into paragraphs (split by double newlines)
    const paragraphs = content
      .trim()
      .split(/\n\n+/)
      .filter(p => p.trim().length > 0);

    // Create BlogPost object
    const post: BlogPost = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: paragraphs,
      publishedAt: new Date(data.published),
      readTime: calculateReadTime(paragraphs),
      author: data.author,
      tags: (data.tags ?? []).map((t: string) => t.toLowerCase().trim()),
    };

    return post;
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

// Export posts for use in components
export const posts = getAllPosts();
