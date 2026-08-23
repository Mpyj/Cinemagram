from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..models import Watchlist, WatchlistStatus, Content
from ..schemas import ContentResponse

router = APIRouter(prefix="/watchlist", tags=["Watchlist"])


@router.get("/", response_model=List[ContentResponse])
async def get_watchlist(db: Session = Depends(get_db)):
    """Get user's watchlist"""
    # TODO: Get user_id from auth token
    user_id = 1
    
    watchlist = db.query(Content).join(Watchlist).filter(Watchlist.user_id == user_id).all()
    return watchlist


@router.post("/{content_id}", status_code=status.HTTP_201_CREATED)
async def add_to_watchlist(
    content_id: int,
    watch_status: str = "plan_to_watch",
    db: Session = Depends(get_db)
):
    """Add content to watchlist"""
    # TODO: Get user_id from auth token
    user_id = 1
    
    # Check content exists
    content = db.query(Content).filter(Content.id == content_id).first()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found"
        )
    
    # Check if already in watchlist
    existing = db.query(Watchlist).filter(
        Watchlist.user_id == user_id,
        Watchlist.content_id == content_id
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Content already in watchlist"
        )
    
    new_entry = Watchlist(
        user_id=user_id,
        content_id=content_id,
        status=WatchlistStatus(watch_status)
    )
    
    db.add(new_entry)
    db.commit()
    return {"message": "Added to watchlist"}


@router.delete("/{content_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_from_watchlist(content_id: int, db: Session = Depends(get_db)):
    """Remove content from watchlist"""
    # TODO: Get user_id from auth token
    user_id = 1
    
    entry = db.query(Watchlist).filter(
        Watchlist.user_id == user_id,
        Watchlist.content_id == content_id
    ).first()
    
    if not entry:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not in watchlist"
        )
    
    db.delete(entry)
    db.commit()
    return None