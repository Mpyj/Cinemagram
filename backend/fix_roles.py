from app.core.database import SessionLocal
from app.models import User, UserRole

def fix_roles():
    db = SessionLocal()
    
    owner_email = "ownermail@gmail.com"
    
    # همه کاربران رو user کن
    all_users = db.query(User).all()
    for user in all_users:
        user.role = UserRole.USER
    
    # کاربر owner رو owner کن
    owner = db.query(User).filter(User.email == owner_email).first()
    if owner:
        owner.role = UserRole.OWNER
        print(f"✅ {owner.username} با ایمیل {owner_email} به Owner ارتقا یافت!")
    else:
        print(f"❌ کاربر با ایمیل {owner_email} پیدا نشد!")
    
    db.commit()
    
    # نمایش همه کاربران
    users = db.query(User).all()
    print("\n📋 لیست کاربران:")
    for u in users:
        print(f"  - {u.username} | {u.email} | {u.role.value}")
    
    db.close()

if __name__ == "__main__":
    fix_roles()