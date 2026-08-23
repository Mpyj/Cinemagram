'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { register } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({ username, email, password });
      router.push('/login');
    } catch (err) {
      setError('خطا در ثبت‌نام');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-primary)] min-h-screen pt-[76px] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[var(--bg-secondary)] border border-[var(--border-glass)] rounded-3xl p-8">
          <h1 className="text-2xl font-black mb-6 text-center text-[var(--text-primary)]">
            ثبت‌نام در سینماگرام
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">
                نام کاربری
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-primary)] outline-none focus:border-purple-500 transition-colors"
                placeholder="username"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">
                ایمیل
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-primary)] outline-none focus:border-purple-500 transition-colors"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">
                رمز عبور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-glass)] text-[var(--text-primary)] outline-none focus:border-purple-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            حساب دارید؟{' '}
            <a href="/login" className="text-purple-400 hover:underline">
              وارد شوید
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}