from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from ..core.database import Base


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    content_id = Column(Integer, ForeignKey('contents.id', ondelete='CASCADE'), nullable=False, index=True)
    parent_id = Column(Integer, ForeignKey('comments.id', ondelete='CASCADE'), nullable=True)  # برای ریپلای
    
    body = Column(Text, nullable=False)
    
    is_approved = Column(Boolean, default=True)
    is_hidden = Column(Boolean, default=False)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="comments")
    content = relationship("Content", back_populates="comments")
    replies = relationship("Comment", backref="parent", remote_side=[id], cascade="all, delete-orphan")