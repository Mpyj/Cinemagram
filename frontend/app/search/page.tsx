'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentGrid from '@/components/home/ContentGrid';
import { useSearch } from '@/hooks/useSearch';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { results, loading } = useSearch(query);

  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-primary)] min-h-screen pt-[76px]">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-black mb-6 text-[var(--text-primary)]">جستجو</h1>
          
          <div className="mb-8">
            <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-glass)] rounded-full px-6 py-4">
              <span className="text-xl">🔍</span>
              <input
                type="text"
                placeholder="جستجو فیلم، سریال، انیمه..."
                className="bg-transparent outline-none text-[var(--text-primary)] w-full text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          {loading && (
            <div className="text-center py-10 text-[var(--text-muted)]">
              در حال جستجو...
            </div>
          )}

          {!loading && query.length >= 2 && results.length === 0 && (
            <div className="text-center py-10 text-[var(--text-muted)]">
              نتیجه‌ای یافت نشد
            </div>
          )}

          {results.length > 0 && (
            <ContentGrid 
              contents={results} 
              title={`نتایج جستجو (${results.length})`} 
              emoji="🔍"
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}