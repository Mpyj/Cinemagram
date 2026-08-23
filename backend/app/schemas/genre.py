from pydantic import BaseModel, Field
from typing import Optional


class GenreBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    slug: str = Field(..., min_length=2, max_length=50)


class GenreCreate(GenreBase):
    description: Optional[str] = Field(None, max_length=500)


class GenreUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=2, max_length=50)
    slug: Optional[str] = Field(None, min_length=2, max_length=50)
    description: Optional[str] = Field(None, max_length=500)


class GenreResponse(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str] = None
    
    class Config:
        from_attributes = True