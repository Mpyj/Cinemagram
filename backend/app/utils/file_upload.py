import os
import uuid
from pathlib import Path
from fastapi import UploadFile, HTTPException, status
from ..core.config import settings


def save_upload_file(upload_file: UploadFile, folder: str) -> str:
    """
    Save uploaded file and return FULL public URL.
    """

    # Validate file type
    allowed_types = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif'
    ]

    if upload_file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Only images are allowed."
        )

    # Read file content
    content = upload_file.file.read()

    # Validate file size
    if len(content) > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"File too large. Max size is "
                f"{settings.MAX_UPLOAD_SIZE // (1024 * 1024)}MB"
            )
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

    # Return FULL public URL
    return (
        f"https://cinemagram-mdus.onrender.com"
        f"/uploads/{folder}/{unique_filename}"
    )


def delete_upload_file(file_url: str) -> bool:
    """
    Delete uploaded file.
    """

    if not file_url:
        return False

    # Extract path from URL
    if "/uploads/" in file_url:
        relative_path = file_url.split("/uploads/", 1)[1]
        relative_path = f"uploads/{relative_path}"
    else:
        return False

    file_path = Path(relative_path)

    if file_path.exists():
        file_path.unlink()
        return True

    return False