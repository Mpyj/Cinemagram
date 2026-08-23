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
        const params = activeCategory !== 'all' ? { type: activeCategory } : {};
        const data = await getContent(params);
        setContents(data);
        setError('');
      } catch (err) {
        setError('خطا در دریافت داده‌ها. مطمئن شوید بک‌اند روشن است.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCategory]);

  const getTitle = () => {
    switch (activeCategory) {
      case 'movies':
        return { title: 'فیلم‌های پیشنهادی', emoji: '🎬' };
      case 'series':
        return { title: 'سریال‌های داغ', emoji: '📺' };
      case 'anime':
        return { title: 'انیمه‌های محبوب', emoji: '✨' };
      case 'all':
        return { title: 'همه عناوین', emoji: '🌟' };
      default:
        return { title: 'فیلم‌های پیشنهادی', emoji: '🎬' };
    }
  };

  const { title, emoji } = getTitle();

  const handleCardClick = (content: Content) => {
    router.push(`/content/${content.slug}`);
  };

  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-primary)] min-h-screen">
        <section id="home">
          <Hero />
        </section>
        
        <section id="categories">
          <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        </section>
        
        <section id="content">
          {loading && (
            <div className="text-center py-10 text-[var(--text-muted)]">
              در حال بارگذاری...
            </div>
          )}
          
          {error && (
            <div className="text-center py-10 text-red-400">
              {error}
            </div>
          )}
          
          {!loading && !error && contents.length > 0 && (
            <ContentGrid 
              contents={contents} 
              title={title} 
              emoji={emoji}
              onCardClick={handleCardClick}
            />
          )}
          
          {!loading && !error && contents.length === 0 && (
            <div className="text-center py-10 text-[var(--text-muted)]">
              محتوایی یافت نشد
            </div>
          )}
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}