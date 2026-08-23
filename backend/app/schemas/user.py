from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    bio: Optional[str] = Field(None, max_length=500)
    avatar_url: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    is_active: bool
    is_banned: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class UserProfileResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    role: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True