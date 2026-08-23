'use client';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const categories = [
    { id: 'movies', label: 'فیلم', emoji: '🎬' },
    { id: 'series', label: 'سریال', emoji: '📺' },
    { id: 'anime', label: 'انیمه', emoji: '✨' },
    { id: 'all', label: 'همه', emoji: '🌟' },
  ];

  return (
    <div className="flex gap-2 md:gap-3 justify-center flex-wrap py-5 md:py-6 px-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`inline-flex items-center gap-1.5 md:gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-semibold whitespace-nowrap transition-all duration-300 ${
            activeCategory === cat.id
              ? 'bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#fd79a8] text-white shadow-lg shadow-purple-500/30'
              : 'bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text)] hover:-translate-y-0.5 active:scale-95'
          }`}
        >
          <span>{cat.emoji}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
}