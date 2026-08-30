'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import ContentGrid from '@/components/home/ContentGrid';

import { Content, Genre } from '@/lib/types';
import { getContent, getGenres } from '@/lib/api';

function SearchContent() {
const router = useRouter();
const searchParams = useSearchParams();

const initialQuery = searchParams.get('q') || '';

const [query, setQuery] = useState('');
const [results, setResults] = useState<Content[]>([]);
const [genres, setGenres] = useState<Genre[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [searched, setSearched] = useState(false);

const [selectedType, setSelectedType] = useState('');
const [selectedGenre, setSelectedGenre] = useState('');
const [selectedYear, setSelectedYear] = useState('');
const [minRating, setMinRating] = useState('');
const [sortBy, setSortBy] = useState('created_at');
const [showFilters, setShowFilters] = useState(false);

useEffect(() => {
const loadGenres = async () => {
try {
const data = await getGenres();
setGenres(data);
} catch (err) {
console.error('Error fetching genres:', err);
}
};

loadGenres();

}, []);

useEffect(() => {
setQuery(initialQuery);

if (initialQuery) {
  handleSearch(initialQuery);
}

}, [initialQuery]);

const handleSearch = async (searchTerm?: string) => {
const term = (searchTerm ?? query).trim();

setLoading(true);
setError('');
setSearched(true);

try {
  const params: Record<string, string> = {};

  if (term) {
    params.search = term;
  }

  if (selectedType) {
    params.type = selectedType;
  }

  if (selectedGenre) {
    params.genre = selectedGenre;
  }

  if (selectedYear) {
    params.year = selectedYear;
  }

  if (minRating) {
    params.min_rating = minRating;
  }

  if (sortBy) {
    params.sort = sortBy;
  }

  const data = await getContent(params);

  setResults(data.items);
} catch (err) {
  console.error('Search error:', err);
  setError('خطا در جستجو');
  setResults([]);
} finally {
  setLoading(false);
}

};

const handleResetFilters = () => {
setSelectedType('');
setSelectedGenre('');
setSelectedYear('');
setMinRating('');
setSortBy('created_at');
setQuery('');
setResults([]);
setSearched(false);
setError('');
};

const handleCardClick = (content: Content) => {
router.push(`/content/${content.slug}`);
};

return (
<> <Navbar />

```
  <main>
    <div className="hero-bg" />

    <div className="page-header">
      <h1 className="page-title">جستجو در سینماگرام</h1>

      <p className="page-subtitle">
        فیلم، سریال یا انیمه مورد علاقه‌ات رو پیدا کن
      </p>
    </div>

    <div
      className="section"
      style={{
        maxWidth: '700px',
        margin: '0 auto',
        paddingTop: '10px',
      }}
    >
      <div
        className="search-box"
        style={{
          width: '100%',
          padding: '12px 20px',
          borderRadius: '50px',
          marginBottom: '15px',
        }}
      >
        <span style={{ fontSize: '18px' }}>🔍</span>

        <input
          type="text"
          placeholder="جستجو فیلم، سریال، انیمه..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          style={{
            flex: 1,
            fontSize: '0.95rem',
          }}
          autoFocus
        />

        <button
          onClick={() => handleSearch()}
          disabled={loading}
          style={{
            padding: '8px 20px',
            fontSize: '0.85rem',
          }}
        >
          {loading ? '...' : 'جستجو'}
        </button>
      </div>

      <button
        type="button"
        onClick={() => setShowFilters(!showFilters)}
        className="btn-secondary"
        style={{
          padding: '8px 20px',
          fontSize: '0.8rem',
          marginBottom: '15px',
        }}
      >
        {showFilters ? '✕ بستن فیلترها' : '⚙️ فیلترها'}
      </button>

      {showFilters && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '20px',
            marginBottom: '20px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
          }}
        >
          <div>
            <label
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '5px',
              }}
            >
              نوع محتوا
            </label>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-input"
            >
              <option value="">همه</option>
              <option value="movie">🎬 فیلم</option>
              <option value="series">📺 سریال</option>
              <option value="anime">✨ انیمه</option>
            </select>
          </div>

          <div>
            <label
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '5px',
              }}
            >
              ژانر
            </label>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="form-input"
            >
              <option value="">همه ژانرها</option>

              {genres.map((genre) => (
                <option
                  key={genre.id}
                  value={genre.slug}
                >
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '5px',
              }}
            >
              سال ساخت
            </label>

            <input
              type="text"
              inputMode="numeric"
              placeholder="مثلا: 2024"
              value={selectedYear}
              onChange={(e) =>
                setSelectedYear(
                  e.target.value.replace(/[^0-9]/g, '')
                )
              }
              className="form-input"
            />
          </div>

          <div>
            <label
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '5px',
              }}
            >
              حداقل امتیاز
            </label>

            <input
              type="text"
              inputMode="decimal"
              placeholder="مثلا: 8"
              value={minRating}
              onChange={(e) =>
                setMinRating(
                  e.target.value.replace(/[^0-9.]/g, '')
                )
              }
              className="form-input"
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '5px',
              }}
            >
              مرتب‌سازی بر اساس
            </label>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input"
            >
              <option value="created_at">جدیدترین</option>
              <option value="rating">بیشترین امتیاز</option>
              <option value="views_count">بیشترین بازدید</option>
              <option value="release_year">سال ساخت</option>
            </select>
          </div>

          <div
            style={{
              gridColumn: '1 / -1',
              display: 'flex',
              gap: '10px',
            }}
          >
            <button
              type="button"
              onClick={() => handleSearch()}
              className="btn-primary"
              style={{
                padding: '8px 20px',
                fontSize: '0.8rem',
                flex: 1,
              }}
            >
              اعمال فیلترها
            </button>

            <button
              type="button"
              onClick={handleResetFilters}
              className="btn-secondary"
              style={{
                padding: '8px 20px',
                fontSize: '0.8rem',
              }}
            >
              پاک کردن
            </button>
          </div>
        </div>
      )}
    </div>

    {loading && (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: 'var(--text-muted)',
        }}
      >
        در حال جستجو...
      </div>
    )}

    {error && (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          color: 'var(--accent)',
        }}
      >
        {error}
      </div>
    )}

    {!loading &&
      searched &&
      !error &&
      results.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            color: 'var(--text-muted)',
          }}
        >
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

export default function SearchPage() {
return (
<Suspense
fallback={
<div
style={{
minHeight: '100vh',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}}
>
در حال بارگذاری... </div>
}
> <SearchContent /> </Suspense>
);
}
