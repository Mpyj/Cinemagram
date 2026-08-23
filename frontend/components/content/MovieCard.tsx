'use client';

import { motion } from 'framer-motion';
import { Content } from '@/lib/types';

interface MovieCardProps {
  content: Content;
  index?: number;
  onClick?: (content: Content) => void;
}

export default function MovieCard({ content, index = 0, onClick }: MovieCardProps) {
  const getPosterBg = (type: string) => {
    switch (type) {
      case 'movie':
        return 'linear-gradient(135deg, #2d1b5e, #4a1d3a)';
      case 'series':
        return 'linear-gradient(135deg, #0a3d4a, #1b2d5e)';
      case 'anime':
        return 'linear-gradient(135deg, #3d2d0a, #4a1d3a)';
      default:
        return 'linear-gradient(135deg, #2d1b5e, #4a1d3a)';
    }
  };

  const getEmoji = (type: string) => {
    switch (type) {
      case 'movie': return '🎬';
      case 'series': return '📺';
      case 'anime': return '✨';
      default: return '🎬';
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.03 }}
      whileTap={{ scale: 0.93 }}
      onClick={() => onClick?.(content)}
      className="group bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300 hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-hover)] hover:shadow-2xl hover:shadow-black/50"
    >
      <div
        className="relative h-[160px] sm:h-[180px] md:h-[190px] flex items-center justify-center text-4xl sm:text-5xl md:text-6xl transition-all duration-300 group-hover:brightness-125 group-hover:scale-105"
        style={{ background: getPosterBg(content.type) }}
      >
        {getEmoji(content.type)}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 w-11 h-11 rounded-full bg-black/50 border-2 border-white/30 flex items-center justify-center text-sm text-white">
          ▶
        </div>
      </div>

      <div className="p-3.5 md:p-4">
        <h3 className="text-sm font-bold mb-1 truncate text-[var(--text)]">
          {content.title}
        </h3>
        <div className="text-[#fdcb6e] font-bold text-xs">
          ⭐ {content.rating || 'N/A'}
        </div>
        <div className="flex gap-1.5 flex-wrap mt-2">
          {content.genres?.slice(0, 2).map((genre) => (
            <span
              key={genre.id}
              className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)]"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}