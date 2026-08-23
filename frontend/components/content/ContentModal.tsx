'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Content } from '@/lib/types';

interface ContentModalProps {
  content: Content | null;
  onClose: () => void;
}

export default function ContentModal({ content, onClose }: ContentModalProps) {
  if (!content) return null;

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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-start justify-center overflow-y-auto p-4 md:p-10"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-[#12121a] border border-white/10 rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl shadow-black/50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* دکمه بستن */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-red-500 transition-colors flex items-center justify-center"
          >
            ✕
          </button>

          {/* پوستر */}
          <div
            className="relative w-full h-64 md:h-80 flex items-center justify-center"
            style={{ background: getGradient(content.type) }}
          >
            <span className="text-8xl">{getEmoji(content.type)}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] to-transparent" />
          </div>

          {/* محتوا */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-4">{content.title}</h2>

            <div className="flex gap-4 text-sm text-gray-400 mb-4 flex-wrap">
              <span>📅 {content.release_year || 'نامشخص'}</span>
              <span>🎭 {content.genres?.map(g => g.name).join('، ') || 'نامشخص'}</span>
              <span>
                {content.type === 'movie' ? '🎬 فیلم' : content.type === 'series' ? '📺 سریال' : '✨ انیمه'}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-black text-yellow-500">{content.rating || 'N/A'}</span>
              <span className="text-yellow-500">
                {'★'.repeat(Math.round((content.rating || 0) / 2))}
                {'☆'.repeat(5 - Math.round((content.rating || 0) / 2))}
              </span>
            </div>

            <div className="flex gap-2 flex-wrap mb-4">
              {content.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-gray-400"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              {content.description || 'توضیحاتی ثبت نشده است.'}
            </p>

            <div className="flex gap-3 flex-wrap">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 text-white font-bold hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 transition-all">
                <span>❤️</span>
                افزودن به علاقه‌مندی‌ها
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:-translate-y-0.5 transition-all">
                <span>📤</span>
                اشتراک‌گذاری
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}