from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from ..models import User, UserRole
from ..core.security import hash_password, verify_password, create_access_token
from ..schemas import RegisterRequest, LoginRequest


class AuthService:
    """Service for authentication operations"""
    
    @staticmethod
    def register_user(db: Session, request: RegisterRequest) -> User:
        """Register a new user"""
        # Check username
        if db.query(User).filter(User.username == request.username).first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already exists"
            )
        
        # Check email
        if db.query(User).filter(User.email == request.email).first():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already exists"
            )
        
        # Create user
        new_user = User(
            username=request.username,
            email=request.email,
            hashed_password=hash_password(request.password),
            role=UserRole.USER
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    
    @staticmethod
    def authenticate_user(db: Session, email: str, password: str) -> User:
        """Authenticate a user with email and password"""
        user = db.query(User).filter(User.email == email).first()
        
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password"
            )
        
        if user.is_banned:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is banned"
            )
        
        return user
    
    @staticmethod
    def generate_token(user: User) -> dict:
        """Generate JWT token for user"""
        from datetime import timedelta
        from ..core.config import settings
        
        token = create_access_token(
            data={
                "sub": str(user.id),
                "username": user.username,
                "role": user.role.value
            },
            expires_delta=timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
        )
        
        return {
            "access_token": token,
            "token_type": "bearer",
            "expires_in": settings.JWT_EXPIRE_MINUTES * 60
        }