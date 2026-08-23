from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base


class Episode(Base):
    __tablename__ = "episodes"

    id = Column(Integer, primary_key=True, index=True)
    content_id = Column(Integer, ForeignKey('contents.id', ondelete='CASCADE'), nullable=False, index=True)
    
    season_number = Column(Integer, default=1, nullable=False)
    episode_number = Column(Integer, nullable=False)
    
    title = Column(String(200), nullable=True)
    description = Column(Text, nullable=True)
    
    video_url = Column(String(500), nullable=True)
    download_url = Column(String(500), nullable=True)
    thumbnail_url = Column(String(500), nullable=True)
    
    duration_minutes = Column(Integer, nullable=True)
    air_date = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    content = relationship("Content", back_populates="episodes")