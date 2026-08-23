'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [stats, setStats] = useState({
    titles: 0,
    users: 0,
    rating: 0,
    genres: 0,
  });

  const statsRef = useRef(null);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        titles: Math.floor(12000 * progress),
        users: Math.floor(85000 * progress),
        rating: Number((4.8 * progress).toFixed(1)),
        genres: Math.floor(20 * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats({ titles: 12000, users: 85000, rating: 4.8, genres: 20 });
      }
    }, interval);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 md:px-5 pt-24 md:pt-28 pb-10 relative z-10 text-center">
      {/* پس‌زمینه گرادیانی */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-full opacity-40">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full bg-pink-500/12 blur-[100px]" />
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-3xl"
      >
        {/* بج */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border)] text-xs md:text-sm text-[var(--text-muted)] mb-5 md:mb-6 hover:border-[var(--border-hover)] transition-all">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          نسخه <span className="text-[#a29bfe] font-bold">۲.۰</span> منتشر شد
        </div>

        {/* عنوان */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight md:leading-[1.2] mb-5 md:mb-6 tracking-tight">
          دنیای{' '}
          <span className="bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#fd79a8] bg-clip-text text-transparent animate-gradient">
            فیلم، سریال و انیمه
          </span>
          <br />
          در یکجا
        </h1>

        {/* زیرعنوان */}
        <p className="text-base md:text-lg text-[var(--text-muted)] mb-7 md:mb-8 leading-relaxed">
          کشف کن، نظر بده، لیست بساز.
          <br />
          پیشنهادهای هوشمند بر اساس سلیقه تو.
        </p>

        {/* دکمه‌ها */}
        <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-10 md:mb-12">
          <a
            href="#content"
            className="inline-flex items-center gap-2 px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#fd79a8] text-white text-sm md:text-base font-bold hover:shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 active:scale-95 transition-all whitespace-nowrap"
          >
            <span>🎬</span>
            کاوش فیلم‌ها
          </a>
          <a
            href="#content"
            className="inline-flex items-center gap-2 px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] text-sm md:text-base font-bold hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-hover)] hover:-translate-y-0.5 active:scale-95 transition-all whitespace-nowrap"
          >
            <span>📺</span>
            مشاهده سریال‌ها
          </a>
        </div>

        {/* آمار */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl py-4 md:py-5 px-3 text-center hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all cursor-default">
            <div className="text-xl md:text-2xl mb-1">🎞️</div>
            <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#6c5ce7] to-[#fd79a8] bg-clip-text text-transparent">
              {stats.titles.toLocaleString('fa-IR')}+
            </div>
            <div className="text-[10px] md:text-xs text-[var(--text-muted)]">عنوان</div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl py-4 md:py-5 px-3 text-center hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all cursor-default">
            <div className="text-xl md:text-2xl mb-1">👥</div>
            <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#00cec9] to-[#6c5ce7] bg-clip-text text-transparent">
              {stats.users.toLocaleString('fa-IR')}+
            </div>
            <div className="text-[10px] md:text-xs text-[var(--text-muted)]">کاربر فعال</div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl py-4 md:py-5 px-3 text-center hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all cursor-default">
            <div className="text-xl md:text-2xl mb-1">⭐</div>
            <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#fdcb6e] to-[#fd79a8] bg-clip-text text-transparent">
              {stats.rating.toFixed(1)}
            </div>
            <div className="text-[10px] md:text-xs text-[var(--text-muted)]">امتیاز</div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl py-4 md:py-5 px-3 text-center hover:bg-[var(--bg-card-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 transition-all cursor-default">
            <div className="text-xl md:text-2xl mb-1">🎭</div>
            <div className="text-xl md:text-2xl font-black bg-gradient-to-r from-[#fd79a8] to-[#6c5ce7] bg-clip-text text-transparent">
              {stats.genres}+
            </div>
            <div className="text-[10px] md:text-xs text-[var(--text-muted)]">ژانر</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}