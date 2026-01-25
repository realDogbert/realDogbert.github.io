/**
 * Static Blog Posts Data
 * 
 * This file contains the blog post data for the site.
 * Posts are statically defined and generated at build time.
 */

import { BlogPost } from './types';
import { calculateReadTime } from './utils';

export const posts: BlogPost[] = [
  {
    title: "Getting Started with Next.js App Router",
    slug: "getting-started-nextjs-app-router",
    excerpt: "Learn the fundamentals of Next.js 16 and build your first static site with the App Router. This guide covers everything from project setup to deployment on modern hosting platforms.",
    content: [
      "Next.js has revolutionized the way we build React applications by providing a powerful framework with built-in optimizations and developer-friendly features. The App Router, introduced in Next.js 13 and refined in version 16, brings React Server Components to the forefront, enabling better performance and simpler data fetching patterns.",
      "The App Router uses a file-system based routing approach where folders define routes and special files like page.tsx define the UI. This makes it incredibly intuitive to structure your application and understand the routing hierarchy at a glance.",
      "Setting up a Next.js project is straightforward. With create-next-app, you can scaffold a new application in seconds and start building immediately. The CLI walks you through configuration options like TypeScript support and styling preferences.",
      "Static site generation (SSG) is one of Next.js's most powerful features. It pre-renders pages at build time, resulting in fast load times and excellent SEO. For blogs and content sites, this approach provides the best of both worlds: dynamic development experience with static performance.",
      "Whether you're building a blog, documentation site, or marketing page, Next.js provides the tools you need to create fast, accessible, and maintainable web applications. The framework's opinionated approach helps you make the right choices without getting bogged down in configuration."
    ],
    publishedAt: new Date('2026-01-20'),
    readTime: 0, // Will be calculated below
    author: "Blog Author"
  },
  {
    title: "The Power of TypeScript in Modern Web Development",
    slug: "power-of-typescript-modern-web",
    excerpt: "Discover how TypeScript enhances JavaScript development with static typing, better tooling, and improved code quality. Learn why TypeScript has become the standard for modern web applications.",
    content: [
      "TypeScript has become the de facto standard for building scalable JavaScript applications. By adding static type checking to JavaScript, TypeScript catches errors at compile time rather than runtime, saving countless hours of debugging and reducing production bugs.",
      "One of TypeScript's greatest strengths is its gradual adoption path. You can start with JavaScript and incrementally add types as your project grows. The compiler is forgiving, allowing you to benefit from type checking while still being productive.",
      "Modern editors like VS Code provide incredible TypeScript support out of the box. Autocomplete, inline documentation, and intelligent refactoring make development faster and more enjoyable. The tooling alone is reason enough to adopt TypeScript.",
      "TypeScript's type system is surprisingly powerful, supporting advanced patterns like generics, conditional types, and mapped types. These features enable you to write expressive, reusable code while maintaining complete type safety.",
      "The TypeScript community and ecosystem are thriving. Nearly every major JavaScript library now ships with TypeScript definitions, and the language continues to evolve with new features that make it even more powerful and developer-friendly.",
      "Whether you're working on a small side project or a large enterprise application, TypeScript provides the safety net and developer experience improvements that make it worth the minimal learning curve. Once you experience typed JavaScript, it's hard to go back."
    ],
    publishedAt: new Date('2026-01-15'),
    readTime: 0, // Will be calculated below
    author: "Blog Author"
  },
  {
    title: "Building Accessible Web Applications",
    slug: "building-accessible-web-applications",
    excerpt: "Accessibility is not optional. Learn practical techniques for making your web applications usable by everyone, including people with disabilities. Discover tools and best practices for WCAG compliance.",
    content: [
      "Web accessibility ensures that websites and applications are usable by everyone, including people with disabilities. It's not just a legal requirement in many jurisdictions—it's the right thing to do. Making your site accessible opens it up to a broader audience and improves the experience for all users.",
      "Semantic HTML is the foundation of accessibility. Using proper heading hierarchies, landmark elements like nav and main, and semantic tags like article and section helps screen readers understand your page structure. This costs nothing but provides immense value.",
      "Color contrast is critical for users with visual impairments. WCAG AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Tools like the WebAIM contrast checker make it easy to verify your color choices meet these standards.",
      "Keyboard navigation is essential for users who cannot use a mouse. Every interactive element should be reachable via Tab, and the focus indicator should be clearly visible. Testing your site with just a keyboard reveals issues that might otherwise go unnoticed.",
      "ARIA (Accessible Rich Internet Applications) attributes provide additional context to assistive technologies when semantic HTML isn't enough. However, the first rule of ARIA is to not use ARIA—prefer native HTML elements whenever possible, and only add ARIA when necessary to communicate meaning that HTML alone cannot express."
    ],
    publishedAt: new Date('2026-01-10'),
    readTime: 0, // Will be calculated below
    author: "Blog Author"
  }
];

// Calculate read times for all posts
posts.forEach(post => {
  post.readTime = calculateReadTime(post.content);
});

// Sort posts by date (newest first)
posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
