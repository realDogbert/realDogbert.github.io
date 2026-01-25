import { BlogPostContentProps } from '@/lib/types';

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      {post.content.map((paragraph, index) => (
        <p key={index} className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
