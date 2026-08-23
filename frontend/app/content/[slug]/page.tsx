'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import { Content, Episode } from '@/lib/types';
import { getContentBySlug, getEpisodes } from '@/lib/api';

export default function ContentDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [content, setContent] = useState<Content | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getContentBySlug(slug);
        setContent(data);

        if (data.type === 'series' || data.type === 'anime') {
          const eps = await getEpisodes(data.id);
          setEpisodes(eps);
        }
      } catch (err) {
        setError('خطا در دریافت اطلاعات');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

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

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="bg-[var(--bg-primary)] min-h-screen pt-[76px] flex items-center justify-center">
          <div className="text-2xl text-[var(--text-muted)]">در حال بارگذاری...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !content) {
    return (
      <>
        <Navbar />
        <main className="bg-[var(--bg-primary)] min-h-screen pt-[76px] flex items-center justify-center">
          <div className="text-xl text-red-400">{error || 'محتوا یافت نشد'}</div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-primary)] min-h-screen pt-[76px]">
        {/* بنر */}
        <div
          className="relative h-[400px] md:h-[500px] flex items-center justify-center"
          style={{ background: getGradient(content.type) }}
        >
          <span className="text-[120px] md:text-[160px]">{getEmoji(content.type)}</span>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto px-4 -mt-40 relative z-10">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-3xl p-6 md:p-10">
            {/* عنوان */}
            <h1 className="text-3xl md:text-4xl font-black mb-4 text-[var(--text-primary)]">
              {content.title}
            </h1>

            {/* متا */}
            <div className="flex gap-4 text-sm text-[var(--text-secondary)] mb-4 flex-wrap">
              <span>📅 {content.release_year || 'نامشخص'}</span>
              <span>🎭 {content.genres?.map(g => g.name).join('، ') || 'نامشخص'}</span>
              <span>
                {content.type === 'movie' ? '🎬 فیلم' : content.type === 'series' ? '📺 سریال' : '✨ انیمه'}
              </span>
              {content.country && <span>🌍 {content.country}</span>}
              {content.language && <span>🗣 {content.language}</span>}
            </div>

            {/* امتیاز */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black text-yellow-500">{content.rating || 'N/A'}</span>
              <span className="text-yellow-500 text-xl">
                {'★'.repeat(Math.round((content.rating || 0) / 2))}
                {'☆'.repeat(5 - Math.round((content.rating || 0) / 2))}
              </span>
              <span className="text-sm text-[var(--text-muted)]">
                {content.views_count.toLocaleString('fa-IR')} بازدید
              </span>
            </div>

            {/* ژانرها */}
            <div className="flex gap-2 flex-wrap mb-6">
              {content.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-4 py-1.5 rounded-full text-sm bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-secondary)]"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* توضیحات */}
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              {content.description || 'توضیحاتی ثبت نشده است.'}
            </p>

            {/* دکمه‌ها */}
            <div className="flex gap-3 flex-wrap mb-8">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 text-white font-bold hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 transition-all">
                <span>▶</span>
                تماشا
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-primary)] font-bold hover:bg-[var(--bg-card-hover)] hover:-translate-y-0.5 transition-all">
                <span>❤️</span>
                افزودن به علاقه‌مندی‌ها
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-primary)] font-bold hover:bg-[var(--bg-card-hover)] hover:-translate-y-0.5 transition-all">
                <span>📤</span>
                اشتراک‌گذاری
              </button>
            </div>

            {/* اپیزودها */}
            {(content.type === 'series' || content.type === 'anime') && episodes.length > 0 && (
              <div className="border-t border-[var(--border-glass)] pt-6">
                <h2 className="text-xl font-black mb-4 text-[var(--text-primary)]">
                  📋 اپیزودها
                </h2>
                <div className="space-y-3">
                  {episodes.map((episode) => (
                    <div
                      key={episode.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-glass)] hover:bg-[var(--bg-card-hover)] transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-400 to-purple-500 flex items-center justify-center text-white font-bold">
                        {episode.episode_number}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[var(--text-primary)]">
                          {episode.title || `قسمت ${episode.episode_number}`}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)]">
                          فصل {episode.season_number} • قسمت {episode.episode_number}
                        </p>
                      </div>
                      <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-all">
                        ▶ پخش
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}