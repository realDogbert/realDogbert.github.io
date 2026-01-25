import Link from 'next/link';
import { BlogCardProps } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/${post.slug}`} className="block">
      <article className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
          {post.title}
        </h2>
        
        <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-3">
          <time dateTime={post.publishedAt.toISOString()}>
            {formatDate(post.publishedAt)}
          </time>
          <span>•</span>
          <span>{post.readTime} Min. Lesedauer</span>
        </div>
        
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          {post.excerpt}
        </p>
      </article>
    </Link>
  );
}
