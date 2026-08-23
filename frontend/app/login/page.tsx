'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { login } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login({ email, password });
      localStorage.setItem('access_token', response.access_token);
      router.push('/');
    } catch (err) {
      setError('خطا در ورود');
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
            ورود به سینماگرام
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              {loading ? 'در حال ورود...' : 'ورود'}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            حساب ندارید؟{' '}
            <a href="/register" className="text-purple-400 hover:underline">
              ثبت‌نام کنید
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}