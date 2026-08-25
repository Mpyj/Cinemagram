import requests
import time
from app.core.database import SessionLocal
from app.models import Content, Genre, ContentType, ContentStatus

TMDB_API_KEY = "4a680e86f92881f4f7f81ac8e775ea33"
TMDB_BASE_URL = "https://api.themoviedb.org/3"

def get_or_create_genre(db, name):
    """Get genre by name or create if not exists"""
    genre = db.query(Genre).filter(Genre.name == name).first()
    if genre:
        return genre
    
    slug = name.lower().replace(' ', '-').replace('!', '').replace('&', 'and')
    genre = db.query(Genre).filter(Genre.slug == slug).first()
    if genre:
        return genre
    
    genre = Genre(name=name, slug=slug)
    db.add(genre)
    db.flush()
    return genre

def search_movie(title):
    """Search movie on TMDB"""
    url = f"{TMDB_BASE_URL}/search/movie"
    params = {"api_key": TMDB_API_KEY, "query": title, "language": "fa-IR"}
    try:
        response = requests.get(url, params=params, timeout=15)
        if response.status_code == 200:
            results = response.json().get("results", [])
            return results[0] if results else None
        return None
    except Exception as e:
        print(f"خطا: {e}")
        return None

def search_series(title):
    """Search TV series on TMDB"""
    url = f"{TMDB_BASE_URL}/search/tv"
    params = {"api_key": TMDB_API_KEY, "query": title, "language": "fa-IR"}
    try:
        response = requests.get(url, params=params, timeout=15)
        if response.status_code == 200:
            results = response.json().get("results", [])
            return results[0] if results else None
        return None
    except Exception as e:
        print(f"خطا: {e}")
        return None

def get_movie_details(movie_id):
    """Get movie details"""
    url = f"{TMDB_BASE_URL}/movie/{movie_id}"
    params = {"api_key": TMDB_API_KEY, "language": "fa-IR"}
    try:
        response = requests.get(url, params=params, timeout=15)
        return response.json() if response.status_code == 200 else None
    except Exception as e:
        print(f"خطا: {e}")
        return None

def get_series_details(series_id):
    """Get series details"""
    url = f"{TMDB_BASE_URL}/tv/{series_id}"
    params = {"api_key": TMDB_API_KEY, "language": "fa-IR"}
    try:
        response = requests.get(url, params=params, timeout=15)
        return response.json() if response.status_code == 200 else None
    except Exception as e:
        print(f"خطا: {e}")
        return None

def import_movie(title, download_url=None):
    """Import a movie from TMDB"""
    db = SessionLocal()
    
    print(f"🔍 در حال جستجوی فیلم: {title}")
    
    result = search_movie(title)
    if not result:
        print(f"❌ فیلم پیدا نشد: {title}")
        db.close()
        return None
    
    details = get_movie_details(result['id'])
    if not details:
        print(f"❌ اطلاعات فیلم پیدا نشد: {title}")
        db.close()
        return None
    
    slug = details.get('title', title).lower().replace(' ', '-').replace(':', '').replace("'", '').replace('!', '').replace('(', '').replace(')', '').replace('&', 'and')
    
    existing = db.query(Content).filter(Content.slug == slug).first()
    if existing:
        print(f"⏭ تکراری: {details.get('title')}")
        db.close()
        return None
    
    poster_url = None
    if details.get('poster_path'):
        poster_url = f"https://image.tmdb.org/t/p/w500{details['poster_path']}"
    
    content = Content(
        title=details.get('title', title),
        title_en=details.get('original_title'),
        slug=slug,
        description=details.get('overview', '')[:500] if details.get('overview') else '',
        type=ContentType.MOVIE,
        status=ContentStatus.PUBLISHED,
        release_year=int(details.get('release_date', '2024')[:4]) if details.get('release_date') else None,
        rating=float(details.get('vote_average', 0)) if details.get('vote_average') else None,
        poster_url=poster_url,
        download_url=download_url,
    )
    
    genre_names = [g['name'] for g in details.get('genres', [])]
    genres = []
    for g_name in genre_names:
        genre = get_or_create_genre(db, g_name)
        genres.append(genre)
    content.genres = genres
    
    db.add(content)
    db.commit()
    
    print(f"✅ فیلم اضافه شد: {content.title}")
    print(f"   📅 سال: {content.release_year}")
    print(f"   ⭐ امتیاز: {content.rating}")
    print(f"   🎭 ژانرها: {', '.join(genre_names)}")
    print(f"   🖼 پوستر: {poster_url}")
    print()
    
    db.close()
    return content

