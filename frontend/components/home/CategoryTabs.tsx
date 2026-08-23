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
    <div className="flex gap-3 justify-center flex-wrap py-6 px-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
            activeCategory === cat.id
              ? 'bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400 text-white shadow-lg shadow-red-500/30'
              : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
          }`}
        >
          <span>{cat.emoji}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
}