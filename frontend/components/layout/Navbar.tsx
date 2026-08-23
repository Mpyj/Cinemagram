'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const navLinks = [
    { href: '/', label: 'خانه' },
    { href: '/search', label: 'جستجو' },
    { href: '/profile', label: 'پروفایل' },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-10 transition-all duration-500 ${
        scrolled
          ? 'py-2.5 md:py-3 bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)] shadow-lg shadow-black/20'
          : 'py-4 md:py-5 bg-transparent'
      }`}>
        <a href="/" className="flex items-center gap-2 cursor-pointer">
          <span className="text-2xl md:text-3xl">🎬</span>
          <span className="text-lg md:text-2xl font-black bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#fd79a8] bg-clip-text text-transparent whitespace-nowrap">
            سینماگرام
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] px-3 py-2 rounded-lg transition-all duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-full px-4 py-2 hover:border-[var(--border-hover)] transition-all">
            <span className="text-sm">🔍</span>
            <input
              type="text"
              placeholder="جستجو..."
              className="bg-transparent outline-none text-[var(--text)] text-sm w-28 xl:w-36"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] text-white px-3 py-1 rounded-full text-xs font-bold hover:shadow-lg hover:shadow-purple-500/30 active:scale-95 transition-all whitespace-nowrap"
            >
              جستجو
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-base hover:bg-[var(--bg-card-hover)] hover:rotate-12 active:scale-90 transition-all"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <a
            href="/login"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#fd79a8] text-white text-sm font-bold hover:shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 active:scale-95 transition-all whitespace-nowrap"
          >
            ورود
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className={`w-6 h-0.5 bg-[var(--text)] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-[var(--text)] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-[var(--text)] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[60px] bg-[var(--bg)]/98 backdrop-blur-xl z-40 md:hidden flex flex-col items-center gap-6 pt-8 px-6"
          >
            <ul className="flex flex-col items-center gap-4 w-full">
              {navLinks.map((link) => (
                <li key={link.href} className="w-full">
                  <a
                    href={link.href}
                    className="block text-center text-lg font-bold text-[var(--text)] hover:text-[#a29bfe] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] rounded-xl py-3 px-6 transition-all active:scale-95"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="w-full max-w-[300px]">
              <input
                type="text"
                placeholder="جستجو..."
                className="w-full px-5 py-3 rounded-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] text-sm outline-none focus:border-[var(--border-hover)]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={toggleTheme}
                className="w-11 h-11 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-xl active:scale-90 transition-all"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <a
                href="/login"
                className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#fd79a8] text-white text-sm font-bold active:scale-95 transition-all"
              >
                ورود
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}