from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class EpisodeBase(BaseModel):
    season_number: int = Field(1, ge=1)
    episode_number: int = Field(..., ge=1)
    title: Optional[str] = None
    description: Optional[str] = None
    video_url: Optional[str] = None
    download_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    duration_minutes: Optional[int] = None


class EpisodeCreate(EpisodeBase):
    content_id: int


class EpisodeUpdate(BaseModel):
    season_number: Optional[int] = Field(None, ge=1)
    episode_number: Optional[int] = Field(None, ge=1)
    title: Optional[str] = None
    description: Optional[str] = None
    video_url: Optional[str] = None
    download_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    duration_minutes: Optional[int] = None


class EpisodeResponse(BaseModel):
    id: int
    content_id: int
    season_number: int
    episode_number: int
    title: Optional[str] = None
    description: Optional[str] = None
    video_url: Optional[str] = None
    download_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    duration_minutes: Optional[int] = None
    
    class Config:
        from_attributes = True