from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..core.security import hash_password
from ..models import User
from ..schemas import UserUpdate, UserProfileResponse

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/{user_id}", response_model=UserProfileResponse)
async def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    """Get user profile"""
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
        # Check username uniqueness
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
        # Check email uniqueness
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
    from ..core.security import verify_password
    
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