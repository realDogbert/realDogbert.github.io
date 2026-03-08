"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/BlogCard";
import TagCloud from "@/components/TagCloud";
import { BlogPost } from "@/lib/types";

interface BlogWithSidebarProps {
  posts: BlogPost[];
}

export default function BlogWithSidebar({ posts }: BlogWithSidebarProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts),
    [posts, activeTag]
  );

  const handleTagClick = (tag: string) => {
    setActiveTag((current) => (current === tag ? null : tag));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-8 lg:gap-16 items-start">
      {/* Posts column — visually first on desktop, second in DOM order on mobile */}
      <div className="order-2 lg:order-1">
        <h2 className="text-xs font-body font-semibold tracking-widest uppercase text-neutral-300 dark:text-neutral-600 mb-2 animate-fade-in">
          {activeTag ? `#${activeTag}` : "Neueste Beiträge"}
        </h2>
        <div className="flex flex-col">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>

      {/* Sidebar — visually second on desktop, first on mobile (filter before browsing) */}
      <aside className="order-1 lg:order-2">
        <TagCloud
          posts={posts}
          activeTag={activeTag}
          onTagClick={handleTagClick}
          onReset={() => setActiveTag(null)}
        />
      </aside>
    </div>
  );
}
