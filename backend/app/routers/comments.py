from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..models import Comment, Content, User
from ..schemas import CommentCreate, CommentUpdate, CommentResponse

router = APIRouter(prefix="/comments", tags=["Comments"])


@router.get("/content/{content_id}", response_model=List[CommentResponse])
async def get_content_comments(content_id: int, db: Session = Depends(get_db)):
    """Get all approved comments for a content"""
    comments = db.query(Comment).filter(
        Comment.content_id == content_id,
        Comment.is_approved == True,
        Comment.is_hidden == False,
        Comment.parent_id == None  # Only top-level comments
    ).order_by(Comment.created_at.desc()).all()
    
    return comments


@router.post("/", response_model=CommentResponse, status_code=status.HTTP_201_CREATED)
async def create_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    """Create a new comment"""
    # Check content exists
    content = db.query(Content).filter(Content.id == comment.content_id).first()
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found"
        )
    
    # Create comment
    new_comment = Comment(
        user_id=1,  # TODO: Get from auth token
        content_id=comment.content_id,
        parent_id=comment.parent_id,
        body=comment.body
    )
    
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment


@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(comment_id: int, db: Session = Depends(get_db)):
    """Delete a comment"""
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found"
        )
    
    db.delete(comment)
    db.commit()
    return None