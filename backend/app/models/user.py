from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum, Text
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from ..core.database import Base


class UserRole(str, enum.Enum):
    OWNER = "owner"
    ADMIN = "admin"
    USER = "user"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    
    role = Column(Enum(UserRole), default=UserRole.USER, nullable=False)
    
    avatar_url = Column(String(500), nullable=True)
    bio = Column(Text, nullable=True)
    
    is_active = Column(Boolean, default=True)
    is_banned = Column(Boolean, default=False)
    ban_until = Column(DateTime, nullable=True)
    mute_until = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    comments = relationship("Comment", back_populates="user", cascade="all, delete-orphan")
    ratings = relationship("Rating", back_populates="user", cascade="all, delete-orphan")
    watchlist = relationship("Watchlist", back_populates="user", cascade="all, delete-orphan")
    contents_created = relationship("Content", back_populates="creator", foreign_keys="Content.created_by")