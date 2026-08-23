from sqlalchemy import Column, Integer, DateTime, ForeignKey, UniqueConstraint, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from ..core.database import Base


class WatchlistStatus(str, enum.Enum):
    WATCHING = "watching"
    COMPLETED = "completed"
    PLAN_TO_WATCH = "plan_to_watch"
    DROPPED = "dropped"


class Watchlist(Base):
    __tablename__ = "watchlist"
    __table_args__ = (UniqueConstraint('user_id', 'content_id', name='unique_user_content_watchlist'),)

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    content_id = Column(Integer, ForeignKey('contents.id', ondelete='CASCADE'), nullable=False)
    
    status = Column(Enum(WatchlistStatus), default=WatchlistStatus.PLAN_TO_WATCH)
    
    added_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="watchlist")
    content = relationship("Content", back_populates="watchlist_entries")