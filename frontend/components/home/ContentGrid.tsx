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
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3">
          <span className="text-3xl animate-bounce">{emoji}</span>
          {title}
        </h2>
        <span className="text-sm text-gray-500 bg-white/5 border border-white/10 rounded-full px-4 py-2">
          {contents.length} عنوان
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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