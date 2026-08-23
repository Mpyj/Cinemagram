export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 py-10 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 text-xl font-black mb-3">
          <span>🎬</span>
          <span className="bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            سینماگرام
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          © ۱۴۰۵ سینماگرام — تمامی حقوق محفوظ است
        </p>
        <div className="flex gap-6 justify-center">
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            درباره ما
          </a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            تماس
          </a>
          <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
            حریم خصوصی
          </a>
        </div>
      </div>
    </footer>
  );
}