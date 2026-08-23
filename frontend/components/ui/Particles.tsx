'use client';

import { useEffect, useRef } from 'react';

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];
    const count = window.innerWidth < 768 ? 10 : 20;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        bottom: -10px;
        animation: floatUp ${Math.random() * 10 + 10}s linear infinite;
        animation-delay: ${Math.random() * 10}s;
      `;
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes floatUp {
          0% { bottom: -10px; opacity: 0; transform: translateX(0); }
          10% { opacity: 1; }
          90% { opacity: 0.8; }
          100% { bottom: 100vh; opacity: 0; transform: translateX(50px); }
        }
      `}</style>
      <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
    </>
  );
}