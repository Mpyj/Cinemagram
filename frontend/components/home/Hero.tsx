'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [stats, setStats] = useState({ titles: 0, users: 0, rating: 0, genres: 0 });
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
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot"></span>
          نسخه ۲.۰ منتشر شد
        </div>
        <h1 className="hero-title">
          دنیای <span className="gradient-text">فیلم، سریال و انیمه</span>
          <br />در یکجا
        </h1>
        <p className="hero-subtitle">
          کشف کن، نظر بده، لیست بساز.<br />
          پیشنهادهای هوشمند بر اساس سلیقه تو.
        </p>
        <div className="hero-buttons">
          <a href="#content" className="btn-primary">🎬 کاوش فیلم‌ها</a>
          <a href="#content" className="btn-secondary">📺 مشاهده سریال‌ها</a>
        </div>
      </div>
    </section>
  );
}