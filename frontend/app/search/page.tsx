'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import ContentGrid from '@/components/home/ContentGrid';
import { Content } from '@/lib/types';
import { getContent } from '@/lib/api';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, []);

  const handleSearch = async (searchTerm?: string) => {
    const term = (searchTerm || query).trim();
    if (!term || term.length < 2) {
      alert('حداقل ۲ حرف وارد کنید');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);

    try {
      const data = await getContent({ search: term });
      setResults(data);
    } catch (err) {
      setError('خطا در جستجو. مطمئن شوید بک‌اند روشن است.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (content: Content) => {
    router.push(`/content/${content.slug}`);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="hero-bg"></div>

        {/* هدر صفحه */}
        <div className="page-header">
          <h1 className="page-title">جستجو در سینماگرام</h1>
          <p className="page-subtitle">فیلم، سریال یا انیمه مورد علاقه‌ات رو پیدا کن</p>
        </div>

        {/* باکس جستجو */}
        <div className="section" style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '10px' }}>
          <div className="search-box" style={{ width: '100%', padding: '12px 20px', borderRadius: '50px' }}>
            <span style={{ fontSize: '18px' }}>🔍</span>
            <input
              type="text"
              placeholder="جستجو فیلم، سریال، انیمه..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              style={{ flex: 1, fontSize: '0.95rem' }}
              autoFocus
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              style={{ padding: '8px 20px', fontSize: '0.85rem' }}
            >
              {loading ? '...' : 'جستجو'}
            </button>
          </div>
        </div>

        {/* نتایج */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            در حال جستجو...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--accent)' }}>
            {error}
          </div>
        )}

        {!loading && searched && !error && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            نتیجه‌ای یافت نشد
          </div>
        )}

        {!loading && results.length > 0 && (
          <ContentGrid
            contents={results}
            title={`نتایج جستجو (${results.length})`}
            emoji="🔍"
            onCardClick={handleCardClick}
          />
        )}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}