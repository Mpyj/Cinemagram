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
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">{emoji} {title}</h2>
        <span className="section-count">{contents.length} عنوان</span>
      </div>
      <div className="cards-grid">
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