from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from ..core.database import Base


# Many-to-Many relationship table
content_genres = Table(
    'content_genres',
    Base.metadata,
    Column('content_id', Integer, ForeignKey('contents.id', ondelete='CASCADE'), primary_key=True),
    Column('genre_id', Integer, ForeignKey('genres.id', ondelete='CASCADE'), primary_key=True)
)


class Genre(Base):
    __tablename__ = "genres"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, nullable=False, index=True)
    slug = Column(String(50), unique=True, nullable=False)
    description = Column(String(500), nullable=True)
    
    # Relationships
    contents = relationship("Content", secondary=content_genres, back_populates="genres")