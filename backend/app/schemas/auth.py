from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class RegisterRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, description="نام کاربری")
    email: EmailStr = Field(..., description="ایمیل")
    password: str = Field(..., min_length=8, max_length=100, description="رمز عبور")


class LoginRequest(BaseModel):
    email: EmailStr = Field(..., description="ایمیل")
    password: str = Field(..., description="رمز عبور")


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class TokenData(BaseModel):
    user_id: Optional[int] = None
    username: Optional[str] = None
    role: Optional[str] = None
class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str = Field(..., min_length=8, max_length=100)