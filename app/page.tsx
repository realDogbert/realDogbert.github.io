import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import { posts } from '@/lib/posts';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4">
      <main className="max-w-2xl mx-auto">
        <Header tagline="Thoughts on web development, design, and technology" />
        
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
          Latest Posts
        </h1>
        
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}

