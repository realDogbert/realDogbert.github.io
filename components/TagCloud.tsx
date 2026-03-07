"use client";

import { useMemo } from "react";
import { BlogPost } from "@/lib/types";

interface TagCloudProps {
  posts: BlogPost[];
  activeTag: string | null;
  onTagClick: (tag: string) => void;
  onReset: () => void;
}

export default function TagCloud({ posts, activeTag, onTagClick, onReset }: TagCloudProps) {
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const post of posts) {
      for (const tag of post.tags) {
        counts[tag] = (counts[tag] ?? 0) + 1;
      }
    }
    return counts;
  }, [posts]);

  const sortedTags = useMemo(
    () =>
      Object.entries(tagCounts)
        .sort(([a, ca], [b, cb]) => cb - ca || a.localeCompare(b))
        .map(([tag]) => tag),
    [tagCounts]
  );

  const maxCount = Math.max(...Object.values(tagCounts), 1);

  if (sortedTags.length === 0) return null;

  return (
    <div className="sticky top-8 pt-5">
      {/* Heading */}
      <div className="mb-5">
        <h3 className="font-display italic text-[0.65rem] tracking-[0.22em] uppercase text-orange">
          Tags
        </h3>
      </div>

      {/* Tag cloud */}
      <div
        className="flex flex-wrap gap-x-3 gap-y-3"
        role="group"
        aria-label="Nach Themen filtern"
      >
        {sortedTags.map((tag) => {
          const count = tagCounts[tag];
          const isActive = activeTag === tag;
          const scale = count / maxCount;
          // font-size: 0.75rem (smallest) → 1.25rem (most frequent)
          const fontSize = 0.75 + scale * 0.5;
          // opacity for inactive: 0.38 (rare) → 0.78 (frequent)
          const baseOpacity = 0.38 + scale * 0.4;

          return (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              aria-pressed={isActive}
              style={
                isActive
                  ? { fontSize: `${fontSize}rem` }
                  : { fontSize: `${fontSize}rem`, opacity: baseOpacity }
              }
              className={
                isActive
                  ? "font-body font-semibold tracking-wide text-white bg-orange rounded px-2 py-0.5 transition-all duration-200 leading-none"
                  : "font-body font-medium tracking-wide text-neutral-800 hover:text-orange hover:opacity-100 transition-all duration-200 leading-none"
              }
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Reset link — only when a tag is active */}
      {activeTag !== null && (
        <button
          onClick={onReset}
          aria-label="Themenfilter zurücksetzen — alle Beiträge anzeigen"
          className="mt-6 flex items-center gap-1.5 text-[0.65rem] font-body tracking-[0.15em] uppercase text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
        >
          <span aria-hidden="true" className="text-[0.8rem] leading-none">×</span>
          <span>Alle Beiträge</span>
        </button>
      )}
    </div>
  );
}
