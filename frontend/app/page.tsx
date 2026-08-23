'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import CategoryTabs from '@/components/home/CategoryTabs';
import ContentGrid from '@/components/home/ContentGrid';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import { Content } from '@/lib/types';
import { getContent } from '@/lib/api';

export default function Home() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('movies');
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let params: Record<string, string> = {};
        if (activeCategory !== 'all') {
          const singular = activeCategory === 'movies' ? 'movie' : activeCategory;
          params = { type: singular };
        }
        const data = await getContent(params);
        setContents(data);
        setError('');
      } catch (err) {
        setError('خطا در دریافت داده‌ها');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeCategory]);

  const handleCardClick = (content: Content) => {
    router.push(`/content/${content.slug}`);
  };

  const titles: Record<string, { title: string; emoji: string }> = {
    movies: { title: 'فیلم‌های پیشنهادی', emoji: '🎬' },
    series: { title: 'سریال‌های داغ', emoji: '📺' },
    anime: { title: 'انیمه‌های محبوب', emoji: '✨' },
    all: { title: 'همه عناوین', emoji: '🌟' },
  };

  const { title, emoji } = titles[activeCategory] || titles.movies;

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎞️</div>
            <div className="stat-number">۱۲,۰۰۰+</div>
            <div className="stat-label">عنوان</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-number">۸۵,۰۰۰+</div>
            <div className="stat-label">کاربر فعال</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">۴.۸</div>
            <div className="stat-label">امتیاز</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎭</div>
            <div className="stat-number">۲۰+</div>
            <div className="stat-label">ژانر</div>
          </div>
        </div>

        <section id="content">
          <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          {loading && <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>در حال بارگذاری...</div>}
          {error && <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>{error}</div>}
          {!loading && !error && contents.length > 0 && (
            <ContentGrid contents={contents} title={title} emoji={emoji} onCardClick={handleCardClick} />
          )}
        </section>
      </main>
      <div className="footer">
        © ۱۴۰۵ سینماگرام — تمامی حقوق محفوظ است
      </div>
      <BackToTop />
    </>
  );
}