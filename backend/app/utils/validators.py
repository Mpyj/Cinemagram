import re
from typing import Optional
from fastapi import HTTPException, status


def validate_slug(slug: str) -> str:
    """
    Validate and normalize slug
    
    Args:
        slug: The slug to validate
    
    Returns:
        str: Normalized slug
    """
    if not slug:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Slug is required"
        )
    
    # Convert to lowercase
    slug = slug.lower().strip()
    
    # Replace spaces with hyphens
    slug = re.sub(r'[\s_]+', '-', slug)
    
    # Remove invalid characters
    slug = re.sub(r'[^a-z0-9\-]', '', slug)
    
    # Remove multiple hyphens
    slug = re.sub(r'-+', '-', slug)
    
    # Remove leading/trailing hyphens
    slug = slug.strip('-')
    
    if not slug:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid slug"
        )
    
    return slug


def validate_year(year: int) -> int:
    """
    Validate year
    
    Args:
        year: The year to validate
    
    Returns:
        int: Validated year
    """
    from datetime import datetime
    
    current_year = datetime.utcnow().year
    
    if year < 1900 or year > current_year + 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Year must be between 1900 and {current_year + 1}"
        )
    
    return year