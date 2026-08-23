'use client';

import { Content } from '@/lib/types';
import MovieCard from '@/components/content/MovieCard';

interface ContentGridProps {
  contents: Content[];
  title: string;
  emoji: string;
  onCardClick?: (content: Content) => void;
}

export default function ContentGrid({ contents, title, emoji, onCardClick }: ContentGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
      <div className="flex items-center justify-between mb-5 md:mb-6 flex-wrap gap-3">
        <h2 className="text-xl md:text-2xl font-extrabold flex items-center gap-2 text-[var(--text)]">
          <span className="text-2xl md:text-3xl">{emoji}</span>
          {title}
        </h2>
        <span className="text-xs md:text-sm text-[var(--text-muted)] bg-[var(--bg-card)] border border-[var(--border)] rounded-full px-4 py-1.5">
          {contents.length} عنوان
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {contents.map((content, index) => (
          <MovieCard
            key={content.id}
            content={content}
            index={index}
            onClick={onCardClick}
          />
        ))}
      </div>
    </section>
  );
}