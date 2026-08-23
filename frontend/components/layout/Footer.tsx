'use client';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-6 md:py-8 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-lg md:text-xl font-black mb-2">
          <span>🎬</span>
          <span className="bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#fd79a8] bg-clip-text text-transparent">
            سینماگرام
          </span>
        </div>
        <p className="text-xs md:text-sm text-[var(--text-muted)] mb-3">
          © ۱۴۰۵ سینماگرام — تمامی حقوق محفوظ است
        </p>
        <div className="flex gap-5 md:gap-6 justify-center">
          <a href="#" className="text-xs md:text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] px-2 py-1 rounded-lg transition-all">
            درباره ما
          </a>
          <a href="#" className="text-xs md:text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] px-2 py-1 rounded-lg transition-all">
            تماس
          </a>
          <a href="#" className="text-xs md:text-sm text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-card)] px-2 py-1 rounded-lg transition-all">
            حریم خصوصی
          </a>
        </div>
      </div>
    </footer>
  );
}