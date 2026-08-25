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

const ITEMS_PER_PAGE = 20;

export default function Home() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('movies');
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let params: Record<string, string | number> = {
          skip: (page - 1) * ITEMS_PER_PAGE,
          limit: ITEMS_PER_PAGE,
        };
        if (activeCategory !== 'all') {
          const singular = activeCategory === 'movies' ? 'movie' : activeCategory;
          params.type = singular;
        }
        const data = await getContent(params);
        setContents(data.items);
        setTotalPages(data.total_pages);
        setTotal(data.total);
        setError('');
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('خطا در دریافت داده‌ها');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeCategory, page]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setPage(1);
    // اسکرول نرم به بخش محتوا
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // اسکرول نرم به بخش محتوا
    document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎞️</div>
            <div className="stat-number">{total.toLocaleString('fa-IR')}+</div>
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
          <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
          
          {loading && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              در حال بارگذاری...
            </div>
          )}
          
          {error && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
              {error}
            </div>
          )}
          
          {!loading && !error && contents.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              محتوایی یافت نشد
            </div>
          )}
          
          {!loading && !error && contents.length > 0 && (
            <ContentGrid
              contents={contents}
              title={`${title} (${total.toLocaleString('fa-IR')})`}
              emoji={emoji}
              onCardClick={handleCardClick}
            />
          )}

          {/* صفحه‌بندی */}
          {!loading && totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', padding: '20px 16px', flexWrap: 'wrap' }}>
              {/* دکمه قبلی */}
              <button
                className="btn-secondary"
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                style={{
                  padding: '8px 14px',
                  fontSize: '0.75rem',
                  opacity: page === 1 ? 0.4 : 1,
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                ⬅ قبلی
              </button>

              {/* شماره صفحه اول */}
              {getPageNumbers()[0] > 1 && (
                <>
                  <button
                    className={`tab ${page === 1 ? 'active' : ''}`}
                    onClick={() => handlePageChange(1)}
                    style={{ padding: '8px 12px', fontSize: '0.75rem' }}
                  >
                    ۱
                  </button>
                  {getPageNumbers()[0] > 2 && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>...</span>
                  )}
                </>
              )}

              {/* شماره صفحات */}
              {getPageNumbers().map((p) => (
                <button
                  key={p}
                  className={`tab ${page === p ? 'active' : ''}`}
                  onClick={() => handlePageChange(p)}
                  style={{ padding: '8px 12px', fontSize: '0.75rem' }}
                >
                  {p.toLocaleString('fa-IR')}
                </button>
              ))}

              {/* شماره صفحه آخر */}
              {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                <>
                  {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>...</span>
                  )}
                  <button
                    className={`tab ${page === totalPages ? 'active' : ''}`}
                    onClick={() => handlePageChange(totalPages)}
                    style={{ padding: '8px 12px', fontSize: '0.75rem' }}
                  >
                    {totalPages.toLocaleString('fa-IR')}
                  </button>
                </>
              )}

              {/* دکمه بعدی */}
              <button
                className="btn-secondary"
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                style={{
                  padding: '8px 14px',
                  fontSize: '0.75rem',
                  opacity: page === totalPages ? 0.4 : 1,
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                }}
              >
                بعدی ➡
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}