'use client';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-glass)] bg-[var(--bg-secondary)] py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-xl font-black mb-3">
          <span>🎬</span>
          <span className="bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            سینماگرام
          </span>
        </div>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          © ۱۴۰۵ سینماگرام — تمامی حقوق محفوظ است
        </p>
        <div className="flex gap-6 justify-center">
          <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            درباره ما
          </a>
          <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            تماس
          </a>
          <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            حریم خصوصی
          </a>
        </div>
      </div>
    </footer>
  );
}