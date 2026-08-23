from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from ..core.database import Base


class MovieDetail(Base):
    __tablename__ = "movie_details"

    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(Integer, ForeignKey('contents.id', ondelete='CASCADE'), unique=True, nullable=False)
    duration_minutes = Column(Integer, nullable=True)  # مدت زمان فیلم
    age_rating = Column(String(10), nullable=True)  # PG, PG-13, R
    
    content = relationship("Content", back_populates="movie_details")


class SeriesDetail(Base):
    __tablename__ = "series_details"

    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(Integer, ForeignKey('contents.id', ondelete='CASCADE'), unique=True, nullable=False)
    total_seasons = Column(Integer, nullable=True)
    total_episodes = Column(Integer, nullable=True)
    status = Column(String(50), nullable=True)  # ongoing, completed, canceled
    network = Column(String(100), nullable=True)  # شبکه پخش
    
    content = relationship("Content", back_populates="series_details")


class AnimeDetail(Base):
    __tablename__ = "anime_details"

    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(Integer, ForeignKey('contents.id', ondelete='CASCADE'), unique=True, nullable=False)
    studio = Column(String(100), nullable=True)  # استودیو سازنده
    total_episodes = Column(Integer, nullable=True)
    status = Column(String(50), nullable=True)  # airing, completed, upcoming
    mal_id = Column(Integer, nullable=True)  # MyAnimeList ID
    
    content = relationship("Content", back_populates="anime_details")