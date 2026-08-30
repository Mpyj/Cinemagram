from app.core.database import SessionLocal
from app.models import User, UserRole

def make_owner():
    db = SessionLocal()
    
    email = "ownermail@gmail.com"
    
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        print(f"❌ کاربری با ایمیل {email} پیدا نشد!")
        db.close()
        return
    
    user.role = UserRole.OWNER
    db.commit()
    db.refresh(user)
    
    print(f"✅ کاربر {user.username} با ایمیل {email} به Owner ارتقا یافت!")
    print(f"   نام کاربری: {user.username}")
    print(f"   نقش جدید: {user.role.value}")
    
    db.close()

if __name__ == "__main__":
    make_owner()