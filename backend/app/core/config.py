from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/cinemagram"
    JWT_SECRET: str = "your-super-secret-jwt-key-change-this"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 30  # ← ۳۰ دقیقه
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_SIZE: int = 5242880
    DEBUG: bool = True
    CORS_ORIGINS: str = "http://localhost:3000,http://127.0.0.1:3000"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()