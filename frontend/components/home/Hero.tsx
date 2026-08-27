'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [stats, setStats] = useState({ titles: 12000, users: 85000, rating: 4.8, genres: 20 });

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot"></span>
          نسخه ۱.۰ منتشر شد
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
          <a
            href="#content"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            🎬 کاوش فیلم‌ها
          </a>
          <a
            href="#content"
            className="btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            📺 مشاهده سریال‌ها
          </a>
        </div>
      </div>
    </section>
  );
}