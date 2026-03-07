import { notFound } from 'next/navigation';
import Link from 'next/link';
import BlogPostContent from '@/components/BlogPostContent';
import { posts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { BlogPostPageProps } from '@/lib/types';

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
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 pt-12 sm:pt-20 pb-16">
        {/* Back link */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-body text-neutral-400 hover:text-orange transition-colors duration-200 mb-12 animate-fade-in"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">&larr;</span>
          Alle Beiträge
        </Link>

        <article>
          {/* Header */}
          <header className="mb-12 animate-fade-in-up">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-5">
              <time
                dateTime={post.publishedAt.toISOString()}
                className="text-xs font-body font-semibold tracking-widest uppercase text-orange"
              >
                {formatDate(post.publishedAt)}
              </time>
              <span className="text-neutral-300">/</span>
              <span className="text-xs font-body tracking-wide text-neutral-400">
                {post.readTime} Min. Lesedauer
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 tracking-tight leading-[1.1] mb-6">
              {post.title}
            </h1>

            {/* Divider */}
            <div className="w-12 h-[3px] bg-orange" aria-hidden="true" />
          </header>

          <BlogPostContent post={post} />
        </article>
      </div>
    </div>
  );
}
