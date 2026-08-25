from app.core.database import SessionLocal
from app.models import Content, ContentType

def fix_series_type():
    db = SessionLocal()
    
    # لیست اسلاگ های سریال
    series_slugs = [
        "breaking-bad", "better-call-saul", "game-of-thrones", "the-sopranos",
        "the-wire", "stranger-things", "the-walking-dead", "dark",
        "peaky-blinders", "sherlock", "chernobyl", "true-detective",
        "the-boys", "house-of-the-dragon", "the-last-of-us", "the-office",
        "friends", "prison-break", "lost", "dexter", "black-mirror",
        "narcos", "mindhunter", "mr-robot", "succession", "the-mandalorian",
        "westworld", "vikings", "ozark", "the-crown", "house-of-cards",
        "money-heist", "wednesday", "the-queen's-gambit", "the-bear",
        "fargo", "suits", "the-witcher", "loki", "daredevil",
        "punisher", "arcane", "fallout", "severance",
        "the-haunting-of-hill-house", "band-of-brothers",
        "boardwalk-empire", "yellowstone", "euphoria", "the-umbrella-academy",
    ]
    
    fixed = 0
    for slug in series_slugs:
        content = db.query(Content).filter(Content.slug == slug).first()
        if content:
            if content.type != ContentType.SERIES:
                content.type = ContentType.SERIES
                fixed += 1
                print(f"✅ {content.title} → SERIES")
            else:
                print(f"⏭ {content.title} - قبلاً SERIES")
        else:
            print(f"❌ پیدا نشد: {slug}")
    
    db.commit()
    db.close()
    print(f"\n🎉 {fixed} عنوان به سریال تغییر کرد!")

if __name__ == "__main__":
    fix_series_type()