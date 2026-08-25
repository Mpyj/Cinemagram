from app.core.database import SessionLocal
from app.models import Content, ContentType, ContentStatus

def import_series_manual():
    db = SessionLocal()
    
    series_list = [
        # این ۸ تا قبلاً درست شدن، نمی‌ذاریم:
        # House of Cards, Suits, Severance, Yellowstone, The Office, Narcos, Succession, Westworld
        
        {"title": "Breaking Bad", "slug": "breaking-bad"},
        {"title": "Better Call Saul", "slug": "better-call-saul"},
        {"title": "Game of Thrones", "slug": "game-of-thrones"},
        {"title": "The Sopranos", "slug": "the-sopranos"},
        {"title": "The Wire", "slug": "the-wire"},
        {"title": "Stranger Things", "slug": "stranger-things"},
        {"title": "The Walking Dead", "slug": "the-walking-dead"},
        {"title": "Dark", "slug": "dark"},
        {"title": "Peaky Blinders", "slug": "peaky-blinders"},
        {"title": "Sherlock", "slug": "sherlock"},
        {"title": "Chernobyl", "slug": "chernobyl"},
        {"title": "True Detective", "slug": "true-detective"},
        {"title": "The Boys", "slug": "the-boys"},
        {"title": "House of the Dragon", "slug": "house-of-the-dragon"},
        {"title": "The Last of Us", "slug": "the-last-of-us"},
        {"title": "Friends", "slug": "friends"},
        {"title": "Prison Break", "slug": "prison-break"},
        {"title": "Lost", "slug": "lost"},
        {"title": "Dexter", "slug": "dexter"},
        {"title": "Black Mirror", "slug": "black-mirror"},
        {"title": "Mindhunter", "slug": "mindhunter"},
        {"title": "Mr. Robot", "slug": "mr-robot"},
        {"title": "The Mandalorian", "slug": "the-mandalorian"},
        {"title": "Vikings", "slug": "vikings"},
        {"title": "Ozark", "slug": "ozark"},
        {"title": "The Crown", "slug": "the-crown"},
        {"title": "Money Heist", "slug": "money-heist"},
        {"title": "Wednesday", "slug": "wednesday"},
        {"title": "The Queen's Gambit", "slug": "the-queens-gambit"},
        {"title": "The Bear", "slug": "the-bear"},
        {"title": "Fargo", "slug": "fargo"},
        {"title": "The Witcher", "slug": "the-witcher"},
        {"title": "Loki", "slug": "loki"},
        {"title": "Daredevil", "slug": "daredevil"},
        {"title": "Punisher", "slug": "punisher"},
        {"title": "Arcane", "slug": "arcane"},
        {"title": "Fallout", "slug": "fallout"},
        {"title": "Squid Game", "slug": "squid-game"},
        {"title": "The Haunting of Hill House", "slug": "the-haunting-of-hill-house"},
        {"title": "Band of Brothers", "slug": "band-of-brothers"},
        {"title": "Boardwalk Empire", "slug": "boardwalk-empire"},
        {"title": "Euphoria", "slug": "euphoria"},
        {"title": "The Umbrella Academy", "slug": "the-umbrella-academy"},
    ]
    
    added = 0
    skipped = 0
    fixed = 0
    
    for series in series_list:
        existing = db.query(Content).filter(Content.slug == series['slug']).first()
        
        if existing:
            if existing.type != ContentType.SERIES:
                existing.type = ContentType.SERIES
                print(f"🔧 تبدیل شد: {existing.title} → SERIES")
                fixed += 1
            else:
                print(f"⏭ قبلاً سریال: {existing.title}")
                skipped += 1
        else:
            content = Content(
                title=series['title'],
                slug=series['slug'],
                type=ContentType.SERIES,
                status=ContentStatus.PUBLISHED,
            )
            db.add(content)
            print(f"✅ اضافه شد: {series['title']}")
            added += 1
    
    db.commit()
    db.close()
    
    print(f"\n{'='*40}")
    print(f"🎉 تمام شد!")
    print(f"   ✅ اضافه شد: {added}")
    print(f"   🔧 تبدیل شد: {fixed}")
    print(f"   ⏭ رد شد: {skipped}")
    print(f"{'='*40}")

if __name__ == "__main__":
    import_series_manual()