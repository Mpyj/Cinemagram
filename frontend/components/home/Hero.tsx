'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [stats, setStats] = useState({
    titles: 0,
    users: 0,
    rating: 0,
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
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats({ titles: 12000, users: 85000, rating: 4.8 });
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
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4 py-20 text-center">
      {/* پس‌زمینه */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[100px] -top-40 -right-20" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-red-600/15 blur-[100px] -bottom-20 -left-20" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-cyan-500/15 blur-[100px] top-1/3 left-1/3" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-4xl"
      >
        {/* بج */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-lg text-sm text-gray-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          نسخه <span className="text-red-400 font-bold">۲.۰</span> منتشر شد
        </div>

        {/* عنوان */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
          دنیای{' '}
          <span className="bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            فیلم، سریال و انیمه
          </span>
          <br />
          در یکجا
        </h1>

        {/* زیرعنوان */}
        <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed">
          کشف کن، نظر بده، لیست بساز.
          <br />
          پیشنهادهای هوشمند بر اساس سلیقه تو.
        </p>

        {/* دکمه‌ها */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <a
            href="#movies"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 text-white font-bold hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-1 transition-all duration-300"
          >
            <span>🎬</span>
            کاوش فیلم‌ها
          </a>
          <a
            href="#series"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
          >
            <span>📺</span>
            مشاهده سریال‌ها
          </a>
        </div>

        {/* آمار */}
        <div ref={statsRef} className="flex gap-8 md:gap-12 justify-center flex-wrap">
          <div className="text-center min-w-[100px]">
            <div className="text-2xl mb-1">🎞️</div>
            <div className="text-3xl font-black bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent">
              {stats.titles.toLocaleString('fa-IR')}
            </div>
            <div className="text-sm text-gray-500">عنوان</div>
          </div>
          <div className="text-center min-w-[100px]">
            <div className="text-2xl mb-1">👥</div>
            <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
              {stats.users.toLocaleString('fa-IR')}
            </div>
            <div className="text-sm text-gray-500">کاربر فعال</div>
          </div>
          <div className="text-center min-w-[100px]">
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-green-500 bg-clip-text text-transparent">
              {stats.rating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-500">امتیاز</div>
          </div>
        </div>
      </motion.div>

      {/* نشانگر اسکرول */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-gray-500 rounded-full"
          />
        </div>
        <span className="text-xs text-gray-500">اسکرول کنید</span>
      </motion.div>
    </section>
  );
}