from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..core.security import hash_password, verify_password
from ..core.permissions import get_current_user
from ..models import User, Comment, Content
from ..schemas import UserUpdate, UserProfileResponse
from ..utils.file_upload import save_upload_file

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserProfileResponse)
async def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current user profile"""
    user = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


@router.get("/me/comments")
async def get_my_comments(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current user comments with content title and poster"""
    comments = db.query(Comment).filter(
        Comment.user_id == current_user.id
    ).order_by(Comment.created_at.desc()).all()
    
    result = []
    for c in comments:
        user = db.query(User).filter(User.id == c.user_id).first()
        content = db.query(Content).filter(Content.id == c.content_id).first()
        result.append({
            "id": c.id,
            "user_id": c.user_id,
            "content_id": c.content_id,
            "parent_id": c.parent_id,
            "body": c.body,
            "is_approved": c.is_approved,
            "is_hidden": c.is_hidden,
            "created_at": c.created_at,
            "username": user.username if user else f"کاربر {c.user_id}",
            "avatar_url": user.avatar_url if user and user.avatar_url else None,
            "content_title": content.title if content else f"محتوای #{c.content_id}",
            "content_poster_url": content.poster_url if content else None,
            "replies": None
        })
    
    return result


@router.post("/avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload user avatar"""
    user = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    avatar_url = save_upload_file(file, "avatars")
    user.avatar_url = avatar_url
    db.commit()
    db.refresh(user)
    
    return {"avatar_url": avatar_url}


@router.get("/{user_id}", response_model=UserProfileResponse)
async def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    """Get user profile by ID"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user


@router.put("/{user_id}", response_model=UserProfileResponse)
async def update_user_profile(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db)
):
    """Update user profile"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user_update.username:
        existing = db.query(User).filter(
            User.username == user_update.username,
            User.id != user_id
        ).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
        user.username = user_update.username
    
    if user_update.email:
        existing = db.query(User).filter(
            User.email == user_update.email,
            User.id != user_id
        ).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already taken"
            )
        user.email = user_update.email
    
    if user_update.bio is not None:
        user.bio = user_update.bio
    
    if user_update.avatar_url:
        user.avatar_url = user_update.avatar_url
    
    db.commit()
    db.refresh(user)
    return user


@router.put("/{user_id}/password")
async def change_password(
    user_id: int,
    old_password: str,
    new_password: str,
    db: Session = Depends(get_db)
):
    """Change user password"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if not verify_password(old_password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect password"
        )
    
    user.hashed_password = hash_password(new_password)
    db.commit()
    
    return {"message": "Password changed successfully"}