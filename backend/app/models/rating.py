from sqlalchemy import Column, Integer, Float, Text, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base


class Rating(Base):
    __tablename__ = "ratings"
    __table_args__ = (UniqueConstraint('user_id', 'content_id', name='unique_user_content_rating'),)

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    content_id = Column(Integer, ForeignKey('contents.id', ondelete='CASCADE'), nullable=False)
    
    rating = Column(Float, nullable=False)  # 0 تا 10
    review_text = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="ratings")
    content = relationship("Content", back_populates="ratings")