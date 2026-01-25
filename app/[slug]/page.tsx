import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import BlogPostContent from '@/components/BlogPostContent';
import { posts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { BlogPostPageProps } from '@/lib/types';

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4">
      <main className="max-w-2xl mx-auto">
        <Header tagline="Thoughts on web development, design, and technology" />
        
        <Link 
          href="/" 
          className="inline-flex items-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-8 transition-colors"
        >
          ← Back to all posts
        </Link>
        
        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              <time dateTime={post.publishedAt.toISOString()}>
                {formatDate(post.publishedAt)}
              </time>
              <span>•</span>
              <span>{post.readTime} min read</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>
          </header>
          
          <BlogPostContent post={post} />
        </article>
      </main>
    </div>
  );
}
