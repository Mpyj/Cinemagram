from app.core.database import SessionLocal
from app.models import Content, Genre, ContentType, ContentStatus, User, UserRole
from app.core.security import hash_password

def seed_data():
    db = SessionLocal()
    
    # Create default user if not exists
    if db.query(User).count() == 0:
        default_user = User(
            username="admin",
            email="admin@cinemagram.com",
            hashed_password=hash_password("admin123"),
            role=UserRole.OWNER,
            is_active=True,
        )
        db.add(default_user)
        db.commit()
        print("Default user created: admin / admin123")
    
    # Check if content exists
    if db.query(Content).count() > 0:
        print("Content already exists!")
        db.close()
        return
    
    # Create genres
    genres_data = [
        {"name": "علمی-تخیلی", "slug": "sci-fi"},
        {"name": "ماجراجویی", "slug": "adventure"},
        {"name": "درام", "slug": "drama"},
        {"name": "اکشن", "slug": "action"},
        {"name": "جرایم", "slug": "crime"},
        {"name": "فانتزی", "slug": "fantasy"},
    ]
    
    for g in genres_data:
        genre = Genre(name=g["name"], slug=g["slug"])
        db.add(genre)
    
    db.commit()
    
    # Create content
    contents_data = [
        {
            "title": "اینتراستلر",
            "title_en": "Interstellar",
            "slug": "interstellar",
            "description": "تیمی از کاوش‌گران فضایی برای یافتن خانه‌ای جدید برای بشر، از طریق یک سوراخ کرمی به کاوش می‌پردازند.",
            "type": ContentType.MOVIE,
            "release_year": 2014,
            "rating": 8.6,
            "country": "USA",
            "language": "English",
            "genres": ["sci-fi", "adventure"],
        },
        {
            "title": "اوپنهایمر",
            "title_en": "Oppenheimer",
            "slug": "oppenheimer",
            "description": "زندگی جی. رابرت اوپنهایمر، فیزیکدان آمریکایی که در توسعه بمب اتمی نقش کلیدی داشت.",
            "type": ContentType.MOVIE,
            "release_year": 2023,
            "rating": 8.3,
            "country": "USA",
            "language": "English",
            "genres": ["drama"],
        },
        {
            "title": "بریکینگ بد",
            "title_en": "Breaking Bad",
            "slug": "breaking-bad",
            "description": "یک معلم شیمی به ساخت مواد مخدر می‌پردازد.",
            "type": ContentType.SERIES,
            "release_year": 2008,
            "rating": 9.5,
            "country": "USA",
            "language": "English",
            "genres": ["crime", "drama"],
        },
        {
            "title": "حمله تیتان‌ها",
            "title_en": "Attack on Titan",
            "slug": "attack-on-titan",
            "description": "بشر در برابر تیتان‌های غول‌پیکر برای بقا می‌جنگد.",
            "type": ContentType.ANIME,
            "release_year": 2013,
            "rating": 9.0,
            "country": "Japan",
            "language": "Japanese",
            "genres": ["action", "fantasy"],
        },
    ]
    
    for c in contents_data:
        content = Content(
            title=c["title"],
            title_en=c.get("title_en", ""),
            slug=c["slug"],
            description=c["description"],
            type=c["type"],
            status=ContentStatus.PUBLISHED,
            release_year=c["release_year"],
            rating=c["rating"],
            country=c["country"],
            language=c["language"],
        )
        
        for genre_slug in c["genres"]:
            genre = db.query(Genre).filter(Genre.slug == genre_slug).first()
            if genre:
                content.genres.append(genre)
        
        db.add(content)
    
    db.commit()
    print("Seed data added successfully!")
    db.close()

if __name__ == "__main__":
    seed_data()