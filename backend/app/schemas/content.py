from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from .genre import GenreResponse


class ContentBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    title_en: Optional[str] = Field(None, max_length=200)
    slug: str = Field(..., min_length=1, max_length=250)
    description: Optional[str] = None
    type: str = Field(..., pattern="^(movie|series|anime)$")
    release_year: Optional[int] = None
    rating: Optional[float] = Field(None, ge=0, le=10)
    country: Optional[str] = None
    language: Optional[str] = None
    poster_url: Optional[str] = None
    backdrop_url: Optional[str] = None
    trailer_url: Optional[str] = None
    video_url: Optional[str] = None
    download_url: Optional[str] = None


class ContentCreate(ContentBase):
    genre_ids: List[int] = []
    status: str = "draft"


class ContentUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    title_en: Optional[str] = Field(None, max_length=200)
    slug: Optional[str] = Field(None, min_length=1, max_length=250)
    description: Optional[str] = None
    type: Optional[str] = Field(None, pattern="^(movie|series|anime)$")
    release_year: Optional[int] = None
    rating: Optional[float] = Field(None, ge=0, le=10)
    country: Optional[str] = None
    language: Optional[str] = None
    poster_url: Optional[str] = None
    backdrop_url: Optional[str] = None
    trailer_url: Optional[str] = None
    video_url: Optional[str] = None
    download_url: Optional[str] = None
    status: Optional[str] = None
    genre_ids: Optional[List[int]] = None


class ContentResponse(BaseModel):
    id: int
    title: str
    title_en: Optional[str] = None
    slug: str
    description: Optional[str] = None
    type: str
    status: str
    release_year: Optional[int] = None
    rating: Optional[float] = None
    country: Optional[str] = None
    language: Optional[str] = None
    poster_url: Optional[str] = None
    backdrop_url: Optional[str] = None
    trailer_url: Optional[str] = None
    video_url: Optional[str] = None
    download_url: Optional[str] = None
    views_count: int
    genres: List[GenreResponse] = []
    created_at: datetime
    
    class Config:
        from_attributes = True