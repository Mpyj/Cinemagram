'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
    { href: '#home', label: 'خانه', active: true },
    { href: '#movies', label: 'فیلم' },
    { href: '#series', label: 'سریال' },
    { href: '#anime', label: 'انیمه' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 h-[76px] px-4 md:px-10 flex items-center justify-between border-b transition-all duration-500 ${
          scrolled
            ? 'bg-black/95 shadow-lg shadow-black/50 border-white/10'
            : 'bg-black/75 backdrop-blur-2xl border-white/10'
        }`}
      >
        <a href="#" className="flex items-center gap-2.5">
          <motion.span
            className="text-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎬
          </motion.span>
          <span className="text-2xl font-black bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            سینماگرام
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative text-gray-400 hover:text-white transition-colors duration-300 group ${
                  link.active ? 'text-white' : ''
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-purple-500 transition-all duration-300 ${
                    link.active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
          <span>🔍</span>
          <input
            type="text"
            placeholder="جستجو فیلم، سریال، انیمه..."
            className="bg-transparent outline-none text-white w-44 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
          />
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-white/10 transition-all"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <a
            href="/login"
            className="bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 px-6 py-2.5 rounded-full font-bold text-sm text-white hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            شروع رایگان
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              mobileOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[76px] bg-black/95 backdrop-blur-xl z-40 md:hidden flex flex-col items-center gap-8 pt-10"
          >
            <ul className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-2xl font-bold text-white hover:text-red-400 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              onClick={toggleTheme}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <a
              href="/login"
              className="bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 px-8 py-3 rounded-full font-bold text-white"
            >
              شروع رایگان
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}