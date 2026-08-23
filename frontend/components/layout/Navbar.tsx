'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <a
          className="logo"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        >
          <span className="logo-icon">🎬</span>
          سینماگرام
        </a>

        <ul className="nav-links">
          <li><a href="/">خانه</a></li>
          <li><a href="/?cat=movies">فیلم‌ها</a></li>
          <li><a href="/?cat=series">سریال‌ها</a></li>
          <li><a href="/?cat=anime">انیمه‌ها</a></li>
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

          {isLoggedIn ? (
            <a href="/profile" className="btn-login">👤 پروفایل</a>
          ) : (
            <a href="/login" className="btn-login">ورود</a>
          )}
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

      {/* منوی موبایل */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--bg)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            paddingTop: '40px',
          }}
        >
          <a href="/" className="btn-secondary" style={{ width: '80%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>خانه</a>
          <a href="/?cat=movies" className="btn-secondary" style={{ width: '80%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>فیلم‌ها</a>
          <a href="/?cat=series" className="btn-secondary" style={{ width: '80%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>سریال‌ها</a>
          <a href="/?cat=anime" className="btn-secondary" style={{ width: '80%', justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>انیمه‌ها</a>
          
          <div className="search-box" style={{ width: '80%' }}>
            <span>🔍</span>
            <input
              type="text"
              placeholder="جستجو..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              style={{ flex: 1 }}
            />
            <button onClick={handleSearch}>جستجو</button>
          </div>

          {isLoggedIn ? (
            <a href="/profile" className="btn-login" onClick={() => setMobileOpen(false)}>👤 پروفایل</a>
          ) : (
            <a href="/login" className="btn-login" onClick={() => setMobileOpen(false)}>ورود</a>
          )}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-hamburger { display: flex !important; }
          .nav-links, .nav-actions .search-box, .nav-actions .theme-toggle, .nav-actions .btn-login {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}