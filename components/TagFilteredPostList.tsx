"use client";

import { useMemo, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { BlogPost } from "@/lib/types";

interface TagFilteredPostListProps {
  posts: BlogPost[];
}

export default function TagFilteredPostList({ posts }: TagFilteredPostListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // T006: Derive sorted unique tag list from all posts
  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).sort(),
    [posts]
  );

  // T007: Derive filtered post list based on active tag
  const filteredPosts = useMemo(
    () =>
      activeTag
        ? posts.filter((p) => p.tags.includes(activeTag))
        : posts,
    [posts, activeTag]
  );

  const handleTagClick = (tag: string) => {
    // Toggle off if same tag clicked again (US1 scenario 3)
    setActiveTag((current) => (current === tag ? null : tag));
  };

  return (
    <div>
      {/* T008: Tag filter bar */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Nach Tags filtern">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              aria-pressed={activeTag === tag}
              className={`px-3 py-1 rounded-full text-xs font-body font-semibold tracking-wide uppercase transition-colors duration-200 ${
                activeTag === tag
                  ? "bg-orange text-white"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-100"
              }`}
            >
              {tag}
            </button>
          ))}

          {/* T013: Reset button — only shown when a filter is active */}
          {activeTag !== null && (
            <button
              onClick={() => setActiveTag(null)}
              aria-label="Filter zurücksetzen — alle Beiträge anzeigen"
              className="px-3 py-1 rounded-full text-xs font-body font-semibold tracking-wide uppercase border border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-500 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors duration-200"
            >
              Alle Beiträge
            </button>
          )}
        </div>
      )}

      {/* T009: Filtered post list */}
      <div className="flex flex-col">
        {filteredPosts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}
