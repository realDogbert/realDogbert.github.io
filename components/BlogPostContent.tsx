import { BlogPostContentProps } from '@/lib/types';
import { parseMarkdown } from '@/lib/markdown';

export default function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="prose dark:prose-invert max-w-none animate-fade-in stagger-3">
      {post.content.map((paragraph, index) => {
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
