import Header from '@/components/Header';
import BlogWithSidebar from '@/components/BlogWithSidebar';
import { posts } from '@/lib/posts';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 pt-16 sm:pt-24 pb-12">
        <Header tagline="Wer nicht auf das Kleine schaut, scheitert am Großem." />

        <section>
          <BlogWithSidebar posts={posts} />
        </section>
      </div>
    </div>
  );
}
