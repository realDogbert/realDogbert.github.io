import Link from 'next/link';
import { BlogCardProps } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function BlogCard({ post, index = 0 }: BlogCardProps & { index?: number }) {
  return (
    <Link href={`/${post.slug}`} className="group block">
      <article
        className={`py-8 border-b border-neutral-100 transition-all duration-300 animate-fade-in-up stagger-${Math.min(index + 1, 8)}`}
      >
        {/* Date & read time */}
        <div className="flex items-center gap-3 mb-3">
          <time
            dateTime={post.publishedAt.toISOString()}
            className="text-xs font-body font-semibold tracking-widest uppercase text-orange"
          >
            {formatDate(post.publishedAt)}
          </time>
          <span className="text-neutral-300">/</span>
          <span className="text-xs font-body tracking-wide text-neutral-400">
            {post.readTime} Min.
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-neutral-900 leading-snug mb-2 transition-colors duration-200 group-hover:text-orange">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-neutral-500 font-body text-[0.9375rem] leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        {/* Read more indicator */}
        <span className="inline-block mt-4 text-xs font-body font-medium tracking-widest uppercase text-neutral-300 transition-all duration-300 group-hover:text-orange group-hover:tracking-[0.2em]">
          Weiterlesen &rarr;
        </span>
      </article>
    </Link>
  );
}
