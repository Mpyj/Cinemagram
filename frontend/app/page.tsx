'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import CategoryTabs from '@/components/home/CategoryTabs';
import ContentGrid from '@/components/home/ContentGrid';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import { Content } from '@/lib/types';

const sampleMovies: Content[] = [
  {
    id: 1,
    title: 'اینتراستلر',
    slug: 'interstellar',
    description: 'تیمی از کاوش‌گران فضایی برای یافتن خانه‌ای جدید برای بشر، از طریق یک سوراخ کرمی به کاوش می‌پردازند.',
    type: 'movie',
    status: 'published',
    release_year: 2014,
    rating: 8.6,
    views_count: 1200,
    genres: [
      { id: 1, name: 'علمی-تخیلی', slug: 'sci-fi' },
      { id: 2, name: 'ماجراجویی', slug: 'adventure' },
    ],
    created_at: '2024-01-01',
  },
  {
    id: 2,
    title: 'اوپنهایمر',
    slug: 'oppenheimer',
    description: 'زندگی جی. رابرت اوپنهایمر، فیزیکدان آمریکایی که در توسعه بمب اتمی نقش کلیدی داشت.',
    type: 'movie',
    status: 'published',
    release_year: 2023,
    rating: 8.3,
    views_count: 980,
    genres: [
      { id: 3, name: 'درام', slug: 'drama' },
    ],
    created_at: '2024-01-02',
  },
];

const sampleSeries: Content[] = [
  {
    id: 3,
    title: 'بریکینگ بد',
    slug: 'breaking-bad',
    description: 'یک معلم شیمی به ساخت مواد مخدر می‌پردازد.',
    type: 'series',
    status: 'published',
    release_year: 2008,
    rating: 9.5,
    views_count: 2500,
    genres: [
      { id: 5, name: 'جرایم', slug: 'crime' },
    ],
    created_at: '2024-01-03',
  },
];

const sampleAnime: Content[] = [
  {
    id: 4,
    title: 'حمله تیتان‌ها',
    slug: 'attack-on-titan',
    description: 'بشر در برابر تیتان‌های غول‌پیکر برای بقا می‌جنگد.',
    type: 'anime',
    status: 'published',
    release_year: 2013,
    rating: 9.0,
    views_count: 3000,
    genres: [
      { id: 6, name: 'اکشن', slug: 'action' },
    ],
    created_at: '2024-01-04',
  },
];

export default function Home() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('movies');

  const getFilteredContent = () => {
    switch (activeCategory) {
      case 'movies':
        return sampleMovies;
      case 'series':
        return sampleSeries;
      case 'anime':
        return sampleAnime;
      case 'all':
        return [...sampleMovies, ...sampleSeries, ...sampleAnime];
      default:
        return sampleMovies;
    }
  };

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
        
        <section id="movies">
          {activeCategory === 'movies' && (
            <ContentGrid 
              contents={sampleMovies} 
              title="فیلم‌های پیشنهادی" 
              emoji="🎬"
              onCardClick={handleCardClick}
            />
          )}
        </section>
        
        <section id="series">
          {activeCategory === 'series' && (
            <ContentGrid 
              contents={sampleSeries} 
              title="سریال‌های داغ" 
              emoji="📺"
              onCardClick={handleCardClick}
            />
          )}
        </section>
        
        <section id="anime">
          {activeCategory === 'anime' && (
            <ContentGrid 
              contents={sampleAnime} 
              title="انیمه‌های محبوب" 
              emoji="✨"
              onCardClick={handleCardClick}
            />
          )}
        </section>
        
        <section id="all">
          {activeCategory === 'all' && (
            <ContentGrid 
              contents={[...sampleMovies, ...sampleSeries, ...sampleAnime]} 
              title="همه عناوین" 
              emoji="🌟"
              onCardClick={handleCardClick}
            />
          )}
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}