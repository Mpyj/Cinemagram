import os
import uuid
from pathlib import Path
from fastapi import UploadFile, HTTPException, status
from ..core.config import settings


def save_upload_file(upload_file: UploadFile, folder: str) -> str:
    """
    Save uploaded file and return file URL
    
    Args:
        upload_file: The uploaded file
        folder: Subfolder in uploads directory (e.g., 'posters', 'avatars')
    
    Returns:
        str: The URL path to the saved file
    """
    # Validate file type
    allowed_types = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if upload_file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Only images are allowed."
        )
    
    # Validate file size
    content = upload_file.file.read()
    if len(content) > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File too large. Max size is {settings.MAX_UPLOAD_SIZE // (1024*1024)}MB"
        )
    
    # Generate unique filename
    file_extension = os.path.splitext(upload_file.filename)[1].lower()
    unique_filename = f"{uuid.uuid4().hex}{file_extension}"
    
    # Create folder if not exists
    folder_path = Path(settings.UPLOAD_DIR) / folder
    folder_path.mkdir(parents=True, exist_ok=True)
    
    # Save file
    file_path = folder_path / unique_filename
    with open(file_path, "wb") as f:
        f.write(content)
    
    # Return URL
    return f"/uploads/{folder}/{unique_filename}"


def delete_upload_file(file_url: str) -> bool:
    """
    Delete uploaded file
    
    Args:
        file_url: URL path of the file to delete
    
    Returns:
        bool: True if deleted, False if not found
    """
    if not file_url or not file_url.startswith("/uploads/"):
        return False
    
    # Convert URL to file path
    relative_path = file_url.replace("/uploads/", "")
    file_path = Path(settings.UPLOAD_DIR) / relative_path
    
    if file_path.exists():
        file_path.unlink()
        return True
    
    return False