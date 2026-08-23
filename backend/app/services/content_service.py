from sqlalchemy.orm import Session, joinedload
from sqlalchemy import or_
from typing import Optional, List
from ..models import Content, Genre, ContentType, ContentStatus
from ..schemas import ContentCreate, ContentUpdate


class ContentService:
    """Service for content operations"""
    
    @staticmethod
    def get_content_by_id(db: Session, content_id: int) -> Content:
        """Get content by ID with genres"""
        content = db.query(Content).options(
            joinedload(Content.genres)
        ).filter(Content.id == content_id).first()
        
        return content
    
    @staticmethod
    def get_all_content(
        db: Session,
        skip: int = 0,
        limit: int = 20,
        content_type: Optional[str] = None,
        genre_slug: Optional[str] = None,
        year: Optional[int] = None,
        min_rating: Optional[float] = None,
        search: Optional[str] = None,
        sort: str = "created_at"
    ) -> List[Content]:
        """Get all content with filters"""
        query = db.query(Content).options(joinedload(Content.genres))
        
        if content_type:
            query = query.filter(Content.type == ContentType(content_type))
        
        if genre_slug:
            query = query.join(Content.genres).filter(Genre.slug == genre_slug)
        
        if year:
            query = query.filter(Content.release_year == year)
        
        if min_rating:
            query = query.filter(Content.rating >= min_rating)
        
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
        
        return query.offset(skip).limit(limit).all()
    
    @staticmethod
    def create_content(db: Session, content_data: ContentCreate, creator_id: int = None) -> Content:
        """Create new content"""
        # Check slug uniqueness
        existing = db.query(Content).filter(Content.slug == content_data.slug).first()
        if existing:
            raise ValueError("Content with this slug already exists")
        
        # Create content
        new_content = Content(
            title=content_data.title,
            title_en=content_data.title_en,
            slug=content_data.slug,
            description=content_data.description,
            type=ContentType(content_data.type),
            status=ContentStatus(content_data.status),
            release_year=content_data.release_year,
            rating=content_data.rating,
            country=content_data.country,
            language=content_data.language,
            poster_url=content_data.poster_url,
            backdrop_url=content_data.backdrop_url,
            trailer_url=content_data.trailer_url,
            video_url=content_data.video_url,
            download_url=content_data.download_url,
            created_by=creator_id
        )
        
        # Add genres
        if content_data.genre_ids:
            genres = db.query(Genre).filter(Genre.id.in_(content_data.genre_ids)).all()
            new_content.genres = genres
        
        db.add(new_content)
        db.commit()
        db.refresh(new_content)
        return new_content
    
    @staticmethod
    def update_content(db: Session, content_id: int, content_update: ContentUpdate) -> Content:
        """Update content"""
        content = ContentService.get_content_by_id(db, content_id)
        if not content:
            raise ValueError("Content not found")
        
        update_data = content_update.model_dump(exclude_unset=True)
        
        for field, value in update_data.items():
            if field == "genre_ids" and value is not None:
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
    
    @staticmethod
    def delete_content(db: Session, content_id: int) -> bool:
        """Delete content"""
        content = ContentService.get_content_by_id(db, content_id)
        if not content:
            return False
        
        db.delete(content)
        db.commit()
        return True
    
    @staticmethod
    def increment_views(db: Session, content_id: int) -> None:
        """Increment content views count"""
        content = db.query(Content).filter(Content.id == content_id).first()
        if content:
            content.views_count += 1
            db.commit()