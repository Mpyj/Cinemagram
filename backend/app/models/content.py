from sqlalchemy import Column, Integer, String, Float, Text, DateTime, Boolean, Enum, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from ..core.database import Base
from .genre import content_genres


class ContentType(str, enum.Enum):
    MOVIE = "movie"
    SERIES = "series"
    ANIME = "anime"


class ContentStatus(str, enum.Enum):
    PUBLISHED = "published"
    DRAFT = "draft"
    ARCHIVED = "archived"


class Content(Base):
    __tablename__ = "contents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    title_en = Column(String(200), nullable=True, index=True)  # برای SEO
    slug = Column(String(250), unique=True, nullable=False, index=True)  # برای URL تمیز
    description = Column(Text, nullable=True)
    
    type = Column(Enum(ContentType), nullable=False, index=True)
    status = Column(Enum(ContentStatus), default=ContentStatus.DRAFT, nullable=False)
    
    release_year = Column(Integer, nullable=True)
    rating = Column(Float, nullable=True)  # امتیاز IMDB
    country = Column(String(100), nullable=True)
    language = Column(String(100), nullable=True)
    
    poster_url = Column(String(500), nullable=True)
    backdrop_url = Column(String(500), nullable=True)
    trailer_url = Column(String(500), nullable=True)
    
    video_url = Column(String(500), nullable=True)  # برای فیلم
    download_url = Column(String(500), nullable=True)
    
    views_count = Column(Integer, default=0)
    
    created_by = Column(Integer, ForeignKey('users.id'), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    genres = relationship("Genre", secondary=content_genres, back_populates="contents")
    episodes = relationship("Episode", back_populates="content", cascade="all, delete-orphan")
    comments = relationship("Comment", back_populates="content", cascade="all, delete-orphan")
    ratings = relationship("Rating", back_populates="content", cascade="all, delete-orphan")
    watchlist_entries = relationship("Watchlist", back_populates="content", cascade="all, delete-orphan")
    creator = relationship("User", back_populates="contents_created", foreign_keys=[created_by])
    
    # جزئیات خاص هر نوع
    movie_details = relationship("MovieDetail", back_populates="content", uselist=False, cascade="all, delete-orphan")
    series_details = relationship("SeriesDetail", back_populates="content", uselist=False, cascade="all, delete-orphan")
    anime_details = relationship("AnimeDetail", back_populates="content", uselist=False, cascade="all, delete-orphan")