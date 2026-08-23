from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..models import Genre
from ..schemas import GenreCreate, GenreUpdate, GenreResponse

router = APIRouter(prefix="/genres", tags=["Genres"])


@router.get("/", response_model=List[GenreResponse])
async def get_genres(db: Session = Depends(get_db)):
    """Get all genres"""
    genres = db.query(Genre).all()
    return genres


@router.get("/{genre_id}", response_model=GenreResponse)
async def get_genre(genre_id: int, db: Session = Depends(get_db)):
    """Get a specific genre by ID"""
    genre = db.query(Genre).filter(Genre.id == genre_id).first()
    if not genre:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Genre not found"
        )
    return genre


@router.post("/", response_model=GenreResponse, status_code=status.HTTP_201_CREATED)
async def create_genre(genre: GenreCreate, db: Session = Depends(get_db)):
    """Create a new genre"""
    # Check if genre exists
    existing = db.query(Genre).filter(
        (Genre.name == genre.name) | (Genre.slug == genre.slug)
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Genre with this name or slug already exists"
        )
    
    new_genre = Genre(
        name=genre.name,
        slug=genre.slug,
        description=genre.description
    )
    db.add(new_genre)
    db.commit()
    db.refresh(new_genre)
    return new_genre


@router.put("/{genre_id}", response_model=GenreResponse)
async def update_genre(genre_id: int, genre_update: GenreUpdate, db: Session = Depends(get_db)):
    """Update a genre"""
    genre = db.query(Genre).filter(Genre.id == genre_id).first()
    if not genre:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Genre not found"
        )
    
    if genre_update.name:
        genre.name = genre_update.name
    if genre_update.slug:
        genre.slug = genre_update.slug
    if genre_update.description is not None:
        genre.description = genre_update.description
    
    db.commit()
    db.refresh(genre)
    return genre


@router.delete("/{genre_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_genre(genre_id: int, db: Session = Depends(get_db)):
    """Delete a genre"""
    genre = db.query(Genre).filter(Genre.id == genre_id).first()
    if not genre:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Genre not found"
        )
    
    db.delete(genre)
    db.commit()
    return None