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
    <div className="tabs-section">
      <div className="tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}