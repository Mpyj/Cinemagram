from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/cinemagram"
    
    # JWT
    JWT_SECRET: str = "your-super-secret-jwt-key-change-this"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60
    
    # Upload
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_SIZE: int = 5242880  # 5MB
    
    # App
    DEBUG: bool = True
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

# Create upload directories if they don't exist
os.makedirs(f"{settings.UPLOAD_DIR}/posters", exist_ok=True)
os.makedirs(f"{settings.UPLOAD_DIR}/avatars", exist_ok=True)