from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_, and_
from typing import List, Optional
from ..core.database import get_db
from ..models import Content, Genre, ContentType, ContentStatus, Episode
from ..schemas import ContentCreate, ContentUpdate, ContentResponse, EpisodeResponse

router = APIRouter(prefix="/content", tags=["Content"])


@router.get("/", response_model=List[ContentResponse])
async def get_all_content(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    type: Optional[str] = Query(None, pattern="^(movie|series|anime)$"),
    genre: Optional[str] = None,
    year: Optional[int] = None,
    min_rating: Optional[float] = Query(None, ge=0, le=10),
    search: Optional[str] = None,
    sort: Optional[str] = Query("created_at", pattern="^(created_at|rating|views_count|release_year)$"),
    db: Session = Depends(get_db)
):
    """
    Get all content with filters and search
    """
    query = db.query(Content).options(joinedload(Content.genres))
    
    # Filter by type
    if type:
        query = query.filter(Content.type == ContentType(type))
    
    # Filter by genre
    if genre:
        query = query.join(Content.genres).filter(Genre.slug == genre)
    
    # Filter by year
    if year:
        query = query.filter(Content.release_year == year)
    
    # Filter by rating
    if min_rating:
        query = query.filter(Content.rating >= min_rating)
    
    # Search
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Content.title.ilike(search_term),
                Content.title_en.ilike(search_term),
                Content.description.ilike(search_term)
            )
        )
    
    # Sort
    if sort == "rating":
        query = query.order_by(Content.rating.desc())
    elif sort == "views_count":
        query = query.order_by(Content.views_count.desc())
    elif sort == "release_year":
        query = query.order_by(Content.release_year.desc())
    else:
        query = query.order_by(Content.created_at.desc())
    
    total = query.count()
    content = query.offset(skip).limit(limit).all()
    
    return content


@router.get("/{content_id}", response_model=ContentResponse)
async def get_content(content_id: int, db: Session = Depends(get_db)):
    """Get a specific content by ID"""
    content = db.query(Content).options(joinedload(Content.genres)).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found"
        )
    
    # Increment views
    content.views_count += 1
    db.commit()
    db.refresh(content)
    
    return content


@router.get("/{content_id}/episodes", response_model=List[EpisodeResponse])
async def get_content_episodes(content_id: int, db: Session = Depends(get_db)):
    """Get all episodes for a content"""
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found"
        )
    
    episodes = db.query(Episode).filter(Episode.content_id == content_id).order_by(
        Episode.season_number, Episode.episode_number
    ).all()
    
    return episodes


@router.post("/", response_model=ContentResponse, status_code=status.HTTP_201_CREATED)
async def create_content(content: ContentCreate, db: Session = Depends(get_db)):
    """Create new content"""
    # Check slug uniqueness
    existing = db.query(Content).filter(Content.slug == content.slug).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Content with this slug already exists"
        )
    
    # Create content
    new_content = Content(
        title=content.title,
        title_en=content.title_en,
        slug=content.slug,
        description=content.description,
        type=ContentType(content.type),
        status=ContentStatus(content.status),
        release_year=content.release_year,
        rating=content.rating,
        country=content.country,
        language=content.language,
        poster_url=content.poster_url,
        backdrop_url=content.backdrop_url,
        trailer_url=content.trailer_url,
        video_url=content.video_url,
        download_url=content.download_url
    )
    
    # Add genres
    if content.genre_ids:
        genres = db.query(Genre).filter(Genre.id.in_(content.genre_ids)).all()
        new_content.genres = genres
    
    db.add(new_content)
    db.commit()
    db.refresh(new_content)
    return new_content


@router.put("/{content_id}", response_model=ContentResponse)
async def update_content(content_id: int, content_update: ContentUpdate, db: Session = Depends(get_db)):
    """Update content"""
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found"
        )
    
    # Update fields
    for field, value in content_update.model_dump(exclude_unset=True).items():
        if field == "genre_ids":
            genres = db.query(Genre).filter(Genre.id.in_(value)).all()
            content.genres = genres
        elif field == "type" and value:
            setattr(content, field, ContentType(value))
        elif field == "status" and value:
            setattr(content, field, ContentStatus(value))
        elif value is not None:
            setattr(content, field, value)
    
    db.commit()
    db.refresh(content)
    return content


@router.delete("/{content_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_content(content_id: int, db: Session = Depends(get_db)):
    """Delete content"""
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found"
        )
    
    db.delete(content)
    db.commit()
    return None