def import_series(title, download_url=None):
    """Import a TV series from TMDB"""
    db = SessionLocal()
    
    print(f"🔍 در حال جستجوی سریال: {title}")
    
    result = search_series(title)
    if not result:
        print(f"❌ سریال پیدا نشد: {title}")
        db.close()
        return None
    
    details = get_series_details(result['id'])
    if not details:
        print(f"❌ اطلاعات سریال پیدا نشد: {title}")
        db.close()
        return None
    
    slug = details.get('name', title).lower().replace(' ', '-').replace(':', '').replace("'", '').replace('!', '').replace('(', '').replace(')', '').replace('&', 'and')
    
    existing = db.query(Content).filter(Content.slug == slug).first()
    if existing:
        print(f"⏭ تکراری: {details.get('name')}")
        db.close()
        return None
    
    poster_url = None
    if details.get('poster_path'):
        poster_url = f"https://image.tmdb.org/t/p/w500{details['poster_path']}"
    
    content = Content(
        title=details.get('name', title),
        title_en=details.get('original_name'),
        slug=slug,
        description=details.get('overview', '')[:500] if details.get('overview') else '',
        type=ContentType.SERIES,
        status=ContentStatus.PUBLISHED,
        release_year=int(details.get('first_air_date', '2024')[:4]) if details.get('first_air_date') else None,
        rating=float(details.get('vote_average', 0)) if details.get('vote_average') else None,
        poster_url=poster_url,
        download_url=download_url,
    )
    
    genre_names = [g['name'] for g in details.get('genres', [])]
    genres = []
    for g_name in genre_names:
        genre = get_or_create_genre(db, g_name)
        genres.append(genre)
    content.genres = genres
    
    db.add(content)
    db.commit()
    
    print(f"✅ سریال اضافه شد: {content.title}")
    print(f"   📅 سال: {content.release_year}")
    print(f"   ⭐ امتیاز: {content.rating}")
    print(f"   🎭 ژانرها: {', '.join(genre_names)}")
    print(f"   🖼 پوستر: {poster_url}")
    print()
    
    db.close()
    return content

def import_from_list(file_path):
    """Import movies/series from a text file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    success = 0
    failed = 0
    total = 0
    
    for line in lines:
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        
        total += 1
        parts = line.split('|')
        title = parts[0].strip()
        content_type = parts[1].strip() if len(parts) > 1 else 'movie'
        download_url = parts[2].strip() if len(parts) > 2 else None
        
        try:
            if content_type in ['series', 'tv']:
                result = import_series(title, download_url)
            else:
                result = import_movie(title, download_url)
            
            if result:
                success += 1
            else:
                failed += 1
        except Exception as e:
            print(f"❌ خطا برای {title}: {e}")
            failed += 1
        
        time.sleep(1)
    
    print(f"\n{'='*40}")
    print(f"📊 کل: {total} | ✅ موفق: {success} | ❌ ناموفق: {failed}")
    print(f"{'='*40}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("استفاده:")
        print("  python import_from_tmdb.py 'نام فیلم'")
        print("  python import_from_tmdb.py 'نام سریال' --series")
        print("  python import_from_tmdb.py list.txt --list")
        sys.exit(1)
    
    if '--list' in sys.argv:
        import_from_list(sys.argv[1])
    elif '--series' in sys.argv:
        import_series(sys.argv[1])
    else:
        import_movie(sys.argv[1])