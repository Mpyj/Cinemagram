from sqlalchemy.orm import Session
from typing import Optional, List
from ..models import User, UserRole
from ..core.security import hash_password, verify_password


class UserService:
    """Service for user operations"""
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
        """Get user by ID"""
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def get_user_by_username(db: Session, username: str) -> Optional[User]:
        """Get user by username"""
        return db.query(User).filter(User.username == username).first()
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        """Get user by email"""
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def get_all_users(
        db: Session,
        skip: int = 0,
        limit: int = 50,
        search: Optional[str] = None,
        role: Optional[str] = None
    ) -> List[User]:
        """Get all users with filters"""
        query = db.query(User)
        
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                (User.username.ilike(search_term)) | (User.email.ilike(search_term))
            )
        
        if role:
            query = query.filter(User.role == UserRole(role))
        
        return query.offset(skip).limit(limit).all()
    
    @staticmethod
    def update_user(db: Session, user_id: int, update_data: dict) -> Optional[User]:
        """Update user fields"""
        user = UserService.get_user_by_id(db, user_id)
        if not user:
            return None
        
        for field, value in update_data.items():
            if value is not None:
                setattr(user, field, value)
        
        db.commit()
        db.refresh(user)
        return user
    
    @staticmethod
    def change_password(db: Session, user_id: int, old_password: str, new_password: str) -> bool:
        """Change user password"""
        user = UserService.get_user_by_id(db, user_id)
        if not user:
            return False
        
        if not verify_password(old_password, user.hashed_password):
            return False
        
        user.hashed_password = hash_password(new_password)
        db.commit()
        return True
    
    @staticmethod
    def ban_user(db: Session, user_id: int, duration_hours: int) -> Optional[User]:
        """Ban user for specified hours"""
        from datetime import datetime, timedelta
        
        user = UserService.get_user_by_id(db, user_id)
        if not user:
            return None
        
        user.is_banned = True
        user.ban_until = datetime.utcnow() + timedelta(hours=duration_hours)
        db.commit()
        db.refresh(user)
        return user
    
    @staticmethod
    def unban_user(db: Session, user_id: int) -> Optional[User]:
        """Unban user"""
        user = UserService.get_user_by_id(db, user_id)
        if not user:
            return None
        
        user.is_banned = False
        user.ban_until = None
        db.commit()
        db.refresh(user)
        return user
    
    @staticmethod
    def change_role(db: Session, user_id: int, new_role: str) -> Optional[User]:
        """Change user role"""
        user = UserService.get_user_by_id(db, user_id)
        if not user:
            return None
        
        user.role = UserRole(new_role)
        db.commit()
        db.refresh(user)
        return user