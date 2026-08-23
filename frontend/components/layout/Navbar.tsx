'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
        {/* لوگو */}
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

        {/* لینک‌های دسکتاپ */}
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

        {/* جستجو */}
        <div
          className={`hidden lg:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 transition-all ${
            searchOpen ? 'border-purple-500 shadow-lg shadow-purple-500/20' : ''
          }`}
        >
          <span>🔍</span>
          <input
            type="text"
            placeholder="جستجو فیلم، سریال، انیمه..."
            className="bg-transparent outline-none text-white w-44 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
          />
          <kbd className="text-xs bg-white/10 border border-white/10 rounded px-1.5 py-0.5 text-gray-400">
            Esc
          </kbd>
        </div>

        {/* دکمه ورود */}
        <a
          href="/login"
          className="hidden md:block bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 px-6 py-2.5 rounded-full font-bold text-sm text-white hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5 transition-all duration-300"
        >
          شروع رایگان
        </a>

        {/* دکمه منوی موبایل */}
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

      {/* منوی موبایل */}
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

            <div className="w-full max-w-[320px] px-4">
              <input
                type="text"
                placeholder="جستجو..."
                className="w-full px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white outline-none focus:border-purple-500"
              />
            </div>

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