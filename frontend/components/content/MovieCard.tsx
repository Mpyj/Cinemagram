'use client';

import { motion } from 'framer-motion';
import { Content } from '@/lib/types';

interface MovieCardProps {
  content: Content;
  index?: number;
  onClick?: (content: Content) => void;
}

export default function MovieCard({ content, index = 0, onClick }: MovieCardProps) {
  const getGradient = (type: string) => {
    switch (type) {
      case 'movie':
        return 'linear-gradient(135deg, #ff6b6b, #ff4500)';
      case 'series':
        return 'linear-gradient(135deg, #7c3aed, #4f46e5)';
      case 'anime':
        return 'linear-gradient(135deg, #06b6d4, #10b981)';
      default:
        return 'linear-gradient(135deg, #ff6b6b, #7c3aed)';
    }
  };

  const getEmoji = (type: string) => {
    switch (type) {
      case 'movie':
        return '🎬';
      case 'series':
        return '📺';
      case 'anime':
        return '✨';
      default:
        return '🎬';
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      onClick={() => onClick?.(content)}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer backdrop-blur-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50"
    >
      <div className="relative w-full h-[300px] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: getGradient(content.type) }}
        />
        <span className="text-7xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          {getEmoji(content.type)}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 w-14 h-14 rounded-full bg-white/20 backdrop-blur-lg border-2 border-white/30 flex items-center justify-center text-xl z-10">
          ▶
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 truncate group-hover:text-red-400 transition-colors">
          {content.title}
        </h3>
        <div className="flex gap-3 text-xs text-gray-500 mb-3 flex-wrap">
          <span>📅 {content.release_year || 'نامشخص'}</span>
          <span>
            ⏱️ {content.type === 'movie' ? '۱۳۰ دقیقه' : content.type === 'series' ? '۸ فصل' : '۲۴ قسمت'}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-yellow-500">{content.rating || 'N/A'}</span>
          <span className="text-yellow-500 text-sm">★★★★★</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {content.genres?.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-400 group-hover:bg-white/10 group-hover:text-white transition-colors"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}