'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('content');

  const sections = [
    { id: 'content', label: 'محتوا', emoji: '🎬' },
    { id: 'users', label: 'کاربران', emoji: '👥' },
    { id: 'comments', label: 'نظرات', emoji: '💬' },
  ];

  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-primary)] min-h-screen pt-[76px]">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-black text-[var(--text-primary)] mb-8">پنل مدیریت</h1>

          {/* منوی کناری */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 text-white'
                    : 'bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-secondary)]'
                }`}
              >
                <span>{section.emoji}</span>
                {section.label}
              </button>
            ))}
          </div>

          {/* محتوا */}
          {activeSection === 'content' && (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-[var(--text-primary)]">مدیریت محتوا</h2>
                <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 text-white font-bold text-sm">
                  + افزودن محتوا
                </button>
              </div>

              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-glass)]"
                  >
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-red-400 to-purple-500 flex items-center justify-center text-2xl">
                      🎬
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[var(--text-primary)]">عنوان فیلم {item}</h3>
                      <p className="text-sm text-[var(--text-muted)]">منتشر شده</p>
                    </div>
                    <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[var(--text-secondary)] hover:bg-white/10 transition-all">
                      ویرایش
                    </button>
                    <button className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-sm text-red-400 hover:bg-red-500/20 transition-all">
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* کاربران */}
          {activeSection === 'users' && (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-3xl p-6">
              <h2 className="text-xl font-black text-[var(--text-primary)] mb-6">مدیریت کاربران</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((user) => (
                  <div
                    key={user}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-glass)]"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-cyan-500 flex items-center justify-center text-xl">
                      👤
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-[var(--text-primary)]">کاربر {user}</h3>
                      <p className="text-sm text-[var(--text-muted)]">user@email.com</p>
                    </div>
                    <button className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-sm text-yellow-500 hover:bg-yellow-500/20 transition-all">
                      سکوت
                    </button>
                    <button className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-sm text-red-400 hover:bg-red-500/20 transition-all">
                      بن
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* نظرات */}
          {activeSection === 'comments' && (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-3xl p-6">
              <h2 className="text-xl font-black text-[var(--text-primary)] mb-6">مدیریت نظرات</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((comment) => (
                  <div
                    key={comment}
                    className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-glass)]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 flex items-center justify-center text-lg">
                        👤
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-[var(--text-primary)]">کاربر {comment}</h3>
                        <p className="text-xs text-[var(--text-muted)]">۲ ساعت پیش</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-3">
                      این یک نظر نمونه است که باید توسط ادمین تایید یا رد شود.
                    </p>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-sm text-green-500 hover:bg-green-500/20 transition-all">
                        تایید
                      </button>
                      <button className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-sm text-red-400 hover:bg-red-500/20 transition-all">
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}