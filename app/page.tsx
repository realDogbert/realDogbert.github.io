import Header from '@/components/Header';
import TagFilteredPostList from '@/components/TagFilteredPostList';
import { posts } from '@/lib/posts';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 pt-16 sm:pt-24 pb-12">
        <Header tagline="Wer nicht auf das Kleine schaut, scheitert am Großem." />

        <section>
          <h2 className="text-xs font-body font-semibold tracking-widest uppercase text-neutral-300 mb-2 animate-fade-in">
            Neueste Beiträge
          </h2>
          <TagFilteredPostList posts={posts} />
        </section>
      </div>
    </div>
  );
}
