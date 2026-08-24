from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from ..core.database import get_db
from ..core.permissions import require_admin, require_owner
from ..models import User, UserRole, Comment, Content
from ..schemas import UserResponse, CommentResponse, ContentResponse

router = APIRouter(prefix="/admin", tags=["Admin"])


def is_superior(user: User, target: User) -> bool:
    """Check if user can manage target"""
    if user.role == UserRole.OWNER:
        return user.id != target.id
    elif user.role == UserRole.ADMIN:
        return target.role == UserRole.USER
    return False


# ===== User Management =====

@router.get("/users", response_model=List[UserResponse])
async def get_all_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Get all users (admin only)"""
    query = db.query(User)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (User.username.ilike(search_term)) | (User.email.ilike(search_term))
        )
    
    return query.offset(skip).limit(limit).all()


@router.put("/users/{user_id}/role")
async def change_user_role(
    user_id: int,
    new_role: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_owner)
):
    """Change user role (owner only)"""
    if current_user.role != UserRole.OWNER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only owner can change roles"
        )
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot change your own role"
        )
    
    if new_role not in ["admin", "user"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role. Only admin or user allowed."
        )
    
    user.role = UserRole(new_role)
    db.commit()
    db.refresh(user)
    
    return {"message": f"User role changed to {new_role}"}


@router.post("/users/{user_id}/ban")
async def ban_user(
    user_id: int,
    duration_hours: int = 24,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Ban a user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not is_superior(current_user, user):
        raise HTTPException(status_code=403, detail="You cannot ban this user")
    
    user.is_banned = True
    user.ban_until = datetime.utcnow() + timedelta(hours=duration_hours)
    db.commit()
    
    return {"message": f"User banned for {duration_hours} hours"}


@router.post("/users/{user_id}/unban")
async def unban_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Unban a user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not is_superior(current_user, user):
        raise HTTPException(status_code=403, detail="You cannot unban this user")
    
    user.is_banned = False
    user.ban_until = None
    db.commit()
    
    return {"message": "User unbanned"}


@router.post("/users/{user_id}/mute")
async def mute_user(
    user_id: int,
    duration_hours: int = 24,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Mute a user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not is_superior(current_user, user):
        raise HTTPException(status_code=403, detail="You cannot mute this user")
    
    user.mute_until = datetime.utcnow() + timedelta(hours=duration_hours)
    db.commit()
    db.refresh(user)
    
    return {"message": f"User muted for {duration_hours} hours"}


@router.post("/users/{user_id}/unmute")
async def unmute_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Unmute a user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if not is_superior(current_user, user):
        raise HTTPException(status_code=403, detail="You cannot unmute this user")
    
    user.mute_until = None
    db.commit()
    db.refresh(user)
    
    return {"message": "User unmuted"}


# ===== Comment Management =====

@router.get("/comments")
async def get_all_comments(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Get all comments with username (admin only)"""
    comments = db.query(Comment).order_by(Comment.created_at.desc()).offset(skip).limit(limit).all()
    
    result = []
    for c in comments:
        user = db.query(User).filter(User.id == c.user_id).first()
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
            "replies": None
        })
    
    return result


@router.put("/comments/{comment_id}/approve")
async def approve_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Approve a comment"""
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    comment.is_approved = True
    comment.is_hidden = False
    db.commit()
    return {"message": "Comment approved"}


@router.put("/comments/{comment_id}/hide")
async def hide_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Hide a comment"""
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    comment.is_hidden = True
    db.commit()
    return {"message": "Comment hidden"}


@router.delete("/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Delete a comment"""
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    db.delete(comment)
    db.commit()
    return None


# ===== Content Management =====

@router.get("/content", response_model=List[ContentResponse])
async def get_all_content_admin(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Get all content (admin only)"""
    query = db.query(Content)
    return query.order_by(Content.created_at.desc()).offset(skip).limit(limit).all()
@router.get("/comments")
async def get_all_comments(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Get all comments with username and avatar (admin only)"""
    comments = db.query(Comment).order_by(Comment.created_at.desc()).offset(skip).limit(limit).all()
    
    result = []
    for c in comments:
        user = db.query(User).filter(User.id == c.user_id).first()
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
            "replies": None
        })
    
    return result