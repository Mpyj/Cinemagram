from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..models import Episode, Content
from ..schemas import EpisodeCreate, EpisodeUpdate, EpisodeResponse

router = APIRouter(prefix="/episodes", tags=["Episodes"])


@router.get("/", response_model=List[EpisodeResponse])
async def get_episodes(
    content_id: int = None,
    db: Session = Depends(get_db)
):
    """Get episodes, optionally filtered by content"""
    query = db.query(Episode)
    if content_id:
        query = query.filter(Episode.content_id == content_id)
    
    return query.order_by(Episode.season_number, Episode.episode_number).all()


@router.post("/", response_model=EpisodeResponse, status_code=status.HTTP_201_CREATED)
async def create_episode(episode: EpisodeCreate, db: Session = Depends(get_db)):
    """Create a new episode"""
    # Check content exists
    content = db.query(Content).filter(Content.id == episode.content_id).first()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found"
        )
    
    new_episode = Episode(
        content_id=episode.content_id,
        season_number=episode.season_number,
        episode_number=episode.episode_number,
        title=episode.title,
        description=episode.description,
        video_url=episode.video_url,
        download_url=episode.download_url,
        thumbnail_url=episode.thumbnail_url,
        duration_minutes=episode.duration_minutes
    )
    
    db.add(new_episode)
    db.commit()
    db.refresh(new_episode)
    return new_episode


@router.put("/{episode_id}", response_model=EpisodeResponse)
async def update_episode(episode_id: int, episode_update: EpisodeUpdate, db: Session = Depends(get_db)):
    """Update an episode"""
    episode = db.query(Episode).filter(Episode.id == episode_id).first()
    if not episode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Episode not found"
        )
    
    for field, value in episode_update.model_dump(exclude_unset=True).items():
        if value is not None:
            setattr(episode, field, value)
    
    db.commit()
    db.refresh(episode)
    return episode


@router.delete("/{episode_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_episode(episode_id: int, db: Session = Depends(get_db)):
    """Delete an episode"""
    episode = db.query(Episode).filter(Episode.id == episode_id).first()
    if not episode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Episode not found"
        )
    
    db.delete(episode)
    db.commit()
    return None