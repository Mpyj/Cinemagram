from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class CommentBase(BaseModel):
    body: str = Field(..., min_length=1, max_length=2000)


class CommentCreate(CommentBase):
    content_id: int
    parent_id: Optional[int] = None


class CommentUpdate(BaseModel):
    body: Optional[str] = Field(None, min_length=1, max_length=2000)
    is_approved: Optional[bool] = None
    is_hidden: Optional[bool] = None


class CommentResponse(BaseModel):
    id: int
    user_id: int
    content_id: int
    parent_id: Optional[int] = None
    body: str
    is_approved: bool
    is_hidden: bool
    created_at: datetime
    username: Optional[str] = None  # ← نام کاربری
    replies: Optional[List["CommentResponse"]] = None
    
    class Config:
        from_attributes = True