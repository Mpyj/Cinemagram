'use client';

import { Content } from '@/lib/types';

interface MovieCardProps {
  content: Content;
  index?: number;
  onClick?: (content: Content) => void;
}

export default function MovieCard({ content, index = 0, onClick }: MovieCardProps) {
  const getEmoji = (type: string) => {
    switch (type) {
      case 'movie': return '🚀';
      case 'series': return '🧪';
      case 'anime': return '🛡️';
      default: return '🎬';
    }
  };

  return (
    <div
      className="card"
      onClick={() => onClick?.(content)}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`card-poster ${content.type}`}>
        {getEmoji(content.type)}
        <div className="play-btn">▶</div>
      </div>
      <div className="card-info">
        <div className="card-title">{content.title}</div>
        <div className="card-rating">⭐ {content.rating || 'N/A'}</div>
        <div className="card-tags">
          {content.genres?.slice(0, 2).map((genre) => (
            <span key={genre.id} className="tag">{genre.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}