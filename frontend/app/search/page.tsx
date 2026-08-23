'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
      console.error('Search error:', err);
      setError('خطا در جستجو');
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
      <main className="bg-[var(--bg-primary)] min-h-screen pt-[76px]">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-black mb-6 text-[var(--text-primary)]">جستجو</h1>
          
          <div className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="جستجو فیلم، سریال، انیمه..."
                className="flex-1 px-6 py-4 rounded-full bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-primary)] outline-none focus:border-purple-500 transition-colors"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
              />
              <button
                onClick={() => handleSearch()}
                disabled={loading}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 text-white font-bold hover:shadow-lg hover:shadow-red-500/30 transition-all disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? '...' : '🔍 جستجو'}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-center py-4 text-red-400">{error}</div>
          )}

          {loading && (
            <div className="text-center py-10 text-[var(--text-muted)]">در حال جستجو...</div>
          )}

          {!loading && searched && !error && results.length === 0 && (
            <div className="text-center py-10 text-[var(--text-muted)]">نتیجه‌ای یافت نشد</div>
          )}

          {!loading && results.length > 0 && (
            <ContentGrid 
              contents={results} 
              title={`نتایج جستجو (${results.length})`} 
              emoji="🔍"
              onCardClick={handleCardClick}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}