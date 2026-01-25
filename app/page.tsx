import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import { posts } from '@/lib/posts';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4">
      <main className="max-w-2xl mx-auto">
        <Header tagline="Wer nicht auf das Kleine schaut, scheitert am Großem." />
        
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}

