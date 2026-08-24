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
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
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
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUserRole(parsed.role || '');
        setUsername(parsed.username || '');
      } catch {}
    }
  }, []);

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/search');
    }
    setSearchQuery('');
    setMobileOpen(false);
  };

  const isAdmin = userRole === 'admin' || userRole === 'owner';

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a className="logo" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">🎬</span>
          سینماگرام
        </a>

        <ul className="nav-links">
          <li><a href="/">خانه</a></li>
          <li><a href="/?cat=movies">فیلم‌ها</a></li>
          <li><a href="/?cat=series">سریال‌ها</a></li>
          <li><a href="/?cat=anime">انیمه‌ها</a></li>
          {isAdmin && <li><a href="/admin">مدیریت</a></li>}
        </ul>

        <div className="nav-actions">
          <div className="search-box" onClick={() => router.push('/search')} style={{ cursor: 'pointer' }}>
            <span>🔍</span>
            <input
              type="text"
              placeholder="جستجو..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); handleSearch(); }}>جستجو</button>
          </div>

          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {isLoggedIn ? (
            <a href="/profile" className="btn-login">👤 {username || 'پروفایل'}</a>
          ) : (
            <a href="/login" className="btn-login">ورود</a>
          )}
        </div>

        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span style={{ transform: mobileOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
          <span style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span style={{ transform: mobileOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          <a href="/" onClick={() => setMobileOpen(false)}>🏠 خانه</a>
          <a href="/?cat=movies" onClick={() => setMobileOpen(false)}>🎬 فیلم‌ها</a>
          <a href="/?cat=series" onClick={() => setMobileOpen(false)}>📺 سریال‌ها</a>
          <a href="/?cat=anime" onClick={() => setMobileOpen(false)}>✨ انیمه‌ها</a>
          {isAdmin && <a href="/admin" onClick={() => setMobileOpen(false)}>👑 مدیریت</a>}
        </div>
      )}
    </>
  );
}