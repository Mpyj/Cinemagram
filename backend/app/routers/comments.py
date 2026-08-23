from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..core.permissions import get_current_user
from ..models import Comment, Content, User
from ..schemas import CommentCreate, CommentUpdate

router = APIRouter(prefix="/comments", tags=["Comments"])


@router.get("/content/{content_id}")
async def get_content_comments(content_id: int, db: Session = Depends(get_db)):
    """Get all approved comments for a content"""
    comments = db.query(Comment).filter(
        Comment.content_id == content_id,
        Comment.is_approved == True,
        Comment.is_hidden == False,
        Comment.parent_id == None
    ).order_by(Comment.created_at.desc()).all()
    
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


@router.post("/")
async def create_comment(
    comment: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new comment"""
    content = db.query(Content).filter(Content.id == comment.content_id).first()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found"
        )
    
    new_comment = Comment(
        user_id=current_user.id,
        content_id=comment.content_id,
        parent_id=comment.parent_id,
        body=comment.body
    )
    
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    
    return {
        "id": new_comment.id,
        "user_id": new_comment.user_id,
        "content_id": new_comment.content_id,
        "parent_id": new_comment.parent_id,
        "body": new_comment.body,
        "is_approved": new_comment.is_approved,
        "is_hidden": new_comment.is_hidden,
        "created_at": new_comment.created_at,
        "username": current_user.username,
        "replies": None
    }


@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a comment"""
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )
    
    if comment.user_id != current_user.id and current_user.role not in ['admin', 'owner']:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You cannot delete this comment"
        )
    
    db.delete(comment)
    db.commit()
    return None