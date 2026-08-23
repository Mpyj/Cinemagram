'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('watchlist');

  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-primary)] min-h-screen pt-[76px]">
        <div className="max-w-4xl mx-auto px-4 py-10">
          {/* هدر پروفایل */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-3xl p-8 mb-6">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 flex items-center justify-center text-4xl">
                👤
              </div>
              <div>
                <h1 className="text-2xl font-black text-[var(--text-primary)] mb-1">
                  کاربر سینماگرام
                </h1>
                <p className="text-[var(--text-muted)]">
                  عضویت از ۱۴۰۵
                </p>
              </div>
              <button className="mr-auto px-5 py-2.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-primary)] text-sm font-bold hover:bg-[var(--bg-card-hover)] transition-all">
                ویرایش پروفایل
              </button>
            </div>
          </div>

          {/* تب‌ها */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeTab === 'watchlist'
                  ? 'bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 text-white'
                  : 'bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-secondary)]'
              }`}
            >
              ❤️ علاقه‌مندی‌ها
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeTab === 'comments'
                  ? 'bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 text-white'
                  : 'bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-secondary)]'
              }`}
            >
              💬 نظرات
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 text-white'
                  : 'bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-secondary)]'
              }`}
            >
              ⚙️ تنظیمات
            </button>
          </div>

          {/* محتوای تب */}
          {activeTab === 'watchlist' && (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-3xl p-8">
              <div className="text-center text-[var(--text-muted)] py-10">
                هنوز محتوایی به علاقه‌مندی‌ها اضافه نکردید
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-3xl p-8">
              <div className="text-center text-[var(--text-muted)] py-10">
                هنوز نظری ثبت نکردید
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-3xl p-8">
              <h2 className="text-xl font-black text-[var(--text-primary)] mb-6">تنظیمات حساب</h2>
              <form className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">نام کاربری</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-primary)] outline-none focus:border-purple-500"
                    placeholder="username"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">ایمیل</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-primary)] outline-none focus:border-purple-500"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-secondary)] mb-1">رمز عبور جدید</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-primary)] outline-none focus:border-purple-500"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all"
                >
                  ذخیره تغییرات
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}