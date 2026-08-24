'use client';

import { Content } from '@/lib/types';

interface MovieCardProps {
  content: Content;
  index?: number;
  onClick?: (content: Content) => void;
}

export default function MovieCard({ content, index = 0, onClick }: MovieCardProps) {
  const getPosterBg = (type: string) => {
    switch (type) {
      case 'movie': return 'linear-gradient(135deg, #2d1b5e, #4a1d3a)';
      case 'series': return 'linear-gradient(135deg, #0a3d4a, #1b2d5e)';
      case 'anime': return 'linear-gradient(135deg, #3d2d0a, #4a1d3a)';
      default: return 'linear-gradient(135deg, #2d1b5e, #4a1d3a)';
    }
  };

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
        {content.poster_url ? (
          <img
            src={content.poster_url}
            alt={content.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          getEmoji(content.type)
        )}
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