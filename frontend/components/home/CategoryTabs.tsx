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
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onCategoryChange(cat.id)}
            style={{
              cursor: 'pointer',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
              outline: 'none',
            }}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}