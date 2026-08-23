'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <a href="/" className="logo">
          <span className="logo-icon">🎬</span>
          سینماگرام
        </a>

        <ul className="nav-links">
          <li><a href="/">خانه</a></li>
          <li><a href="/search">جستجو</a></li>
          <li><a href="/profile">پروفایل</a></li>
        </ul>

        <div className="nav-actions">
          <div className="search-box">
            <span>🔍</span>
            <input
              type="text"
              placeholder="جستجو..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>جستجو</button>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <a href="/login" className="btn-login">ورود</a>
        </div>

        {/* دکمه موبایل */}
        <button
          className="mobile-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            zIndex: 50,
          }}
        >
          <span style={{ width: '24px', height: '2px', background: 'var(--text)', transition: 'all 0.3s' }} />
          <span style={{ width: '24px', height: '2px', background: 'var(--text)', transition: 'all 0.3s' }} />
          <span style={{ width: '24px', height: '2px', background: 'var(--text)', transition: 'all 0.3s' }} />
        </button>
      </nav>

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}